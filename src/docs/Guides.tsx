import React from "react";
import { Alert, Button, Card, Icon, PALETTE, Table, Tag, type PaletteColor, type TableColumn } from "@/components";
import { CodeBlock } from "./CodeBlock";
import { ALL_DOCS, PKG, categoryLabel, href, type GuideKey } from "./registry";

const Head: React.FC<{ title: string; cn: string; desc: string }> = ({ title, cn, desc }) => (
  <header className="page__head">
    <div className="page__crumb">
      <a href={href("/")} style={{ textDecoration: "none" }}>
        HOME
      </a>
      <Icon name="chevronRight" size={8} />
      <span>GUIDE</span>
    </div>
    <h1 className="page__title">
      {title} <small>{cn}</small>
    </h1>
    <p className="page__desc">{desc}</p>
  </header>
);

/* ---------------- 快速开始 ---------------- */
const Start: React.FC = () => (
  <div className="page prose">
    <Head title="GETTING STARTED" cn="快速开始" desc="三步接入 PixelNest UI，把像素风格带进你的 React 项目。" />
    <h2 className="section-title">
      <Icon name="download" size={12} /> INSTALL
    </h2>
    <CodeBlock lang="bash" code={`npm install ${PKG}\n# pnpm add ${PKG}\n# yarn add ${PKG}`} />

    <h2 className="section-title">
      <Icon name="palette" size={12} /> IMPORT STYLE
    </h2>
    <Alert type="warning" title="IMPORTANT" description={`请务必在入口文件引入 "${PKG}/style"，否则组件将没有像素边框、字体与设计令牌。`} style={{ marginBottom: 16 }} />
    <CodeBlock
      code={`// main.tsx
import "${PKG}/style";   // 设计令牌 + 全部组件样式 + Press Start 2P 字体`}
    />

    <h2 className="section-title">
      <Icon name="play" size={12} /> USAGE
    </h2>
    <CodeBlock
      code={`import { Button, Card, Progress, toast } from "${PKG}";

export default function App() {
  return (
    <Card title="PLAYER STATUS" extra={<Tag color="yellow">LV.42</Tag>}>
      <Progress percent={72} variant="hp" />
      <Button type="primary" onClick={() => toast.success("SAVED!")}>
        SAVE GAME
      </Button>
    </Card>
  );
}`}
    />

    <h2 className="section-title">
      <Icon name="book" size={12} /> DESIGN PRINCIPLES
    </h2>
    <div className="features" style={{ marginBottom: 32 }}>
      {[
        ["#ffec27", "4px 网格", "所有边框、投影、间距都是 4px 的整数倍；border-width 变化时像素边框等比缩放。"],
        ["#29adff", "硬边 · 无圆角", "没有 border-radius 与模糊阴影。圆形由 20 边形 clip-path 像素圆近似。"],
        ["#00e436", "深色描边", "所有可交互元素都有 ink 色描边，亮色填充 + 内阴影营造 3D 按键感。"],
        ["#ff77a8", "阶梯动效", "过渡与动画一律使用 steps()，像素字体标签 + 正文使用可读的系统字体。"],
      ].map(([c, t, d]) => (
        <div className="feature" key={t}>
          <div className="feature__icon" style={{ background: c }}>
            <Icon name="check" size={18} />
          </div>
          <h3>{t}</h3>
          <p>{d}</p>
        </div>
      ))}
    </div>

    <h2 className="section-title">
      <Icon name="info" size={12} /> FONT & BROWSER
    </h2>
    <p>
      像素字体使用 Google Fonts 的 <code>Press Start 2P</code>（仅拉丁字符），中文自动回退到系统字体（如安装了 <code>Zpix</code> / <code>Fusion Pixel</code>
      会优先使用）。你可以通过覆盖 <code>--pxui-font</code> 使用自己的像素字体。
    </p>
    <p>
      依赖 <code>border-image</code>、<code>clip-path</code>、<code>color-mix()</code>，支持 Chrome 111+ / Safari 16.4+ / Firefox 113+。
    </p>
    <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
      <Button type="primary" href={href("/components/button")} icon={<Icon name="arrowRight" />}>
        BROWSE COMPONENTS
      </Button>
      <Button href={href("/guide/tokens")} icon={<Icon name="palette" />}>
        DESIGN TOKENS
      </Button>
    </div>
  </div>
);

/* ---------------- 设计令牌 ---------------- */
const SEMANTIC: { name: string; v: string; desc: string }[] = [
  { name: "--pxui-primary", v: "blue", desc: "主色（按钮、选中态、焦点边框）" },
  { name: "--pxui-success", v: "green", desc: "成功 / 开关开启 / HP 充足" },
  { name: "--pxui-warning", v: "yellow", desc: "警告 / 评分星星 / 丝带标题" },
  { name: "--pxui-danger", v: "red", desc: "危险 / 徽标 / HP 低" },
  { name: "--pxui-info", v: "indigo", desc: "信息" },
  { name: "--pxui-ink", v: "ink", desc: "描边、文字、投影" },
  { name: "--pxui-paper", v: "paper", desc: "页面背景" },
  { name: "--pxui-sand", v: "sand", desc: "次级表面、hover 背景" },
];

