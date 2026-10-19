import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";
import { Icon } from "../Icon/Icon";
import { Sprite, SLIME_SPRITE } from "../Sprite/Sprite";
import { PALETTE } from "../utils/cx";

const meta = {
  title: "General/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl", 48, 96] },
    shape: { control: "inline-radio", options: ["square", "circle"] },
    color: { control: "select", options: Object.keys(PALETTE) },
    icon: { control: false },
  },
  args: { children: "P1", size: "lg", shape: "square", color: "peach" },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Circle: Story = { args: { shape: "circle", color: "blue", size: "xl" } };
export const WithIcon: Story = { args: { children: undefined, icon: <Icon name="cat" size={28} />, color: "green" } };
export const WithSprite: Story = { args: { children: <Sprite {...SLIME_SPRITE} scale={2} />, color: "yellow", size: 56 } };

export const Group: Story = {
  render: () => (
    <div className="sb-row" style={{ gap: 32 }}>
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
    </div>
  ),
};
