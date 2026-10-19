import React, { useState } from "react";
import { cx } from "../utils/cx";
import { Icon } from "../Icon/Icon";

export interface CollapseItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  extra?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface CollapseProps {
  items: CollapseItem[];
  activeKey?: string[];
  defaultActiveKey?: string[];
  onChange?: (keys: string[]) => void;
  /** 手风琴：同时只展开一项 */
  accordion?: boolean;
  /** 幽灵模式：无外框，每项独立 */
  ghost?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Collapse: React.FC<CollapseProps> = ({ items, activeKey, defaultActiveKey = [], onChange, accordion, ghost, className, style }) => {
  const [inner, setInner] = useState<string[]>(defaultActiveKey);
  const current = activeKey ?? inner;
  const toggle = (k: string) => {
    const isOpen = current.includes(k);
    const next = accordion ? (isOpen ? [] : [k]) : isOpen ? current.filter((x) => x !== k) : [...current, k];
    if (activeKey === undefined) setInner(next);
    onChange?.(next);
  };
  return (
    <div className={cx("pxui-collapse", ghost && "pxui-collapse--ghost", className)} style={style}>
      {items.map((it) => {
        const open = current.includes(it.key);
        return (
          <div key={it.key} className={cx("pxui-collapse__item", open && "pxui-collapse__item--open")}>
            <button type="button" className="pxui-collapse__header" aria-expanded={open} disabled={it.disabled} onClick={() => toggle(it.key)}>
              <span className="pxui-collapse__arrow">
                <Icon name="chevronRight" size={12} />
              </span>
              {it.icon}
              <span className="pxui-collapse__title">{it.label}</span>
              {it.extra && <span className="pxui-collapse__extra">{it.extra}</span>}
            </button>
            <div className="pxui-collapse__panel" aria-hidden={!open}>
              <div className="pxui-collapse__panel-inner">
                <div className="pxui-collapse__content">{it.children}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
Collapse.displayName = "Collapse";
