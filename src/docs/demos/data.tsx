import { useState } from "react";
import {
  Card,
  Table,
  Progress,
  Tooltip,
  Collapse,
  Tabs,
  Pagination,
  Skeleton,
  Balloon,
  Typewriter,
  Button,
  Icon,
  Tag,
  Avatar,
  Sprite,
  CAT_SPRITE,
  SLIME_SPRITE,
  GHOST_SPRITE,
  Switch,
  type TableColumn,
} from "@/components";
import type { ComponentDoc } from "../types";

const Row = ({ children, gap = 16, align = "center" }: { children: React.ReactNode; gap?: number; align?: string }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: align }}>{children}</div>
);
const Col = ({ children, gap = 16 }: { children: React.ReactNode; gap?: number }) => <div style={{ display: "grid", gap }}>{children}</div>;

interface Hero {
  id: number;
  name: string;
  job: string;
  level: number;
  hp: number;
  status: "ALIVE" | "DEAD" | "AFK";
}
const HEROES: Hero[] = [
  { id: 1, name: "PIXEL CAT", job: "WARRIOR", level: 42, hp: 88, status: "ALIVE" },
  { id: 2, name: "SLIME", job: "TANK", level: 7, hp: 35, status: "AFK" },
  { id: 3, name: "GHOSTY", job: "MAGE", level: 99, hp: 12, status: "DEAD" },
  { id: 4, name: "KNIGHT", job: "PALADIN", level: 56, hp: 100, status: "ALIVE" },
  { id: 5, name: "ARCHER", job: "RANGER", level: 31, hp: 64, status: "ALIVE" },
  { id: 6, name: "BARD", job: "SUPPORT", level: 18, hp: 50, status: "AFK" },
  { id: 7, name: "NINJA", job: "ASSASSIN", level: 73, hp: 70, status: "ALIVE" },
];
const STATUS_COLOR = { ALIVE: "green", DEAD: "red", AFK: "yellow" } as const;

const columns: TableColumn<Hero>[] = [
  { key: "name", title: "NAME", dataIndex: "name", sorter: true },
  { key: "job", title: "JOB", dataIndex: "job" },
  { key: "level", title: "LV", dataIndex: "level", align: "center", sorter: true, width: 80 },
  { key: "hp", title: "HP", dataIndex: "hp", width: 200, render: (v) => <Progress percent={v} variant="hp" size="sm" showInfo={false} /> },
  { key: "status", title: "STATUS", dataIndex: "status", render: (v: Hero["status"]) => <Tag color={STATUS_COLOR[v]}>{v}</Tag> },
];

const TableLoadingDemo = () => {
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  return (
    <Col>
      <Row>
        <Switch checked={loading} onChange={setLoading} checkedText="LOAD" uncheckedText="LOAD" />
        <Switch checked={empty} onChange={setEmpty} checkedText="EMPTY" uncheckedText="EMPTY" color="red" />
      </Row>
      <Table rowKey="id" columns={columns} dataSource={empty ? [] : HEROES} loading={loading} pagination={{ pageSize: 4 }} striped size="sm" />
    </Col>
  );
};

const ProgressDemo = () => {
  const [p, setP] = useState(45);
  return (
    <Col gap={20}>
      <Progress percent={p} />
      <Progress percent={p} variant="segments" color="green" label="EXP" />
      <Progress percent={p} variant="striped" color="pink" status="active" />
      <Progress percent={p} variant="hp" />
      <Row>
        <Button size="sm" icon={<Icon name="minus" />} onClick={() => setP((x) => Math.max(0, x - 15))} square aria-label="minus" />
        <Button size="sm" icon={<Icon name="plus" />} onClick={() => setP((x) => Math.min(100, x + 15))} square aria-label="plus" />
      </Row>
    </Col>
  );
};

