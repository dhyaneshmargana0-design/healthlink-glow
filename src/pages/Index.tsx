import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet, Bot, LogOut, Heart, Activity, Users, Shield } from "lucide-react";
import { BloodBank } from "@/components/BloodBank";
import { AIChatbot } from "@/components/AIChatbot";
import RequestForm from "@/components/RequestForm";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"blood" | "ai">("blood");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log out.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blackish via-deep-navy to-dark-purple relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-gradient-wave bg-[length:200%_200%]" />
      </div>

      {/* App Container */}
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/20 backdrop-blur-md border-b border-border/20 px-4 py-3 hover:bg-card/30 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-neon hover:shadow-neon-glow-intense transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">LifeLink</h1>
              
              {/* Icon Navigation */}
              <div className="hidden md:flex items-center gap-2 ml-8">
                <motion.div
                  className="p-2 rounded-lg bg-card/30 hover:bg-primary/20 transition-all duration-300 cursor-pointer group/icon"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Activity className="w-5 h-5 text-muted-foreground group-hover/icon:text-primary transition-colors" />
                </motion.div>
                <motion.div
                  className="p-2 rounded-lg bg-card/30 hover:bg-secondary/20 transition-all duration-300 cursor-pointer group/icon"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Users className="w-5 h-5 text-muted-foreground group-hover/icon:text-secondary transition-colors" />
                </motion.div>
                <motion.div
                  className="p-2 rounded-lg bg-card/30 hover:bg-accent/20 transition-all duration-300 cursor-pointer group/icon"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5 text-muted-foreground group-hover/icon:text-accent transition-colors" />
                </motion.div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs text-muted-foreground hidden sm:block opacity-70 hover:opacity-100 transition-opacity duration-300">
                <p className="hover:text-foreground transition-colors">Lead: Vasanth</p>
                <p className="hover:text-foreground transition-colors">Team: Dhyanesh, Hemanth, Viswas, Koushik</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground hover:bg-destructive/20 transition-all duration-300 group/logout"
              >
                <LogOut className="w-4 h-4 mr-2 group-hover/logout:rotate-12 transition-transform duration-300" />
                Logout
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Blood Request Form */}
        <div className="bg-muted/20 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <RequestForm />
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "blood" ? (
            <motion.div
              key="blood"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className="hover:brightness-105 transition-all duration-300"
            >
              <BloodBank />
            </motion.div>
          ) : (
            <motion.div
              key="ai"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="hover:brightness-105 transition-all duration-300"
            >
              <AIChatbot />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-border/20 px-4 py-2 z-50 hover:bg-card/95 transition-all duration-300"
        >
          <div className="flex justify-around max-w-md mx-auto">
            <motion.button
              onClick={() => setActiveTab("blood")}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
                activeTab === "blood"
                  ? "bg-primary/20 text-primary shadow-neon"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Droplet className={`w-6 h-6 ${activeTab === "blood" ? "animate-pulse drop-shadow-[0_0_8px_hsl(var(--primary))]" : ""} transition-all duration-300`} />
              <span className="text-xs font-medium">Blood Bank</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("ai")}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
                activeTab === "ai"
                  ? "bg-secondary/20 text-secondary shadow-violet-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/10"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bot className={`w-6 h-6 ${activeTab === "ai" ? "animate-pulse drop-shadow-[0_0_8px_hsl(var(--secondary))]" : ""} transition-all duration-300`} />
              <span className="text-xs font-medium">AI Chatbot</span>
            </motion.button>
          </div>
        </motion.nav>
      </div>
    </div>
  );
};

export default Index;