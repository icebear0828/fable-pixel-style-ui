import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";
import { PALETTE } from "../utils/cx";

const meta = {
  title: "Data/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    percent: { control: { type: "range", min: 0, max: 100, step: 1 } },
    variant: { control: "inline-radio", options: ["bar", "segments", "striped", "hp"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    status: { control: "inline-radio", options: ["normal", "active", "success", "exception"] },
    color: { control: "select", options: [undefined, ...Object.keys(PALETTE)] },
    showInfo: { control: "boolean" },
    indeterminate: { control: "boolean" },
    label: { control: "text" },
  },
  args: { percent: 45, variant: "bar", size: "md", status: "normal", showInfo: true, indeterminate: false },
  decorators: [(Story) => <div style={{ width: 420 }}>{Story()}</div>],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Segments: Story = { args: { variant: "segments", color: "green", label: "EXP", percent: 70 } };
export const Striped: Story = { args: { variant: "striped", color: "pink", status: "active" } };
export const HP: Story = { args: { variant: "hp", percent: 15 } };
export const Exception: Story = { args: { status: "exception", percent: 60, size: "lg" } };
export const Indeterminate: Story = { args: { indeterminate: true, size: "sm", color: "indigo" } };

export const Variants: Story = {
  render: () => (
    <div className="sb-col">
      <Progress percent={30} size="sm" />
      <Progress percent={60} variant="segments" color="green" label="EXP" />
      <Progress percent={80} variant="striped" color="pink" />
      <Progress percent={90} variant="hp" />
      <Progress percent={100} />
    </div>
  ),
};
