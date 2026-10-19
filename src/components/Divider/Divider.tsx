import React from "react";
import { cx, PALETTE, type PaletteColor } from "../utils/cx";

export type DividerVariant = "solid" | "dashed" | "dotted" | "double";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 线条样式 */
  variant?: DividerVariant;
  /** 文本位置 */
  orientation?: "left" | "center" | "right";
  /** 垂直分割线 */
  vertical?: boolean;
  /** 线条颜色 */
  color?: PaletteColor;
  /** 文本使用正文色 */
  plain?: boolean;
  children?: React.ReactNode;
}

export const Divider: React.FC<DividerProps> = ({ variant = "solid", orientation = "center", vertical, color = "ink", plain, className, style, children, ...rest }) => (
  <div
    role="separator"
    aria-orientation={vertical ? "vertical" : "horizontal"}
    className={cx(
      "pxui-divider",
      `pxui-divider--${variant}`,
      vertical && "pxui-divider--vertical",
      !!children && orientation !== "center" && `pxui-divider--${orientation}`,
      plain && "pxui-divider--plain",
      className,
    )}
    style={{ ["--_color" as string]: PALETTE[color], ...style }}
    {...rest}
  >
    {!vertical && children ? <span>{children}</span> : null}
  </div>
);

Divider.displayName = "Divider";
