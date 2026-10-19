import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input, Textarea } from "./Input";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "Form/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    status: { control: "inline-radio", options: ["default", "error", "success"] },
    allowClear: { control: "boolean" },
    showCount: { control: "boolean" },
    disabled: { control: "boolean" },
    block: { control: "boolean" },
    prefix: { control: false },
    suffix: { control: false },
    onChange: { action: "change" },
    onPressEnter: { action: "enter" },
  },
  args: { placeholder: "PLAYER NAME", size: "md", status: "default", allowClear: true, maxLength: 12, showCount: false },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const WithAffix: Story = { args: { prefix: <Icon name="search" />, suffix: "G", placeholder: "SEARCH" } };
export const Error: Story = { args: { status: "error", defaultValue: "pixel@" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "LOCKED" } };

export const Sizes: Story = {
  render: () => (
    <div className="sb-col">
      <Input size="sm" placeholder="SMALL" />
      <Input placeholder="MEDIUM" />
      <Input size="lg" placeholder="LARGE" />
    </div>
  ),
};

export const TextareaStory: Story = {
  name: "Textarea",
  render: () => <Textarea placeholder="WRITE YOUR STORY..." rows={4} maxLength={200} showCount style={{ width: 360 }} />,
};
