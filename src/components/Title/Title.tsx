import React from "react";
import { cx, PALETTE, DARK_COLORS, type PaletteColor } from "../utils/cx";

export type TitleLevel = 1 | 2 | 3 | 4;
export type TitleVariant = "default" | "ribbon" | "bar" | "underline";
export type TitleColor = PaletteColor;

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** 标题层级，对应 h1 ~ h4 */
  level?: TitleLevel;
  /** 视觉样式 */
  variant?: TitleVariant;
  /** 装饰颜色 */
  color?: TitleColor;
  /** 像素投影 */
  shadow?: boolean;
  /** 前置图标 */
  icon?: React.ReactNode;
  /** 标题内容 */
  children?: React.ReactNode;
}

export const Title: React.FC<TitleProps> = ({ level = 2, variant = "default", color = "yellow", shadow, icon, className, style, children, ...rest }) => {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  const dark = DARK_COLORS.includes(color);
  return (
    <Tag
      className={cx("pxui-title", `pxui-title--${level}`, variant !== "default" && `pxui-title--${variant}`, shadow && "pxui-title--shadow", className)}
      style={{
        ["--_bg" as string]: PALETTE[color],
        ["--_fg" as string]: variant === "ribbon" ? (dark ? PALETTE.white : PALETTE.ink) : PALETTE.ink,
        ...style,
      }}
      {...rest}
    >
      {icon && <span className="pxui-title__icon">{icon}</span>}
      <span>{children}</span>
    </Tag>
  );
};

Title.displayName = "Title";
