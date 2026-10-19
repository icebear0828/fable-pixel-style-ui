import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cx } from "../utils/cx";
import { Icon } from "../Icon/Icon";

export type SelectValue = string | number;
export type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  label: React.ReactNode;
  value: SelectValue;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: SelectValue | SelectValue[];
  defaultValue?: SelectValue | SelectValue[];
  onChange?: (value: any, option?: SelectOption | SelectOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: SelectSize;
  status?: "default" | "error";
  allowClear?: boolean;
  /** 多选 */
  multiple?: boolean;
  block?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** 无数据文案 */
  emptyText?: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "请选择",
  disabled,
  size = "md",
  status = "default",
  allowClear,
  multiple,
  block,
  className,
  style,
  emptyText = "No Data",
}) => {
  const [inner, setInner] = useState<SelectValue | SelectValue[] | undefined>(defaultValue ?? (multiple ? [] : undefined));
  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const selectedList = multiple ? (Array.isArray(current) ? current : []) : [];
  const selectedOne = !multiple ? options.find((o) => o.value === current) : undefined;

  const updatePos = () => {
    const r = triggerRef.current?.getBoundingClientRect();
    if (!r) return;
    const menuH = menuRef.current?.offsetHeight ?? 0;
    const below = window.innerHeight - r.bottom;
    const top = menuH && below < menuH + 8 && r.top > menuH ? r.top - menuH - 6 : r.bottom + 6;
    setPos({ top, left: r.left, width: r.width });
  };

  useLayoutEffect(() => {
    if (open) updatePos();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onScroll = () => updatePos();
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open]);

  const commit = (v: SelectValue | SelectValue[] | undefined) => {
    if (!isControlled) setInner(v);
    if (multiple) {
      const arr = (v as SelectValue[]) ?? [];
      onChange?.(arr, options.filter((o) => arr.includes(o.value)));
    } else {
      onChange?.(v, options.find((o) => o.value === v));
    }
  };

  const pick = (opt: SelectOption) => {
    if (opt.disabled) return;
    if (multiple) {
      const next = selectedList.includes(opt.value) ? selectedList.filter((x) => x !== opt.value) : [...selectedList, opt.value];
      commit(next);
    } else {
      commit(opt.value);
      setOpen(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return setOpen(true);
      const dir = e.key === "ArrowDown" ? 1 : -1;
      let i = active;
      for (let n = 0; n < options.length; n++) {
        i = (i + dir + options.length) % options.length;
        if (!options[i].disabled) break;
      }
      setActive(i);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) setOpen(true);
      else if (active >= 0) pick(options[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hasValue = multiple ? selectedList.length > 0 : selectedOne !== undefined;

  return (
    <div
      className={cx(
        "pxui-select",
        size !== "md" && `pxui-select--${size}`,
        open && "pxui-select--open",
        disabled && "pxui-select--disabled",
        status === "error" && "pxui-select--error",
        block && "pxui-select--block",
        className,
      )}
      style={style}
    >
      <button
        ref={triggerRef}
        type="button"
        className="pxui-select__trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <span className="pxui-select__value">
          {multiple ? (
            selectedList.length ? (
              selectedList.map((v) => {
                const o = options.find((x) => x.value === v);
                return (
                  <span key={String(v)} className="pxui-select__tag">
                    {o?.label ?? v}
                    <span
                      role="button"
                      tabIndex={-1}
                      aria-label="remove"
                      className="pxui-select__tag-remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        commit(selectedList.filter((x) => x !== v));
                      }}
                    >
                      <Icon name="close" size={8} />
                    </span>
                  </span>
                );
              })
            ) : (
              <span className="pxui-select__placeholder">{placeholder}</span>
            )
          ) : selectedOne ? (
            selectedOne.label
          ) : (
            <span className="pxui-select__placeholder">{placeholder}</span>
          )}
        </span>
        {allowClear && hasValue && !disabled ? (
          <span
            role="button"
            aria-label="clear"
            className="pxui-select__clear"
            onClick={(e) => {
              e.stopPropagation();
              commit(multiple ? [] : undefined);
            }}
          >
            <Icon name="close" size={10} />
          </span>
        ) : (
          <span className="pxui-select__arrow">
            <Icon name="chevronDown" size={12} />
          </span>
        )}
      </button>
      {open &&
        pos &&
        createPortal(
          <ul ref={menuRef} className="pxui-select__menu" role="listbox" style={{ top: pos.top, left: pos.left, width: pos.width }}>
            {options.length === 0 && <li className="pxui-select__empty">{emptyText}</li>}
            {options.map((opt, i) => {
              const selected = multiple ? selectedList.includes(opt.value) : opt.value === current;
              return (
                <li
                  key={String(opt.value)}
                  role="option"
                  aria-selected={selected}
                  className={cx(
                    "pxui-select__option",
                    selected && "pxui-select__option--selected",
                    i === active && "pxui-select__option--active",
                    opt.disabled && "pxui-select__option--disabled",
                  )}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => pick(opt)}
                >
                  <span>{opt.label}</span>
                  {selected && <Icon name="check" size={12} />}
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </div>
  );
};
Select.displayName = "Select";
