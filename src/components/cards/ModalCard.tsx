import React from "react";
import { THEME } from "../../constants/theme";

interface ModalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  maxWidth?: string | number;
  height?: string | number;
  padding?: string | number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const ModalCard: React.FC<ModalCardProps> = ({
  width = "100%",
  maxWidth,
  height = "auto",
  padding = THEME.space.lg,
  style,
  children,
  ...props
}) => {
  const parseSize = (value: string | number | undefined) =>
    typeof value === "number" ? `${value}px` : value;

  return (
    <div
      style={{
        width: parseSize(width),
        maxWidth: parseSize(maxWidth),
        height: parseSize(height),
        background: THEME.color.solid.cardL,
        borderRadius: THEME.size.radius.md,
        padding: parseSize(padding),
        boxShadow: THEME.color.shadow,
        display: "flex",
        flexDirection: "column",
        gap: THEME.space.md,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
