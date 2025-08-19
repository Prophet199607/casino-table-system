import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, style, ...props }, ref) => {
    const combinedClassName = `rounded-lg border bg-card text-card-foreground shadow-sm ${className}`.trim();
    
    return (
      <div
        ref={ref}
        className={combinedClassName}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = "", children, ...props }, ref) => {
    const combinedClassName = `p-6 pt-0 ${className}`.trim();
    
    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
);
CardContent.displayName = "CardContent";