import React, { useState } from "react";
import { THEME } from "../../constants/theme";
import { ModalCard } from "../cards/ModalCard";

type MenuAction =
  | "TV Room Alert" 
  | "Dealer Result" 
  | "Table Result" 
  | "Rolling Package"
  | "Calculator" 
  | "Transfer & Refill Accept" 
  | "Flush" 
  | "Chip Details"
  | "Member Log Out" 
  | "Member Summary" 
  | "Setup" 
  | "Box Out"
  | "Pack Shuffle" 
  | "Non Cash" 
  | "Rolling Duplicate Copy"
  | "Banker Six Half" 
  | "F & B" 
  | "Chip Detect" 
  | "Restart";

interface MenuProps {
  onAction?: (action: MenuAction) => void;
  onClose?: () => void;
}

export const MenuModal: React.FC<MenuProps> = ({ onAction, onClose }) => {
  const [selectedTable, setSelectedTable] = useState("");

  const NormalButton: React.FC<{ label: MenuAction }> = ({ label }) => (
    <button
      onClick={() => onAction?.(label)}
      style={{
        width: "100%",
        height: 60,
        borderRadius: 8,
        background: "#4a5fc9",
        color: "white",
        fontSize: "0.95rem",
        fontWeight: 600,
        border: "none",
        cursor: "pointer",
        transition: "transform .2s ease, background .2s ease",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#5a70e0";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#4a5fc9";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {label}
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
            borderRadius: 12,
            background: "linear-gradient(135deg, #4a5fc9 0%, #2e3f8f 100%)",
            color: "white",
            border: "1px solid #3a4ba9",
          }}
        >
          <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: 10,
                padding: 15,
                marginBottom: 15,
              }}
            >
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                style={{
                  width: "100%",
                  height: 45,
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(0,0,0,0.2)",
                  color: "white",
                  fontWeight: 600,
                  padding: "0 12px",
                  fontSize: "0.95rem",
                  marginBottom: 15,
                }}
              >
                <option value="" disabled>
                  Select table...
                </option>
                <option value="T01">Casino Main</option>
                <option value="T02">Casino VIP</option>
                <option value="T03">Private Room</option>
              </select>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 12,
                }}
              >
                <NormalButton label="TV Room Alert" />
                <NormalButton label="Dealer Result" />
                <NormalButton label="Table Result" />
                <NormalButton label="Rolling Package" />
                <NormalButton label="Calculator" />
                <NormalButton label="Transfer & Refill Accept" />
                <NormalButton label="Flush" />
                <NormalButton label="Chip Details" />
                <NormalButton label="Member Log Out" />
                <NormalButton label="Member Summary" />
                <NormalButton label="Setup" />
                <NormalButton label="Box Out" />
                <NormalButton label="Pack Shuffle" />
                <NormalButton label="Non Cash" />
                <NormalButton label="Rolling Duplicate Copy" />
                <NormalButton label="Banker Six Half" />
                <NormalButton label="F & B" />
                <NormalButton label="Chip Detect" />
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "12px 20px",
              background: "rgba(0,0,0,0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => onAction?.("Restart")}
              style={{
                background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
                border: "none",
                borderRadius: 6,
                color: "white",
                padding: "10px 20px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.95rem",
                minWidth: 120,
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                transition: "transform .2s ease, opacity .2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Reset
            </button>

            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: 6,
                color: "white",
                padding: "10px 20px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.95rem",
                minWidth: 120,
                backdropFilter: "blur(3px)",
                transition: "transform .2s ease, opacity .2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
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
