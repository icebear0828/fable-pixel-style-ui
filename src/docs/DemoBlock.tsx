import React, { useState } from "react";
import { Icon, Tooltip } from "@/components";
import { CodeBlock } from "./CodeBlock";
import type { DemoItem } from "./types";

export const DemoBlock: React.FC<{ demo: DemoItem; index: number }> = ({ demo, index }) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(demo.code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <section className="demo-block" id={`demo-${index}`}>
      <div className="demo-block__preview">{demo.render()}</div>
      <div className="demo-block__meta">
        <div className="demo-block__text">
          <h4 className="demo-block__title">
            <span className="demo-block__num">{String(index + 1).padStart(2, "0")}</span>
            {demo.title}
          </h4>
          {demo.desc && <p className="demo-block__desc">{demo.desc}</p>}
        </div>
        <div className="demo-block__actions">
          <Tooltip title={copied ? "COPIED!" : "复制代码"}>
            <button type="button" className="demo-block__btn" onClick={copy} aria-label="copy code">
              <Icon name={copied ? "check" : "copy"} size={12} />
            </button>
          </Tooltip>
          <Tooltip title={showCode ? "收起代码" : "展开代码"}>
            <button type="button" className={`demo-block__btn ${showCode ? "demo-block__btn--active" : ""}`} onClick={() => setShowCode((s) => !s)} aria-label="toggle code" aria-expanded={showCode}>
              <Icon name="code" size={12} />
            </button>
          </Tooltip>
        </div>
      </div>
      {showCode && (
        <div className="demo-block__code">
          <CodeBlock code={demo.code} />
        </div>
      )}
    </section>
  );
};
