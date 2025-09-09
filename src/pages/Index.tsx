import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet, Bot } from "lucide-react";
import { BloodBank } from "@/components/BloodBank";
import { AIChatbot } from "@/components/AIChatbot";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"blood" | "ai">("blood");

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
          className="bg-card/20 backdrop-blur-md border-b border-border/20 px-4 py-3"
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-xl font-bold text-white">L</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">LifeLink</h1>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>Lead: Vasanth</p>
              <p>Team: Dhyanesh, Hemanth, Viswas, Koushik</p>
            </div>
          </div>
        </motion.header>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "blood" ? (
            <motion.div
              key="blood"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
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
            >
              <AIChatbot />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-border/20 px-4 py-2 z-50"
        >
          <div className="flex justify-around max-w-md mx-auto">
            <button
              onClick={() => setActiveTab("blood")}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
                activeTab === "blood"
                  ? "bg-primary/20 text-primary shadow-neon"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Droplet className={`w-6 h-6 ${activeTab === "blood" && "animate-pulse"}`} />
              <span className="text-xs font-medium">Blood Bank</span>
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
                activeTab === "ai"
                  ? "bg-secondary/20 text-secondary shadow-violet-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Bot className={`w-6 h-6 ${activeTab === "ai" && "animate-pulse"}`} />
              <span className="text-xs font-medium">AI Chatbot</span>
            </button>
          </div>
        </motion.nav>
      </div>
    </div>
  );
};

export default Index;