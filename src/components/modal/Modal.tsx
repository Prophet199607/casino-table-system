import React from "react";
import { THEME } from "../../constants/theme";
import { Button } from "../ui/Button";
import { ModalCard } from "../cards/ModalCard";

interface ModalProps {
  isOpen: boolean;
  onButtonClick?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onButtonClick,
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
        zIndex: 1000,
      }}
      onClick={onButtonClick}
    >
      <ModalCard
        width={THEME.size.frame.w}
        maxWidth="500px"
        height="auto"
        padding={THEME.space.lg}
        onClick={(e) => e.stopPropagation()}
      >
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
            height="150px"
            style={{ fontSize: "2rem" }}
            onClick={onButtonClick}
          >
            {confirmText}
          </Button>
          <Button
            variant="secondary"
            width="75%"
            height="150px"
            style={{ fontSize: "2rem" }}
            onClick={onButtonClick}
          >
            {cancelText}
          </Button>
        </div>
      </ModalCard>
    </div>
  );
};
