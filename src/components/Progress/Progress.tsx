import React from "react";
import { cx, PALETTE, type PaletteColor } from "../utils/cx";

export type ProgressSize = "sm" | "md" | "lg";
export type ProgressVariant = "bar" | "segments" | "striped" | "hp";
export type ProgressStatus = "normal" | "active" | "success" | "exception";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 百分比 0~100 */
  percent?: number;
  size?: ProgressSize;
  variant?: ProgressVariant;
  status?: ProgressStatus;
  color?: PaletteColor;
  /** 显示右侧信息 */
  showInfo?: boolean;
  /** 左侧标签（如 HP / MP / EXP） */
  label?: React.ReactNode;
  /** 自定义信息格式化 */
  format?: (percent: number) => React.ReactNode;
  /** 不确定进度 */
  indeterminate?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  percent = 0,
  size = "md",
  variant = "bar",
  status = "normal",
  color,
  showInfo = true,
  label,
  format,
  indeterminate,
  className,
  style,
  ...rest
}) => {
  const p = Math.min(100, Math.max(0, percent));
  const finalStatus = status === "normal" && p >= 100 ? "success" : status;
  let c = color ? PALETTE[color] : undefined;
  if (variant === "hp" && !color) c = p > 50 ? PALETTE.green : p > 20 ? PALETTE.yellow : PALETTE.red;
  const info = format ? format(p) : finalStatus === "exception" ? "ERR" : `${Math.round(p)}%`;
  return (
    <div
      className={cx(
        "pxui-progress",
        size !== "md" && `pxui-progress--${size}`,
        variant === "segments" && "pxui-progress--segments",
        variant === "striped" && "pxui-progress--striped",
        variant === "hp" && p <= 20 && "pxui-progress--low",
        finalStatus !== "normal" && `pxui-progress--${finalStatus}`,
        className,
      )}
      style={{ ...(c ? { ["--_color" as string]: c } : {}), ...style }}
      role="progressbar"
      aria-valuenow={p}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      {(label || variant === "hp") && <span className="pxui-progress__label">{label ?? "HP"}</span>}
      <div className="pxui-progress__track">
        {indeterminate ? <div className="pxui-progress__indeterminate" /> : <div className="pxui-progress__fill" style={{ width: `${p}%` }} />}
      </div>
      {showInfo && !indeterminate && <span className="pxui-progress__info">{info}</span>}
    </div>
  );
};
Progress.displayName = "Progress";
