import React, { useCallback, useEffect, useRef, useState } from "react";
import { cx, PALETTE, type PaletteColor } from "../utils/cx";

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  color?: PaletteColor;
  /** 刻度标记 */
  marks?: Record<number, React.ReactNode>;
  /** 提示显示方式 */
  tooltip?: "hover" | "always" | "none";
  formatTooltip?: (v: number) => React.ReactNode;
  onChange?: (v: number) => void;
  onAfterChange?: (v: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  color = "blue",
  marks,
  tooltip = "hover",
  formatTooltip = (v) => v,
  onChange,
  onAfterChange,
  className,
  style,
}) => {
  const [inner, setInner] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;
  const [dragging, setDragging] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const latest = useRef(current);
  latest.current = current;

  const clamp = useCallback(
    (v: number) => {
      const stepped = Math.round((v - min) / step) * step + min;
      return Math.min(max, Math.max(min, Number(stepped.toFixed(6))));
    },
    [min, max, step],
  );

  const setFromClientX = useCallback(
    (clientX: number) => {
      const rail = railRef.current;
      if (!rail) return;
      const r = rail.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      const v = clamp(min + ratio * (max - min));
      if (v !== latest.current) {
        if (!isControlled) setInner(v);
        onChange?.(v);
      }
    },
    [clamp, min, max, isControlled, onChange],
  );

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => setFromClientX(e.clientX);
    const up = () => {
      setDragging(false);
      onAfterChange?.(latest.current);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragging, setFromClientX, onAfterChange]);

  const pct = ((current - min) / (max - min)) * 100;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    let v = current;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") v = clamp(current + step);
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") v = clamp(current - step);
    else if (e.key === "Home") v = min;
    else if (e.key === "End") v = max;
    else return;
    e.preventDefault();
    if (!isControlled) setInner(v);
    onChange?.(v);
    onAfterChange?.(v);
  };

  return (
    <div
      className={cx("pxui-slider", disabled && "pxui-slider--disabled", dragging && "pxui-slider--dragging", tooltip === "always" && "pxui-slider--tip-always", marks && "pxui-slider--marks", className)}
      style={{ ["--_color" as string]: PALETTE[color], ...style }}
      onPointerDown={(e) => {
        if (disabled) return;
        e.preventDefault();
        setDragging(true);
        setFromClientX(e.clientX);
      }}
    >
      <div className="pxui-slider__rail" ref={railRef}>
        <div className="pxui-slider__track" style={{ width: `${pct}%` }} />
        {marks && (
          <div className="pxui-slider__marks">
            {Object.entries(marks).map(([k, label]) => (
              <span key={k} className="pxui-slider__mark" style={{ left: `${((Number(k) - min) / (max - min)) * 100}%` }}>
                {label}
              </span>
            ))}
          </div>
        )}
        <div
          className="pxui-slider__thumb"
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={current}
          aria-disabled={disabled}
          style={{ left: `${pct}%` }}
          onKeyDown={onKeyDown}
        >
          {tooltip !== "none" && <span className="pxui-slider__tip">{formatTooltip(current)}</span>}
        </div>
      </div>
    </div>
  );
};
Slider.displayName = "Slider";
