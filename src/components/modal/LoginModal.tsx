import React, { useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { THEME } from "../../constants/theme";

interface LoginModalProps {
  title: string;
  onClose: () => void;
  onLogin: (value: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  title,
  onClose,
  onLogin,
}) => {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState<"default" | "numeric" | "shift">(
    "default"
  );

  const layouts = {
    default: [
      "1 2 3 4 5 6 7 8 9 0",
      "q w e r t y u i o p",
      "a s d f g h j k l",
      "z x c v b n m",
      "{shift} {bksp}",
    ],
    shift: [
      "! @ # $ % ^ & * ( )",
      "Q W E R T Y U I O P",
      "A S D F G H J K L",
      "Z X C V B N M",
      "{shift} {bksp}",
    ],
    numeric: ["1 2 3", "4 5 6", "7 8 9", "0"],
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleKeyPress = (button: string) => {
    if (button === "{shift}") {
      setLayout((prev) => (prev === "default" ? "shift" : "default"));
    }
    if (button === "{bksp}") {
      setInput((prev) => prev.slice(0, -1));
    }
  };

  return (
    <>
      <style>
        {`
        .hg-button-black {
            color: black !important;
        }
        .customKeyboard {
            height: 100%;
            }
        .customKeyboard .hg-rows {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
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
          <h2 style={{ margin: 0, color: "#0F0E0E" }}>{title} Login</h2>

          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter password"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "#0F0E0E",
            }}
          />

          <div style={{ display: "flex" }}>
            {/* Default keyboard */}
            <div style={{ flex: 3, height: "265px" }}>
              <Keyboard
                layout={layouts}
                layoutName={layout}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                buttonTheme={[
                  {
                    class: "hg-button-black defaultKeyboard",
                    buttons:
                      "1 2 3 4 5 6 7 8 9 0 q w e r t y u i o p a s d f g h j k l z x c v b n m Q W E R T Y U I O P A S D F G H J K L Z X C V B N M ! @ # $ % ^ & * ( ) {bksp} {shift}",
                  },
                ]}
                theme="hg-theme-default customKeyboard"
              />
            </div>

            {/* Numeric keyboard */}
            <div style={{ flex: 1 }}>
              <Keyboard
                layout={layouts}
                layoutName="numeric"
                onChange={handleInputChange}
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
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <button
              onClick={() => onLogin(input)}
              style={{
                flex: 1,
                marginRight: "0.5rem",
                padding: "10px",
                backgroundColor: THEME.color.solid.cardD,
                color: "#fff",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Login
            </button>
            <button
              onClick={() => setInput("")}
              style={{
                flex: 1,
                marginRight: "0.5rem",
                padding: "10px",
                backgroundColor: THEME.color.solid.cardC,
                color: "#000",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Clear
            </button>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: THEME.color.solid.cardF,
                color: "#fff",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
