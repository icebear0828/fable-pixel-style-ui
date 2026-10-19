import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";
import { Button } from "../Button/Button";
import { Tag } from "../Tag/Tag";
import { Icon } from "../Icon/Icon";
import { Sprite, CAT_SPRITE } from "../Sprite/Sprite";
import { PALETTE } from "../utils/cx";

const meta = {
  title: "Data/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "dashed", "dark", "flat"] },
    color: { control: "select", options: [undefined, ...Object.keys(PALETTE)] },
    size: { control: "inline-radio", options: ["sm", "md"] },
    hoverable: { control: "boolean" },
    title: { control: "text" },
    ribbon: { control: "text" },
    extra: { control: false },
    cover: { control: false },
    footer: { control: false },
    actions: { control: false },
  },
  args: {
    title: "INVENTORY",
    children: "卡片内容区域使用正文字体以保证可读性。标题与 extra 使用像素字体，形成层次对比。",
    variant: "default",
    size: "md",
    hoverable: false,
    style: { width: 320 },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const WithExtra: Story = { args: { extra: <Tag color="blue">12/20</Tag> } };
export const Dark: Story = { args: { variant: "dark", title: "TERMINAL", children: "> DARK MODE_" } };
export const Dashed: Story = { args: { variant: "dashed" } };
export const Colored: Story = { args: { color: "yellow", hoverable: true } };

export const Full: Story = {
  args: {
    title: "PIXEL CAT",
    ribbon: "RARE",
    cover: (
      <div style={{ background: "#29adff", display: "flex", justifyContent: "center", padding: 20 }}>
        <Sprite {...CAT_SPRITE} scale={5} animation="float" />
      </div>
    ),
    footer: (
      <Button type="primary" size="sm">
        ADOPT
      </Button>
    ),
    actions: [<Icon key="h" name="heart" />, <Icon key="s" name="star" />, <Icon key="m" name="mail" />],
    children: "来自像素岛的伙伴，擅长翻越围栏和拒绝洗澡。",
  },
};
