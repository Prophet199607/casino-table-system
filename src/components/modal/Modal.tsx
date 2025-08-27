import React from "react";
import { THEME } from "../../constants/theme";
import { Button } from "../ui/Button";
import { ModalCard } from "../cards/ModalCard";

interface ModalProps {
  isOpen: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  title: string;
  style?: React.CSSProperties;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
      onClick={onCancel}
    >
      <ModalCard
        width={THEME.size.frame.w}
        maxWidth="500px"
        height="auto"
        padding={THEME.space.lg}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: THEME.font.size.display,
            fontWeight: THEME.font.weight.bold,
            marginBottom: THEME.space.md,
            color: "black",
          }}
        >
          {title}
        </h2>
        <div
          style={{
            display: "flex",
            gap: THEME.space.sm,
            marginTop: THEME.space.md,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="primary"
            width="75%"
            height="80px"
            style={{ fontSize: "2rem" }}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
          <Button
            variant="success"
            width="75%"
            height="80px"
            style={{ fontSize: "2rem" }}
            onClick={onCancel}
          >
            {cancelText}
          </Button>
        </div>
      </ModalCard>
    </div>
  );
};
