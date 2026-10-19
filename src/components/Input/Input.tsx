import React, { forwardRef, useState } from "react";
import { cx } from "../utils/cx";
import { Icon } from "../Icon/Icon";

export type InputSize = "sm" | "md" | "lg";
export type InputStatus = "default" | "error" | "success";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix" | "onChange"> {
  size?: InputSize;
  status?: InputStatus;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 可清空 */
  allowClear?: boolean;
  /** 显示字数统计（需配合 maxLength） */
  showCount?: boolean;
  /** 撑满容器 */
  block?: boolean;
  /** 值变化（直接返回字符串） */
  onChange?: (value: string, e?: React.ChangeEvent<HTMLInputElement>) => void;
  /** 回车 */
  onPressEnter?: (value: string) => void;
  /** 容器 className */
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { size = "md", status = "default", prefix, suffix, allowClear, showCount, block, onChange, onPressEnter, onKeyDown, wrapperClassName, wrapperStyle, className, value, defaultValue, disabled, maxLength, ...rest },
    ref,
  ) => {
    const [inner, setInner] = useState<string>(String(defaultValue ?? ""));
    const isControlled = value !== undefined;
    const current = isControlled ? String(value ?? "") : inner;

    const update = (v: string, e?: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInner(v);
      onChange?.(v, e);
    };

    return (
      <span
        className={cx(
          "pxui-input",
          size !== "md" && `pxui-input--${size}`,
          status !== "default" && `pxui-input--${status}`,
          block && "pxui-input--block",
          disabled && "pxui-input--disabled",
          wrapperClassName,
        )}
        style={wrapperStyle}
      >
        {prefix && <span className="pxui-input__affix">{prefix}</span>}
        <input
          ref={ref}
          className={cx("pxui-input__inner", className)}
          value={current}
          disabled={disabled}
          maxLength={maxLength}
          onChange={(e) => update(e.target.value, e)}
          {...rest}
          onKeyDown={(e) => {
            if (e.key === "Enter") onPressEnter?.(current);
            onKeyDown?.(e);
          }}
        />
        {allowClear && current && !disabled && (
          <button type="button" className="pxui-input__clear" aria-label="clear" onClick={() => update("")}>
            <Icon name="close" size={10} />
          </button>
        )}
        {showCount && (
          <span className="pxui-input__count">
            {current.length}
            {maxLength ? `/${maxLength}` : ""}
          </span>
        )}
        {suffix && <span className="pxui-input__affix">{suffix}</span>}
      </span>
    );
  },
);
Input.displayName = "Input";

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  status?: InputStatus;
  showCount?: boolean;
  block?: boolean;
  onChange?: (value: string, e?: React.ChangeEvent<HTMLTextAreaElement>) => void;
  wrapperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ status = "default", showCount, block, onChange, wrapperClassName, className, value, defaultValue, disabled, maxLength, rows = 3, ...rest }, ref) => {
    const [inner, setInner] = useState<string>(String(defaultValue ?? ""));
    const isControlled = value !== undefined;
    const current = isControlled ? String(value ?? "") : inner;
    return (
      <span
        className={cx(
          "pxui-input",
          "pxui-input--textarea",
          status !== "default" && `pxui-input--${status}`,
          block && "pxui-input--block",
          disabled && "pxui-input--disabled",
          wrapperClassName,
        )}
      >
        <textarea
          ref={ref}
          className={cx("pxui-input__inner", className)}
          rows={rows}
          value={current}
          disabled={disabled}
          maxLength={maxLength}
          onChange={(e) => {
            if (!isControlled) setInner(e.target.value);
            onChange?.(e.target.value, e);
          }}
          {...rest}
        />
        {showCount && (
          <span className="pxui-input__count">
            {current.length}
            {maxLength ? `/${maxLength}` : ""}
          </span>
        )}
      </span>
    );
  },
);
Textarea.displayName = "Textarea";
