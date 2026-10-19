import React, { useMemo, useState } from "react";
import { Icon } from "@/components";

type Tok = { t: string; c?: string };

const KEYWORDS = new Set([
  "import", "from", "export", "const", "let", "var", "function", "return", "new", "if", "else", "true", "false", "null", "undefined", "async", "await", "default", "type", "interface", "extends", "typeof", "as",
]);

const RE =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|\{\/\*[\s\S]*?\*\/\})|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(<\/?)([A-Za-z][\w.]*)|([A-Za-z_$][\w$]*)(?=\s*=[^=>])|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)|([{}()[\]<>/=;,.:|?!&+*-])|(\s+)|(.)/g;

export function tokenize(code: string): Tok[] {
  const out: Tok[] = [];
  let m: RegExpExecArray | null;
  RE.lastIndex = 0;
  while ((m = RE.exec(code))) {
    if (m[1]) out.push({ t: m[1], c: "cm" });
    else if (m[2]) out.push({ t: m[2], c: "str" });
    else if (m[3]) {
      out.push({ t: m[3], c: "pun" });
      out.push({ t: m[4], c: "tag" });
    } else if (m[5]) out.push({ t: m[5], c: "attr" });
    else if (m[6]) out.push({ t: m[6], c: "num" });
    else if (m[7]) out.push({ t: m[7], c: KEYWORDS.has(m[7]) ? "kw" : /^[A-Z]/.test(m[7]) ? "cls" : undefined });
    else if (m[8]) out.push({ t: m[8], c: "pun" });
    else out.push({ t: m[0] });
  }
  return out;
}

export interface CodeBlockProps {
  code: string;
  lang?: string;
  /** 显示复制按钮 */
  copyable?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, lang = "tsx", copyable = true, className, style }) => {
  const [copied, setCopied] = useState(false);
  const tokens = useMemo(() => tokenize(code.trim()), [code]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <div className={`code-block ${className ?? ""}`} style={style}>
      <div className="code-block__bar">
        <span className="code-block__dots">
          <i style={{ background: "#ff004d" }} />
          <i style={{ background: "#ffec27" }} />
          <i style={{ background: "#00e436" }} />
        </span>
        <span className="code-block__lang">{lang}</span>
        {copyable && (
          <button type="button" className="code-block__copy" onClick={copy}>
            <Icon name={copied ? "check" : "copy"} size={10} />
            {copied ? "COPIED" : "COPY"}
          </button>
        )}
      </div>
      <pre>
        <code>
          {tokens.map((tk, i) =>
            tk.c ? (
              <span key={i} className={`tk-${tk.c}`}>
                {tk.t}
              </span>
            ) : (
              <React.Fragment key={i}>{tk.t}</React.Fragment>
            ),
          )}
        </code>
      </pre>
    </div>
  );
};
