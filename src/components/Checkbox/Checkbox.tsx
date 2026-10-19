import React, { createContext, useContext, useState } from "react";
import { cx, PALETTE, type PaletteColor } from "../utils/cx";
import { Icon } from "../Icon/Icon";

export type CheckboxSize = "sm" | "md" | "lg";
export type CheckboxValue = string | number;

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "value"> {
  checked?: boolean;
  defaultChecked?: boolean;
  /** 半选 */
  indeterminate?: boolean;
  size?: CheckboxSize;
  color?: PaletteColor;
  value?: CheckboxValue;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

interface GroupCtx {
  value: CheckboxValue[];
  toggle: (v: CheckboxValue, checked: boolean) => void;
  disabled?: boolean;
  size?: CheckboxSize;
  color?: PaletteColor;
}
const CheckboxGroupContext = createContext<GroupCtx | null>(null);

export const Checkbox: React.FC<CheckboxProps> = ({ checked, defaultChecked, indeterminate, size, color, value, onChange, disabled, className, children, ...rest }) => {
  const group = useContext(CheckboxGroupContext);
  const [inner, setInner] = useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const inGroup = !!group && value !== undefined;
  const isChecked = inGroup ? group!.value.includes(value!) : isControlled ? !!checked : inner;
  const finalSize = size ?? group?.size ?? "md";
  const finalColor = color ?? group?.color;
  const finalDisabled = disabled ?? group?.disabled;

  const iconSize = finalSize === "sm" ? 10 : finalSize === "lg" ? 14 : 12;

  return (
    <label
      className={cx(
        "pxui-checkbox",
        finalSize !== "md" && `pxui-checkbox--${finalSize}`,
        isChecked && "pxui-checkbox--checked",
        indeterminate && !isChecked && "pxui-checkbox--indeterminate",
        finalDisabled && "pxui-checkbox--disabled",
        className,
      )}
      style={finalColor ? ({ ["--_color" as string]: PALETTE[finalColor] } as React.CSSProperties) : undefined}
    >
      <input
        type="checkbox"
        className="pxui-checkbox__input"
        checked={isChecked}
        disabled={finalDisabled}
        aria-checked={indeterminate && !isChecked ? "mixed" : isChecked}
        onChange={(e) => {
          const next = e.target.checked;
          if (inGroup) group!.toggle(value!, next);
          if (!isControlled) setInner(next);
          onChange?.(next, e);
        }}
        {...rest}
      />
      <span className="pxui-checkbox__box" aria-hidden="true">
        {indeterminate && !isChecked ? <i className="pxui-checkbox__bar" /> : <Icon name="check" size={iconSize} />}
      </span>
      {children !== undefined && <span className="pxui-checkbox__label">{children}</span>}
    </label>
  );
};
Checkbox.displayName = "Checkbox";

export interface CheckboxOption {
  label: React.ReactNode;
  value: CheckboxValue;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  options?: (CheckboxOption | string)[];
  value?: CheckboxValue[];
  defaultValue?: CheckboxValue[];
  onChange?: (value: CheckboxValue[]) => void;
  disabled?: boolean;
  size?: CheckboxSize;
  color?: PaletteColor;
  /** 垂直排列 */
  vertical?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, value, defaultValue = [], onChange, disabled, size, color, vertical, className, style, children }) => {
  const [inner, setInner] = useState<CheckboxValue[]>(defaultValue);
  const current = value ?? inner;
  const toggle = (v: CheckboxValue, checked: boolean) => {
    const next = checked ? [...current, v] : current.filter((x) => x !== v);
    if (value === undefined) setInner(next);
    onChange?.(next);
  };
  return (
    <CheckboxGroupContext.Provider value={{ value: current, toggle, disabled, size, color }}>
      <div className={cx("pxui-checkbox-group", vertical && "pxui-checkbox-group--vertical", className)} style={style} role="group">
        {options
          ? options.map((o) => {
              const opt = typeof o === "string" ? { label: o, value: o } : o;
              return (
                <Checkbox key={String(opt.value)} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </Checkbox>
              );
            })
          : children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};
CheckboxGroup.displayName = "CheckboxGroup";
