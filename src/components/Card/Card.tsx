import React from "react";
import { cx, PALETTE, DARK_COLORS, type PaletteColor } from "../utils/cx";

export type CardVariant = "default" | "dashed" | "dark" | "flat";
export type CardColor = PaletteColor;

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 标题 */
  title?: React.ReactNode;
  /** 右上角操作区 */
  extra?: React.ReactNode;
  /** 封面 */
  cover?: React.ReactNode;
  /** 底部 */
  footer?: React.ReactNode;
  /** 底部操作组 */
  actions?: React.ReactNode[];
  /** 角标文案 */
  ribbon?: React.ReactNode;
  /** 背景色 */
  color?: CardColor;
  variant?: CardVariant;
  size?: "sm" | "md";
  /** 悬浮抬起 */
  hoverable?: boolean;
  /** 自定义内容区 style */
  bodyStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, extra, cover, footer, actions, ribbon, color, variant = "default", size = "md", hoverable, bodyStyle, className, style, children, ...rest }) => {
  const vars: Record<string, string> = {};
  if (color && variant !== "dark") {
    vars["--_bg"] = PALETTE[color];
    if (DARK_COLORS.includes(color)) {
      vars["--_fg"] = PALETTE.paper;
      vars["--pxui-bd-src"] = "var(--pxui-bd-white)";
    }
  }
  return (
    <div
      className={cx("pxui-card", variant !== "default" && `pxui-card--${variant}`, size === "sm" && "pxui-card--sm", hoverable && "pxui-card--hoverable", className)}
      style={{ ...vars, ...style }}
      {...rest}
    >
      {ribbon && <span className="pxui-card__ribbon">{ribbon}</span>}
      {cover && <div className="pxui-card__cover">{cover}</div>}
      {(title || extra) && (
        <div className="pxui-card__header">
          <div className="pxui-card__title">{title}</div>
          {extra && <div className="pxui-card__extra">{extra}</div>}
        </div>
      )}
      <div className="pxui-card__body" style={bodyStyle}>
        {children}
      </div>
      {footer && <div className="pxui-card__footer">{footer}</div>}
      {actions && actions.length > 0 && (
        <div className="pxui-card__actions">
          {actions.map((a, i) => (
            <div key={i}>{a}</div>
          ))}
        </div>
      )}
    </div>
  );
};
Card.displayName = "Card";
