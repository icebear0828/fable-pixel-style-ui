import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";
import { Button } from "../Button/Button";
import { ICON_NAMES } from "../Icon/Icon";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    type: { control: "inline-radio", options: ["info", "success", "warning", "error"] },
    icon: { control: "select", options: [undefined, false, ...ICON_NAMES] },
    closable: { control: "boolean" },
    banner: { control: "boolean" },
    action: { control: false },
    onClose: { action: "close" },
  },
  args: { type: "warning", title: "LOW HP", description: "生命值低于 20%，请尽快使用药水。", closable: true, banner: false },
  decorators: [(Story) => <div style={{ width: 520 }}>{Story()}</div>],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const WithAction: Story = {
  args: {
    action: (
      <Button size="sm" type="warning">
        USE
      </Button>
    ),
  },
};
export const Banner: Story = { args: { banner: true, title: "SERVER MAINTENANCE 02:00 - 04:00", description: undefined } };
export const NoIcon: Story = { args: { icon: false, type: "info", title: undefined, description: "没有图标的简单提示。" } };

export const Types: Story = {
  render: () => (
    <div className="sb-col">
      <Alert type="info" title="TIP" description="按 START 暂停游戏。" />
      <Alert type="success" title="SAVED" description="进度已保存到存档 #1。" />
      <Alert type="warning" title="LOW HP" description="生命值低于 20%。" />
      <Alert type="error" title="CONNECTION LOST" description="与服务器断开连接。" />
    </div>
  ),
};
