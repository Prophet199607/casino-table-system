import React from "react";
import type { ButtonHTMLAttributes } from "react";
import { THEME } from "../../constants/theme";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  width,
  height,
  style,
  ...props
}) => {
  // Size mapping for padding
  const sizeMap = {
    sm: `${THEME.space.sm}px ${THEME.space.md}px`,
    md: `${THEME.space.md}px ${THEME.space.lg}px`,
    lg: `${THEME.space.lg}px ${THEME.space.xl}px`,
  };

  // Variant mapping
  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      background: THEME.color.brand.purple,
      color: THEME.color.text.primary,
      border: "none",
    },
    secondary: {
      background: THEME.color.brand.fuchsia,
      color: THEME.color.text.primary,
      border: "none",
    },
    danger: {
      background: THEME.color.brand.danger,
      color: THEME.color.text.primary,
      border: "none",
    },
  };

  return (
    <button
      style={{
        padding: sizeMap[size],
        borderRadius: THEME.size.radius.md,
        fontFamily: THEME.font.family.display,
        fontWeight: THEME.font.weight.semibold,
        fontSize: THEME.font.size.lg,
        cursor: "pointer",
        transition: "all 0.3s ease",
        ...variantStyles[variant],
        width,
        height,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
