export type ClassValue = string | number | bigint | null | undefined | boolean | Record<string, boolean | undefined | null>;

/** Lightweight className joiner (no external deps). */
export function cx(...args: ClassValue[]): string {
  const out: string[] = [];
  for (const a of args) {
    if (!a || a === true) continue;
    if (typeof a === "string" || typeof a === "number" || typeof a === "bigint") {
      out.push(String(a));
    } else if (typeof a === "object") {
      for (const k in a) if (a[k]) out.push(k);
    }
  }
  return out.join(" ");
}

/** Build a single SVG path from a pixel grid ('#' = filled). */
export function gridToPath(grid: string[], filled = "#"): string {
  let d = "";
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      if (row[x] === filled) {
        let w = 1;
        while (x + w < row.length && row[x + w] === filled) w++;
        d += `M${x} ${y}h${w}v1H${x}z`;
        x += w;
      } else {
        x++;
      }
    }
  });
  return d;
}

/** Grid transforms used to derive directional icons. */
export const flipH = (g: string[]) => g.map((r) => r.split("").reverse().join(""));
export const flipV = (g: string[]) => [...g].reverse();
export const rotateCW = (g: string[]) => {
  const h = g.length;
  const w = g[0].length;
  const out: string[] = [];
  for (let x = 0; x < w; x++) {
    let row = "";
    for (let y = h - 1; y >= 0; y--) row += g[y][x];
    out.push(row);
  }
  return out;
};
export const rotateCCW = (g: string[]) => rotateCW(rotateCW(rotateCW(g)));

export const PALETTE = {
  ink: "#1d2b53",
  paper: "#fff1e8",
  white: "#ffffff",
  sand: "#f3e4cf",
  stone: "#c2c3c7",
  slate: "#5f574f",
  indigo: "#83769c",
  navy: "#1d2b53",
  plum: "#7e2553",
  forest: "#008751",
  brown: "#ab5236",
  red: "#ff004d",
  orange: "#ffa300",
  yellow: "#ffec27",
  green: "#00e436",
  blue: "#29adff",
  pink: "#ff77a8",
  peach: "#ffccaa",
} as const;

export type PaletteColor = keyof typeof PALETTE;

/** Colors that need light text on top. */
export const DARK_COLORS: PaletteColor[] = ["ink", "navy", "plum", "forest", "brown", "red", "indigo", "slate"];