const Tokens: React.FC = () => {
  const colors = Object.entries(PALETTE) as [PaletteColor, string][];
  return (
    <div className="page prose">
      <Head title="DESIGN TOKENS" cn="设计令牌" desc="调色板、语义色、像素边框与动效的全部 CSS 变量，覆盖 :root 即可全局换肤。" />
      <h2 className="section-title">
        <Icon name="palette" size={12} /> PALETTE
      </h2>
      <p>受 PICO-8 启发的 18 色调色板。Tag / Badge / Card / Title 等组件的 color 属性均接受这些名称。</p>
      <div className="swatches">
        {colors.map(([k, v]) => (
          <div className="swatch" key={k}>
            <div className="swatch__color" style={{ background: v }} />
            <div className="swatch__meta">
              {k.toUpperCase()}
              <small>{v}</small>
            </div>
          </div>
        ))}
      </div>

      <h2 className="section-title">
        <Icon name="flag" size={12} /> SEMANTIC
      </h2>
      <Table
        size="sm"
        rowKey="name"
        columns={[
          { key: "name", title: "VARIABLE", dataIndex: "name", render: (v) => <code>{v}</code> },
          { key: "v", title: "VALUE", dataIndex: "v", render: (v: PaletteColor) => <Tag color={v}>{v.toUpperCase()}</Tag> },
          { key: "desc", title: "USAGE", dataIndex: "desc" },
        ]}
        dataSource={SEMANTIC}
      />

      <h2 className="section-title">
        <Icon name="code" size={12} /> PIXEL BORDER
      </h2>
      <p>
        像素边框由一张 4×4 的 SVG（四角透明）作为 <code>border-image</code> 实现，<code>slice: 1</code> 让每个图像单元等于 <code>border-width</code>，因此 2px / 3px / 4px
        边框都能得到完美缺角。配合 <code>background-clip: padding-box</code> 让缺角透出背景。
      </p>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", margin: "16px 0 24px" }}>
        {[2, 3, 4, 6, 8].map((bw) => (
          <div key={bw} className="pxui-bd px" style={{ ["--pxui-bw" as string]: `${bw}px`, padding: 16, background: "#fff", fontSize: 9 }}>
            {bw}PX
          </div>
        ))}
        <div className="pxui-bd px" style={{ ["--pxui-bd-src" as string]: "var(--pxui-bd-primary)", padding: 16, background: "#fff", fontSize: 9 }}>
          PRIMARY
        </div>
        <div className="pxui-bd px" style={{ ["--pxui-bd-src" as string]: "var(--pxui-bd-danger)", padding: 16, background: "#fff", fontSize: 9 }}>
          DANGER
        </div>
      </div>
      <CodeBlock
        lang="css"
        code={`.pxui-bd {
  border: var(--pxui-bw) solid transparent;
  border-image: var(--pxui-bd-src, var(--pxui-bd-ink)) 1 / 1 / 0 stretch;
  background-clip: padding-box;
}
/* 4x4 SVG, corners transparent */
--pxui-bd-ink: url("data:image/svg+xml,<svg viewBox='0 0 4 4' shape-rendering='crispEdges'>
  <path fill='#1d2b53' d='M1 0h2v1H1zM0 1h1v2H0zM3 1h1v2H3zM1 3h2v1H1z'/></svg>");`}
      />

      <h2 className="section-title">
        <Icon name="gear" size={12} /> CSS VARIABLES
      </h2>
      <CodeBlock
        lang="css"
        code={`:root {
  /* palette */
  --pxui-ink: #1d2b53;     --pxui-paper: #fff1e8;   --pxui-sand: #f3e4cf;
  --pxui-stone: #c2c3c7;   --pxui-slate: #5f574f;   --pxui-indigo: #83769c;
  --pxui-plum: #7e2553;    --pxui-forest: #008751;  --pxui-brown: #ab5236;
  --pxui-red: #ff004d;     --pxui-orange: #ffa300;  --pxui-yellow: #ffec27;
  --pxui-green: #00e436;   --pxui-blue: #29adff;    --pxui-pink: #ff77a8;
  --pxui-peach: #ffccaa;

  /* semantic */
  --pxui-primary: var(--pxui-blue);
  --pxui-success: var(--pxui-green);
  --pxui-warning: var(--pxui-yellow);
  --pxui-danger: var(--pxui-red);

  /* sizing & font */
  --pxui-unit: 4px;
  --pxui-bw: 4px;
  --pxui-font: "Press Start 2P", "Zpix", monospace;
  --pxui-font-text: "Zpix", system-ui, "PingFang SC", sans-serif;
}

/* 换肤示例：绿色主题 */
:root {
  --pxui-primary: var(--pxui-green);
  --pxui-bd-primary: var(--pxui-bd-success);
}`}
      />

      <h2 className="section-title">
        <Icon name="bolt" size={12} /> MOTION
      </h2>
      <Table
        size="sm"
        rowKey="k"
        columns={[
          { key: "k", title: "KEYFRAME", dataIndex: "k", render: (v) => <code>{v}</code> },
          { key: "t", title: "TIMING", dataIndex: "t" },
          { key: "u", title: "USED BY", dataIndex: "u" },
        ]}
        dataSource={[
          { k: "pxui-pop", t: "0.12–0.18s steps(3–4)", u: "Modal, Tooltip, Badge, Select menu" },
          { k: "pxui-blink", t: "1s steps(1)", u: "Typewriter cursor, low HP, Switch loading" },
          { k: "pxui-bounce / pxui-float", t: "0.6s / 1.6s steps(2–4)", u: "Sprite, Balloon next arrow" },
          { k: "pxui-shimmer", t: "1.4s steps(14)", u: "Skeleton" },
          { k: "pxui-spin", t: "1s steps(8)", u: "Icon spin, Spinner ring" },
          { k: "pxui-slide-right", t: "0.2s steps(4)", u: "Toast" },
        ]}
      />
    </div>
  );
};

