import React, { useState } from "react";
import { THEME } from "../../../constants/theme";
import { Button } from "../../../components/ui/Button";
import { ModalCard } from "../../../components/cards/ModalCard";
import { ViewMembers } from "../member/ViewMemers";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface MemberSummaryModalProps {
  onClose: () => void;
}

interface Member {
  id: string;
  name: string;
  photo: string;
}

// Sample members defined here
const sampleMembers = [
  {
    id: "M001",
    name: "John Doe",
    photo:
      "/assets/images/members/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg",
  },
  {
    id: "M002",
    name: "Jane Smith",
    photo: "/assets/images/members/pexels-italo-melo-881954-2379004.jpg",
  },
  {
    id: "M003",
    name: "Alice Johnson",
    photo:
      "/assets/images/members/young-bearded-man-with-striped-shirt_273609-5677.avif",
  },
];

export const MemberSummary: React.FC<MemberSummaryModalProps> = ({
  onClose,
}) => {
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [activeInput, setActiveInput] = useState<"memberId" | "memberName">(
    "memberId"
  );
  const [layout] = useState<"default" | "numeric">("default");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [memberPhoto, setMemberPhoto] = useState<string>("");

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
    const setter = activeInput === "memberId" ? setMemberId : setMemberName;

    if (button === "{bksp}") {
      setter((prev) => prev.slice(0, -1));
    } else if (button === "clear") {
      setter("");
    } else if (button === "{space}") {
      setter((prev) => prev + " ");
    } else {
      setter((prev) => prev + button);
    }
  };

  const handleSelectMember = (member: Member) => {
    setMemberId(member.id);
    setMemberName(member.name);
    setMemberPhoto(member.photo);
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
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1001,
        }}
        onClick={onClose}
      >
        <ModalCard
          width={THEME.size.frame.w}
          maxWidth="750px"
          height="650px"
          padding={THEME.space.lg}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2
              style={{
                color: "black",
                textAlign: "left",
                fontSize: THEME.font.size.heading,
                marginTop: "0",
                marginBottom: "0",
              }}
            >
              SUMMARY
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "flex-start",
            }}
          >
            {/* Image Box */}
            <div
              style={{
                width: "160px",
                height: "160px",
                border: "2px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                color: "#888",
              }}
            >
              {memberPhoto ? (
                <img
                  src={memberPhoto}
                  alt={memberName}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                "Image"
              )}
            </div>

            {/* Right side: input fields */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                flex: 1,
              }}
            >
              {/* First Row: Member ID and Member Name */}
              <div style={{ display: "flex", gap: "15px" }}>
                {/* Member ID */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "150px",
                  }}
                >
                  <label
                    style={{
                      fontWeight: "bold",
                      color: "#444",
                      marginBottom: "6px",
                      fontSize: THEME.font.size.lg,
                    }}
                  >
                    Member ID
                  </label>
                  <input
                    type="text"
                    value={memberId}
                    onFocus={() => setActiveInput("memberId")}
                    onChange={(e) => setMemberId(e.target.value)}
                    placeholder="Enter Member ID"
                    style={{
                      padding: "8px",
                      fontSize: THEME.font.size.display,
                      fontWeight: THEME.font.weight.bold,
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      color: "#0F0E0E",
                      fontFamily: "monospace",
                    }}
                  />
                </div>

                {/* Member Name */}
                <div
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                >
                  <label
                    style={{
                      fontWeight: "bold",
                      color: "#444",
                      marginBottom: "6px",
                      fontSize: THEME.font.size.lg,
                    }}
                  >
                    Member Name
                  </label>
                  <input
                    type="text"
                    value={memberName}
                    onFocus={() => setActiveInput("memberName")}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="Enter Member Name"
                    style={{
                      padding: "8px",
                      fontSize: THEME.font.size.display,
                      fontWeight: THEME.font.weight.bold,
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      color: "#0F0E0E",
                      fontFamily: "monospace",
                      width: "auto",
                    }}
                  />
                </div>
              </div>

              {/* Buttons Row */}
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <Button
                  onClick={() => {}}
                  variant="success"
                  style={{ padding: "12px 30px", fontSize: THEME.font.size.lg }}
                >
                  Add Member
                </Button>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                  style={{ padding: "12px 30px", fontSize: THEME.font.size.lg }}
                >
                  Find
                </Button>
              </div>
            </div>
          </div>

          {/* Keyboards */}
          <div style={{ display: "flex", marginTop: "15px" }}>
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
              justifyContent: "end",
              gap: "15px",
            }}
          >
            <Button
              onClick={() => {}}
              variant="success"
              style={{
                padding: "12px 30px",
                fontSize: THEME.font.size.lg,
              }}
            >
              Confirm
            </Button>
            <Button
              onClick={onClose}
              variant="danger"
              style={{
                padding: "12px 30px",
                fontSize: THEME.font.size.lg,
              }}
            >
              Exit
            </Button>
          </div>
        </ModalCard>
      </div>

      {/* ViewMembers Modal */}
      {isModalOpen && (
        <ViewMembers
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          members={sampleMembers}
          onSelectMember={handleSelectMember}
        />
      )}
    </>
  );
};
