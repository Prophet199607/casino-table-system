import React from "react";
import { Card, CardContent } from "../ui/Card";
import { THEME } from "../../constants/theme";

interface CasinoCardProps {
  title: string;
  solid: string;
  imageSrc?: string;
  fontSize?: string;
  imgWidth?: string;
  imgHeight?: string;
  cardHeight?: string;
  cardWidth?: string;
  imgPosition?: string;
  fluid?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const CasinoCard: React.FC<CasinoCardProps> = ({
  title,
  solid,
  imageSrc,
  fontSize = "2rem",
  imgWidth = "100px",
  imgHeight = "100px",
  cardHeight = "170px",
  cardWidth = "330px",
  imgPosition = "top-right",
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
      case "top-right":
        return { ...base, top: "1rem", right: "0.5rem" };
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
          background: solid,
          color: THEME.color.text.primary,
          borderRadius: THEME.size.radius.md,
          border: `1px solid ${THEME.color.stroke}`,
          boxShadow: THEME.color.shadow,
          ...dims,
        }}
      >
        <CardContent
          className="flex"
          style={{
            display: "flex",
            alignItems: "flex-end",
            height: "100%",
            position: "relative",
            padding: "1rem",
          }}
        >
          <h3
            className="font-semibold"
            style={{
              fontSize,
              margin: 0,
            }}
          >
            {title}
          </h3>

          {imageSrc && (
            <img
              src={imageSrc}
              alt={title}
              style={{
                ...getImgStyle(),
                filter: "invert(1)",
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
