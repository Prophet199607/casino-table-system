import React from "react";
import { Card, CardContent } from "../ui/Card";
import { THEME } from "../../constants/theme";

interface CasinoCardProps {
  title: string;
  gradient: string;
  imageSrc?: string;
  fontSize?: string;
  imgWidth?: string;
  imgHeight?: string;
  cardHeight?: string;
  cardWidth?: string;
  imgPosition?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "right-center"
    | "center";
  fluid?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const CasinoCard: React.FC<CasinoCardProps> = ({
  title,
  gradient,
  imageSrc,
  fontSize = "2rem",
  imgWidth = "100px",
  imgHeight = "100px",
  cardHeight = "170px",
  cardWidth = "330px",
  imgPosition = "center",
  fluid = true,
  className,
  style,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const getImgStyle = () => {
    const base: React.CSSProperties = {
      width: imgWidth,
      height: imgHeight,
      objectFit: "contain",
      position: "absolute",
      pointerEvents: "none",
    };

    switch (imgPosition) {
      case "bottom-left":
        return { ...base, bottom: "0.5rem", left: "0.5rem" };
      case "bottom-right":
        return { ...base, bottom: "-1rem", right: "0.5rem" };
      case "top-right":
        return { ...base, top: "1rem", right: "-0.5rem" };
      case "top-left":
        return { ...base, top: "0.5rem", left: "0.5rem" };
      case "right-center":
        return {
          ...base,
          top: "50%",
          right: "1rem",
          transform: "translateY(-50%)",
        };
      case "center":
      default:
        return {
          ...base,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        };
    }
  };

  const dims: React.CSSProperties = fluid
    ? { width: "100%", height: "100%" }
    : { width: cardWidth, height: cardHeight };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.2s ease-out",
        position: "relative",
        height: cardHeight,
        ...style,
      }}
      className={className}
    >
      <Card
        className="shadow-xl overflow-hidden relative"
        style={{
          background: gradient,
          color: THEME.color.text.primary,
          borderRadius: THEME.size.radius.xl,
          border: `1px solid ${THEME.color.stroke}`,
          boxShadow: THEME.color.shadow,
          ...dims,
        }}
      >
        <CardContent className="p-2 h-full flex justify-start relative">
          <h3
            className="font-semibold"
            style={{
              fontSize,
              zIndex: 10,
            }}
          >
            {title}
          </h3>

          {imageSrc && <img src={imageSrc} alt={title} style={getImgStyle()} />}
        </CardContent>
      </Card>
    </div>
  );
};
