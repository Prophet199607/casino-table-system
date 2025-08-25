import React, { useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { THEME } from "../../constants/theme";
import { RefillModal } from "./RefillModal";

interface LoginModalProps {
  title: string;
  imageSrc?: string;
  solid?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  title,
  imageSrc,
  solid,
  onClose,
  onSuccess,
}) => {
  const [input, setInput] = useState("");
  const [layout] = useState<"default" | "numeric">("default");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const layouts = {
    default: [
      "Q W E R T Y U I O P",
      "A S D F G H J K L",
      "Z X C V B N M",
      "{bksp} {space} clear",
    ],
    numeric: ["1 2 3", "4 5 6", "7 8 9", "0"],
  };

  const handleKeyPress = (button: string) => {
    if (button === "{bksp}") {
      setInput((prev) => prev.slice(0, -1));
    } else if (button === "clear") {
      setInput("");
    } else if (button === "{space}") {
      setInput((prev) => prev + " ");
    } else {
      setInput((prev) => prev + button);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const HARDCODED_PASSWORD = "1";
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === HARDCODED_PASSWORD) {
      onSuccess();
    }
  };

  return (
    <>
      <style>
        {`
        .hg-button-black {
            color: black !important;
        }
        .defaultKeyboard {
            height: 60px !important;     
            line-height: 60px !important;
            font-size: 1.2rem !important;
        }
        .numericKeyboard {
            font-size: 1.2rem !important;
        }
        `}
      </style>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        {!showSuccessModal && (
          <form onSubmit={handleLogin}>
            <div
              style={{
                background: THEME.color.solid.cardL,
                padding: "20px",
                borderRadius: "8px",
                width: "800px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  {imageSrc && (
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor: solid,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={imageSrc}
                        alt={title}
                        style={{
                          width: "80%",
                          height: "80%",
                          borderRadius: "50%",
                          filter: "invert(1)",
                        }}
                      />
                    </div>
                  )}
                  <h2 style={{ margin: 0, color: "#0F0E0E" }}>{title} Login</h2>
                </div>

                <input
                  type="text"
                  value={"♠".repeat(input.length)}
                  onChange={handleChange}
                  placeholder="Enter password"
                  style={{
                    padding: "10px",
                    fontSize: "1rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    color: "#0F0E0E",
                    fontFamily: "monospace",
                  }}
                />
              </div>

              <div style={{ display: "flex" }}>
                {/* Default keyboard */}
                <div style={{ flex: 3, height: "265px" }}>
                  <Keyboard
                    layout={layouts}
                    layoutName={layout}
                    onKeyPress={handleKeyPress}
                    buttonTheme={[
                      {
                        class: "hg-button-black defaultKeyboard",
                        buttons:
                          "1 2 3 4 5 6 7 8 9 0 q w e r t y u i o p a s d f g h j k l z x c v b n m Q W E R T Y U I O P A S D F G H J K L Z X C V B N M ! @ # $ % ^ & * ( ) {bksp} {space} clear",
                      },
                    ]}
                    theme="hg-theme-default customKeyboard"
                    display={{
                      "{bksp}": "Backspace",
                      "{space}": "Space",
                      clear: "Clear",
                    }}
                  />
                </div>

                {/* Numeric keyboard */}
                <div style={{ flex: 1 }}>
                  <Keyboard
                    layout={layouts}
                    layoutName="numeric"
                    onKeyPress={handleKeyPress}
                    buttonTheme={[
                      {
                        class: "hg-button-black numericKeyboard",
                        buttons: "1 2 3 4 5 6 7 8 9 0",
                      },
                    ]}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                  gap: "0.5rem",
                }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: THEME.color.solid.cardF,
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    height: "50px",
                    width: "100px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Exit
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: THEME.color.solid.cardD,
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    height: "50px",
                    width: "100px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Success modal */}
        {showSuccessModal && (
          <RefillModal
            isOpen={true}
            onButtonClick={() => setShowSuccessModal(false)}
          />
        )}
      </div>
    </>
  );
};
