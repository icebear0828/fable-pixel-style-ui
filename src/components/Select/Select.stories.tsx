import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const OPTIONS = [
  { label: "🗡 SWORD", value: "sword" },
  { label: "🛡 SHIELD", value: "shield" },
  { label: "🧪 POTION", value: "potion" },
  { label: "🔑 KEY", value: "key" },
  { label: "💎 GEM (locked)", value: "gem", disabled: true },
];

const meta = {
  title: "Form/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    status: { control: "inline-radio", options: ["default", "error"] },
    multiple: { control: "boolean" },
    allowClear: { control: "boolean" },
    disabled: { control: "boolean" },
    block: { control: "boolean" },
    onChange: { action: "change" },
  },
  args: { options: OPTIONS, placeholder: "PICK ITEM", size: "md", allowClear: true, multiple: false, disabled: false },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Multiple: Story = { args: { multiple: true, defaultValue: ["sword", "potion"], style: { width: 360 } } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "shield" } };
export const Error: Story = { args: { status: "error" } };

const Controlled = () => {
  const [v, setV] = useState<string | undefined>("sword");
  return (
    <div className="sb-col">
      <Select options={OPTIONS} value={v} onChange={setV} allowClear />
      <div style={{ fontFamily: "var(--pxui-font)", fontSize: 10 }}>VALUE: {v ?? "-"}</div>
    </div>
  );
};
export const ControlledStory: Story = { name: "Controlled", render: () => <Controlled /> };
