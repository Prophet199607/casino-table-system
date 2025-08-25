import React, { useState, useRef } from "react";
import { THEME } from "../../constants/theme";
import { Button } from "../ui/Button";
import { ModalCard } from "../cards/ModalCard";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface TransferModalProps {
  isOpen: boolean;
  onButtonClick: () => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  const layouts = {
    numeric: ["1 2 3", "4 5 6", "7 8 9", "0 clear", "{bksp}"],
  };

  const fieldLabels = [
    "5 M",
    "2.5 M",
    "1 M",
    "500 K",
    "100 K",
    "50 K",
    "10 K",
    "5 K",
    "1 K",
    "500",
    "100",
    "50",
  ];

  const fieldValuesMap: Record<string, number> = {
    "5 M": 5000000,
    "2.5 M": 2500000,
    "1 M": 1000000,
    "500 K": 500000,
    "100 K": 100000,
    "50 K": 50000,
    "10 K": 10000,
    "5 K": 5000,
    "1 K": 1000,
    "500": 500,
    "100": 100,
    "50": 50,
  };

  const [values, setValues] = useState<string[]>(
    Array(fieldLabels.length).fill("")
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  // calculate total
  const total = values.reduce((sum, val, idx) => {
    const multiplier = fieldValuesMap[fieldLabels[idx]];
    const count = parseFloat(val) || 0;
    return sum + count * multiplier;
  }, 0);

  // keyboard press handler
  const handleKeyPress = (button: string) => {
    if (selectedIndex === null) return;

    const currentValue = values[selectedIndex] || "";

    if (button === "{bksp}") {
      handleInputChange(selectedIndex, currentValue.slice(0, -1));
    } else if (button === "clear") {
      handleInputChange(selectedIndex, "");
    } else {
      handleInputChange(selectedIndex, currentValue + button);
    }
  };

  // Arrow navigation
  const moveSelection = (direction: "up" | "down") => {
    if (selectedIndex === null) {
      setSelectedIndex(0);
      inputRefs.current[0]?.focus();
      return;
    }
    let newIndex = direction === "up" ? selectedIndex - 1 : selectedIndex + 1;
    if (newIndex < 0) newIndex = fieldLabels.length - 1;
    if (newIndex >= fieldLabels.length) newIndex = 0;

    setSelectedIndex(newIndex);
    inputRefs.current[newIndex]?.focus();
  };

  const handleExit = () => {
    window.location.href = "/";
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
            font-size: 1.5rem !important;
        }
        `}
      </style>

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
      >
        <ModalCard
          width={THEME.size.frame.w}
          maxWidth="700px"
          height="auto"
          padding={THEME.space.lg}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: THEME.space.lg,
            }}
          >
            {/* Left side: Input fields */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
                flex: 1,
              }}
            >
              {fieldLabels.map((label, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: THEME.font.size.lg,
                    fontWeight: THEME.font.weight.bold,
                    gap: THEME.space.md,
                  }}
                >
                  <label
                    htmlFor={`input-${index}`}
                    style={{
                      width: "80px",
                      textAlign: "right",
                      color: "black",
                    }}
                  >
                    {label}:
                  </label>
                  <input
                    id={`input-${index}`}
                    type="text"
                    value={values[index]}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    onFocus={() => setSelectedIndex(index)}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        e.target.value.replace(/[^\d.]/g, "")
                      )
                    }
                    style={{
                      flex: 1,
                      maxWidth: "200px",
                      height: "45px",
                      padding: THEME.space.sm,
                      borderRadius: THEME.size.radius.sm,
                      border: "1px solid #ccc",
                      color: "black",
                      backgroundColor:
                        selectedIndex === index ? "#d5c0fa" : "white",
                      fontSize: "1.5rem",
                      fontWeight: THEME.font.weight.semibold,
                    }}
                  />
                </div>
              ))}

              {/* Total row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: THEME.font.size.display,
                  fontWeight: THEME.font.weight.bold,
                  gap: THEME.space.md,
                  marginTop: THEME.space.md,
                }}
              >
                <label
                  style={{ width: "80px", textAlign: "right", color: "black" }}
                >
                  Total:
                </label>
                <div
                  style={{
                    flex: 1,
                    color: "black",
                  }}
                >
                  {total.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Middle: Arrow buttons */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: THEME.space.md,
                marginTop: "4rem",
              }}
            >
              <Button
                variant="primary"
                style={{ width: "60px", height: "50px", fontSize: "1.5rem" }}
                onClick={() => moveSelection("up")}
              >
                ↑
              </Button>
              <Button
                variant="primary"
                style={{ width: "60px", height: "50px", fontSize: "1.5rem" }}
                onClick={() => moveSelection("down")}
              >
                ↓
              </Button>
            </div>

            {/* Right side: Keyboard + Select + Exit */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
                minWidth: "250px",
                gap: THEME.space.md,
              }}
            >
              <h2
                style={{
                  color: "black",
                  textAlign: "end",
                  fontSize: "2rem",
                  marginTop: "0",
                  marginBottom: "0",
                }}
              >
                CHIP TRANSFER
              </h2>

              {/* Keyboard */}
              <Keyboard
                layout={layouts}
                layoutName="numeric"
                onKeyPress={handleKeyPress}
                buttonTheme={[
                  {
                    class: "hg-button-black numericKeyboard",
                    buttons: "1 2 3 4 5 6 7 8 9 0 {bksp} clear",
                  },
                ]}
                display={{
                  "{bksp}": "Backspace",
                  clear: "Clear",
                }}
              />

              {/* Select option */}
              <div style={{ marginTop: "1rem" }}>
                <label
                  style={{
                    fontSize: THEME.font.size.lg,
                    fontWeight: THEME.font.weight.bold,
                    color: "black",
                    textAlign: "left",
                    alignSelf: "flex-start",
                  }}
                >
                  Approved
                </label>
                <select
                  defaultValue="Mr Hashitha"
                  style={{
                    width: "100%",
                    padding: THEME.space.sm,
                    borderRadius: THEME.size.radius.sm,
                    border: "1px solid #ccc",
                    fontSize: THEME.font.size.lg,
                    backgroundColor: "#fff",
                    color: "black",
                    marginTop: "0.5rem",
                  }}
                >
                  <option value="Mr Hashitha">Mr Hashitha</option>
                  <option value="Mr Thamalpath">Mr Thamalpath</option>
                  <option value="Mr Pasindu">Mr Pasindu</option>
                </select>
              </div>

              {/* Exit button */}
              <Button
                onClick={handleExit}
                variant="danger"
                style={{
                  alignSelf: "flex-end",
                  marginTop: "100px",
                  width: "100px",
                }}
              >
                Exit
              </Button>
            </div>
          </div>
        </ModalCard>
      </div>
    </>
  );
};
