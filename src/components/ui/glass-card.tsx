import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "neon" | "emergency";
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-2xl backdrop-blur-md",
          "bg-card/40 border border-white/10",
          "shadow-card transition-all duration-300",
          variant === "neon" && "hover:shadow-violet-glow hover:border-secondary/30",
          variant === "emergency" && "border-primary/30 shadow-neon animate-pulse-glow",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };