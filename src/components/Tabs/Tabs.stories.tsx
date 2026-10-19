import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./Tabs";
import { Icon } from "../Icon/Icon";
import { Tag } from "../Tag/Tag";

const ITEMS = [
  { key: "items", label: "ITEMS", icon: <Icon name="potion" size={12} />, children: "背包里有 3 瓶药水、1 把生锈的剑和一只不知道从哪来的史莱姆。" },
  { key: "skills", label: "SKILLS", icon: <Icon name="bolt" size={12} />, children: "已习得：火球术 Lv.3、治愈 Lv.1、翻滚 Lv.MAX。" },
  { key: "map", label: "MAP", icon: <Icon name="flag" size={12} />, children: "已探索 42%。" },
  { key: "locked", label: "LOCKED", disabled: true, children: "" },
];

const meta = {
  title: "Data/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "inline-radio", options: ["card", "button"] },
    destroyInactive: { control: "boolean" },
    items: { control: false },
    extra: { control: false },
    onChange: { action: "change" },
  },
  args: { items: ITEMS, type: "card", defaultActiveKey: "items" },
  decorators: [(Story) => <div style={{ width: 520 }}>{Story()}</div>],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const ButtonType: Story = { args: { type: "button" } };
export const WithExtra: Story = { args: { extra: <Tag color="yellow">LV.42</Tag> } };
