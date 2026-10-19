import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "./Pagination";

const meta = {
  title: "Data/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    total: { control: "number" },
    pageSize: { control: "number" },
    size: { control: "inline-radio", options: ["sm", "md"] },
    showTotal: { control: "boolean" },
    showJumper: { control: "boolean" },
    simple: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "change" },
  },
  args: { total: 500, pageSize: 10, defaultCurrent: 6, size: "md", showTotal: true, showJumper: false, simple: false, disabled: false },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Small: Story = { args: { size: "sm", showJumper: true } };
export const Simple: Story = { args: { simple: true, showTotal: false } };
export const FewPages: Story = { args: { total: 50, defaultCurrent: 1, showTotal: false } };
