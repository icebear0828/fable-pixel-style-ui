import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sprite, CAT_SPRITE, SLIME_SPRITE, GHOST_SPRITE } from "./Sprite";

const meta = {
  title: "General/Sprite",
  component: Sprite,
  tags: ["autodocs"],
  argTypes: {
    scale: { control: { type: "range", min: 1, max: 12, step: 1 } },
    animation: { control: "inline-radio", options: ["none", "bounce", "float"] },
    flip: { control: "boolean" },
    grid: { control: "object" },
    palette: { control: "object" },
  },
  args: { ...CAT_SPRITE, scale: 6, animation: "none", flip: false },
} satisfies Meta<typeof Sprite>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cat: Story = {};
export const Slime: Story = { args: { ...SLIME_SPRITE, animation: "bounce" } };
export const Ghost: Story = { args: { ...GHOST_SPRITE, animation: "float" } };

export const CustomHeart: Story = {
  args: {
    grid: ["..##...##..", ".####.####.", "###########", "###########", "###########", ".#########.", "..#######..", "...#####...", "....###....", ".....#....."],
    palette: { "#": "#ff004d" },
    scale: 8,
  },
};

export const Party: Story = {
  render: () => (
    <div className="sb-row" style={{ alignItems: "flex-end", gap: 32 }}>
      <Sprite {...GHOST_SPRITE} scale={5} animation="float" />
      <Sprite {...CAT_SPRITE} scale={6} animation="bounce" />
      <Sprite {...SLIME_SPRITE} scale={5} animation="bounce" style={{ animationDelay: "0.3s" }} />
    </div>
  ),
};
