import React from "react";
import { THEME } from "../constants/theme";
import { ModalCard } from "../components/cards/ModalCard";

type MenuAction =
  | "TV Room Alert"
  | "Dealer Result"
  | "Table Result"
  | "Transfer & Refill Accept"
  | "Chip Details"
  | "Member Summary"
  | "Reset";

interface MenuProps {
  onAction?: (action: MenuAction) => void;
  onClose?: () => void;
}

interface ButtonConfig {
  label: MenuAction;
  imageSrc?: string;
}

export const MenuModal: React.FC<MenuProps> = ({ onAction, onClose }) => {
  const buttonConfigs: ButtonConfig[] = [
    {
      label: "TV Room Alert",
      imageSrc: "/assets/images/alert1.png",
    },
    {
      label: "Dealer Result",
      imageSrc: "/assets/images/dealerresult.png",
    },
    {
      label: "Table Result",
      imageSrc: "/assets/images/table1.png",
    },
    {
      label: "Transfer & Refill Accept",
      imageSrc: "/assets/images/transfer1.png",
    },
    {
      label: "Chip Details",
      imageSrc: "/assets/images/chipdetails.png",
    },
    {
      label: "Member Summary",
      imageSrc: "/assets/images/member.png",
    },
  ];

  const CustomButton: React.FC<ButtonConfig> = ({ label, imageSrc }) => (
    <button
      onClick={() => onAction?.(label)}
      style={{
        width: "270px",
        height: "150px",
        borderRadius: "12px",
        background: "linear-gradient(145deg, #2a40c8, #172c98)",
        fontSize: "1.6rem",
        fontWeight: 600,
        cursor: "pointer",
        padding: "15px",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background =
          "linear-gradient(145deg, #3a50d8, #2a40c8)";
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background =
          "linear-gradient(145deg, #2a40c8, #172c98)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
      }}
    >
      <img
        src={imageSrc}
        alt=""
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          padding: "5px",
          width: "70px",
          height: "70px",
          alignItems: "right",
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
        }}
      />
      <span
        style={{
          textAlign: "center",
          width: "100%",
          marginTop: "auto",
          paddingTop: "10px",
          lineHeight: "1.2",
        }}
      >
        {label}
      </span>
    </button>
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
      }}
    >
      <ModalCard
        width={THEME.size.frame.w}
        maxWidth="900px"
        height="auto"
        padding={0}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: "20px",
            background: "linear-gradient(to bottom, #f8faff, #eef2ff)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              padding: "40px 30px 30px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "25px",
              }}
            >
              {buttonConfigs.map((config, index) => (
                <CustomButton key={index} {...config} />
              ))}
            </div>
          </div>

          <div
            style={{
              padding: "25px",
              background: "rgba(23, 44, 152, 0.05)",
              display: "flex",
              justifyContent: "center",
              gap: "25px",
              borderTop: "1px solid rgba(23, 44, 152, 0.1)",
            }}
          >
            <button
              onClick={() => onAction?.("Reset")}
              style={{
                background: "linear-gradient(145deg, #ff6b6b, #ee5a52)",
                border: "none",
                borderRadius: "10px",
                color: "white",
                padding: "15px 35px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "1.1rem",
                minWidth: "150px",
                boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
              }}
            >
              Reset
            </button>
            <button
              onClick={onClose}
              style={{
                background: "linear-gradient(145deg, #2a40c8, #172c98)",
                border: "none",
                borderRadius: "10px",
                color: "white",
                padding: "15px 35px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "1.1rem",
                minWidth: "150px",
                boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(145deg, #3a50d8, #2a40c8)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(145deg, #2a40c8, #172c98)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
              }}
            >
              Close
            </button>
          </div>
        </div>
      </ModalCard>
    </div>
  );
};

export default MenuModal;
