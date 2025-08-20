import { Toolbar } from "./components/layout/Toolbar";
import { TableGrid } from "./components/TableGrid1";
import { THEME } from "./constants/theme";

export default function App() {
  return (
    <div
      className="w-full min-h-screen grid place-items-center"
      style={{
        background: `radial-gradient(1200px 600px at 20% -10%, rgba(139,92,246,0.18), transparent 50%), radial-gradient(800px 400px at 80% 110%, rgba(217,70,239,0.15), transparent 60%)`,
        color: THEME.color.text.primary,
      }}
    >
      <div
        className="overflow-hidden flex flex-col"
        style={{
          width: THEME.size.frame.w,
          height: THEME.size.frame.h,
          maxWidth: "100%",
          background: THEME.color.bg.surface,
          borderRadius: THEME.size.radius.xl,
          border: `1px solid ${THEME.color.stroke}`,
          boxShadow: THEME.color.shadow,
          fontFamily: THEME.font.family.display,
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <Toolbar />
        </div>

        <div
          className="px-4 overflow-hidden"
          style={{
            minHeight: 0,
            marginTop: "15px",
          }}
        >
          <TableGrid />
        </div>
      </div>
    </div>
  );
}
