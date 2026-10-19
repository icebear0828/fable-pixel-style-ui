import React, { useState } from "react";
import { cx, PALETTE, DARK_COLORS, type PaletteColor } from "../utils/cx";
import { Icon } from "../Icon/Icon";

export type TagSize = "sm" | "md" | "lg";
export type TagVariant = "solid" | "light" | "outlined";
export type TagColor = PaletteColor | "default";

export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onClick"> {
  /** 颜色 */
  color?: TagColor;
  /** 尺寸 */
  size?: TagSize;
  /** 变体 */
  variant?: TagVariant;
  /** 可关闭 */
  closable?: boolean;
  /** 关闭回调 */
  onClose?: (e: React.MouseEvent) => void;
  /** 点击回调（会显示可点击样式） */
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  /** 选中态（配合 onClick 做可选标签） */
  checked?: boolean;
  disabled?: boolean;
  /** 前置图标 */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({
  color = "default",
  size = "md",
  variant = "solid",
  closable,
  onClose,
  onClick,
  checked,
  disabled,
  icon,
  className,
  style,
  children,
  ...rest
}) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  const bg = color === "default" ? PALETTE.sand : PALETTE[color];
  const fg = color !== "default" && DARK_COLORS.includes(color) && variant === "solid" ? PALETTE.white : PALETTE.ink;
  const iconSize = size === "sm" ? 8 : size === "lg" ? 12 : 10;
  return (
    <span
      className={cx(
        "pxui-tag",
        size !== "md" && `pxui-tag--${size}`,
        variant !== "solid" && `pxui-tag--${variant}`,
        onClick && "pxui-tag--clickable",
        checked && "pxui-tag--checked",
        disabled && "pxui-tag--disabled",
        className,
      )}
      style={{ ["--_bg" as string]: bg, ["--_fg" as string]: fg, ...style }}
      onClick={disabled ? undefined : onClick}
      onKeyDown={
        onClick && !disabled
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick(e as unknown as React.MouseEvent<HTMLSpanElement>);
              }
            }
          : undefined
      }
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      {...rest}
    >
      <i className="pxui-tag__dot" aria-hidden="true" />
      {icon}
      {children}
      {closable && (
        <button
          type="button"
          className="pxui-tag__close"
          aria-label="close"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.(e);
            if (!e.defaultPrevented) setVisible(false);
          }}
        >
          <Icon name="close" size={iconSize} />
        </button>
      )}
    </span>
  );
};

Tag.displayName = "Tag";