const CollapseDemo = () => (
  <Collapse
    defaultActiveKey={["1"]}
    items={[
      { key: "1", label: "QUEST: SAVE THE CAT", icon: <Icon name="cat" size={14} />, extra: "ACTIVE", children: "前往北方森林，找到迷路的像素猫并带它回到村庄。奖励：100 金币、经验 500。" },
      { key: "2", label: "QUEST: SLIME HUNT", icon: <Icon name="sword" size={14} />, children: "消灭 10 只史莱姆。它们很可爱，但真的会黏在鞋底上。" },
      { key: "3", label: "QUEST: LOCKED", icon: <Icon name="key" size={14} />, disabled: true, children: "..." },
    ]}
  />
);

const SkeletonToggle = () => {
  const [loading, setLoading] = useState(true);
  return (
    <Col>
      <Switch checked={loading} onChange={setLoading} checkedText="LOADING" uncheckedText="LOADED" />
      <Card style={{ maxWidth: 420 }}>
        {loading ? (
          <Skeleton avatar rows={2} />
        ) : (
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <Avatar size="lg" color="blue">
              <Sprite {...CAT_SPRITE} scale={2} />
            </Avatar>
            <div>
              <div style={{ fontFamily: "var(--pxui-font)", fontSize: 12, marginBottom: 8 }}>PIXEL CAT</div>
              <div style={{ color: "#5f574f" }}>一只热爱冒险的像素猫，擅长翻越各种围栏和拒绝洗澡。</div>
            </div>
          </div>
        )}
      </Card>
    </Col>
  );
};

const TypewriterDemo = () => {
  const [k, setK] = useState(0);
  return (
    <Col>
      <div style={{ fontSize: 15 }}>
        <Typewriter key={k} text="欢迎来到像素岛！这里的一切都是由 4×4 的小方块组成的……" speed={70} />
      </div>
      <div style={{ fontSize: 12 }}>
        <Typewriter key={`p${k}`} text={["> LOADING WORLD...", "> SPAWNING CAT...", "> READY. PRESS START"]} pixel speed={45} delay={400} />
      </div>
      <Button size="sm" onClick={() => setK((x) => x + 1)} icon={<Icon name="play" />}>
        REPLAY
      </Button>
    </Col>
  );
};

