import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type GridConfig = {
  cols: number;
  rowHeight: number;
  colWidth: number;
  rowGap: number;
  colGap: number;
};

const GridCtx = createContext<GridConfig | null>(null);

export type LayoutGridProps = {
  cols?: number;
  rowHeight?: number;
  gap?: number;
  rowGap?: number;
  colGap?: number;
  dense?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export const LayoutGrid: React.FC<LayoutGridProps> = ({
  cols = 12,
  rowHeight = 90,
  gap = 12,
  rowGap,
  colGap,
  dense = true,
  className,
  style,
  children,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const rg = rowGap ?? gap;
  const cg = colGap ?? gap;

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr) setContainerWidth(cr.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const colWidth = useMemo(() => {
    if (containerWidth <= 0 || cols <= 0) return 0;
    const totalColGaps = (cols - 1) * cg;
    return (containerWidth - totalColGaps) / cols;
  }, [containerWidth, cols, cg]);

  const ctxValue = useMemo<GridConfig>(
    () => ({
      cols,
      rowHeight,
      colWidth,
      rowGap: rg,
      colGap: cg,
    }),
    [cols, rowHeight, colWidth, rg, cg]
  );

  return (
    <GridCtx.Provider value={ctxValue}>
      <div
        ref={ref}
        className={className}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridAutoRows: `${rowHeight}px`,
          columnGap: `${cg}px`,
          rowGap: `${rg}px`,
          gridAutoFlow: dense ? "dense" : "row",
          ...style,
        }}
      >
        {children}
      </div>
    </GridCtx.Provider>
  );
};

export type GridItemProps = {
  wPx?: number;
  hPx?: number;
  colSpan?: number;
  rowSpan?: number;
  x?: number;
  y?: number;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
};

function pxToSpan(sizePx: number, cellSize: number, gap: number) {
  if (!cellSize || sizePx <= 0) return 1;
  return Math.max(1, Math.ceil((sizePx + gap) / (cellSize + gap)));
}

export const GridItem: React.FC<GridItemProps> = ({
  wPx,
  hPx,
  colSpan,
  rowSpan,
  x,
  y,
  style,
  className,
  children,
}) => {
  const cfg = useContext(GridCtx);
  if (!cfg) {
    console.warn("GridItem must be used inside LayoutGrid");
  }

  const computedColSpan =
    colSpan ?? pxToSpan(wPx ?? 0, cfg?.colWidth ?? 0, cfg?.colGap ?? 0);
  const computedRowSpan =
    rowSpan ?? pxToSpan(hPx ?? 0, cfg?.rowHeight ?? 0, cfg?.rowGap ?? 0);

  const gridColumn = x
    ? `${x} / span ${computedColSpan}`
    : `span ${computedColSpan}`;
  const gridRow = y
    ? `${y} / span ${computedRowSpan}`
    : `span ${computedRowSpan}`;

  return (
    <div
      className={className}
      style={{
        gridColumn,
        gridRow,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
