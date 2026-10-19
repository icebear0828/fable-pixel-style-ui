import type { Meta, StoryObj } from "@storybook/react-vite";
import { Collapse } from "./Collapse";
import { Icon } from "../Icon/Icon";

const ITEMS = [
  { key: "1", label: "QUEST: SAVE THE CAT", icon: <Icon name="cat" size={14} />, extra: "ACTIVE", children: "前往北方森林，找到迷路的像素猫并带它回到村庄。奖励：100 金币、经验 500。" },
  { key: "2", label: "QUEST: SLIME HUNT", icon: <Icon name="sword" size={14} />, children: "消灭 10 只史莱姆。它们很可爱，但真的会黏在鞋底上。" },
  { key: "3", label: "QUEST: LOCKED", icon: <Icon name="key" size={14} />, disabled: true, children: "..." },
];

const meta = {
  title: "Data/Collapse",
  component: Collapse,
  tags: ["autodocs"],
  argTypes: {
    accordion: { control: "boolean" },
    ghost: { control: "boolean" },
    items: { control: false },
    onChange: { action: "change" },
  },
  args: { items: ITEMS, defaultActiveKey: ["1"], accordion: false, ghost: false },
  decorators: [(Story) => <div style={{ width: 480 }}>{Story()}</div>],
} satisfies Meta<typeof Collapse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Accordion: Story = { args: { accordion: true } };
export const Ghost: Story = { args: { ghost: true, accordion: true } };
