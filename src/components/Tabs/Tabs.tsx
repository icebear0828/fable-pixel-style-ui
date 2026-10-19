import React, { useState } from "react";
import { cx } from "../utils/cx";

export interface TabItem {
  key: string;
  label: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  /** 卡片页签 / 按钮组 */
  type?: "card" | "button";
  /** 右侧附加内容 */
  extra?: React.ReactNode;
  /** 销毁非激活面板 */
  destroyInactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Tabs: React.FC<TabsProps> = ({ items, activeKey, defaultActiveKey, onChange, type = "card", extra, destroyInactive = true, className, style }) => {
  const [inner, setInner] = useState(defaultActiveKey ?? items[0]?.key);
  const current = activeKey ?? inner;
  const select = (k: string) => {
    if (activeKey === undefined) setInner(k);
    onChange?.(k);
  };
  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    let i = idx;
    for (let n = 0; n < items.length; n++) {
      i = (i + dir + items.length) % items.length;
      if (!items[i].disabled) break;
    }
    select(items[i].key);
    (e.currentTarget.parentElement?.children[i] as HTMLElement)?.focus();
  };
  const active = items.find((i) => i.key === current);
  return (
    <div className={cx("pxui-tabs", `pxui-tabs--${type}`, className)} style={style}>
      <div className="pxui-tabs__nav" role="tablist">
        {items.map((it, idx) => (
          <button
            key={it.key}
            type="button"
            role="tab"
            aria-selected={it.key === current}
            tabIndex={it.key === current ? 0 : -1}
            disabled={it.disabled}
            className={cx("pxui-tabs__tab", it.key === current && "pxui-tabs__tab--active")}
            onClick={() => select(it.key)}
            onKeyDown={(e) => onKeyDown(e, idx)}
          >
            {it.icon}
            {it.label}
          </button>
        ))}
        {extra && <div className="pxui-tabs__extra">{extra}</div>}
      </div>
      {items.some((i) => i.children !== undefined) && (
        <div className="pxui-tabs__content">
          {destroyInactive ? (
            <div key={current} className="pxui-tabs__pane" role="tabpanel">
              {active?.children}
            </div>
          ) : (
            items.map((it) => (
              <div key={it.key} className="pxui-tabs__pane" role="tabpanel" hidden={it.key !== current}>
                {it.children}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
Tabs.displayName = "Tabs";
