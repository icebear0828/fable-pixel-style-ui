import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rate } from "./Rate";
import { ICON_NAMES } from "../Icon/Icon";
import { PALETTE } from "../utils/cx";

const meta = {
  title: "Form/Rate",
  component: Rate,
  tags: ["autodocs"],
  argTypes: {
    count: { control: { type: "number", min: 1, max: 10 } },
    character: { control: "select", options: ICON_NAMES },
    color: { control: "select", options: Object.keys(PALETTE) },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    allowClear: { control: "boolean" },
    onChange: { action: "change" },
  },
  args: { defaultValue: 3, count: 5, character: "star", color: "yellow", size: "md", readonly: false, allowClear: true },
} satisfies Meta<typeof Rate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Hearts: Story = { args: { character: "heart", color: "red", count: 3, defaultValue: 2, size: "lg" } };
export const Coins: Story = { args: { character: "coin", color: "orange", defaultValue: 4, size: "sm" } };
export const WithTexts: Story = { args: { texts: ["BAD", "MEH", "OK", "GOOD", "EPIC"], defaultValue: 4 } };
export const Readonly: Story = { args: { readonly: true, defaultValue: 4, character: "heart", color: "pink" } };
