import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
import { Avatar } from "../Avatar/Avatar";
import { Icon } from "../Icon/Icon";
import { PALETTE } from "../utils/cx";

const meta = {
  title: "General/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    count: { control: { type: "number", min: 0, max: 200 } },
    max: { control: "number" },
    dot: { control: "boolean" },
    pulse: { control: "boolean" },
    showZero: { control: "boolean" },
    color: { control: "select", options: Object.keys(PALETTE) },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
  args: { count: 5, max: 99, color: "red", size: "md", children: <Avatar icon={<Icon name="mail" size={20} />} /> },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Overflow: Story = { args: { count: 128 } };
export const Dot: Story = { args: { dot: true, pulse: true, color: "green" } };
export const Text: Story = { args: { text: "NEW", color: "yellow", count: undefined } };

export const Standalone: Story = {
  render: () => (
    <div className="sb-row">
      <Badge count={9} />
      <Badge count={99} color="blue" />
      <Badge text="LV.42" color="green" />
      <Badge text="BOSS" color="plum" size="sm" />
    </div>
  ),
};
