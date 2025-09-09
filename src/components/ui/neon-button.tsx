import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "emergency";
  size?: "sm" | "md" | "lg";
}

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-semibold",
          "rounded-xl transition-all duration-300",
          "transform hover:scale-105 active:scale-95",
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-base",
          size === "lg" && "px-8 py-4 text-lg",
          variant === "primary" && [
            "bg-primary text-primary-foreground",
            "shadow-neon hover:shadow-neon-glow-intense",
            "hover:bg-primary/90",
          ],
          variant === "secondary" && [
            "bg-secondary text-secondary-foreground",
            "shadow-violet-glow hover:shadow-violet-glow",
            "hover:bg-secondary/90",
          ],
          variant === "emergency" && [
            "bg-gradient-to-r from-primary to-primary/80",
            "text-primary-foreground animate-pulse-glow",
            "shadow-neon-glow-intense hover:shadow-neon-glow-intense",
          ],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NeonButton.displayName = "NeonButton";

export { NeonButton };