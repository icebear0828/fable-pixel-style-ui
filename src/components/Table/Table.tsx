import React, { useMemo, useState } from "react";
import { cx } from "../utils/cx";
import { Icon } from "../Icon/Icon";
import { Pagination } from "../Pagination/Pagination";
import { Spinner } from "../Loading/Loading";

export interface TableColumn<T = any> {
  key: string;
  title: React.ReactNode;
  dataIndex?: keyof T & string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: number | string;
  align?: "left" | "center" | "right";
  /** 开启排序（true 使用默认比较，或传入比较函数） */
  sorter?: boolean | ((a: T, b: T) => number);
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  dataSource: T[];
  rowKey?: keyof T | ((record: T) => string | number);
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
  striped?: boolean;
  loading?: boolean;
  emptyText?: React.ReactNode;
  /** 分页：false 关闭，或传 pageSize */
  pagination?: false | { pageSize?: number };
  onRowClick?: (record: T, index: number) => void;
  className?: string;
  style?: React.CSSProperties;
  /** 最大高度（超出滚动，表头吸顶） */
  maxHeight?: number | string;
}

export function Table<T = any>({
  columns,
  dataSource,
  rowKey,
  size = "md",
  bordered,
  striped,
  loading,
  emptyText = "NO DATA",
  pagination = false,
  onRowClick,
  className,
  style,
  maxHeight,
}: TableProps<T>) {
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = pagination ? pagination.pageSize ?? 10 : dataSource.length;

  const sorted = useMemo(() => {
    if (!sort) return dataSource;
    const col = columns.find((c) => c.key === sort.key);
    if (!col || !col.sorter) return dataSource;
    const cmp =
      typeof col.sorter === "function"
        ? col.sorter
        : (a: T, b: T) => {
            const av = col.dataIndex ? (a as any)[col.dataIndex] : "";
            const bv = col.dataIndex ? (b as any)[col.dataIndex] : "";
            return av > bv ? 1 : av < bv ? -1 : 0;
          };
    const arr = [...dataSource].sort(cmp);
    return sort.dir === "asc" ? arr : arr.reverse();
  }, [dataSource, sort, columns]);

  const rows = pagination ? sorted.slice((page - 1) * pageSize, page * pageSize) : sorted;

  const getKey = (r: T, i: number) => {
    if (typeof rowKey === "function") return rowKey(r);
    if (rowKey) return String((r as any)[rowKey]);
    return i;
  };

  const toggleSort = (c: TableColumn<T>) => {
    if (!c.sorter) return;
    setSort((s) => (s?.key !== c.key ? { key: c.key, dir: "asc" } : s.dir === "asc" ? { key: c.key, dir: "desc" } : null));
  };

  return (
    <div className={cx("pxui-table-wrap", className)} style={{ maxHeight, ...style }}>
      <table className={cx("pxui-table", `pxui-table--${size}`, bordered && "pxui-table--bordered", striped && "pxui-table--striped")}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                style={{ width: c.width }}
                className={cx(c.align && `pxui-table__cell--${c.align}`, c.sorter && "pxui-table__th--sortable")}
                onClick={() => toggleSort(c)}
                aria-sort={sort?.key === c.key ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}
              >
                {c.title}
                {c.sorter && (
                  <span className={cx("pxui-table__sort", sort?.key === c.key && "pxui-table__sort--active")}>
                    <Icon name={sort?.key === c.key && sort.dir === "desc" ? "chevronDown" : "chevronUp"} size={8} />
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="pxui-table__empty">
                  <Icon name="ghost" size={32} />
                  {emptyText}
                </div>
              </td>
            </tr>
          ) : (
            rows.map((r, i) => (
              <tr key={getKey(r, i)} onClick={onRowClick ? () => onRowClick(r, i) : undefined} style={onRowClick ? { cursor: "pointer" } : undefined}>
                {columns.map((c) => {
                  const v = c.dataIndex ? (r as any)[c.dataIndex] : undefined;
                  return (
                    <td key={c.key} className={cx(c.align && `pxui-table__cell--${c.align}`)}>
                      {c.render ? c.render(v, r, i) : v}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {pagination && sorted.length > pageSize && (
        <div className="pxui-table__footer">
          <Pagination size="sm" current={page} total={sorted.length} pageSize={pageSize} onChange={setPage} />
        </div>
      )}
      {loading && (
        <div className="pxui-table__loading">
          <Spinner />
        </div>
      )}
    </div>
  );
}
Table.displayName = "Table";
