import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, CheckboxGroup } from "./Checkbox";
import { PALETTE } from "../utils/cx";

const meta = {
  title: "Form/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    color: { control: "select", options: Object.keys(PALETTE) },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "change" },
  },
  args: { children: "ENABLE SOUND", size: "md", color: "blue", disabled: false, indeterminate: false },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

const CheckAllDemo = () => {
  const all = ["SWORD", "SHIELD", "POTION", "KEY"];
  const [val, setVal] = useState<(string | number)[]>(["SWORD"]);
  const allChecked = val.length === all.length;
  return (
    <div className="sb-col">
      <Checkbox checked={allChecked} indeterminate={val.length > 0 && !allChecked} onChange={(c) => setVal(c ? all : [])}>
        SELECT ALL
      </Checkbox>
      <CheckboxGroup options={all} value={val} onChange={setVal} />
    </div>
  );
};

export const Group: Story = { render: () => <CheckAllDemo /> };

export const Sizes: Story = {
  render: () => (
    <div className="sb-row" style={{ gap: 24 }}>
      <Checkbox size="sm" defaultChecked>
        SMALL
      </Checkbox>
      <Checkbox defaultChecked>MEDIUM</Checkbox>
      <Checkbox size="lg" defaultChecked color="green">
        LARGE
      </Checkbox>
    </div>
  ),
};
