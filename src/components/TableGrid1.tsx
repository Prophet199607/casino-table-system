import React from "react";
import { CasinoCard } from "./cards/CasinoCard";
import { THEME } from "../constants/theme";
import { LayoutGrid, GridItem } from "./layout/LayoutGrid";

export const TableGrid: React.FC = () => (
  <div style={{ display: "flex", gap: 12, padding: 12, height: "580px" }}>
    <div style={{ flex: 3, minWidth: 0 }}>
      <LayoutGrid
        cols={10}
        rowHeight={180}
        gap={1}
        dense
        style={{ height: "600px" }}
      >
        {/* First Row */}
        <GridItem wPx={330}>
          <button style={{ width: "100%" }}>
            <CasinoCard
              title="Dealer"
              gradient={THEME.color.gradient.cardA}
              imageSrc="/assets/images/dealer.png"
              fontSize="2.4rem"
              imgWidth="150px"
              imgHeight="165px"
              imgPosition="top-right"
              fluid
            />
          </button>
        </GridItem>
        <GridItem wPx={330}>
          <button style={{ width: "100%" }}>
            <CasinoCard
              title="Watchman"
              gradient={THEME.color.gradient.cardB}
              imageSrc="/assets/images/watchman.png"
              fontSize="2.4rem"
              imgWidth="140px"
              imgHeight="200px"
              imgPosition="top-right"
              fluid
            />
          </button>
        </GridItem>

        {/* Second Row */}
        <GridItem wPx={400}>
          <button style={{ width: "100%" }}>
            <CasinoCard
              title="Supervisor"
              gradient={THEME.color.gradient.cardD}
              imageSrc="/assets/images/supervisor.png"
              fontSize="2.2rem"
              imgWidth="160px"
              imgHeight="180px"
              imgPosition="top-right"
              fluid
            />
          </button>
        </GridItem>
        <GridItem wPx={250}>
          <button style={{ width: "100%" }}>
            <CasinoCard
              title="Refill"
              gradient={THEME.color.gradient.cardH}
              imageSrc="/assets/images/refill.png"
              fontSize="2.2rem"
              imgWidth="120px"
              imgHeight="140px"
              imgPosition="bottom-right"
              fluid
            />
          </button>
        </GridItem>

        {/* Third Row */}
        <GridItem wPx={200}>
          <button style={{ width: "100%" }}>
            <CasinoCard
              title="Chip Filling"
              gradient={THEME.color.gradient.cardB}
              imageSrc="/assets/images/chip-filling.png"
              fontSize="2.2rem"
              imgWidth="70px"
              imgHeight="100px"
              imgPosition="bottom-right"
              fluid
            />
          </button>
        </GridItem>
        <GridItem wPx={200}>
          <button style={{ width: "100%" }}>
            <CasinoCard
              title="Chip Count"
              gradient={THEME.color.gradient.cardA}
              imageSrc="/assets/images/chipcount.png"
              fontSize="2.2rem"
              imgWidth="70px"
              imgHeight="100px"
              imgPosition="bottom-right"
              fluid
            />
          </button>
        </GridItem>
        <GridItem wPx={250}>
          <button style={{ width: "100%" }}>
            <CasinoCard
              title="Transfer"
              gradient={THEME.color.gradient.cardF}
              imageSrc="/assets/images/transfer.png"
              fontSize="2.2rem"
              imgWidth="110px"
              imgHeight="85px"
              imgPosition="bottom-right"
              fluid
            />
          </button>
        </GridItem>
      </LayoutGrid>
    </div>

    {/* Right side */}
    <div style={{ flex: 1, minWidth: 0 }}>
      <LayoutGrid
        cols={1}
        rowHeight={30}
        gap={40}
        dense
        style={{ height: "100%" }}
      >
        <GridItem hPx={30}>
          <button style={{ width: "100%" }}>
            <CasinoCard
              title="Member"
              gradient={THEME.color.gradient.cardA}
              imageSrc="/assets/images/member.png"
              fontSize="1.2rem"
              imgWidth="80px"
              imgHeight="80px"
              imgPosition="right-center"
              fluid
              cardHeight="60px"
            />
          </button>
        </GridItem>

        <GridItem hPx={30}>
          <button style={{ width: "100%" }}>
            <CasinoCard
              title="Non - Member"
              gradient={THEME.color.gradient.cardH}
              imageSrc="/assets/images/non-member.png"
              fontSize="1rem"
              imgWidth="75px"
              imgHeight="100px"
              imgPosition="bottom-right"
              fluid
              cardHeight="60px"
            />
          </button>
        </GridItem>

        <GridItem hPx={50}>
          <button style={{ width: "100%" }}>
            <CasinoCard
              title="Setting"
              gradient={THEME.color.gradient.cardF}
              imageSrc="/assets/images/setting.png"
              fontSize="1.2rem"
              imgWidth="55px"
              imgHeight="135px"
              imgPosition="bottom-right"
              fluid
              cardHeight="60px"
            />
          </button>
        </GridItem>

        <GridItem hPx={30}>
          <button style={{ width: "100%" }}>
            <CasinoCard
              title="Table Close"
              gradient={THEME.color.gradient.glass}
              imageSrc="/assets/images/close1.png"
              fontSize="1.2rem"
              imgWidth="55px"
              imgHeight="135px"
              imgPosition="bottom-right"
              fluid
              cardHeight="60px"
            />
          </button>
        </GridItem>

        <GridItem hPx={50}>
          <button style={{ width: "100%" }}>
            <CasinoCard
              title="Minimize"
              gradient={THEME.color.gradient.glass}
              imageSrc="/assets/images/minimize.png"
              fontSize="1.2rem"
              imgWidth="35px"
              imgHeight="135px"
              imgPosition="bottom-right"
              fluid
              cardHeight="60px"
            />
          </button>
        </GridItem>
      </LayoutGrid>
    </div>
  </div>
);
