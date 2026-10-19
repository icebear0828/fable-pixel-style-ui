# PixelNest UI

一套 **像素风格（8-bit / 复古游戏风）** 的 React + TypeScript 组件库，并使用 **Storybook 10** 管理组件文档与交互式预览。

> 设计语言核心：缺角像素边框（4×4 SVG `border-image`）+ PICO-8 调色板 + `steps()` 阶梯动效 + 字符网格像素画，零图片资源。

## 脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动文档展示站（Vite） |
| `npm run build` | 构建文档站到 `dist/`（单文件 HTML） |
| `npm run storybook` | 启动 Storybook（<http://localhost:6006>） |
| `npm run build-storybook` | 构建 Storybook 静态站到 `storybook-static/` |
| `npm run smoke` | jsdom 运行时冒烟测试：挂载应用并遍历全部路由 |

## 目录结构

```
src/
├── components/                 # 组件库本体（可独立发布为 pixelnest-ui）
│   ├── index.ts                # 统一出口
│   ├── styles/                 # 设计令牌 + 组件样式（tokens / general / form / data / feedback）
│   ├── utils/cx.ts             # className 工具、像素网格 → SVG path、调色板
│   └── <Component>/
│       ├── <Component>.tsx
│       └── <Component>.stories.tsx   # Storybook stories（CSF3 + autodocs）
├── docs/                       # 文档展示站
│   ├── Layout.tsx / Home.tsx / ComponentPage.tsx / Guides.tsx
│   ├── DemoBlock.tsx / CodeBlock.tsx
│   ├── demos/                  # 每个组件的 Demo + Props 文档数据
│   └── stories/                # Storybook 概览页（Introduction.mdx / Palette）
└── App.tsx                     # hash 路由入口
.storybook/                     # Storybook 配置（复用 vite.config.ts）
scripts/smoke.mjs               # 运行时冒烟测试
```

## 组件一览（29）

- **通用**：Button · Icon · Sprite · Title · Divider · Tag · Badge · Avatar
- **数据录入**：Input / Textarea · Checkbox · Radio · Switch · Select · Slider · Rate
- **数据展示**：Card · Table · Progress · Tooltip · Collapse · Tabs · Pagination · Skeleton · Balloon · Typewriter
- **反馈**：Modal · Toast（命令式） · Alert · Loading / Spinner

## 使用方式

```tsx
import { Button, Card, toast } from "@/components";
import "@/components/styles/index.css";

<Card title="INVENTORY">
  <Button type="primary" onClick={() => toast.success("SAVED!")}>
    SAVE GAME
  </Button>
</Card>
```

## 主题定制

所有颜色、字体、边框宽度都是 `:root` 上的 CSS 变量（`--pxui-*`），覆盖即可全局换肤，详见文档站「设计令牌」页。

## License

MIT
