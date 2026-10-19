import React, { createContext, useContext, useId, useState } from "react";
import { cx, PALETTE, type PaletteColor } from "../utils/cx";

export type RadioSize = "sm" | "md" | "lg";
export type RadioValue = string | number;

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "value"> {
  value: RadioValue;
  checked?: boolean;
  size?: RadioSize;
  color?: PaletteColor;
  onChange?: (value: RadioValue, e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

interface Ctx {
  name: string;
  value?: RadioValue;
  onChange: (v: RadioValue, e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  size?: RadioSize;
  color?: PaletteColor;
}
const RadioGroupContext = createContext<Ctx | null>(null);

export const Radio: React.FC<RadioProps> = ({ value, checked, size, color, onChange, disabled, className, children, name, ...rest }) => {
  const group = useContext(RadioGroupContext);
  const isChecked = group ? group.value === value : !!checked;
  const finalSize = size ?? group?.size ?? "md";
  const finalColor = color ?? group?.color;
  const finalDisabled = disabled ?? group?.disabled;
  return (
    <label
      className={cx("pxui-radio", finalSize !== "md" && `pxui-radio--${finalSize}`, isChecked && "pxui-radio--checked", finalDisabled && "pxui-radio--disabled", className)}
      style={finalColor ? ({ ["--_color" as string]: PALETTE[finalColor] } as React.CSSProperties) : undefined}
    >
      <input
        type="radio"
        className="pxui-radio__input"
        name={name ?? group?.name}
        checked={isChecked}
        disabled={finalDisabled}
        onChange={(e) => {
          group?.onChange(value, e);
          onChange?.(value, e);
        }}
        {...rest}
      />
      <span className="pxui-radio__dot" aria-hidden="true" />
      <span className="pxui-radio__label">{children}</span>
    </label>
  );
};
Radio.displayName = "Radio";

export interface RadioOption {
  label: React.ReactNode;
  value: RadioValue;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options?: (RadioOption | string)[];
  value?: RadioValue;
  defaultValue?: RadioValue;
  onChange?: (value: RadioValue) => void;
  name?: string;
  disabled?: boolean;
  size?: RadioSize;
  color?: PaletteColor;
  /** 按钮样式 */
  type?: "default" | "button";
  vertical?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, defaultValue, onChange, name, disabled, size, color, type = "default", vertical, className, style, children }) => {
  const autoName = useId();
  const [inner, setInner] = useState<RadioValue | undefined>(defaultValue);
  const current = value !== undefined ? value : inner;
  return (
    <RadioGroupContext.Provider
      value={{
        name: name ?? autoName,
        value: current,
        disabled,
        size,
        color,
        onChange: (v) => {
          if (value === undefined) setInner(v);
          onChange?.(v);
        },
      }}
    >
      <div
        className={cx("pxui-radio-group", type === "button" && "pxui-radio-group--button", vertical && "pxui-radio-group--vertical", className)}
        style={{ ...(color ? { ["--_color" as string]: PALETTE[color] } : {}), ...style }}
        role="radiogroup"
      >
        {options
          ? options.map((o) => {
              const opt = typeof o === "string" ? { label: o, value: o } : o;
              return (
                <Radio key={String(opt.value)} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </Radio>
              );
            })
          : children}
      </div>
    </RadioGroupContext.Provider>
  );
};
RadioGroup.displayName = "RadioGroup";
