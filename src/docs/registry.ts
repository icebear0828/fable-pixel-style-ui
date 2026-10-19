import { useEffect, useState } from "react";
import { generalDocs } from "./demos/general";
import { formDocs } from "./demos/form";
import { dataDocs } from "./demos/data";
import { feedbackDocs } from "./demos/feedback";
import { CATEGORIES, type ComponentDoc, type CategoryKey } from "./types";

export const VERSION = "0.1.0";
export const PKG = "pixelnest-ui";
export const REPO = "https://github.com/guokaigdg/animal-island-ui";

export const ALL_DOCS: ComponentDoc[] = [...generalDocs, ...formDocs, ...dataDocs, ...feedbackDocs];

export const docsByCategory = (c: CategoryKey) => ALL_DOCS.filter((d) => d.category === c);
export const findDoc = (key: string) => ALL_DOCS.find((d) => d.key === key);
export const categoryLabel = (c: CategoryKey) => CATEGORIES.find((x) => x.key === c)!;

export const GUIDES = [
  { key: "start", label: "快速开始", en: "START" },
  { key: "tokens", label: "设计令牌", en: "TOKENS" },
  { key: "storybook", label: "Storybook", en: "STORYBOOK" },
] as const;
export type GuideKey = (typeof GUIDES)[number]["key"];

/** Storybook 文档地址（本地 npm run storybook 后可用） */
export const storybookUrl = (doc: ComponentDoc) => {
  const cat = categoryLabel(doc.category).en.toLowerCase();
  return `http://localhost:6006/?path=/docs/${cat}-${doc.key}--docs`;
};

/* ---------------- hash router ---------------- */
const read = () => (typeof window === "undefined" ? "/" : window.location.hash.replace(/^#/, "") || "/");

export function useHashRoute() {
  const [path, setPath] = useState(read);
  useEffect(() => {
    const on = () => {
      setPath(read());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return path;
}

export const navigate = (path: string) => {
  window.location.hash = path;
};
export const href = (path: string) => `#${path}`;
