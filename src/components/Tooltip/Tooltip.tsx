import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cx } from "../utils/cx";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipTrigger = "hover" | "click" | "focus";

export interface TooltipProps {
  /** 提示内容 */
  title: React.ReactNode;
  placement?: TooltipPlacement;
  trigger?: TooltipTrigger | TooltipTrigger[];
  /** 浅色主题 */
  light?: boolean;
  /** 受控显示 */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 显示延迟 ms */
  delay?: number;
  children: React.ReactElement;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ title, placement = "top", trigger = "hover", light, open, onOpenChange, delay = 80, children, className }) => {
  const [inner, setInner] = useState(false);
  const visible = open ?? inner;
  const id = useId();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  const set = (v: boolean) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(
      () => {
        if (open === undefined) setInner(v);
        onOpenChange?.(v);
      },
      v ? delay : 60,
    );
  };

  const place = () => {
    const t = triggerRef.current?.getBoundingClientRect();
    const tip = tipRef.current;
    if (!t || !tip) return;
    const gap = 12;
    const w = tip.offsetWidth;
    const h = tip.offsetHeight;
    let top = 0;
    let left = 0;
    if (placement === "top") {
      top = t.top - h - gap;
      left = t.left + t.width / 2 - w / 2;
    } else if (placement === "bottom") {
      top = t.bottom + gap;
      left = t.left + t.width / 2 - w / 2;
    } else if (placement === "left") {
      top = t.top + t.height / 2 - h / 2;
      left = t.left - w - gap;
    } else {
      top = t.top + t.height / 2 - h / 2;
      left = t.right + gap;
    }
    left = Math.max(8, Math.min(window.innerWidth - w - 8, left));
    top = Math.max(8, top);
    setPos({ top, left });
  };

  useLayoutEffect(() => {
    if (visible) place();
    else setPos(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, placement, title]);

  useEffect(() => {
    if (!visible) return;
    const onScroll = () => place();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    const onDoc = (e: MouseEvent) => {
      if (triggers.includes("click") && !triggerRef.current?.contains(e.target as Node)) set(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("mousedown", onDoc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handlers: React.HTMLAttributes<HTMLSpanElement> = {};
  if (triggers.includes("hover")) {
    handlers.onMouseEnter = () => set(true);
    handlers.onMouseLeave = () => set(false);
  }
  if (triggers.includes("focus")) {
    handlers.onFocus = () => set(true);
    handlers.onBlur = () => set(false);
  }
  if (triggers.includes("click")) {
    handlers.onClick = () => set(!visible);
  }

  return (
    <>
      <span ref={triggerRef} className={cx("pxui-tooltip-trigger", className)} aria-describedby={visible ? id : undefined} {...handlers}>
        {children}
      </span>
      {visible &&
        createPortal(
          <div
            ref={tipRef}
            id={id}
            role="tooltip"
            className={cx("pxui-tooltip", `pxui-tooltip--${placement}`, light && "pxui-tooltip--light")}
            style={{ top: pos?.top ?? -9999, left: pos?.left ?? -9999, visibility: pos ? "visible" : "hidden" }}
          >
            {title}
            <span className="pxui-tooltip__arrow" />
          </div>,
          document.body,
        )}
    </>
  );
};
Tooltip.displayName = "Tooltip";
