import { useState } from "react";
import { Input, Textarea, Checkbox, CheckboxGroup, Radio, RadioGroup, Switch, Select, Slider, Rate, Icon, Button, Tag } from "@/components";
import type { ComponentDoc } from "../types";

const Row = ({ children, gap = 16, align = "center" }: { children: React.ReactNode; gap?: number; align?: string }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: align }}>{children}</div>
);
const Col = ({ children, gap = 16 }: { children: React.ReactNode; gap?: number }) => <div style={{ display: "grid", gap }}>{children}</div>;

const SearchInput = () => {
  const [v, setV] = useState("");
  return (
    <Col>
      <Row>
        <Input placeholder="SEARCH ITEM" prefix={<Icon name="search" />} allowClear value={v} onChange={setV} />
        <Input placeholder="PASSWORD" type="password" suffix={<Icon name="key" />} />
        <Input placeholder="GOLD" suffix="G" defaultValue="9999" style={{ textAlign: "right" }} />
      </Row>
      <Row>
        <Input placeholder="PLAYER NAME" maxLength={12} showCount defaultValue="PIXEL" />
        <Input placeholder="EMAIL" prefix={<Icon name="mail" />} status="error" defaultValue="pixel@" />
        <Input placeholder="OK" status="success" defaultValue="VALID" />
      </Row>
    </Col>
  );
};

const CheckAll = () => {
  const all = ["SWORD", "SHIELD", "POTION", "KEY"];
  const [val, setVal] = useState<(string | number)[]>(["SWORD"]);
  const allChecked = val.length === all.length;
  return (
    <Col>
      <Checkbox checked={allChecked} indeterminate={val.length > 0 && !allChecked} onChange={(c) => setVal(c ? all : [])}>
        SELECT ALL
      </Checkbox>
      <CheckboxGroup options={all} value={val} onChange={setVal} />
      <div style={{ fontSize: 12, color: "#5f574f" }}>已选：{val.join(", ") || "-"}</div>
    </Col>
  );
};

const RadioDemo = () => {
  const [v, setV] = useState<string | number>("warrior");
  return (
    <Col>
      <RadioGroup
        value={v}
        onChange={setV}
        options={[
          { label: "WARRIOR", value: "warrior" },
          { label: "MAGE", value: "mage" },
          { label: "ARCHER", value: "archer" },
          { label: "LOCKED", value: "locked", disabled: true },
        ]}
      />
      <RadioGroup type="button" value={v} onChange={setV} options={["warrior", "mage", "archer"].map((x) => ({ label: x.toUpperCase(), value: x }))} />
      <div style={{ fontSize: 12, color: "#5f574f" }}>职业：{String(v).toUpperCase()}</div>
    </Col>
  );
};

const SwitchDemo = () => {
  const [on, setOn] = useState(true);
  return (
    <Row gap={24}>
      <Switch checked={on} onChange={setOn} />
      <Switch defaultChecked color="blue" checkedText="ON" uncheckedText="OFF" />
      <Switch defaultChecked color="pink" size="lg" checkedText="BGM" uncheckedText="MUTE" />
      <Switch size="sm" defaultChecked />
      <Switch loading defaultChecked />
      <Switch disabled />
      <span style={{ fontFamily: "var(--pxui-font)", fontSize: 10 }}>{on ? "SOUND ON" : "SOUND OFF"}</span>
    </Row>
  );
};

const OPTIONS = [
  { label: "🗡 SWORD", value: "sword" },
  { label: "🛡 SHIELD", value: "shield" },
  { label: "🧪 POTION", value: "potion" },
  { label: "🔑 KEY", value: "key" },
  { label: "💎 GEM (locked)", value: "gem", disabled: true },
];

const SelectDemo = () => {
  const [v, setV] = useState<string | undefined>("sword");
  const [multi, setMulti] = useState<string[]>(["sword", "potion"]);
  return (
    <Col>
      <Row>
        <Select options={OPTIONS} value={v} onChange={setV} allowClear placeholder="PICK ITEM" />
        <Select options={OPTIONS} size="sm" defaultValue="shield" />
        <Select options={OPTIONS} size="lg" placeholder="LARGE" />
        <Select options={OPTIONS} disabled placeholder="DISABLED" />
      </Row>
      <Select options={OPTIONS} multiple value={multi} onChange={setMulti} placeholder="MULTIPLE" style={{ width: 360 }} allowClear />
      <div style={{ fontSize: 12, color: "#5f574f" }}>
        单选：{v ?? "-"} ／ 多选：{multi.join(", ") || "-"}
      </div>
    </Col>
  );
};

