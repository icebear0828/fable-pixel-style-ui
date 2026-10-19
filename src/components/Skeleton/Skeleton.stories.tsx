import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Data/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["text", "title", "rect", "circle", "button", "input", "image"] },
    rows: { control: { type: "number", min: 1, max: 8 } },
    avatar: { control: "boolean" },
    animated: { control: "boolean" },
    loading: { control: "boolean" },
  },
  args: { variant: "text", rows: 3, avatar: false, animated: true, loading: true },
  decorators: [(Story) => <div style={{ width: 420 }}>{Story()}</div>],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paragraph: Story = {};
export const WithAvatar: Story = { args: { avatar: true, rows: 2 } };
export const Circle: Story = { args: { variant: "circle", rows: undefined, width: 64 } };
export const Image: Story = { args: { variant: "image", rows: undefined } };

export const Elements: Story = {
  render: () => (
    <div className="sb-col">
      <div className="sb-row">
        <Skeleton variant="circle" />
        <Skeleton variant="button" />
        <Skeleton variant="input" />
      </div>
      <Skeleton variant="rect" height={60} />
      <Skeleton variant="image" />
    </div>
  ),
};
