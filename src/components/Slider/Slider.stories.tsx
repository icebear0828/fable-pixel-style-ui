import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./Slider";
import { PALETTE } from "../utils/cx";

const meta = {
  title: "Form/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    color: { control: "select", options: Object.keys(PALETTE) },
    tooltip: { control: "inline-radio", options: ["hover", "always", "none"] },
    disabled: { control: "boolean" },
    onChange: { action: "change" },
    onAfterChange: { action: "afterChange" },
  },
  args: { defaultValue: 40, min: 0, max: 100, step: 1, color: "blue", tooltip: "hover", disabled: false },
  decorators: [(Story) => <div style={{ width: 400, padding: "24px 0" }}>{Story()}</div>],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Marks: Story = { args: { step: 10, color: "green", marks: { 0: "0", 50: "50", 100: "MAX" } } };
export const AlwaysTooltip: Story = { args: { min: 1, max: 5, defaultValue: 3, color: "red", tooltip: "always", formatTooltip: (v: number) => `LV.${v}` } };
export const Disabled: Story = { args: { disabled: true } };
