import React, { useState } from "react";
import { CasinoCard } from "./cards/CasinoCard1";
import { THEME } from "../constants/theme";
import { LayoutGrid, GridItem } from "./layout/LayoutGrid";
import { LoginModal } from "./modal/LoginModal";

export const TableGrid: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");

  const handleOpenModal = (title: string) => {
    setActiveTitle(title);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveTitle("");
  };

  const handleLogin = (value: string) => {
    alert(`Login with: ${value}`);
    handleCloseModal();
  };

  return (
    <>
      <div style={{ display: "flex", gap: 12, padding: 12, height: "580px" }}>
        <div style={{ flex: 3, minWidth: 0 }}>
          <LayoutGrid
            cols={10}
            rowHeight={180}
            gap={1}
            dense
            style={{ height: "600px" }}
          >
            <GridItem wPx={330}>
              <button
                style={{ width: "100%" }}
                onClick={() => handleOpenModal("Dealer")}
              >
                <CasinoCard
                  title="Dealer"
                  solid={THEME.color.solid.cardA}
                  imageSrc="/assets/images/dealer1.png"
                  fontSize="2.5rem"
                  imgWidth="80px"
                  imgHeight="80px"
                  imgPosition="top-right"
                  fluid
                />
              </button>
            </GridItem>
            <GridItem wPx={330}>
              <button
                style={{ width: "100%" }}
                onClick={() => handleOpenModal("Watchman")}
              >
                <CasinoCard
                  title="Watchman"
                  solid={THEME.color.solid.cardB}
                  imageSrc="/assets/images/watchman1.png"
                  fontSize="2.5rem"
                  imgWidth="80px"
                  imgHeight="80px"
                  imgPosition="top-right"
                  fluid
                />
              </button>
            </GridItem>
            <GridItem wPx={400}>
              <button
                style={{ width: "100%" }}
                onClick={() => handleOpenModal("Supervisor")}
              >
                <CasinoCard
                  title="Supervisor"
                  solid={THEME.color.solid.cardC}
                  imageSrc="/assets/images/casino-manager.png"
                  fontSize="2.5rem"
                  imgWidth="80px"
                  imgHeight="80px"
                  imgPosition="top-right"
                  fluid
                />
              </button>
            </GridItem>
            <GridItem wPx={250}>
              <button
                style={{ width: "100%" }}
                onClick={() => handleOpenModal("Refill")}
              >
                <CasinoCard
                  title="Refill"
                  solid={THEME.color.solid.cardE}
                  imageSrc="/assets/images/poker-chips1.png"
                  fontSize="2.5rem"
                  imgWidth="80px"
                  imgHeight="80px"
                  imgPosition="top-right"
                  fluid
                />
              </button>
            </GridItem>
            <GridItem wPx={200}>
              <button
                style={{ width: "100%" }}
                onClick={() => handleOpenModal("Chip Filling")}
              >
                <CasinoCard
                  title="Chip Filling"
                  solid={THEME.color.solid.cardG}
                  imageSrc="/assets/images/poker-chips.png"
                  fontSize="2.1rem"
                  imgWidth="60px"
                  imgHeight="90px"
                  imgPosition="top-right"
                  fluid
                />
              </button>
            </GridItem>
            <GridItem wPx={200}>
              <button
                style={{ width: "100%" }}
                onClick={() => handleOpenModal("Chip Count")}
              >
                <CasinoCard
                  title="Chip Count"
                  solid={THEME.color.solid.cardI}
                  imageSrc="/assets/images/casino-chip.png"
                  fontSize="2.1rem"
                  imgWidth="50px"
                  imgHeight="90px"
                  imgPosition="top-right"
                  fluid
                />
              </button>
            </GridItem>
            <GridItem wPx={250}>
              <button
                style={{ width: "100%" }}
                onClick={() => handleOpenModal("Transfer")}
              >
                <CasinoCard
                  title="Transfer"
                  solid={THEME.color.solid.cardD}
                  imageSrc="/assets/images/casino-chip1.png"
                  fontSize="2.5rem"
                  imgWidth="70px"
                  imgHeight="100px"
                  imgPosition="top-right"
                  fluid
                />
              </button>
            </GridItem>
          </LayoutGrid>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <LayoutGrid
            cols={1}
            rowHeight={28}
            gap={30}
            dense
            style={{ height: "100%" }}
          >
            <GridItem hPx={35}>
              <button
                style={{ width: "100%" }}
                onClick={() => handleOpenModal("Member")}
              >
                <CasinoCard
                  title="Member"
                  solid={THEME.color.solid.cardH}
                  imageSrc="/assets/images/member1.png"
                  fontSize="1.5rem"
                  imgWidth="50px"
                  imgHeight="50px"
                  imgPosition="top-right"
                  fluid
                  cardHeight="100px"
                />
              </button>
            </GridItem>
            <GridItem hPx={35}>
              <button
                style={{ width: "100%" }}
                onClick={() => handleOpenModal("Setting")}
              >
                <CasinoCard
                  title="Setting"
                  solid={THEME.color.solid.cardJ}
                  imageSrc="/assets/images/settings1.png"
                  fontSize="1.5rem"
                  imgWidth="45px"
                  imgHeight="45px"
                  imgPosition="top-right"
                  fluid
                  cardHeight="100px"
                />
              </button>
            </GridItem>
            <GridItem hPx={35}>
              <button style={{ width: "100%" }}>
                <CasinoCard
                  title="Table Close"
                  solid={THEME.color.solid.cardF}
                  imageSrc="/assets/images/close2.png"
                  fontSize="1.5rem"
                  imgWidth="45px"
                  imgHeight="45px"
                  imgPosition="top-right"
                  fluid
                  cardHeight="100px"
                />
              </button>
            </GridItem>

            <GridItem hPx={100}>
              <div
                style={{
                  marginTop: "20px",
                  border: "2px solid white",
                  borderRadius: "8px",
                  padding: "12px",
                  color: THEME.color.text.primary,
                  background: THEME.color.solid.glass,
                  fontSize: "0.9rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <span>Dealer</span>
                  <span>XXXX</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <span>Watchman</span>
                  <span>XXXX</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <span>Supervisor</span>
                  <span>XXXX</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <span>Count</span>
                  <span>XXXX</span>
                </div>
                <div
                  style={{
                    marginTop: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Table No
                </div>
              </div>
            </GridItem>
          </LayoutGrid>
        </div>

        {isModalOpen && (
          <LoginModal
            title={activeTitle}
            onClose={handleCloseModal}
            onLogin={handleLogin}
          />
        )}
      </div>
    </>
  );
};
