import React, { useEffect, useMemo, useState } from "react";
import { Icon, Input, Sprite, CAT_SPRITE, Tag } from "@/components";
import { CATEGORIES } from "./types";
import { ALL_DOCS, GUIDES, VERSION, REPO, href } from "./registry";

interface SidebarProps {
  path: string;
  onNavigate?: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ path, onNavigate, className }) => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ALL_DOCS;
    return ALL_DOCS.filter((d) => d.name.toLowerCase().includes(s) || d.cn.includes(s) || d.key.includes(s));
  }, [q]);

  return (
    <aside className={`sidebar ${className ?? ""}`}>
      <a className="sidebar__logo" href={href("/")} onClick={onNavigate}>
        <Sprite {...CAT_SPRITE} scale={2.5} />
        <div>
          <div className="sidebar__name">
            PIXELNEST
            <br />
            UI
          </div>
          <span className="sidebar__ver">v{VERSION}</span>
        </div>
      </a>
      <div className="sidebar__search">
        <Input size="sm" block placeholder="SEARCH..." prefix={<Icon name="search" size={10} />} allowClear value={q} onChange={setQ} />
      </div>
      <nav className="nav">
        {!q && (
          <>
            <div className="nav__cat">GUIDE</div>
            {GUIDES.map((g) => {
              const p = `/guide/${g.key}`;
              return (
                <a key={g.key} className={`nav__item ${path === p ? "nav__item--active" : ""}`} href={href(p)} onClick={onNavigate}>
                  <span className="nav__icon">
                    <Icon name={g.key === "start" ? "flag" : g.key === "tokens" ? "palette" : "book"} size={12} />
                  </span>
                  <span className="nav__en">{g.en}</span>
                  <span className="nav__cn">{g.label}</span>
                </a>
              );
            })}
          </>
        )}
        {CATEGORIES.map((c) => {
          const docs = filtered.filter((d) => d.category === c.key);
          if (!docs.length) return null;
          return (
            <React.Fragment key={c.key}>
              <div className="nav__cat">
                {c.en} · {c.label}
              </div>
              {docs.map((d) => {
                const p = `/components/${d.key}`;
                return (
                  <a key={d.key} className={`nav__item ${path === p ? "nav__item--active" : ""}`} href={href(p)} onClick={onNavigate}>
                    <span className="nav__icon">
                      <Icon name={d.icon} size={12} />
                    </span>
                    <span className="nav__en">{d.name}</span>
                    <span className="nav__cn">{d.cn}</span>
                  </a>
                );
              })}
            </React.Fragment>
          );
        })}
        {q && filtered.length === 0 && (
          <div style={{ padding: "24px 20px", textAlign: "center", color: "#5f574f" }}>
            <Icon name="ghost" size={28} />
            <div className="px" style={{ fontSize: 9, marginTop: 10 }}>
              NOT FOUND
            </div>
          </div>
        )}
      </nav>
      <div className="sidebar__foot">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag size="sm" color="blue" variant="light">
            REACT 19
          </Tag>
          <Tag size="sm" color="green" variant="light">
            TS
          </Tag>
          <Tag size="sm" color="pink" variant="light">
            STORYBOOK
          </Tag>
        </div>
        <div style={{ marginTop: 10 }}>
          灵感来自{" "}
          <a href={REPO} target="_blank" rel="noreferrer">
            animal-island-ui
          </a>
        </div>
      </div>
    </aside>
  );
};

export const Layout: React.FC<{ path: string; children: React.ReactNode }> = ({ path, children }) => {
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    setDrawer(false);
  }, [path]);
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  return (
    <div className="site">
      <Sidebar path={path} />
      {drawer && (
        <>
          <div className="drawer-mask" onClick={() => setDrawer(false)} />
          <Sidebar path={path} className="sidebar--drawer" onNavigate={() => setDrawer(false)} />
        </>
      )}
      <div className="main">
        <header className="topbar">
          <button type="button" className="topbar__menu" aria-label="menu" onClick={() => setDrawer(true)}>
            <Icon name="menu" size={14} />
          </button>
          <a href={href("/")} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Sprite {...CAT_SPRITE} scale={1.5} />
            <span className="px" style={{ fontSize: 10 }}>
              PIXELNEST UI
            </span>
          </a>
          <a href={REPO} target="_blank" rel="noreferrer" style={{ marginLeft: "auto", display: "inline-flex" }} aria-label="github">
            <Icon name="github" size={18} />
          </a>
        </header>
        {children}
        <footer className="footer">
          <div className="px">PIXELNEST UI · MADE WITH ♥ AND 4×4 PIXELS</div>
          <div style={{ marginTop: 8 }}>
            MIT License · 像素风格 React 组件库 · 设计语言参考{" "}
            <a href={REPO} target="_blank" rel="noreferrer">
              animal-island-ui
            </a>{" "}
            的站点结构重新原创实现
          </div>
        </footer>
      </div>
    </div>
  );
};
