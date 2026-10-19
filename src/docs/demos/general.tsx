import { useState } from "react";
import { Button, ButtonGroup, Icon, ICON_NAMES, Sprite, CAT_SPRITE, SLIME_SPRITE, GHOST_SPRITE, Title, Divider, Tag, Badge, Avatar, type PaletteColor } from "@/components";
import type { ComponentDoc } from "../types";

const Row = ({ children, gap = 12, align = "center" }: { children: React.ReactNode; gap?: number; align?: string }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: align }}>{children}</div>
);

const TAG_COLORS: PaletteColor[] = ["red", "orange", "yellow", "green", "blue", "indigo", "pink", "peach", "brown", "plum", "forest", "navy"];

const HEART = {
  grid: ["..##...##..", ".####.####.", "###########", "###########", "###########", ".#########.", "..#######..", "...#####...", "....###....", ".....#....."],
  palette: { "#": "#ff004d" },
};

const CheckableTags = () => {
  const [sel, setSel] = useState<string[]>(["RPG"]);
  const toggle = (t: string) => setSel((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  return (
    <Row>
      {["RPG", "ACT", "AVG", "SLG", "RTS"].map((t) => (
        <Tag key={t} color={sel.includes(t) ? "blue" : "default"} checked={sel.includes(t)} onClick={() => toggle(t)}>
          {t}
        </Tag>
      ))}
    </Row>
  );
};

const LoadingButtons = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Row>
      <Button type="primary" icon={<Icon name="sword" />}>
        ATTACK
      </Button>
      <Button icon={<Icon name="shield" />}>DEFEND</Button>
      <Button type="success" icon={<Icon name="potion" />} square aria-label="potion" />
      <Button
        type="warning"
        loading={loading}
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1500);
        }}
      >
        {loading ? "SAVING" : "SAVE"}
      </Button>
      <Button disabled>DISABLED</Button>
    </Row>
  );
};

