import React, { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/modal/Modal";
import { ModalCard } from "../../../components";
import { THEME } from "../../../constants/theme";

// Type for a member
interface Member {
  id: string;
  name: string;
  photo: string;
}

// Props type for modal
interface ViewMembersProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
  onSelectMember: (member: Member) => void;
}

// Modal Component
export const ViewMembers: React.FC<ViewMembersProps> = ({
  isOpen,
  onClose,
  members,
  onSelectMember,
}) => {
  if (!isOpen) return null;

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);

  const moveSelection = (direction: "up" | "down") => {
    setSelectedIndex((prev) => {
      if (direction === "up") return prev > 0 ? prev - 1 : prev;
      if (direction === "down")
        return prev < members.length - 1 ? prev + 1 : prev;
      return prev;
    });
  };

  const handleRowClick = (index: number) => {
    setSelectedIndex(index);
    setConfirmVisible(true);
  };

  const handleConfirm = () => {
    onSelectMember(members[selectedIndex]);
    setConfirmVisible(false);
    onClose();
  };

  return (
    <>
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
          <h2
            style={{
              color: "black",
              textAlign: "center",
              fontSize: THEME.font.size.heading,
              marginTop: "0",
              marginBottom: "0",
            }}
          >
            VIEW MEMBERS
          </h2>

          <div
            style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}
          >
            {/* Scrollable Table */}
            <div
              style={{
                minHeight: "480px",
                overflowY: "auto",
                border: "1px solid #ccc",
                borderRadius: "6px",
                flex: 1,
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  color: "black",
                }}
              >
                <tbody>
                  {members.map((member: Member, index: number) => (
                    <tr
                      key={member.id}
                      style={{
                        fontSize: THEME.font.size.heading,
                        fontWeight: THEME.font.weight.bold,
                        backgroundColor:
                          index === selectedIndex
                            ? "#c9c2ff"
                            : index % 2 === 0
                            ? "#ffffff"
                            : "#f9f9f9",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                      }}
                      onClick={() => handleRowClick(index)}
                      onMouseEnter={(e) => {
                        if (index !== selectedIndex)
                          e.currentTarget.style.backgroundColor = "#e6e3fc";
                      }}
                      onMouseLeave={(e) => {
                        if (index !== selectedIndex)
                          e.currentTarget.style.backgroundColor =
                            index % 2 === 0 ? "#ffffff" : "#f9f9f9";
                      }}
                    >
                      <td
                        style={{
                          padding: "5px",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        {member.id}
                      </td>
                      <td
                        style={{
                          padding: "5px",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        {member.name}
                      </td>
                      <td
                        style={{
                          padding: "5px",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <img
                          src={member.photo}
                          alt={member.name}
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "4px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Arrow Buttons */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
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
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "15px",
            }}
          >
            <Button
              variant="danger"
              onClick={onClose}
              style={{ marginTop: "20px", padding: "10px 20px" }}
            >
              Close
            </Button>
          </div>
        </ModalCard>
      </div>

      {/* Confirmation Modal */}
      {confirmVisible && (
        <Modal
          title="Add This Member?"
          isOpen={confirmVisible}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmVisible(false)}
          confirmText="Yes"
          cancelText="No"
        />
      )}
    </>
  );
};
