import { CasinoCard } from "../cards/CasinoCard";
import { THEME } from "../../constants/theme";

export const TableGrid = () => (
  <div className="flex gap-4 p-3 h-full">
    <div className="flex-1" style={{ flex: "3" }}>
      <div className="grid grid-cols-12 gap-3 h-full">
        <button className="col-span-6">
          <CasinoCard
            title="Dealer"
            gradient={THEME.color.gradient.cardA}
            imageSrc="/assets/images/dealer.png"
            fontSize="2.4rem"
            imgWidth="150px"
            imgHeight="165px"
            imgPosition="top-right"
          />
        </button>
        <button className="col-span-6">
          <CasinoCard
            title="Watchman"
            gradient={THEME.color.gradient.cardB}
            imageSrc="/assets/images/watchman.png"
            fontSize="2.4rem"
            imgWidth="140px"
            imgHeight="200px"
            imgPosition="top-right"
          />
        </button>

        <button className="col-span-4">
          <CasinoCard
            title="Chip Filling"
            gradient={THEME.color.gradient.cardB}
            imageSrc="/assets/images/chip-filling.png"
            fontSize="2.2rem"
            imgWidth="80px"
            imgHeight="80px"
            imgPosition="bottom-right"
          />
        </button>
        <button className="col-span-4">
          <CasinoCard
            title="Chip Count"
            gradient={THEME.color.gradient.cardA}
            imageSrc="/assets/images/chipcount.png"
            fontSize="2.2rem"
            imgWidth="80px"
            imgHeight="80px"
            imgPosition="bottom-right"
          />
        </button>
        <button className="col-span-4">
          <CasinoCard
            title="Refill"
            gradient={THEME.color.gradient.cardD}
            imageSrc="/assets/images/refill.png"
            fontSize="2.2rem"
            imgPosition="bottom-right"
          />
        </button>

        <button className="col-span-6">
          <CasinoCard
            title="Supervisor"
            gradient={THEME.color.gradient.cardD}
            imageSrc="/assets/images/supervisor.png"
            fontSize="2.2rem"
            imgWidth="130px"
            imgHeight="220px"
            imgPosition="top-right"
          />
        </button>
        <button className="col-span-6">
          <CasinoCard
            title="Transfer"
            gradient={THEME.color.gradient.cardA}
            imageSrc="/assets/images/transfer.png"
            fontSize="2.2rem"
            imgWidth="130px"
            imgHeight="110px"
            imgPosition="bottom-right"
          />
        </button>
      </div>
    </div>

    <div className="flex-1" style={{ flex: "1" }}>
      <div className="flex flex-col gap-3 h-full">
        <button className="flex-1">
          <CasinoCard
            title="Member"
            gradient={THEME.color.gradient.cardA}
            imageSrc="/assets/images/member.png"
            fontSize="1.2rem"
            imgWidth="80px"
            imgHeight="80px"
            cardHeight="60px"
            imgPosition="right-center"
            cardWidth="200px"
          />
        </button>
        <button className="flex-1">
          <CasinoCard
            title="Non - Member"
            gradient={THEME.color.gradient.cardH}
            imageSrc="/assets/images/non-member.png"
            fontSize="1rem"
            imgWidth="70px"
            imgHeight="80px"
            cardHeight="60px"
            imgPosition="right-center"
            cardWidth="200px"
          />
        </button>
        <button className="flex-1">
          <CasinoCard
            title="Setting"
            gradient={THEME.color.gradient.cardG}
            imageSrc="/assets/images/setting.png"
            fontSize="1.2rem"
            imgWidth="50px"
            imgHeight="50px"
            cardHeight="60px"
            imgPosition="right-center"
            cardWidth="200px"
          />
        </button>

        <div className="mt-8 flex flex-col gap-3">
          <button>
            <CasinoCard
              title="Table Close"
              gradient={THEME.color.gradient.glass}
              imageSrc="/assets/images/close1.png"
              fontSize="1.15rem"
              imgWidth="60px"
              imgHeight="60px"
              cardHeight="60px"
              imgPosition="right-center"
              cardWidth="200px"
            />
          </button>

          <button>
            <CasinoCard
              title="Minimize"
              gradient={THEME.color.gradient.glass}
              imageSrc="/assets/images/minimize.png"
              fontSize="1.15rem"
              imgWidth="40px"
              imgHeight="60px"
              cardHeight="60px"
              imgPosition="right-center"
              cardWidth="200px"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
);
