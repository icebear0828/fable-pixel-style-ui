import React, { useState } from "react";
import { cx } from "../utils/cx";
import { Icon } from "../Icon/Icon";

export interface PaginationProps {
  current?: number;
  defaultCurrent?: number;
  total: number;
  pageSize?: number;
  onChange?: (page: number, pageSize: number) => void;
  size?: "sm" | "md";
  /** 显示总数 */
  showTotal?: boolean | ((total: number, range: [number, number]) => React.ReactNode);
  /** 快速跳转 */
  showJumper?: boolean;
  /** 简洁模式 */
  simple?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export const Pagination: React.FC<PaginationProps> = ({ current, defaultCurrent = 1, total, pageSize = 10, onChange, size = "md", showTotal, showJumper, simple, disabled, className, style }) => {
  const [inner, setInner] = useState(defaultCurrent);
  const page = current ?? inner;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const go = (p: number) => {
    const next = Math.min(pages, Math.max(1, p));
    if (next === page) return;
    if (current === undefined) setInner(next);
    onChange?.(next, pageSize);
  };

  let items: (number | "l" | "r")[];
  if (pages <= 7) items = range(1, pages);
  else if (page <= 4) items = [...range(1, 5), "r", pages];
  else if (page >= pages - 3) items = [1, "l", ...range(pages - 4, pages)];
  else items = [1, "l", page - 1, page, page + 1, "r", pages];

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);

  return (
    <nav className={cx("pxui-pagination", size === "sm" && "pxui-pagination--sm", className)} style={style} aria-label="pagination">
      {showTotal && <span className="pxui-pagination__total">{typeof showTotal === "function" ? showTotal(total, [from, to]) : `TOTAL ${total}`}</span>}
      <button type="button" className="pxui-pagination__item" disabled={disabled || page <= 1} onClick={() => go(page - 1)} aria-label="prev">
        <Icon name="chevronLeft" size={10} />
      </button>
      {simple ? (
        <span className="pxui-pagination__ellipsis">
          {page} / {pages}
        </span>
      ) : (
        items.map((it, i) =>
          typeof it === "number" ? (
            <button
              key={it}
              type="button"
              className={cx("pxui-pagination__item", it === page && "pxui-pagination__item--active")}
              aria-current={it === page ? "page" : undefined}
              disabled={disabled}
              onClick={() => go(it)}
            >
              {it}
            </button>
          ) : (
            <button key={`${it}${i}`} type="button" className="pxui-pagination__item pxui-pagination__ellipsis" disabled={disabled} aria-label={it === "l" ? "prev 5" : "next 5"} onClick={() => go(it === "l" ? page - 5 : page + 5)}>
              ···
            </button>
          ),
        )
      )}
      <button type="button" className="pxui-pagination__item" disabled={disabled || page >= pages} onClick={() => go(page + 1)} aria-label="next">
        <Icon name="chevronRight" size={10} />
      </button>
      {showJumper && (
        <span className="pxui-pagination__jump">
          GO
          <input
            className="pxui-pagination__item"
            style={{ width: 48, filter: "none", cursor: "text", textAlign: "center" }}
            disabled={disabled}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const v = Number((e.target as HTMLInputElement).value);
                if (!Number.isNaN(v)) go(v);
                (e.target as HTMLInputElement).value = "";
              }
            }}
            aria-label="jump to page"
          />
        </span>
      )}
    </nav>
  );
};
Pagination.displayName = "Pagination";
