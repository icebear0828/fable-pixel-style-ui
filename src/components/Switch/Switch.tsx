import React, { useState } from "react";
import { cx, PALETTE, type PaletteColor } from "../utils/cx";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: SwitchSize;
  color?: PaletteColor;
  loading?: boolean;
  /** 开启时文案 */
  checkedText?: React.ReactNode;
  /** 关闭时文案 */
  uncheckedText?: React.ReactNode;
}

export const Switch: React.FC<SwitchProps> = ({ checked, defaultChecked, onChange, size = "md", color, loading, checkedText, uncheckedText, className, disabled, style, ...rest }) => {
  const [inner, setInner] = useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? !!checked : inner;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={cx("pxui-switch", size !== "md" && `pxui-switch--${size}`, on && "pxui-switch--checked", loading && "pxui-switch--loading", className)}
      style={{ ...(color ? { ["--_color" as string]: PALETTE[color] } : {}), ...style }}
      disabled={disabled || loading}
      onClick={() => {
        const next = !on;
        if (!isControlled) setInner(next);
        onChange?.(next);
      }}
      {...rest}
    >
      {checkedText !== undefined && <span className="pxui-switch__text pxui-switch__text--on">{checkedText}</span>}
      {uncheckedText !== undefined && <span className="pxui-switch__text pxui-switch__text--off">{uncheckedText}</span>}
      <span className="pxui-switch__knob" />
    </button>
  );
};
Switch.displayName = "Switch";
