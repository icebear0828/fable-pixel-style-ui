import React from "react";
import { Button, Icon, Sprite, CAT_SPRITE, SLIME_SPRITE, GHOST_SPRITE, Tag, Typewriter, type IconName } from "@/components";
import { ALL_DOCS, VERSION, PKG, href } from "./registry";
import { CATEGORIES } from "./types";
import { CodeBlock } from "./CodeBlock";

const CLOUD = {
  grid: ["....####........", "..########..####", ".###########*###", "################", "################", ".##############.", "...#########...."],
  palette: { "#": "#ffffff", "*": "#ffffff" },
};

const FEATURES: { icon: IconName; color: string; title: string; desc: string }[] = [
  { icon: "palette", color: "#ffec27", title: "PICO-8 调色板", desc: "18 色复古调色板 + 语义色，所有组件共享同一套 CSS 变量，一处修改全局换肤。" },
  { icon: "code", color: "#29adff", title: "像素边框系统", desc: "4×4 SVG border-image 实现缺角像素边框，随 border-width 等比缩放，不依赖图片资源。" },
  { icon: "bolt", color: "#00e436", title: "阶梯动效", desc: "所有过渡与动画使用 steps() 时间函数，还原 8-bit 游戏的帧动画手感，尊重 reduced-motion。" },
  { icon: "cat", color: "#ff77a8", title: "字符网格像素画", desc: "Icon 与 Sprite 组件直接用字符串网格绘制 SVG，40+ 内置图标，自定义像素画只需几行。" },
  { icon: "book", color: "#ffccaa", title: "Storybook 文档", desc: "每个组件都有 stories 与 autodocs，Controls 面板可交互调试全部 props。" },
  { icon: "shield", color: "#83769c", title: "TypeScript & A11y", desc: "完整类型导出，键盘导航、ARIA 角色与焦点样式开箱即用。" },
];

export const Home: React.FC = () => (
  <>
    <section className="hero">
      <Sprite {...CLOUD} scale={4} className="cloud" style={{ top: 60, animationDuration: "70s", animationDelay: "-10s" }} />
      <Sprite {...CLOUD} scale={3} className="cloud" style={{ top: 160, animationDuration: "95s", animationDelay: "-50s" }} />
      <Sprite {...CLOUD} scale={2} className="cloud" style={{ top: 110, animationDuration: "120s", animationDelay: "-80s" }} />
      <div className="hero__sun" />
      <div className="hero__inner">
        <div className="hero__text">
          <div className="hero__kicker">
            <Icon name="star" size={10} /> v{VERSION} · {ALL_DOCS.length} COMPONENTS
          </div>
          <h1 className="hero__title">
            PIXELNEST <em>UI</em>
          </h1>
          <p className="hero__sub">
            一套<b>像素风格</b>的 React + TypeScript 组件库。缺角像素边框、PICO-8 调色板、steps() 阶梯动效——把 8-bit 游戏的手感带进现代 Web 应用。
            <br />
            <span style={{ fontFamily: "var(--pxui-font)", fontSize: 10, display: "inline-block", marginTop: 10 }}>
              <Typewriter text={["> npm install pixelnest-ui", "> PRESS START"]} speed={55} loop cursor />
            </span>
          </p>
          <div className="hero__actions">
            <Button type="warning" size="lg" href={href("/guide/start")} icon={<Icon name="play" />}>
              START
            </Button>
            <Button size="lg" href={href("/components/button")} icon={<Icon name="menu" />}>
              COMPONENTS
            </Button>
            <Button type="ghost" size="lg" href={href("/guide/storybook")} icon={<Icon name="book" />}>
              STORYBOOK
            </Button>
          </div>
          <div className="hero__stats">
            <div>
              <b>{ALL_DOCS.length}</b>COMPONENTS
            </div>
            <div>
              <b>40+</b>PIXEL ICONS
            </div>
            <div>
              <b>18</b>PALETTE COLORS
            </div>
            <div>
              <b>0</b>IMAGE ASSETS
            </div>
          </div>
        </div>
        <div className="hero__stage">
          <Sprite {...GHOST_SPRITE} scale={5} animation="float" />
          <Sprite {...CAT_SPRITE} scale={7} animation="bounce" />
          <Sprite {...SLIME_SPRITE} scale={5} animation="bounce" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>
      <div className="hero__ground">
        <div className="hero__grass" />
      </div>
    </section>

    <div className="page">
      <h2 className="section-title">
        <Icon name="star" size={14} /> WHY PIXELNEST
      </h2>
      <div className="features">
        {FEATURES.map((f) => (
          <div className="feature" key={f.title}>
            <div className="feature__icon" style={{ background: f.color }}>
              <Icon name={f.icon} size={20} />
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">
        <Icon name="bolt" size={14} /> QUICK START
      </h2>
      <div className="steps">
        <div className="step">
          <div className="step__num">1</div>
          <h3>INSTALL</h3>
          <CodeBlock lang="bash" code={`npm install ${PKG}\n# or\npnpm add ${PKG}`} />
        </div>
        <div className="step">
          <div className="step__num">2</div>
          <h3>IMPORT STYLE</h3>
          <CodeBlock
            code={`// 入口文件引入一次样式（含字体与设计令牌）
import "${PKG}/style";`}
          />
        </div>
        <div className="step">
          <div className="step__num">3</div>
          <h3>USE</h3>
          <CodeBlock
            code={`import { Button, Card, toast } from "${PKG}";

<Card title="INVENTORY">
  <Button type="primary" onClick={() => toast.success("SAVED!")}>
    SAVE GAME
  </Button>
</Card>`}
          />
        </div>
      </div>

      <h2 className="section-title">
        <Icon name="menu" size={14} /> COMPONENT OVERVIEW
      </h2>
      {CATEGORIES.map((c) => {
        const docs = ALL_DOCS.filter((d) => d.category === c.key);
        return (
          <div key={c.key} style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Tag color="ink" size="lg" variant="solid">
                {c.en}
              </Tag>
              <span style={{ color: "#5f574f" }}>
                {c.label} · {docs.length} 个组件
              </span>
            </div>
            <div className="gallery">
              {docs.map((d) => (
                <a key={d.key} className="gallery__item" href={href(`/components/${d.key}`)}>
                  <div className="gallery__preview">{d.preview()}</div>
                  <div className="gallery__name">
                    <span>
                      <Icon name={d.icon} size={10} /> {d.name}
                    </span>
                    <small>{d.cn}</small>
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </>
);