/* ---------------- Storybook ---------------- */
interface StoryRow {
  key: string;
  title: string;
  file: string;
  stories: string;
}

const storyColumns: TableColumn<StoryRow>[] = [
  { key: "title", title: "STORY TITLE", dataIndex: "title", render: (v) => <code>{v}</code> },
  { key: "file", title: "FILE", dataIndex: "file", render: (v) => <code style={{ fontSize: 11 }}>{v}</code> },
  { key: "stories", title: "DOCS URL", dataIndex: "stories", render: (v) => <code style={{ fontSize: 11 }}>{v}</code> },
];

const StorybookGuide: React.FC = () => {
  const rows: StoryRow[] = ALL_DOCS.map((d) => {
    const cat = categoryLabel(d.category).en;
    return {
      key: d.key,
      title: `${cat.charAt(0) + cat.slice(1).toLowerCase()}/${d.name}`,
      file: `src/components/${d.name}/${d.name}.stories.tsx`,
      stories: `/?path=/docs/${cat.toLowerCase()}-${d.key}--docs`,
    };
  });
  return (
    <div className="page prose">
      <Head title="STORYBOOK" cn="组件文档与交互式预览" desc="项目使用 Storybook 10（@storybook/react-vite）管理组件文档：每个组件都有独立的 stories 文件、autodocs 自动生成的 API 文档与可交互的 Controls 面板。" />

      <h2 className="section-title">
        <Icon name="play" size={12} /> RUN
      </h2>
      <CodeBlock lang="bash" code={`# 本地开发（http://localhost:6006）\nnpm run storybook\n\n# 构建静态站点到 storybook-static/\nnpm run build-storybook`} />
      <Alert type="info" title="TIP" description="组件页右上角的 STORYBOOK 按钮会直接跳转到该组件在本地 Storybook 中的 Docs 页面。" style={{ marginTop: 16 }} />

      <h2 className="section-title">
        <Icon name="gear" size={12} /> CONFIG
      </h2>
      <p>
        配置位于 <code>.storybook/</code>，复用项目的 Vite 配置（Tailwind 插件、路径别名），并通过 <code>viteFinal</code> 移除单文件打包插件。
        <code>preview.ts</code> 全局引入组件库样式并配置 Paper / Ink 两种背景。
      </p>
      <CodeBlock
        code={`// .storybook/main.ts
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: { name: "@storybook/react-vite", options: {} },
  viteFinal: async (cfg) => {
    cfg.plugins = (cfg.plugins ?? []).flat().filter((p: any) => !p?.name?.includes("singlefile"));
    return cfg;
  },
};
export default config;`}
      />

      <h2 className="section-title">
        <Icon name="code" size={12} /> WRITING STORIES
      </h2>
      <p>
        使用 CSF 3 格式。<code>tags: ["autodocs"]</code> 会根据 TypeScript 类型与 JSDoc 注释自动生成 Props 表；<code>argTypes</code> 配置 Controls 面板的控件类型。
      </p>
      <CodeBlock
        code={`// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "General/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["default", "primary", "success", "warning", "danger", "ghost", "text"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  args: { children: "PRESS START", type: "primary", size: "md" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const WithIcon: Story = { args: { icon: <Icon name="sword" />, children: "ATTACK" } };
export const Loading: Story = { args: { loading: true } };`}
      />

      <h2 className="section-title">
        <Icon name="menu" size={12} /> STORY INDEX
      </h2>
      <p>共 {rows.length} 个组件的 stories，按分类分组；另有 <code>Overview/Introduction</code> MDX 介绍页与 <code>Overview/Palette</code> 调色板页。</p>
      <Table size="sm" rowKey="key" columns={storyColumns} dataSource={rows} pagination={{ pageSize: 10 }} />

      <Card variant="dark" title="PRO TIP" style={{ marginTop: 32 }}>
        在 Storybook 的 Controls 面板里修改 props 时，右下角的 <b>Show code</b> 会同步生成对应的 JSX 代码，可直接复制到项目中使用。
      </Card>
    </div>
  );
};

export const GuidePage: React.FC<{ guide: GuideKey }> = ({ guide }) => {
  if (guide === "tokens") return <Tokens />;
  if (guide === "storybook") return <StorybookGuide />;
  return <Start />;
};
