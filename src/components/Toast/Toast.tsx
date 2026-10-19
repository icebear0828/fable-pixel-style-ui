import React, { useEffect, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { cx } from "../utils/cx";
import { Icon, type IconName } from "../Icon/Icon";

export type ToastType = "info" | "success" | "warning" | "error";
export type ToastPosition = "top-right" | "top-left" | "top" | "bottom-right" | "bottom-left" | "bottom";

export interface ToastOptions {
  /** 标题 */
  title: React.ReactNode;
  /** 描述 */
  description?: React.ReactNode;
  type?: ToastType;
  /** 持续时间 ms，0 表示不自动关闭 */
  duration?: number;
  position?: ToastPosition;
  /** 相同 key 的通知会被原地更新 */
  key?: string;
  closable?: boolean;
  icon?: IconName;
  onClose?: () => void;
}

interface ToastItem extends ToastOptions {
  id: string;
  leaving?: boolean;
}

const ICONS: Record<ToastType, IconName> = { info: "info", success: "check", warning: "warning", error: "close" };
const DEFAULT_DURATION = 3000;

type Listener = (items: ToastItem[]) => void;
let items: ToastItem[] = [];
let listeners: Listener[] = [];
let root: Root | null = null;
let seed = 0;

function emit() {
  listeners.forEach((l) => l([...items]));
}

function ensureRoot() {
  if (root || typeof document === "undefined") return;
  const el = document.createElement("div");
  el.className = "pxui-toast-root";
  document.body.appendChild(el);
  root = createRoot(el);
  root.render(<ToastHost />);
}

function remove(id: string) {
  const it = items.find((i) => i.id === id);
  if (!it || it.leaving) return;
  it.leaving = true;
  emit();
  window.setTimeout(() => {
    items = items.filter((i) => i.id !== id);
    emit();
    it.onClose?.();
  }, 200);
}

function open(opts: ToastOptions): string {
  ensureRoot();
  const id = opts.key ?? `pxui-toast-${++seed}`;
  const existing = items.find((i) => i.id === id);
  if (existing) {
    Object.assign(existing, opts, { leaving: false });
  } else {
    items.push({ ...opts, id });
  }
  emit();
  return id;
}

const ToastView: React.FC<{ item: ToastItem }> = ({ item }) => {
  const type = item.type ?? "info";
  const duration = item.duration ?? DEFAULT_DURATION;
  useEffect(() => {
    if (!duration) return;
    const t = window.setTimeout(() => remove(item.id), duration);
    return () => window.clearTimeout(t);
  }, [item.id, duration, item.title]);
  return (
    <div className={cx("pxui-toast", `pxui-toast--${type}`, item.leaving && "pxui-toast--leaving")} role="status">
      <span className="pxui-toast__icon">
        <Icon name={item.icon ?? ICONS[type]} size={14} />
      </span>
      <div className="pxui-toast__content">
        <div className="pxui-toast__title">{item.title}</div>
        {item.description && <div className="pxui-toast__desc">{item.description}</div>}
      </div>
      {item.closable !== false && (
        <button type="button" className="pxui-toast__close" aria-label="close" onClick={() => remove(item.id)}>
          <Icon name="close" size={10} />
        </button>
      )}
    </div>
  );
};

const POSITIONS: ToastPosition[] = ["top-right", "top-left", "top", "bottom-right", "bottom-left", "bottom"];

const ToastHost: React.FC = () => {
  const [list, setList] = useState<ToastItem[]>(items);
  useEffect(() => {
    listeners.push(setList);
    return () => {
      listeners = listeners.filter((l) => l !== setList);
    };
  }, []);
  return (
    <>
      {POSITIONS.map((pos) => {
        const group = list.filter((i) => (i.position ?? "top-right") === pos);
        if (!group.length) return null;
        return (
          <div key={pos} className={cx("pxui-toast-container", `pxui-toast-container--${pos}`)}>
            {group.map((it) => (
              <ToastView key={it.id} item={it} />
            ))}
          </div>
        );
      })}
    </>
  );
};

type Shortcut = (title: React.ReactNode, opts?: Omit<ToastOptions, "title" | "type">) => string;

/** 命令式全局通知 */
export const toast = {
  open,
  info: ((title, opts) => open({ ...opts, title, type: "info" })) as Shortcut,
  success: ((title, opts) => open({ ...opts, title, type: "success" })) as Shortcut,
  warning: ((title, opts) => open({ ...opts, title, type: "warning" })) as Shortcut,
  error: ((title, opts) => open({ ...opts, title, type: "error" })) as Shortcut,
  close: remove,
  destroyAll: () => {
    items = [];
    emit();
  },
};
