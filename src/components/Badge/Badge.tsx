import React from "react";
import { cx, PALETTE, DARK_COLORS, type PaletteColor } from "../utils/cx";

export type BadgeColor = PaletteColor;
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 数字 */
  count?: number;
  /** 封顶值，超出显示 99+ */
  max?: number;
  /** 仅显示小圆点 */
  dot?: boolean;
  /** 自定义文本（优先于 count） */
  text?: React.ReactNode;
  /** 颜色 */
  color?: BadgeColor;
  size?: BadgeSize;
  /** 为 0 时也显示 */
  showZero?: boolean;
  /** 闪烁脉冲 */
  pulse?: boolean;
  /** 偏移 [x, y] */
  offset?: [number, number];
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ count, max = 99, dot, text, color = "red", size = "md", showZero, pulse, offset, className, style, children, ...rest }) => {
  const hasChildren = children !== undefined && children !== null;
  const showCount = text !== undefined || dot || (count !== undefined && (count > 0 || showZero));
  const display = text !== undefined ? text : count !== undefined && count > max ? `${max}+` : count;
  const fg = DARK_COLORS.includes(color) ? PALETTE.white : PALETTE.ink;
  return (
    <span className={cx("pxui-badge", !hasChildren && "pxui-badge--standalone", className)} style={style} {...rest}>
      {children}
      {showCount && (
        <sup
          className={cx("pxui-badge__count", dot && "pxui-badge__count--dot", size === "sm" && "pxui-badge__count--sm", pulse && "pxui-badge__count--pulse")}
          style={{
            ["--_bg" as string]: PALETTE[color],
            ["--_fg" as string]: fg,
            marginRight: offset ? -offset[0] : undefined,
            marginTop: offset ? offset[1] : undefined,
          }}
        >
          {!dot && display}
        </sup>
      )}
    </span>
  );
};

Badge.displayName = "Badge";
