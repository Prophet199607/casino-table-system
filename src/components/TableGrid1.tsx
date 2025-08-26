import React, { useState } from "react";
import { CasinoCard } from "./cards/CasinoCard1";
import { THEME } from "../constants/theme";
import { LayoutGrid, GridItem } from "./layout/LayoutGrid";
import { LoginModal } from "./modal/LoginModal";
import { RefillModal } from "./modal/RefillModal";
import { TransferModal } from "./modal/TransferModal";
import { MenuModal } from "./modal/MenuModal";

export const TableGrid: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");
  const [activeImageSrc, setActiveImageSrc] = useState("");
  const [activeBackground, setActiveBackground] = useState("");
  const [showModalAfterLogin, setShowModalAfterLogin] = useState<string | null>(
    null
  );
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);


  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const handleOpenModal = (title: string, imageSrc: string, solid?: string) => {
    const supervisorGroup = [
      "Supervisor",
      "Refill",
      "Chip Filling",
      "Chip Count",
      "Transfer",
    ];

    const modalTitle = supervisorGroup.includes(title) ? "Supervisor" : title;

    setPendingAction(title);
    setActiveTitle(modalTitle);
    setActiveImageSrc(imageSrc);
    setActiveBackground(solid || "");
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
    setActiveTitle("");
  };

  const handleLoginSuccess = () => {
    setShowModalAfterLogin(pendingAction);
    setPendingAction(null);
    setIsLoginModalOpen(false);
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
                onClick={() =>
                  handleOpenModal(
                    "Dealer",
                    "/assets/images/dealer1.png",
                    THEME.color.solid.cardA
                  )
                }
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
                onClick={() =>
                  handleOpenModal(
                    "Watchman",
                    "/assets/images/watchman1.png",
                    THEME.color.solid.cardB
                  )
                }
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
                onClick={() =>
                  handleOpenModal(
                    "Supervisor",
                    "/assets/images/casino-manager.png",
                    THEME.color.solid.cardC
                  )
                }
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
                onClick={() =>
                  handleOpenModal(
                    "Refill",
                    "/assets/images/poker-chips1.png",
                    THEME.color.solid.cardE
                  )
                }
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
                onClick={() =>
                  handleOpenModal(
                    "Filling",
                    "/assets/images/poker-chips.png",
                    THEME.color.solid.cardG
                  )
                }
              >
                <CasinoCard
                  title="Filling"
                  solid={THEME.color.solid.cardG}
                  imageSrc="/assets/images/poker-chips.png"
                  fontSize="2.1rem"
                  imgWidth="70px"
                  imgHeight="70px"
                  imgPosition="top-right"
                  fluid
                />
              </button>
            </GridItem>
            <GridItem wPx={200}>
              <button
                style={{ width: "100%" }}
                onClick={() =>
                  handleOpenModal(
                    "Count",
                    "/assets/images/casino-chip.png",
                    THEME.color.solid.cardI
                  )
                }
              >
                <CasinoCard
                  title="Count"
                  solid={THEME.color.solid.cardI}
                  imageSrc="/assets/images/casino-chip.png"
                  fontSize="2.1rem"
                  imgWidth="60px"
                  imgHeight="60px"
                  imgPosition="top-right"
                  fluid
                />
              </button>
            </GridItem>
            <GridItem wPx={250}>
              <button
                style={{ width: "100%" }}
                onClick={() =>
                  handleOpenModal(
                    "Transfer",
                    "/assets/images/casino-chip1.png",
                    THEME.color.solid.cardD
                  )
                }
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
            rowHeight={25}
            gap={30}
            dense
            style={{ height: "100%" }}
          >
            <GridItem hPx={35}>
              <button
                style={{ width: "100%" }}
                onClick={() =>
                  handleOpenModal(
                    "Member",
                    THEME.color.solid.cardH
                  )
                }
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
                onClick={() => setIsMenuModalOpen(true)}
                
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

            <GridItem hPx={150}>
              <div
                style={{
                  marginTop: "20px",
                  padding: "6px",
                  color: THEME.color.text.primary,
                  fontSize: "1.2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "50px",
                    marginBottom: "6px",
                  }}
                >
                  <span>Dealer</span>
                  <span>XXXX</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "16px",
                    marginBottom: "6px",
                  }}
                >
                  <span>Watchman</span>
                  <span>XXXX</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "15px",
                    marginBottom: "6px",
                  }}
                >
                  <span>Supervisor</span>
                  <span>XXXX</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "54px",
                    marginBottom: "6px",
                  }}
                >
                  <span>Count</span>
                  <span>XXXX</span>
                </div>
              </div>
            </GridItem>
          </LayoutGrid>
        </div>

        {/* Login modal */}
        {isLoginModalOpen && (
          <LoginModal
            title={activeTitle}
            imageSrc={activeImageSrc}
            solid={activeBackground}
            onClose={handleCloseModal}
            onSuccess={handleLoginSuccess} // 👈 NEW
          />
        )}

        {/* Conditional rendering of modals after login */}
        {showModalAfterLogin === "Refill" && (
          <RefillModal
            isOpen={true}
            onButtonClick={() => setShowModalAfterLogin(null)}
          />
        )}

        {showModalAfterLogin === "Transfer" && (
          <TransferModal
            isOpen={true}
            onButtonClick={() => setShowModalAfterLogin(null)}
          />
        )}

        {isMenuModalOpen && (
          <MenuModal onClose={() => setIsMenuModalOpen(false)} />
        )}
      </div>
    </>
  );
};
