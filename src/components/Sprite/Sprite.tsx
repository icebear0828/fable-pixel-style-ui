import React, { useMemo } from "react";
import { cx, gridToPath } from "../utils/cx";

export interface SpriteProps extends Omit<React.SVGProps<SVGSVGElement>, "scale"> {
  /** 像素网格，每个字符对应 palette 中的一种颜色，'.' 为透明 */
  grid: string[];
  /** 字符 → 颜色 */
  palette: Record<string, string>;
  /** 每个像素的尺寸（px） */
  scale?: number;
  /** 动画 */
  animation?: "none" | "bounce" | "float";
  /** 水平翻转 */
  flip?: boolean;
  /** 无障碍描述 */
  title?: string;
}

/** 像素画渲染器：把字符网格绘制为清晰的 SVG 像素画。 */
export const Sprite: React.FC<SpriteProps> = ({
  grid,
  palette,
  scale = 4,
  animation = "none",
  flip,
  title,
  className,
  style,
  ...rest
}) => {
  const w = Math.max(...grid.map((r) => r.length));
  const h = grid.length;
  const paths = useMemo(
    () =>
      Object.keys(palette)
        .filter((k) => k !== ".")
        .map((k) => ({ k, d: gridToPath(grid, k), fill: palette[k] }))
        .filter((p) => p.d),
    [grid, palette],
  );
  return (
    <svg
      className={cx("pxui-sprite", animation !== "none" && `pxui-sprite--${animation}`, className)}
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      style={{ transform: flip ? "scaleX(-1)" : undefined, ...style }}
      {...rest}
    >
      {title && <title>{title}</title>}
      {paths.map((p) => (
        <path key={p.k} fill={p.fill} d={p.d} />
      ))}
    </svg>
  );
};

Sprite.displayName = "Sprite";

/** 内置吉祥物：像素猫 */
export const CAT_SPRITE = {
  grid: [
    "..#..........#..",
    ".#o#........#o#.",
    ".#oo#......#oo#.",
    ".#ooo######ooo#.",
    "#oooooooooooooo#",
    "#oooooooooooooo#",
    "#ooo##oooo##ooo#",
    "#ooo#woooo#wooo#",
    "#oooooooooooooo#",
    "#orrooooooooorr#",
    "#orroooppoooorr#",
    ".#oooopoopoooo#.",
    ".#oooooooooooo#.",
    "..#oooooooooo#..",
    "...##########...",
  ],
  palette: { "#": "#1d2b53", o: "#ffa300", w: "#ffffff", p: "#ff77a8", r: "#ffccaa" },
};

/** 内置吉祥物：像素史莱姆 */
export const SLIME_SPRITE = {
  grid: [
    "......####......",
    "....##gggg##....",
    "...#gggggggg#...",
    "..#gggggggggg#..",
    ".#gggggggggggg#.",
    ".#gg##gggg##gg#.",
    "#ggg#wgggg#wggg#",
    "#gggggggggggggg#",
    "#gggggggggggggg#",
    "#ggggg#gggg#ggg#",
    "#gggggg####gggg#",
    "#gggggggggggggg#",
    ".#gggggggggggg#.",
    "..############..",
  ],
  palette: { "#": "#1d2b53", g: "#00e436", w: "#ffffff" },
};

/** 内置吉祥物：像素幽灵 */
export const GHOST_SPRITE = {
  grid: [
    ".....######.....",
    "...##wwwwww##...",
    "..#wwwwwwwwww#..",
    ".#wwwwwwwwwwww#.",
    ".#ww##wwww##ww#.",
    "#www#bwwww#bwww#",
    "#wwwwwwwwwwwwww#",
    "#wwwwwwwwwwwwww#",
    "#wwwwwwwwwwwwww#",
    "#wwwwwwwwwwwwww#",
    "#wwwwwwwwwwwwww#",
    "#ww#wwww#wwww#w#",
    "#w#.#ww#.#ww#.##",
    "##...##...##....",
  ],
  palette: { "#": "#1d2b53", w: "#ffffff", b: "#29adff" },
};
