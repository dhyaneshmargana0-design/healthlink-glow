import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Upload, ShoppingCart, Bot, User, Loader2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  image?: string;
}

export const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI health assistant. How can I help you today? You can ask me medical questions or upload images for analysis.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() || uploadedImage) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText || "Image uploaded for analysis",
        sender: "user",
        timestamp: new Date(),
        image: uploadedImage || undefined,
      };

      setMessages([...messages, newMessage]);
      setInputText("");
      
      // Keep the image for the API call
      const currentImage = uploadedImage;
      setUploadedImage(null);
      setIsLoading(true);

      try {
        // Call the Perplexity API through our edge function
        const { data, error } = await supabase.functions.invoke('chat-with-perplexity', {
          body: { 
            message: inputText || "Please analyze this image and provide medical insights",
            imageData: currentImage 
          }
        });

        if (error) throw error;

        const aiResponse: Message = {
          id: messages.length + 2,
          text: data.response || "I apologize, but I couldn't generate a response. Please try again.",
          sender: "ai",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, aiResponse]);
      } catch (error) {
        console.error('Error calling AI:', error);
        toast({
          title: "Error",
          description: "Failed to get AI response. Please try again.",
          variant: "destructive",
        });
        
        // Add error message to chat
        const errorMessage: Message = {
          id: messages.length + 2,
          text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOrderMedicine = () => {
    window.open("https://www.flipkart.com/health-care/pr?sid=hlc", "_blank");
  };

  return (
    <div className="min-h-screen px-4 py-6 pb-20 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          AI Health Assistant
        </h1>
        <p className="text-muted-foreground">Ask me anything about your health</p>
      </motion.div>

      {/* Chat Messages */}
      <GlassCard className="flex-1 mb-4 p-4 overflow-hidden">
        <div className="h-[calc(100vh-320px)] overflow-y-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] md:max-w-[60%] ${
                    message.sender === "user" ? "order-2" : "order-1"
                  }`}
                >
                  <div className="flex items-start gap-2 mb-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground order-2"
                          : "bg-secondary text-secondary-foreground order-1"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-primary/20 border border-primary/30 text-foreground order-1"
                          : "bg-card/60 border border-border/30 text-foreground order-2"
                      }`}
                    >
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Uploaded"
                          className="max-w-full h-auto rounded-lg mb-2"
                        />
                      )}
                      <p className="text-sm md:text-base">{message.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </GlassCard>

      {/* Image Preview */}
      {uploadedImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4"
        >
          <GlassCard className="p-2">
            <div className="relative inline-block">
              <img
                src={uploadedImage}
                alt="Preview"
                className="max-h-24 rounded-lg"
              />
              <button
                onClick={() => setUploadedImage(null)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full text-xs"
              >
                ×
              </button>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Input Area */}
      <GlassCard className="p-4">
        <div className="flex gap-2 mb-3">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
            placeholder="Ask a health question..."
            className="flex-1 bg-background/50"
            disabled={isLoading}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg bg-background/50 border border-border/50 hover:bg-background/70 transition-colors"
          >
            <Upload className="w-5 h-5 text-muted-foreground" />
          </button>
          <NeonButton
            variant="primary"
            size="sm"
            onClick={handleSendMessage}
            disabled={isLoading}
            className="px-3"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </NeonButton>
        </div>
        <NeonButton
          variant="secondary"
          size="md"
          onClick={handleOrderMedicine}
          className="w-full gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Order Medicine
        </NeonButton>
      </GlassCard>
    </div>
  );
};