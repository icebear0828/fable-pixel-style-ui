import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, RadioGroup } from "./Radio";
import { PALETTE } from "../utils/cx";

const OPTIONS = [
  { label: "WARRIOR", value: "warrior" },
  { label: "MAGE", value: "mage" },
  { label: "ARCHER", value: "archer" },
  { label: "LOCKED", value: "locked", disabled: true },
];

const meta = {
  title: "Form/Radio",
  component: RadioGroup,
  subcomponents: { Radio },
  tags: ["autodocs"],
  argTypes: {
    type: { control: "inline-radio", options: ["default", "button"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    color: { control: "select", options: Object.keys(PALETTE) },
    vertical: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "change" },
  },
  args: { options: OPTIONS, defaultValue: "warrior", type: "default", size: "md", color: "blue", vertical: false },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const ButtonStyle: Story = { args: { type: "button" } };
export const Vertical: Story = { args: { vertical: true, size: "lg", color: "red" } };

export const Children: Story = {
  render: () => (
    <RadioGroup defaultValue="easy" color="green">
      <Radio value="easy">EASY</Radio>
      <Radio value="normal">NORMAL</Radio>
      <Radio value="hard">HARD</Radio>
    </RadioGroup>
  ),
};
