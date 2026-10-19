import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./Divider";
import { PALETTE } from "../utils/cx";

const meta = {
  title: "General/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "inline-radio", options: ["solid", "dashed", "dotted", "double"] },
    orientation: { control: "inline-radio", options: ["left", "center", "right"] },
    color: { control: "select", options: Object.keys(PALETTE) },
    vertical: { control: "boolean" },
    plain: { control: "boolean" },
  },
  args: { children: "CHAPTER 1", variant: "dashed", orientation: "center", color: "ink" },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div>
      <Divider />
      <Divider variant="dashed" />
      <Divider variant="dotted" />
      <Divider variant="double" color="blue" />
      <Divider orientation="left">LEFT</Divider>
      <Divider orientation="right" plain>
        RIGHT
      </Divider>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ fontFamily: "var(--pxui-font)", fontSize: 12 }}>
      HP <Divider vertical /> MP <Divider vertical color="red" /> EXP
    </div>
  ),
};
