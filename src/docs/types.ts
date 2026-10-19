import type React from "react";
import type { IconName } from "@/components";

export type CategoryKey = "general" | "form" | "data" | "feedback";

export interface DemoItem {
  title: string;
  desc?: string;
  code: string;
  render: () => React.ReactNode;
}

export interface PropRow {
  name: string;
  desc: string;
  type: string;
  default?: string;
}

export interface PropTable {
  title?: string;
  rows: PropRow[];
}

export interface ComponentDoc {
  /** 路由 key，如 button */
  key: string;
  /** 英文名 */
  name: string;
  /** 中文名 */
  cn: string;
  /** 一句话描述 */
  desc: string;
  category: CategoryKey;
  icon: IconName;
  /** 首页总览的迷你预览 */
  preview: () => React.ReactNode;
  demos: DemoItem[];
  props?: PropTable[];
}

export const CATEGORIES: { key: CategoryKey; label: string; en: string }[] = [
  { key: "general", label: "通用", en: "GENERAL" },
  { key: "form", label: "数据录入", en: "FORM" },
  { key: "data", label: "数据展示", en: "DATA" },
  { key: "feedback", label: "反馈", en: "FEEDBACK" },
];
