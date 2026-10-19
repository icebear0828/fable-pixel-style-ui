import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";
import { PALETTE } from "../utils/cx";

const meta = {
  title: "Form/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    color: { control: "select", options: Object.keys(PALETTE) },
    checked: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    checkedText: { control: "text" },
    uncheckedText: { control: "text" },
    onChange: { action: "change" },
  },
  args: { defaultChecked: true, size: "md", color: "green", loading: false, disabled: false },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const WithText: Story = { args: { checkedText: "ON", uncheckedText: "OFF", color: "blue" } };
export const Large: Story = { args: { size: "lg", checkedText: "BGM", uncheckedText: "MUTE", color: "pink" } };
export const Loading: Story = { args: { loading: true } };

export const Sizes: Story = {
  render: () => (
    <div className="sb-row">
      <Switch size="sm" defaultChecked />
      <Switch defaultChecked />
      <Switch size="lg" defaultChecked />
      <Switch disabled />
    </div>
  ),
};
