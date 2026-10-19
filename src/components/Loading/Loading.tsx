import React from "react";
import { cx, PALETTE, type PaletteColor } from "../utils/cx";

export type SpinnerVariant = "dots" | "ring" | "bar";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: SpinnerVariant;
  size?: number;
  color?: PaletteColor;
}

export const Spinner: React.FC<SpinnerProps> = ({ variant = "dots", size = 32, color, className, style, ...rest }) => {
  const n = variant === "ring" ? 8 : variant === "dots" ? 3 : 1;
  return (
    <span
      className={cx("pxui-spinner", `pxui-spinner--${variant}`, className)}
      style={{ ["--_size" as string]: `${size}px`, ...(color ? { ["--_color" as string]: PALETTE[color] } : {}), ...style }}
      role="status"
      aria-label="loading"
      {...rest}
    >
      {Array.from({ length: n }).map((_, i) => (
        <i key={i} />
      ))}
    </span>
  );
};
Spinner.displayName = "Spinner";

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否加载中 */
  spinning?: boolean;
  /** 提示文案 */
  tip?: React.ReactNode;
  variant?: SpinnerVariant;
  size?: number;
  /** 全屏遮罩 */
  fullscreen?: boolean;
  /** 自定义指示器 */
  indicator?: React.ReactNode;
  children?: React.ReactNode;
}

export const Loading: React.FC<LoadingProps> = ({ spinning = true, tip, variant = "dots", size = 32, fullscreen, indicator, className, children, ...rest }) => {
  const mask = (
    <div className="pxui-loading__mask">
      {indicator ?? <Spinner variant={variant} size={size} />}
      {tip && <div className="pxui-loading__tip">{tip}</div>}
    </div>
  );
  if (fullscreen) {
    return spinning ? (
      <div className={cx("pxui-loading", "pxui-loading--fullscreen", className)} {...rest}>
        {mask}
      </div>
    ) : null;
  }
  if (!children) {
    return spinning ? (
      <div className={cx("pxui-loading", className)} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12 }} {...rest}>
        {indicator ?? <Spinner variant={variant} size={size} />}
        {tip && <div className="pxui-loading__tip">{tip}</div>}
      </div>
    ) : null;
  }
  return (
    <div className={cx("pxui-loading", spinning && "pxui-loading--blur", className)} {...rest}>
      {children}
      {spinning && mask}
    </div>
  );
};
Loading.displayName = "Loading";