export const dataDocs: ComponentDoc[] = [
  {
    key: "card",
    name: "Card",
    cn: "卡片",
    desc: "像素硬阴影容器卡片，支持标题 / 操作区 / 封面 / 角标，多种颜色与变体。",
    category: "data",
    icon: "home",
    preview: () => (
      <Card size="sm" title="ITEM" style={{ width: 150 }}>
        <span style={{ fontSize: 12 }}>像素卡片</span>
      </Card>
    ),
    demos: [
      {
        title: "基础用法",
        code: `<Card title="INVENTORY" extra={<Tag color="blue">12/20</Tag>}>
  卡片内容区域，使用正文字体以保证可读性。
</Card>
<Card title="SHOP" footer={<Button type="primary" size="sm">BUY</Button>}>...</Card>`,
        render: () => (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            <Card title="INVENTORY" extra={<Tag color="blue">12/20</Tag>}>
              卡片内容区域使用正文字体以保证可读性。标题与 extra 使用像素字体，形成层次对比。
            </Card>
            <Card
              title={
                <>
                  <Icon name="coin" size={14} color="#ffa300" /> SHOP
                </>
              }
              footer={
                <>
                  <Button type="primary" size="sm">
                    BUY
                  </Button>
                  <Button type="text" size="sm">
                    CANCEL
                  </Button>
                </>
              }
            >
              <Row>
                <Avatar color="yellow">
                  <Icon name="potion" size={20} />
                </Avatar>
                <div>
                  <div style={{ fontFamily: "var(--pxui-font)", fontSize: 11 }}>HP POTION</div>
                  <div style={{ color: "#5f574f", fontSize: 12 }}>恢复 50 点生命值 · 50G</div>
                </div>
              </Row>
            </Card>
          </div>
        ),
      },
      {
        title: "颜色与变体",
        desc: "color 使用调色板颜色；variant 支持 dashed / dark / flat；hoverable 增加悬浮抬起效果。",
        code: `<Card color="yellow" hoverable>YELLOW</Card>
<Card color="blue" hoverable>BLUE</Card>
<Card color="navy" hoverable>NAVY (auto light text)</Card>
<Card variant="dashed">DASHED</Card>
<Card variant="dark" title="TERMINAL">DARK</Card>
<Card variant="flat">FLAT</Card>`,
        render: () => (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 20 }}>
            {(["yellow", "blue", "pink", "green", "navy", "plum"] as const).map((c) => (
              <Card key={c} color={c} hoverable size="sm">
                <div style={{ fontFamily: "var(--pxui-font)", fontSize: 10 }}>{c.toUpperCase()}</div>
              </Card>
            ))}
            <Card variant="dashed" size="sm">
              <div style={{ fontFamily: "var(--pxui-font)", fontSize: 10 }}>DASHED</div>
            </Card>
            <Card variant="dark" size="sm" title="TERMINAL">
              <div style={{ fontFamily: "var(--pxui-font)", fontSize: 10 }}>&gt; DARK_</div>
            </Card>
            <Card variant="flat" size="sm">
              <div style={{ fontFamily: "var(--pxui-font)", fontSize: 10 }}>FLAT</div>
            </Card>
          </div>
        ),
      },
      {
        title: "封面、角标与操作组",
        code: `<Card
  ribbon="RARE"
  cover={<div className="cover">...</div>}
  actions={[<Icon name="heart" />, <Icon name="star" />, <Icon name="mail" />]}
>
  ...
</Card>`,
        render: () => (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, maxWidth: 740 }}>
            {[
              { s: CAT_SPRITE, n: "PIXEL CAT", r: "RARE", bg: "#29adff" },
              { s: SLIME_SPRITE, n: "SLIME", r: "COMMON", bg: "#ffec27" },
              { s: GHOST_SPRITE, n: "GHOSTY", r: "EPIC", bg: "#83769c" },
            ].map((it) => (
              <Card
                key={it.n}
                ribbon={it.r}
                cover={
                  <div style={{ background: it.bg, display: "flex", justifyContent: "center", padding: 20, backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)", backgroundSize: "12px 12px" }}>
                    <Sprite {...it.s} scale={5} animation="float" />
                  </div>
                }
                actions={[<Icon key="h" name="heart" />, <Icon key="s" name="star" />, <Icon key="m" name="mail" />]}
              >
                <div style={{ fontFamily: "var(--pxui-font)", fontSize: 11, marginBottom: 6 }}>{it.n}</div>
                <div style={{ color: "#5f574f", fontSize: 12 }}>来自像素岛的伙伴。</div>
              </Card>
            ))}
          </div>
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "title", desc: "标题", type: "ReactNode" },
          { name: "extra", desc: "右上角操作区", type: "ReactNode" },
          { name: "cover", desc: "封面", type: "ReactNode" },
          { name: "footer", desc: "底部", type: "ReactNode" },
          { name: "actions", desc: "底部操作组", type: "ReactNode[]" },
          { name: "ribbon", desc: "角标文案", type: "ReactNode" },
          { name: "color", desc: "背景色", type: "PaletteColor" },
          { name: "variant", desc: "变体", type: "'default' | 'dashed' | 'dark' | 'flat'", default: "'default'" },
          { name: "size", desc: "尺寸", type: "'sm' | 'md'", default: "'md'" },
          { name: "hoverable", desc: "悬浮抬起", type: "boolean", default: "false" },
        ],
      },
    ],
  },
  {
    key: "table",
    name: "Table",
    cn: "表格",
    desc: "像素表格，支持排序、斑马纹、边框、自定义渲染、分页、空状态与加载。",
    category: "data",
    icon: "menu",
    preview: () => (
      <Table
        size="sm"
        columns={[
          { key: "n", title: "NAME", dataIndex: "n" },
          { key: "l", title: "LV", dataIndex: "l" },
        ]}
        dataSource={[
          { n: "CAT", l: 42 },
          { n: "SLIME", l: 7 },
        ]}
        style={{ width: 160 }}
      />
    ),
    demos: [
      {
        title: "基础用法",
        desc: "点击 NAME / LV 表头排序；HP 与 STATUS 列使用 render 自定义渲染。",
        code: `const columns = [
  { key: "name", title: "NAME", dataIndex: "name", sorter: true },
  { key: "job", title: "JOB", dataIndex: "job" },
  { key: "level", title: "LV", dataIndex: "level", align: "center", sorter: true, width: 80 },
  { key: "hp", title: "HP", dataIndex: "hp", width: 200,
    render: (v) => <Progress percent={v} variant="hp" size="sm" showInfo={false} /> },
  { key: "status", title: "STATUS", dataIndex: "status", render: (v) => <Tag color={STATUS_COLOR[v]}>{v}</Tag> },
];

<Table rowKey="id" columns={columns} dataSource={heroes} />`,
        render: () => <Table rowKey="id" columns={columns} dataSource={HEROES.slice(0, 4)} />,
      },
      {
        title: "斑马纹、边框、分页、加载与空状态",
        code: `<Table rowKey="id" columns={columns} dataSource={data} striped size="sm"
  loading={loading} pagination={{ pageSize: 4 }} />`,
        render: () => <TableLoadingDemo />,
      },
      {
        title: "边框与尺寸",
        code: `<Table bordered size="lg" columns={columns} dataSource={data} maxHeight={240} />`,
        render: () => <Table rowKey="id" bordered size="lg" columns={columns.slice(0, 3)} dataSource={HEROES} maxHeight={240} />,
      },
    ],
    props: [
      {
        rows: [
          { name: "columns", desc: "列定义", type: "TableColumn[]" },
          { name: "dataSource", desc: "数据", type: "T[]" },
          { name: "rowKey", desc: "行 key", type: "keyof T | (record) => key" },
          { name: "size", desc: "尺寸", type: "'sm' | 'md' | 'lg'", default: "'md'" },
          { name: "bordered / striped", desc: "边框 / 斑马纹", type: "boolean", default: "false" },
          { name: "loading", desc: "加载中", type: "boolean", default: "false" },
          { name: "pagination", desc: "分页", type: "false | { pageSize }", default: "false" },
          { name: "maxHeight", desc: "最大高度（表头吸顶）", type: "number | string" },
          { name: "emptyText", desc: "空状态文案", type: "ReactNode", default: "'NO DATA'" },
          { name: "onRowClick", desc: "行点击", type: "(record, index) => void" },
        ],
      },
      {
        title: "TableColumn",
        rows: [
          { name: "key", desc: "唯一 key", type: "string" },
          { name: "title", desc: "表头", type: "ReactNode" },
          { name: "dataIndex", desc: "字段名", type: "string" },
          { name: "render", desc: "自定义渲染", type: "(value, record, index) => ReactNode" },
          { name: "sorter", desc: "排序", type: "boolean | (a, b) => number" },
          { name: "align", desc: "对齐", type: "'left' | 'center' | 'right'", default: "'left'" },
          { name: "width", desc: "列宽", type: "number | string" },
        ],
      },
    ],
  },
  {
    key: "progress",
    name: "Progress",
    cn: "进度条",
    desc: "阶梯动画进度条，支持分段 / 条纹 / HP 血条变体，低血量自动闪烁。",
    category: "data",
    icon: "bolt",
    preview: () => (
      <div style={{ width: 160 }}>
        <Progress percent={70} variant="hp" size="sm" />
      </div>
    ),
    demos: [
      {
        title: "变体",
        desc: "variant 支持 bar / segments / striped / hp；hp 会根据百分比自动变色。",
        code: `<Progress percent={p} />
<Progress percent={p} variant="segments" color="green" label="EXP" />
<Progress percent={p} variant="striped" color="pink" status="active" />
<Progress percent={p} variant="hp" />`,
        render: () => <ProgressDemo />,
      },
      {
        title: "尺寸与状态",
        code: `<Progress percent={30} size="sm" />
<Progress percent={100} />
<Progress percent={60} size="lg" status="exception" />
<Progress indeterminate size="sm" color="indigo" />
<Progress percent={80} format={(p) => \`\${p} / 100 XP\`} color="orange" />`,
        render: () => (
          <Col gap={20}>
            <Progress percent={30} size="sm" />
            <Progress percent={100} />
            <Progress percent={60} size="lg" status="exception" />
            <Progress indeterminate size="sm" color="indigo" />
            <Progress percent={80} format={(p) => `${p} / 100 XP`} color="orange" />
          </Col>
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "percent", desc: "百分比", type: "number", default: "0" },
          { name: "variant", desc: "变体", type: "'bar' | 'segments' | 'striped' | 'hp'", default: "'bar'" },
          { name: "size", desc: "尺寸", type: "'sm' | 'md' | 'lg'", default: "'md'" },
          { name: "status", desc: "状态", type: "'normal' | 'active' | 'success' | 'exception'", default: "'normal'" },
          { name: "color", desc: "颜色", type: "PaletteColor" },
          { name: "label", desc: "左侧标签", type: "ReactNode" },
          { name: "showInfo", desc: "显示右侧信息", type: "boolean", default: "true" },
          { name: "format", desc: "格式化", type: "(percent) => ReactNode" },
          { name: "indeterminate", desc: "不确定进度", type: "boolean", default: "false" },
        ],
      },
    ],
  },
  {
    key: "tooltip",
    name: "Tooltip",
    cn: "文字提示",
    desc: "像素阶梯箭头的气泡提示，4 个方向，hover / click / focus 触发。",
    category: "data",
    icon: "info",
    preview: () => (
      <Tooltip title="HELLO!" open placement="right">
        <Button size="sm">HOVER</Button>
      </Tooltip>
    ),
    demos: [
      {
        title: "方向",
        code: `<Tooltip title="TOP" placement="top"><Button>TOP</Button></Tooltip>
<Tooltip title="BOTTOM" placement="bottom"><Button>BOTTOM</Button></Tooltip>
<Tooltip title="LEFT" placement="left"><Button>LEFT</Button></Tooltip>
<Tooltip title="RIGHT" placement="right"><Button>RIGHT</Button></Tooltip>`,
        render: () => (
          <Row>
            <Tooltip title="I'M ON TOP" placement="top">
              <Button>TOP</Button>
            </Tooltip>
            <Tooltip title="I'M AT BOTTOM" placement="bottom">
              <Button>BOTTOM</Button>
            </Tooltip>
            <Tooltip title="LEFT SIDE" placement="left">
              <Button>LEFT</Button>
            </Tooltip>
            <Tooltip title="RIGHT SIDE" placement="right">
              <Button>RIGHT</Button>
            </Tooltip>
          </Row>
        ),
      },
      {
        title: "触发方式与浅色",
        code: `<Tooltip title="CLICK TO TOGGLE" trigger="click"><Button type="primary">CLICK</Button></Tooltip>
<Tooltip title="FOCUSED" trigger="focus"><Input placeholder="FOCUS ME" /></Tooltip>
<Tooltip title="LIGHT THEME" light><Tag color="yellow">LIGHT</Tag></Tooltip>`,
        render: () => (
          <Row>
            <Tooltip title="CLICK TO TOGGLE" trigger="click">
              <Button type="primary">CLICK</Button>
            </Tooltip>
            <Tooltip title={<span>HP +50 · 恢复生命值</span>} light placement="bottom">
              <Tag color="yellow" size="lg" icon={<Icon name="potion" size={12} />}>
                POTION
              </Tag>
            </Tooltip>
            <Tooltip title="A WILD CAT APPEARED!" placement="right">
              <span>
                <Sprite {...CAT_SPRITE} scale={2} />
              </span>
            </Tooltip>
          </Row>
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "title", desc: "提示内容", type: "ReactNode" },
          { name: "placement", desc: "方向", type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'" },
          { name: "trigger", desc: "触发方式", type: "'hover' | 'click' | 'focus' | 数组", default: "'hover'" },
          { name: "light", desc: "浅色主题", type: "boolean", default: "false" },
          { name: "open", desc: "受控显示", type: "boolean" },
          { name: "delay", desc: "显示延迟 ms", type: "number", default: "80" },
        ],
      },
    ],
  },
  {
    key: "collapse",
    name: "Collapse",
    cn: "折叠面板",
    desc: "基于 CSS Grid 0fr→1fr 的阶梯展开动画，支持手风琴与幽灵模式。",
    category: "data",
    icon: "chevronDown",
    preview: () => (
      <div style={{ width: 170 }}>
        <Collapse items={[{ key: "1", label: "QUEST", children: "..." }]} />
      </div>
    ),
    demos: [
      {
        title: "基础用法",
        code: `<Collapse defaultActiveKey={["1"]} items={[
  { key: "1", label: "QUEST: SAVE THE CAT", icon: <Icon name="cat" />, extra: "ACTIVE", children: "..." },
  { key: "2", label: "QUEST: SLIME HUNT", icon: <Icon name="sword" />, children: "..." },
  { key: "3", label: "QUEST: LOCKED", disabled: true, children: "..." },
]} />`,
        render: () => <CollapseDemo />,
      },
      {
        title: "手风琴与幽灵模式",
        code: `<Collapse accordion ghost items={[...]} />`,
        render: () => (
          <Collapse
            accordion
            ghost
            defaultActiveKey={["a"]}
            items={[
              { key: "a", label: "HOW TO PLAY?", children: "方向键移动，Z 键确认，X 键取消。像所有 90 年代的游戏一样。" },
              { key: "b", label: "SAVE POINT?", children: "在任意存档水晶处按下确认即可。记得多存几个档。" },
              { key: "c", label: "SECRET?", children: "↑ ↑ ↓ ↓ ← → ← → B A" },
            ]}
          />
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "items", desc: "面板项", type: "{ key, label, children, icon?, extra?, disabled? }[]" },
          { name: "activeKey / defaultActiveKey", desc: "展开项", type: "string[]" },
          { name: "accordion", desc: "手风琴", type: "boolean", default: "false" },
          { name: "ghost", desc: "幽灵模式", type: "boolean", default: "false" },
          { name: "onChange", desc: "变化回调", type: "(keys: string[]) => void" },
        ],
      },
    ],
  },
  {
    key: "tabs",
    name: "Tabs",
    cn: "标签页",
    desc: "卡片式 / 按钮式像素页签，支持图标、禁用、右侧附加内容与键盘切换。",
    category: "data",
    icon: "flag",
    preview: () => (
      <Tabs
        items={[
          { key: "1", label: "ITEMS" },
          { key: "2", label: "SKILLS" },
        ]}
      />
    ),
    demos: [
      {
        title: "卡片式",
        code: `<Tabs
  items={[
    { key: "items", label: "ITEMS", icon: <Icon name="potion" size={12} />, children: "..." },
    { key: "skills", label: "SKILLS", icon: <Icon name="bolt" size={12} />, children: "..." },
    { key: "map", label: "MAP", icon: <Icon name="flag" size={12} />, children: "..." },
    { key: "locked", label: "LOCKED", disabled: true },
  ]}
  extra={<Tag color="yellow">LV.42</Tag>}
/>`,
        render: () => (
          <Tabs
            items={[
              { key: "items", label: "ITEMS", icon: <Icon name="potion" size={12} />, children: "背包里有 3 瓶药水、1 把生锈的剑和一只不知道从哪来的史莱姆。" },
              { key: "skills", label: "SKILLS", icon: <Icon name="bolt" size={12} />, children: "已习得：火球术 Lv.3、治愈 Lv.1、翻滚 Lv.MAX。" },
              { key: "map", label: "MAP", icon: <Icon name="flag" size={12} />, children: "已探索 42%。北方森林、村庄、史莱姆沼泽。" },
              { key: "locked", label: "LOCKED", disabled: true, children: "" },
            ]}
            extra={<Tag color="yellow">LV.42</Tag>}
          />
        ),
      },
      {
        title: "按钮式",
        code: `<Tabs type="button" items={[{ key: "easy", label: "EASY" }, { key: "normal", label: "NORMAL" }, { key: "hard", label: "HARD" }]} />`,
        render: () => (
          <Tabs
            type="button"
            defaultActiveKey="normal"
            items={[
              { key: "easy", label: "EASY", children: "敌人伤害 50%。适合新手与想看剧情的玩家。" },
              { key: "normal", label: "NORMAL", children: "标准体验。" },
              { key: "hard", label: "HARD", children: "敌人伤害 200%，药水减半。你确定吗？" },
            ]}
          />
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "items", desc: "页签项", type: "{ key, label, children?, icon?, disabled? }[]" },
          { name: "activeKey / defaultActiveKey", desc: "激活项", type: "string" },
          { name: "type", desc: "样式", type: "'card' | 'button'", default: "'card'" },
          { name: "extra", desc: "右侧附加", type: "ReactNode" },
          { name: "destroyInactive", desc: "销毁非激活面板", type: "boolean", default: "true" },
          { name: "onChange", desc: "切换回调", type: "(key: string) => void" },
        ],
      },
    ],
  },
  {
    key: "pagination",
    name: "Pagination",
    cn: "分页",
    desc: "像素方块分页器，支持省略跳转、总数、快速跳转与简洁模式。",
    category: "data",
    icon: "chevronRight",
    preview: () => <Pagination size="sm" total={30} pageSize={10} />,
    demos: [
      {
        title: "基础用法",
        code: `<Pagination total={50} />
<Pagination total={500} defaultCurrent={6} showTotal />
<Pagination total={200} size="sm" showJumper />
<Pagination total={100} simple />`,
        render: () => (
          <Col gap={20}>
            <Pagination total={50} />
            <Pagination total={500} defaultCurrent={6} showTotal />
            <Pagination total={200} size="sm" showJumper showTotal={(t, [a, b]) => `${a}-${b} OF ${t}`} />
            <Pagination total={100} simple />
          </Col>
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "total", desc: "总条数", type: "number" },
          { name: "current / defaultCurrent", desc: "当前页", type: "number", default: "1" },
          { name: "pageSize", desc: "每页条数", type: "number", default: "10" },
          { name: "size", desc: "尺寸", type: "'sm' | 'md'", default: "'md'" },
          { name: "showTotal", desc: "显示总数", type: "boolean | (total, range) => ReactNode" },
          { name: "showJumper", desc: "快速跳转", type: "boolean", default: "false" },
          { name: "simple", desc: "简洁模式", type: "boolean", default: "false" },
          { name: "onChange", desc: "页码变化", type: "(page, pageSize) => void" },
        ],
      },
    ],
  },
  {
    key: "skeleton",
    name: "Skeleton",
    cn: "骨架屏",
    desc: "14 帧阶梯扫光的像素骨架屏，内置文本 / 标题 / 方块 / 圆形 / 按钮 / 图片占位。",
    category: "data",
    icon: "ghost",
    preview: () => (
      <div style={{ width: 150 }}>
        <Skeleton rows={2} />
      </div>
    ),
    demos: [
      {
        title: "基础元素",
        code: `<Skeleton variant="circle" />
<Skeleton variant="button" />
<Skeleton variant="input" />
<Skeleton variant="rect" height={60} />
<Skeleton variant="image" />
<Skeleton rows={3} />`,
        render: () => (
          <Col>
            <Row>
              <Skeleton variant="circle" />
              <Skeleton variant="button" />
              <Skeleton variant="input" />
            </Row>
            <Skeleton variant="rect" height={60} />
            <Row align="flex-start">
              <div style={{ width: 200 }}>
                <Skeleton variant="image" />
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <Skeleton rows={3} />
              </div>
            </Row>
          </Col>
        ),
      },
      {
        title: "头像段落与加载切换",
        code: `<Skeleton avatar rows={2} />

{loading ? <Skeleton avatar rows={2} /> : <RealContent />}`,
        render: () => <SkeletonToggle />,
      },
    ],
    props: [
      {
        rows: [
          { name: "variant", desc: "类型", type: "'text' | 'title' | 'rect' | 'circle' | 'button' | 'input' | 'image'", default: "'text'" },
          { name: "rows", desc: "段落行数", type: "number" },
          { name: "avatar", desc: "头像 + 段落", type: "boolean", default: "false" },
          { name: "width / height", desc: "尺寸", type: "number | string" },
          { name: "animated", desc: "扫光动画", type: "boolean", default: "true" },
          { name: "loading", desc: "为 false 时渲染 children", type: "boolean", default: "true" },
        ],
      },
    ],
  },
  {
    key: "balloon",
    name: "Balloon",
    cn: "对话气泡",
    desc: "RPG 风格对话气泡，像素阶梯尾巴，支持说话者、头像与深色模式。",
    category: "data",
    icon: "mail",
    preview: () => (
      <Balloon style={{ fontSize: 11, padding: "8px 12px" }} tail="left">
        HELLO!
      </Balloon>
    ),
    demos: [
      {
        title: "基础用法",
        code: `<Balloon speaker="CAT" avatar={<Sprite {...CAT_SPRITE} scale={3} />}>
  喵！欢迎来到像素岛。
</Balloon>
<Balloon tail="right" speaker="SLIME" avatar={<Sprite {...SLIME_SPRITE} scale={3} />}>
  ……（黏黏的声音）
</Balloon>`,
        render: () => (
          <Col gap={8}>
            <Balloon speaker="CAT" avatar={<Sprite {...CAT_SPRITE} scale={3} />}>
              喵！欢迎来到像素岛。这里的任务板在村庄中央，记得先去领取新手礼包。
            </Balloon>
            <Balloon tail="right" speaker="SLIME" avatar={<Sprite {...SLIME_SPRITE} scale={3} />}>
              ……（黏黏的声音）
            </Balloon>
          </Col>
        ),
      },
      {
        title: "深色 RPG 对话框 + 打字机",
        code: `<Balloon dark tail="none" speaker="GHOSTY" next style={{ width: "100%", maxWidth: 560 }}>
  <Typewriter text="你终于来了……我在这座城堡里等了 300 年。" speed={60} />
</Balloon>`,
        render: () => (
          <Row align="flex-end" gap={20}>
            <Sprite {...GHOST_SPRITE} scale={4} animation="float" />
            <Balloon dark tail="none" speaker="GHOSTY" next style={{ flex: 1, minWidth: 260, maxWidth: 560, fontSize: 14 }}>
              <Typewriter text="你终于来了……我在这座城堡里等了 300 年。要来一局像素棋吗？" speed={60} loop />
            </Balloon>
          </Row>
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "tail", desc: "尾巴方向", type: "'left' | 'right' | 'none'", default: "'left'" },
          { name: "dark", desc: "深色模式", type: "boolean", default: "false" },
          { name: "speaker", desc: "说话者", type: "ReactNode" },
          { name: "avatar", desc: "头像 / 立绘", type: "ReactNode" },
          { name: "next", desc: "“继续”小三角", type: "boolean", default: "false" },
        ],
      },
    ],
  },
  {
    key: "typewriter",
    name: "Typewriter",
    cn: "打字机",
    desc: "逐字输出文本，支持多行、延迟、循环、像素字体与方块闪烁光标。",
    category: "data",
    icon: "code",
    preview: () => (
      <span style={{ fontSize: 12 }}>
        <Typewriter text="HELLO WORLD_" pixel speed={120} loop />
      </span>
    ),
    demos: [
      {
        title: "基础用法",
        code: `<Typewriter text="欢迎来到像素岛！" speed={70} />
<Typewriter text={["> LOADING WORLD...", "> SPAWNING CAT...", "> READY."]} pixel speed={45} delay={400} />`,
        render: () => <TypewriterDemo />,
      },
    ],
    props: [
      {
        rows: [
          { name: "text", desc: "文本（数组为多行）", type: "string | string[]" },
          { name: "speed", desc: "每字符间隔 ms", type: "number", default: "60" },
          { name: "delay", desc: "开始延迟 ms", type: "number", default: "0" },
          { name: "cursor", desc: "显示光标", type: "boolean", default: "true" },
          { name: "loop", desc: "循环", type: "boolean", default: "false" },
          { name: "pixel", desc: "像素字体", type: "boolean", default: "false" },
          { name: "onComplete", desc: "完成回调", type: "() => void" },
        ],
      },
    ],
  },
];