const SliderDemo = () => {
  const [v, setV] = useState(40);
  return (
    <Col gap={32}>
      <Row>
        <div style={{ flex: 1, minWidth: 240 }}>
          <Slider value={v} onChange={setV} />
        </div>
        <Tag color="blue">{v}</Tag>
      </Row>
      <Slider defaultValue={60} color="green" step={10} marks={{ 0: "0", 50: "50", 100: "MAX" }} />
      <Slider defaultValue={3} min={1} max={5} color="red" tooltip="always" formatTooltip={(x) => `LV.${x}`} />
      <Slider defaultValue={30} disabled />
    </Col>
  );
};

const RateDemo = () => {
  const [v, setV] = useState(3);
  return (
    <Col>
      <Row gap={24}>
        <Rate value={v} onChange={setV} />
        <Rate defaultValue={2} character="heart" color="red" count={3} />
        <Rate defaultValue={4} character="coin" color="orange" size="sm" />
      </Row>
      <Rate defaultValue={4} size="lg" texts={["BAD", "MEH", "OK", "GOOD", "EPIC"]} />
      <Rate value={4.0 > 3 ? 4 : 0} readonly character="heart" color="pink" />
    </Col>
  );
};

export const formDocs: ComponentDoc[] = [
  {
    key: "input",
    name: "Input",
    cn: "输入框",
    desc: "像素边框输入框，支持前后缀、清空、字数统计、状态色与多行文本。",
    category: "form",
    icon: "code",
    preview: () => <Input size="sm" placeholder="NAME" prefix={<Icon name="user" size={10} />} style={{ width: 120 }} wrapperStyle={{ width: 140 }} />,
    demos: [
      {
        title: "尺寸",
        code: `<Input size="sm" placeholder="SMALL" />
<Input placeholder="MEDIUM" />
<Input size="lg" placeholder="LARGE" />
<Input placeholder="DISABLED" disabled />`,
        render: () => (
          <Row>
            <Input size="sm" placeholder="SMALL" />
            <Input placeholder="MEDIUM" />
            <Input size="lg" placeholder="LARGE" />
            <Input placeholder="DISABLED" disabled />
          </Row>
        ),
      },
      {
        title: "前后缀、清空、计数与状态",
        code: `<Input placeholder="SEARCH ITEM" prefix={<Icon name="search" />} allowClear />
<Input placeholder="PASSWORD" type="password" suffix={<Icon name="key" />} />
<Input placeholder="GOLD" suffix="G" />
<Input placeholder="PLAYER NAME" maxLength={12} showCount />
<Input status="error" defaultValue="pixel@" />
<Input status="success" defaultValue="VALID" />`,
        render: () => <SearchInput />,
      },
      {
        title: "多行文本",
        code: `<Textarea placeholder="WRITE YOUR STORY..." rows={4} maxLength={200} showCount block />`,
        render: () => (
          <div style={{ maxWidth: 520 }}>
            <Textarea placeholder="WRITE YOUR STORY..." rows={4} maxLength={200} showCount block />
          </div>
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "size", desc: "尺寸", type: "'sm' | 'md' | 'lg'", default: "'md'" },
          { name: "status", desc: "状态", type: "'default' | 'error' | 'success'", default: "'default'" },
          { name: "prefix / suffix", desc: "前缀 / 后缀", type: "ReactNode" },
          { name: "allowClear", desc: "可清空", type: "boolean", default: "false" },
          { name: "showCount", desc: "字数统计", type: "boolean", default: "false" },
          { name: "block", desc: "撑满容器", type: "boolean", default: "false" },
          { name: "onChange", desc: "值变化", type: "(value: string, e) => void" },
          { name: "onPressEnter", desc: "按下回车", type: "(value: string) => void" },
        ],
      },
      {
        title: "Textarea",
        rows: [
          { name: "rows", desc: "行数", type: "number", default: "3" },
          { name: "showCount", desc: "字数统计", type: "boolean", default: "false" },
          { name: "status", desc: "状态", type: "'default' | 'error' | 'success'", default: "'default'" },
        ],
      },
    ],
  },
  {
    key: "checkbox",
    name: "Checkbox",
    cn: "多选框",
    desc: "像素方格多选框，支持半选、分组、尺寸与自定义颜色。",
    category: "form",
    icon: "check",
    preview: () => (
      <Row gap={10}>
        <Checkbox defaultChecked size="sm">
          A
        </Checkbox>
        <Checkbox size="sm">B</Checkbox>
      </Row>
    ),
    demos: [
      {
        title: "基础用法",
        code: `<Checkbox defaultChecked>CHECKED</Checkbox>
<Checkbox>UNCHECKED</Checkbox>
<Checkbox indeterminate>INDETERMINATE</Checkbox>
<Checkbox disabled defaultChecked>DISABLED</Checkbox>
<Checkbox color="green" defaultChecked>GREEN</Checkbox>`,
        render: () => (
          <Row gap={24}>
            <Checkbox defaultChecked>CHECKED</Checkbox>
            <Checkbox>UNCHECKED</Checkbox>
            <Checkbox indeterminate>INDETERMINATE</Checkbox>
            <Checkbox disabled defaultChecked>
              DISABLED
            </Checkbox>
            <Checkbox color="green" defaultChecked>
              GREEN
            </Checkbox>
            <Checkbox color="pink" defaultChecked>
              PINK
            </Checkbox>
          </Row>
        ),
      },
      {
        title: "尺寸",
        code: `<Checkbox size="sm" defaultChecked>SMALL</Checkbox>
<Checkbox defaultChecked>MEDIUM</Checkbox>
<Checkbox size="lg" defaultChecked>LARGE</Checkbox>`,
        render: () => (
          <Row gap={24}>
            <Checkbox size="sm" defaultChecked>
              SMALL
            </Checkbox>
            <Checkbox defaultChecked>MEDIUM</Checkbox>
            <Checkbox size="lg" defaultChecked>
              LARGE
            </Checkbox>
          </Row>
        ),
      },
      {
        title: "全选与分组",
        code: `const all = ["SWORD", "SHIELD", "POTION", "KEY"];
const [val, setVal] = useState(["SWORD"]);

<Checkbox checked={val.length === all.length} indeterminate={val.length > 0 && val.length < all.length}
  onChange={(c) => setVal(c ? all : [])}>SELECT ALL</Checkbox>
<CheckboxGroup options={all} value={val} onChange={setVal} />`,
        render: () => <CheckAll />,
      },
    ],
    props: [
      {
        rows: [
          { name: "checked", desc: "是否选中", type: "boolean" },
          { name: "indeterminate", desc: "半选", type: "boolean", default: "false" },
          { name: "size", desc: "尺寸", type: "'sm' | 'md' | 'lg'", default: "'md'" },
          { name: "color", desc: "选中颜色", type: "PaletteColor", default: "'blue'" },
          { name: "onChange", desc: "变化回调", type: "(checked: boolean, e) => void" },
        ],
      },
      {
        title: "CheckboxGroup",
        rows: [
          { name: "options", desc: "选项", type: "(string | { label, value, disabled })[]" },
          { name: "value", desc: "选中值", type: "(string | number)[]" },
          { name: "vertical", desc: "垂直排列", type: "boolean", default: "false" },
          { name: "onChange", desc: "变化回调", type: "(value[]) => void" },
        ],
      },
    ],
  },
  {
    key: "radio",
    name: "Radio",
    cn: "单选框",
    desc: "像素圆形单选框，支持分组、按钮样式、尺寸与颜色。",
    category: "form",
    icon: "coin",
    preview: () => (
      <RadioGroup size="sm" defaultValue="a">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>
    ),
    demos: [
      {
        title: "分组与按钮样式",
        code: `<RadioGroup value={v} onChange={setV}
  options={[{ label: "WARRIOR", value: "warrior" }, { label: "MAGE", value: "mage" }, { label: "ARCHER", value: "archer" }]} />

<RadioGroup type="button" value={v} onChange={setV} options={[...]} />`,
        render: () => <RadioDemo />,
      },
      {
        title: "尺寸与颜色",
        code: `<RadioGroup size="sm" defaultValue="1" color="green">
  <Radio value="1">EASY</Radio>
  <Radio value="2">NORMAL</Radio>
</RadioGroup>
<RadioGroup size="lg" defaultValue="3" color="red" vertical>
  <Radio value="3">HARD</Radio>
  <Radio value="4">NIGHTMARE</Radio>
</RadioGroup>`,
        render: () => (
          <Row gap={40} align="flex-start">
            <RadioGroup size="sm" defaultValue="1" color="green">
              <Radio value="1">EASY</Radio>
              <Radio value="2">NORMAL</Radio>
            </RadioGroup>
            <RadioGroup defaultValue="1" color="orange">
              <Radio value="1">EASY</Radio>
              <Radio value="2">NORMAL</Radio>
            </RadioGroup>
            <RadioGroup size="lg" defaultValue="3" color="red" vertical>
              <Radio value="3">HARD</Radio>
              <Radio value="4">NIGHTMARE</Radio>
            </RadioGroup>
          </Row>
        ),
      },
    ],
    props: [
      {
        title: "RadioGroup",
        rows: [
          { name: "options", desc: "选项", type: "(string | { label, value, disabled })[]" },
          { name: "value / defaultValue", desc: "选中值", type: "string | number" },
          { name: "type", desc: "样式", type: "'default' | 'button'", default: "'default'" },
          { name: "size", desc: "尺寸", type: "'sm' | 'md' | 'lg'", default: "'md'" },
          { name: "color", desc: "选中颜色", type: "PaletteColor", default: "'blue'" },
          { name: "vertical", desc: "垂直排列", type: "boolean", default: "false" },
          { name: "onChange", desc: "变化回调", type: "(value) => void" },
        ],
      },
    ],
  },
  {
    key: "switch",
    name: "Switch",
    cn: "开关",
    desc: "三段步进动画的像素开关，支持文案、尺寸、颜色与加载态。",
    category: "form",
    icon: "bolt",
    preview: () => (
      <Row gap={8}>
        <Switch defaultChecked size="sm" />
        <Switch size="sm" color="pink" defaultChecked />
      </Row>
    ),
    demos: [
      {
        title: "基础用法",
        code: `<Switch checked={on} onChange={setOn} />
<Switch defaultChecked color="blue" checkedText="ON" uncheckedText="OFF" />
<Switch defaultChecked color="pink" size="lg" checkedText="BGM" uncheckedText="MUTE" />
<Switch size="sm" defaultChecked />
<Switch loading defaultChecked />
<Switch disabled />`,
        render: () => <SwitchDemo />,
      },
    ],
    props: [
      {
        rows: [
          { name: "checked / defaultChecked", desc: "开关状态", type: "boolean" },
          { name: "size", desc: "尺寸", type: "'sm' | 'md' | 'lg'", default: "'md'" },
          { name: "color", desc: "开启颜色", type: "PaletteColor", default: "'green'" },
          { name: "checkedText / uncheckedText", desc: "文案", type: "ReactNode" },
          { name: "loading", desc: "加载中", type: "boolean", default: "false" },
          { name: "onChange", desc: "变化回调", type: "(checked: boolean) => void" },
        ],
      },
    ],
  },
  {
    key: "select",
    name: "Select",
    cn: "选择器",
    desc: "Portal 渲染的像素下拉选择，支持单选、多选、清空、禁用项与键盘操作。",
    category: "form",
    icon: "chevronDown",
    preview: () => <Select size="sm" options={OPTIONS} defaultValue="sword" style={{ width: 140 }} />,
    demos: [
      {
        title: "单选与多选",
        desc: "方向键移动、Enter 选择、Esc 关闭；菜单会自动避让视口边缘。",
        code: `const options = [
  { label: "🗡 SWORD", value: "sword" },
  { label: "🛡 SHIELD", value: "shield" },
  { label: "🧪 POTION", value: "potion" },
  { label: "💎 GEM", value: "gem", disabled: true },
];

<Select options={options} value={v} onChange={setV} allowClear placeholder="PICK ITEM" />
<Select options={options} size="sm" defaultValue="shield" />
<Select options={options} multiple value={multi} onChange={setMulti} />`,
        render: () => <SelectDemo />,
      },
    ],
    props: [
      {
        rows: [
          { name: "options", desc: "选项", type: "{ label, value, disabled? }[]" },
          { name: "value / defaultValue", desc: "值", type: "SelectValue | SelectValue[]" },
          { name: "multiple", desc: "多选", type: "boolean", default: "false" },
          { name: "allowClear", desc: "可清空", type: "boolean", default: "false" },
          { name: "size", desc: "尺寸", type: "'sm' | 'md' | 'lg'", default: "'md'" },
          { name: "status", desc: "状态", type: "'default' | 'error'", default: "'default'" },
          { name: "placeholder", desc: "占位", type: "string", default: "'请选择'" },
          { name: "onChange", desc: "变化回调", type: "(value, option) => void" },
        ],
      },
    ],
  },
  {
    key: "slider",
    name: "Slider",
    cn: "滑块",
    desc: "可拖拽的像素滑块，支持步长、刻度、常驻提示与键盘操作。",
    category: "form",
    icon: "minus",
    preview: () => (
      <div style={{ width: 150 }}>
        <Slider defaultValue={60} tooltip="none" />
      </div>
    ),
    demos: [
      {
        title: "基础用法",
        code: `<Slider value={v} onChange={setV} />
<Slider defaultValue={60} color="green" step={10} marks={{ 0: "0", 50: "50", 100: "MAX" }} />
<Slider defaultValue={3} min={1} max={5} color="red" tooltip="always" formatTooltip={(x) => \`LV.\${x}\`} />
<Slider defaultValue={30} disabled />`,
        render: () => <SliderDemo />,
      },
    ],
    props: [
      {
        rows: [
          { name: "value / defaultValue", desc: "值", type: "number", default: "0" },
          { name: "min / max", desc: "范围", type: "number", default: "0 / 100" },
          { name: "step", desc: "步长", type: "number", default: "1" },
          { name: "marks", desc: "刻度", type: "Record<number, ReactNode>" },
          { name: "tooltip", desc: "提示", type: "'hover' | 'always' | 'none'", default: "'hover'" },
          { name: "formatTooltip", desc: "格式化提示", type: "(v) => ReactNode" },
          { name: "color", desc: "颜色", type: "PaletteColor", default: "'blue'" },
          { name: "onChange / onAfterChange", desc: "回调", type: "(v: number) => void" },
        ],
      },
    ],
  },
  {
    key: "rate",
    name: "Rate",
    cn: "评分",
    desc: "星星 / 爱心 / 金币评分，支持悬停预览、只读与文案提示。",
    category: "form",
    icon: "star",
    preview: () => <Rate defaultValue={3} size="sm" />,
    demos: [
      {
        title: "基础用法",
        code: `<Rate value={v} onChange={setV} />
<Rate defaultValue={2} character="heart" color="red" count={3} />
<Rate defaultValue={4} character="coin" color="orange" size="sm" />
<Rate defaultValue={4} size="lg" texts={["BAD", "MEH", "OK", "GOOD", "EPIC"]} />
<Rate value={4} readonly character="heart" color="pink" />`,
        render: () => <RateDemo />,
      },
    ],
    props: [
      {
        rows: [
          { name: "value / defaultValue", desc: "分值", type: "number", default: "0" },
          { name: "count", desc: "总数", type: "number", default: "5" },
          { name: "character", desc: "图标", type: "IconName", default: "'star'" },
          { name: "color", desc: "颜色", type: "PaletteColor", default: "'yellow'" },
          { name: "size", desc: "尺寸", type: "'sm' | 'md' | 'lg'", default: "'md'" },
          { name: "readonly", desc: "只读", type: "boolean", default: "false" },
          { name: "texts", desc: "文案", type: "string[]" },
          { name: "onChange", desc: "变化回调", type: "(v: number) => void" },
        ],
      },
    ],
  },
];

export { Button };