export const generalDocs: ComponentDoc[] = [
  {
    key: "button",
    name: "Button",
    cn: "按钮",
    desc: "带 3D 按压感的像素按钮，7 种类型 × 3 种尺寸，支持图标、加载与禁用。",
    category: "general",
    icon: "play",
    preview: () => (
      <Row gap={8}>
        <Button type="primary" size="sm">
          START
        </Button>
        <Button size="sm">MENU</Button>
      </Row>
    ),
    demos: [
      {
        title: "按钮类型",
        desc: "通过 type 设置按钮类型：default / primary / success / warning / danger / ghost / text。",
        code: `<Button>DEFAULT</Button>
<Button type="primary">PRIMARY</Button>
<Button type="success">SUCCESS</Button>
<Button type="warning">WARNING</Button>
<Button type="danger">DANGER</Button>
<Button type="ghost">GHOST</Button>
<Button type="text">TEXT</Button>`,
        render: () => (
          <Row>
            <Button>DEFAULT</Button>
            <Button type="primary">PRIMARY</Button>
            <Button type="success">SUCCESS</Button>
            <Button type="warning">WARNING</Button>
            <Button type="danger">DANGER</Button>
            <Button type="ghost">GHOST</Button>
            <Button type="text">TEXT</Button>
          </Row>
        ),
      },
      {
        title: "按钮尺寸",
        desc: "size 支持 sm / md / lg，block 可撑满父容器。",
        code: `<Button type="primary" size="sm">SMALL</Button>
<Button type="primary">MEDIUM</Button>
<Button type="primary" size="lg">LARGE</Button>
<Button type="success" block>BLOCK BUTTON</Button>`,
        render: () => (
          <div style={{ display: "grid", gap: 16 }}>
            <Row>
              <Button type="primary" size="sm">
                SMALL
              </Button>
              <Button type="primary">MEDIUM</Button>
              <Button type="primary" size="lg">
                LARGE
              </Button>
            </Row>
            <Button type="success" block>
              BLOCK BUTTON
            </Button>
          </div>
        ),
      },
      {
        title: "图标 / 加载 / 禁用",
        desc: "icon 放置像素图标；loading 显示三点动画并阻止点击；无 children 时自动变为正方形。",
        code: `<Button type="primary" icon={<Icon name="sword" />}>ATTACK</Button>
<Button icon={<Icon name="shield" />}>DEFEND</Button>
<Button type="success" icon={<Icon name="potion" />} square />
<Button type="warning" loading>SAVING</Button>
<Button disabled>DISABLED</Button>`,
        render: () => <LoadingButtons />,
      },
      {
        title: "按钮组与链接",
        desc: "ButtonGroup 用于水平排列；传入 href 后渲染为 a 标签。",
        code: `<ButtonGroup>
  <Button icon={<Icon name="chevronLeft" />}>PREV</Button>
  <Button type="primary">1</Button>
  <Button>2</Button>
  <Button>3</Button>
  <Button>NEXT<Icon name="chevronRight" /></Button>
</ButtonGroup>
<Button type="ghost" href="https://github.com" target="_blank" icon={<Icon name="github" />}>GITHUB</Button>`,
        render: () => (
          <Row gap={24}>
            <ButtonGroup>
              <Button icon={<Icon name="chevronLeft" />}>PREV</Button>
              <Button type="primary">1</Button>
              <Button>2</Button>
              <Button>3</Button>
              <Button>
                NEXT
                <Icon name="chevronRight" />
              </Button>
            </ButtonGroup>
            <Button type="ghost" href="https://github.com" target="_blank" icon={<Icon name="github" />}>
              GITHUB
            </Button>
          </Row>
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "type", desc: "按钮类型", type: "'default' | 'primary' | 'success' | 'warning' | 'danger' | 'ghost' | 'text'", default: "'default'" },
          { name: "size", desc: "尺寸", type: "'sm' | 'md' | 'lg'", default: "'md'" },
          { name: "loading", desc: "加载中", type: "boolean", default: "false" },
          { name: "disabled", desc: "禁用", type: "boolean", default: "false" },
          { name: "block", desc: "撑满父容器", type: "boolean", default: "false" },
          { name: "icon", desc: "图标", type: "ReactNode" },
          { name: "square", desc: "正方形（仅图标）", type: "boolean", default: "false" },
          { name: "href", desc: "链接地址，渲染为 a 标签", type: "string" },
          { name: "htmlType", desc: "原生 type", type: "'button' | 'submit' | 'reset'", default: "'button'" },
          { name: "onClick", desc: "点击回调", type: "(e) => void" },
        ],
      },
    ],
  },
  {
    key: "icon",
    name: "Icon",
    cn: "图标",
    desc: "内置 40+ 个 8×8 像素图标，基于网格字符串渲染为 SVG，支持任意尺寸与颜色。",
    category: "general",
    icon: "star",
    preview: () => (
      <Row gap={10}>
        <Icon name="heart" size={20} color="#ff004d" />
        <Icon name="star" size={20} color="#ffa300" />
        <Icon name="coin" size={20} color="#ffec27" />
        <Icon name="sword" size={20} />
      </Row>
    ),
    demos: [
      {
        title: "全部图标",
        desc: "点击复制名称。每个图标都是 8×8 的像素网格。",
        code: `import { Icon, ICON_NAMES } from "pixelnest-ui";

{ICON_NAMES.map((name) => <Icon key={name} name={name} size={24} />)}`,
        render: () => (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))", gap: 8 }}>
            {ICON_NAMES.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => navigator.clipboard?.writeText(n)}
                title={`复制 "${n}"`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 6px",
                  background: "#fff",
                  border: "2px solid #1d2b53",
                  cursor: "pointer",
                  fontFamily: "var(--pxui-font)",
                  fontSize: 7,
                  color: "#5f574f",
                }}
              >
                <Icon name={n} size={24} color="#1d2b53" />
                {n}
              </button>
            ))}
          </div>
        ),
      },
      {
        title: "尺寸、颜色与旋转",
        code: `<Icon name="heart" size={16} color="#ff004d" />
<Icon name="heart" size={24} color="#ff004d" />
<Icon name="heart" size={32} color="#ff004d" />
<Icon name="heart" size={48} color="#ff004d" />
<Icon name="gear" size={32} spin />`,
        render: () => (
          <Row gap={20}>
            <Icon name="heart" size={16} color="#ff004d" />
            <Icon name="heart" size={24} color="#ff004d" />
            <Icon name="heart" size={32} color="#ff004d" />
            <Icon name="heart" size={48} color="#ff004d" />
            <Icon name="gear" size={32} spin />
            <Icon name="sun" size={32} color="#ffa300" spin />
          </Row>
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "name", desc: "图标名称", type: "IconName" },
          { name: "size", desc: "尺寸（px）", type: "number | string", default: "16" },
          { name: "color", desc: "颜色", type: "string", default: "'currentColor'" },
          { name: "spin", desc: "旋转动画（8 帧）", type: "boolean", default: "false" },
        ],
      },
    ],
  },
  {
    key: "sprite",
    name: "Sprite",
    cn: "像素画",
    desc: "用字符网格 + 调色板绘制像素画，内置猫咪、史莱姆、幽灵三位吉祥物。",
    category: "general",
    icon: "cat",
    preview: () => (
      <Row gap={8}>
        <Sprite {...CAT_SPRITE} scale={2} />
        <Sprite {...SLIME_SPRITE} scale={2} />
      </Row>
    ),
    demos: [
      {
        title: "内置吉祥物",
        desc: "scale 控制每个像素的尺寸，animation 支持 bounce / float。",
        code: `import { Sprite, CAT_SPRITE, SLIME_SPRITE, GHOST_SPRITE } from "pixelnest-ui";

<Sprite {...CAT_SPRITE} scale={5} animation="float" />
<Sprite {...SLIME_SPRITE} scale={5} animation="bounce" />
<Sprite {...GHOST_SPRITE} scale={5} animation="float" />`,
        render: () => (
          <Row gap={32} align="flex-end">
            <Sprite {...CAT_SPRITE} scale={5} animation="float" />
            <Sprite {...SLIME_SPRITE} scale={5} animation="bounce" />
            <Sprite {...GHOST_SPRITE} scale={5} animation="float" />
          </Row>
        ),
      },
      {
        title: "自定义网格",
        desc: "grid 中每个字符对应 palette 里的一种颜色，'.' 为透明。",
        code: `const HEART = {
  grid: [
    "..##...##..",
    ".####.####.",
    "###########",
    "###########",
    "###########",
    ".#########.",
    "..#######..",
    "...#####...",
    "....###....",
    ".....#.....",
  ],
  palette: { "#": "#ff004d" },
};

<Sprite {...HEART} scale={6} />
<Sprite {...HEART} scale={6} palette={{ "#": "#29adff" }} flip />`,
        render: () => (
          <Row gap={24}>
            <Sprite {...HEART} scale={6} />
            <Sprite {...HEART} scale={6} palette={{ "#": "#29adff" }} />
            <Sprite {...HEART} scale={6} palette={{ "#": "#00e436" }} />
            <Sprite {...HEART} scale={3} />
          </Row>
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "grid", desc: "像素网格", type: "string[]" },
          { name: "palette", desc: "字符到颜色的映射", type: "Record<string, string>" },
          { name: "scale", desc: "每像素尺寸", type: "number", default: "4" },
          { name: "animation", desc: "动画", type: "'none' | 'bounce' | 'float'", default: "'none'" },
          { name: "flip", desc: "水平翻转", type: "boolean", default: "false" },
        ],
      },
    ],
  },
  {
    key: "title",
    name: "Title",
    cn: "标题",
    desc: "像素字体标题，支持 h1~h4、丝带 / 色条 / 下划线装饰与像素投影。",
    category: "general",
    icon: "flag",
    preview: () => (
      <Title level={4} variant="ribbon" style={{ margin: 0 }}>
        STAGE 1
      </Title>
    ),
    demos: [
      {
        title: "标题层级",
        code: `<Title level={1} shadow>LEVEL 1</Title>
<Title level={2}>LEVEL 2</Title>
<Title level={3}>LEVEL 3</Title>
<Title level={4}>LEVEL 4</Title>`,
        render: () => (
          <div>
            <Title level={1} shadow>
              LEVEL 1
            </Title>
            <Title level={2}>LEVEL 2</Title>
            <Title level={3}>LEVEL 3</Title>
            <Title level={4}>LEVEL 4</Title>
          </div>
        ),
      },
      {
        title: "装饰样式",
        desc: "variant 支持 ribbon（丝带）、bar（色条）、underline（像素下划线），color 决定装饰颜色。",
        code: `<Title variant="ribbon" color="yellow">STAGE CLEAR</Title>
<Title variant="ribbon" color="red" icon={<Icon name="heart" />}>BOSS BATTLE</Title>
<Title variant="bar" color="blue" level={3}>INVENTORY</Title>
<Title variant="underline" color="green" level={3}>QUEST LOG</Title>`,
        render: () => (
          <div style={{ display: "grid", gap: 20 }}>
            <Row gap={32}>
              <Title variant="ribbon" color="yellow" style={{ margin: 0 }}>
                STAGE CLEAR
              </Title>
              <Title variant="ribbon" color="red" icon={<Icon name="heart" />} style={{ margin: 0 }}>
                BOSS BATTLE
              </Title>
              <Title variant="ribbon" color="blue" level={3} style={{ margin: 0 }}>
                NEW GAME
              </Title>
            </Row>
            <Title variant="bar" color="blue" level={3}>
              INVENTORY
            </Title>
            <Title variant="underline" color="green" level={3}>
              QUEST LOG
            </Title>
          </div>
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "level", desc: "标题层级", type: "1 | 2 | 3 | 4", default: "2" },
          { name: "variant", desc: "装饰样式", type: "'default' | 'ribbon' | 'bar' | 'underline'", default: "'default'" },
          { name: "color", desc: "装饰颜色", type: "PaletteColor", default: "'yellow'" },
          { name: "shadow", desc: "像素投影", type: "boolean", default: "false" },
          { name: "icon", desc: "前置图标", type: "ReactNode" },
        ],
      },
    ],
  },
  {
    key: "divider",
    name: "Divider",
    cn: "分割线",
    desc: "像素风格分割线：实线 / 虚线 / 点线 / 双线，可带文字与垂直模式。",
    category: "general",
    icon: "minus",
    preview: () => (
      <div style={{ width: 160 }}>
        <Divider variant="dashed" style={{ margin: 0 }}>
          ···
        </Divider>
      </div>
    ),
    demos: [
      {
        title: "线条样式",
        code: `<Divider />
<Divider variant="dashed" />
<Divider variant="dotted" />
<Divider variant="double" color="blue" />`,
        render: () => (
          <div>
            <Divider />
            <Divider variant="dashed" />
            <Divider variant="dotted" />
            <Divider variant="double" color="blue" />
          </div>
        ),
      },
      {
        title: "带文字与垂直",
        code: `<Divider>CHAPTER 1</Divider>
<Divider variant="dashed" orientation="left">LEFT</Divider>
<Divider variant="dashed" orientation="right" plain>RIGHT</Divider>
<span>HP</span><Divider vertical /><span>MP</span><Divider vertical color="red" /><span>EXP</span>`,
        render: () => (
          <div>
            <Divider>CHAPTER 1</Divider>
            <Divider variant="dashed" orientation="left">
              LEFT
            </Divider>
            <Divider variant="dashed" orientation="right" plain>
              RIGHT
            </Divider>
            <div style={{ fontFamily: "var(--pxui-font)", fontSize: 12 }}>
              <span>HP</span>
              <Divider vertical />
              <span>MP</span>
              <Divider vertical color="red" />
              <span>EXP</span>
            </div>
          </div>
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "variant", desc: "线条样式", type: "'solid' | 'dashed' | 'dotted' | 'double'", default: "'solid'" },
          { name: "orientation", desc: "文字位置", type: "'left' | 'center' | 'right'", default: "'center'" },
          { name: "vertical", desc: "垂直分割线", type: "boolean", default: "false" },
          { name: "color", desc: "颜色", type: "PaletteColor", default: "'ink'" },
          { name: "plain", desc: "文字使用正文色", type: "boolean", default: "false" },
        ],
      },
    ],
  },
  {
    key: "tag",
    name: "Tag",
    cn: "标签",
    desc: "12 色像素标签，solid / light / outlined 三种变体，支持关闭与可选中。",
    category: "general",
    icon: "flag",
    preview: () => (
      <Row gap={6}>
        <Tag color="red">HOT</Tag>
        <Tag color="green" variant="light">
          NEW
        </Tag>
      </Row>
    ),
    demos: [
      {
        title: "颜色",
        code: `<Tag>DEFAULT</Tag>
<Tag color="red">RED</Tag>
<Tag color="orange">ORANGE</Tag>
<Tag color="yellow">YELLOW</Tag>
<Tag color="green">GREEN</Tag>
<Tag color="blue">BLUE</Tag>
{/* ... indigo / pink / peach / brown / plum / forest / navy */}`,
        render: () => (
          <Row gap={8}>
            <Tag>DEFAULT</Tag>
            {TAG_COLORS.map((c) => (
              <Tag key={c} color={c}>
                {c.toUpperCase()}
              </Tag>
            ))}
          </Row>
        ),
      },
      {
        title: "变体与尺寸",
        code: `<Tag color="blue" variant="light">LIGHT</Tag>
<Tag color="blue" variant="outlined">OUTLINED</Tag>
<Tag color="green" size="sm">SMALL</Tag>
<Tag color="green" size="lg" icon={<Icon name="coin" size={12} />}>LARGE</Tag>`,
        render: () => (
          <div style={{ display: "grid", gap: 12 }}>
            <Row gap={8}>
              {TAG_COLORS.slice(0, 6).map((c) => (
                <Tag key={c} color={c} variant="light">
                  {c.toUpperCase()}
                </Tag>
              ))}
            </Row>
            <Row gap={8}>
              {TAG_COLORS.slice(0, 6).map((c) => (
                <Tag key={c} color={c} variant="outlined">
                  {c.toUpperCase()}
                </Tag>
              ))}
            </Row>
            <Row gap={8}>
              <Tag color="green" size="sm">
                SMALL
              </Tag>
              <Tag color="green">MEDIUM</Tag>
              <Tag color="green" size="lg" icon={<Icon name="coin" size={12} />}>
                LARGE
              </Tag>
            </Row>
          </div>
        ),
      },
      {
        title: "可关闭与可选中",
        code: `<Tag color="pink" closable onClose={() => console.log("closed")}>CLOSABLE</Tag>

const [sel, setSel] = useState(["RPG"]);
<Tag color={sel.includes("RPG") ? "blue" : "default"} checked={sel.includes("RPG")} onClick={() => toggle("RPG")}>RPG</Tag>`,
        render: () => (
          <div style={{ display: "grid", gap: 16 }}>
            <Row gap={8}>
              <Tag color="pink" closable>
                CLOSABLE
              </Tag>
              <Tag color="yellow" closable>
                ITEM
              </Tag>
              <Tag color="red" disabled>
                DISABLED
              </Tag>
            </Row>
            <CheckableTags />
          </div>
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "color", desc: "颜色", type: "PaletteColor | 'default'", default: "'default'" },
          { name: "variant", desc: "变体", type: "'solid' | 'light' | 'outlined'", default: "'solid'" },
          { name: "size", desc: "尺寸", type: "'sm' | 'md' | 'lg'", default: "'md'" },
          { name: "closable", desc: "可关闭", type: "boolean", default: "false" },
          { name: "onClose", desc: "关闭回调（preventDefault 可阻止移除）", type: "(e) => void" },
          { name: "checked", desc: "选中态", type: "boolean" },
          { name: "onClick", desc: "点击回调", type: "(e) => void" },
          { name: "icon", desc: "前置图标", type: "ReactNode" },
        ],
      },
    ],
  },
  {
    key: "badge",
    name: "Badge",
    cn: "徽标",
    desc: "角标数字、封顶值、小圆点与脉冲提示，可独立使用。",
    category: "general",
    icon: "bell",
    preview: () => (
      <Badge count={5}>
        <Button size="sm" square icon={<Icon name="bell" />} aria-label="bell" />
      </Badge>
    ),
    demos: [
      {
        title: "基础用法",
        code: `<Badge count={5}><Avatar /></Badge>
<Badge count={128} max={99}><Avatar /></Badge>
<Badge dot><Avatar /></Badge>
<Badge dot pulse color="green"><Avatar /></Badge>
<Badge text="NEW" color="yellow"><Avatar /></Badge>`,
        render: () => (
          <Row gap={28}>
            <Badge count={5}>
              <Avatar icon={<Icon name="mail" size={20} />} />
            </Badge>
            <Badge count={128} max={99}>
              <Avatar icon={<Icon name="bell" size={20} />} />
            </Badge>
            <Badge dot>
              <Avatar icon={<Icon name="user" size={20} />} />
            </Badge>
            <Badge dot pulse color="green">
              <Avatar icon={<Icon name="gear" size={20} />} />
            </Badge>
            <Badge text="NEW" color="yellow">
              <Avatar icon={<Icon name="potion" size={20} />} />
            </Badge>
          </Row>
        ),
      },
      {
        title: "独立使用与颜色",
        code: `<Badge count={9} color="red" />
<Badge count={99} color="blue" />
<Badge text="LV.42" color="green" />
<Badge text="BOSS" color="plum" size="sm" />`,
        render: () => (
          <Row gap={12}>
            <Badge count={9} color="red" />
            <Badge count={99} color="blue" />
            <Badge count={0} showZero color="yellow" />
            <Badge text="LV.42" color="green" />
            <Badge text="BOSS" color="plum" size="sm" />
            <Badge text="RARE" color="orange" size="sm" />
          </Row>
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "count", desc: "数字", type: "number" },
          { name: "max", desc: "封顶值", type: "number", default: "99" },
          { name: "dot", desc: "仅显示圆点", type: "boolean", default: "false" },
          { name: "text", desc: "自定义文本", type: "ReactNode" },
          { name: "color", desc: "颜色", type: "PaletteColor", default: "'red'" },
          { name: "size", desc: "尺寸", type: "'sm' | 'md'", default: "'md'" },
          { name: "pulse", desc: "闪烁", type: "boolean", default: "false" },
          { name: "showZero", desc: "为 0 时显示", type: "boolean", default: "false" },
        ],
      },
    ],
  },
  {
    key: "avatar",
    name: "Avatar",
    cn: "头像",
    desc: "像素边框头像，方形 / 像素圆形，支持图片、图标、文字与头像组折叠。",
    category: "general",
    icon: "user",
    preview: () => (
      <Avatar.Group size="sm">
        <Avatar color="blue">A</Avatar>
        <Avatar color="pink">B</Avatar>
        <Avatar color="green">C</Avatar>
      </Avatar.Group>
    ),
    demos: [
      {
        title: "尺寸与形状",
        code: `<Avatar size="sm">P1</Avatar>
<Avatar>P2</Avatar>
<Avatar size="lg">P3</Avatar>
<Avatar size="xl" shape="circle" color="blue">P4</Avatar>
<Avatar size={48} shape="circle" color="green" icon={<Icon name="cat" size={24} />} />`,
        render: () => (
          <Row gap={16}>
            <Avatar size="sm">P1</Avatar>
            <Avatar>P2</Avatar>
            <Avatar size="lg">P3</Avatar>
            <Avatar size="xl" shape="circle" color="blue">
              P4
            </Avatar>
            <Avatar size={48} shape="circle" color="green" icon={<Icon name="cat" size={24} />} />
            <Avatar size={48} color="yellow">
              <Sprite {...SLIME_SPRITE} scale={2} />
            </Avatar>
          </Row>
        ),
      },
      {
        title: "头像组",
        desc: "maxCount 超出部分折叠为 +N。",
        code: `<Avatar.Group maxCount={3}>
  <Avatar color="blue">A</Avatar>
  <Avatar color="pink">B</Avatar>
  <Avatar color="green">C</Avatar>
  <Avatar color="yellow">D</Avatar>
  <Avatar color="orange">E</Avatar>
</Avatar.Group>`,
        render: () => (
          <Row gap={32}>
            <Avatar.Group maxCount={3}>
              <Avatar color="blue">A</Avatar>
              <Avatar color="pink">B</Avatar>
              <Avatar color="green">C</Avatar>
              <Avatar color="yellow">D</Avatar>
              <Avatar color="orange">E</Avatar>
            </Avatar.Group>
            <Avatar.Group shape="circle" size="lg">
              <Avatar color="red" icon={<Icon name="sword" size={24} />} />
              <Avatar color="blue" icon={<Icon name="shield" size={24} />} />
              <Avatar color="green" icon={<Icon name="potion" size={24} />} />
            </Avatar.Group>
          </Row>
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "src", desc: "图片地址", type: "string" },
          { name: "size", desc: "尺寸", type: "'sm' | 'md' | 'lg' | 'xl' | number", default: "'md'" },
          { name: "shape", desc: "形状", type: "'square' | 'circle'", default: "'square'" },
          { name: "color", desc: "背景色", type: "PaletteColor", default: "'peach'" },
          { name: "icon", desc: "图标", type: "ReactNode" },
        ],
      },
      {
        title: "Avatar.Group",
        rows: [
          { name: "maxCount", desc: "最多显示数量", type: "number" },
          { name: "size", desc: "统一尺寸", type: "AvatarSize" },
          { name: "shape", desc: "统一形状", type: "AvatarShape" },
        ],
      },
    ],
  },
];
