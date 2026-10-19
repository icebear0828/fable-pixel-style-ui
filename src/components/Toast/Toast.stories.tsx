import type { Meta, StoryObj } from "@storybook/react-vite";
import { toast, type ToastOptions } from "./Toast";
import { Button } from "../Button/Button";
import { ICON_NAMES } from "../Icon/Icon";

/** 命令式 API 的 Storybook 包装：点击按钮触发 toast.open(args) */
const ToastTrigger = (args: ToastOptions) => (
  <div className="sb-row">
    <Button type="primary" onClick={() => toast.open(args)}>
      SHOW TOAST
    </Button>
    <Button type="ghost" onClick={() => toast.destroyAll()}>
      DESTROY ALL
    </Button>
  </div>
);

const meta = {
  title: "Feedback/Toast",
  component: ToastTrigger,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "inline-radio", options: ["info", "success", "warning", "error"] },
    position: { control: "select", options: ["top-right", "top-left", "top", "bottom-right", "bottom-left", "bottom"] },
    duration: { control: "number" },
    closable: { control: "boolean" },
    icon: { control: "select", options: [undefined, ...ICON_NAMES] },
    key: { control: "text" },
  },
  args: { title: "QUEST COMPLETE", description: "+500 EXP · +100 G", type: "success", position: "top-right", duration: 3000, closable: true },
} satisfies Meta<typeof ToastTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Info: Story = { args: { type: "info", title: "NEW MESSAGE", description: "村长有新的任务给你。" } };
export const Warning: Story = { args: { type: "warning", title: "LOW HP", description: "生命值低于 20%！", position: "bottom" } };
export const ErrorSticky: Story = { args: { type: "error", title: "GAME OVER", description: "duration: 0 不会自动关闭。", duration: 0 } };

export const AllTypes: Story = {
  render: () => (
    <div className="sb-row">
      <Button type="primary" onClick={() => toast.info("NEW MESSAGE", { description: "村长有新的任务给你。" })}>
        INFO
      </Button>
      <Button type="success" onClick={() => toast.success("QUEST COMPLETE", { description: "+500 EXP" })}>
        SUCCESS
      </Button>
      <Button type="warning" onClick={() => toast.warning("LOW HP", { description: "生命值低于 20%！" })}>
        WARNING
      </Button>
      <Button type="danger" onClick={() => toast.error("GAME OVER", { description: "按 START 继续。" })}>
        ERROR
      </Button>
    </div>
  ),
};

export const UpdateByKey: Story = {
  render: () => (
    <Button
      onClick={() => {
        toast.open({ key: "dl", title: "DOWNLOADING...", description: "0%", duration: 0, icon: "download" });
        let p = 0;
        const t = setInterval(() => {
          p += 25;
          toast.open({ key: "dl", title: p >= 100 ? "DONE" : "DOWNLOADING...", description: `${p}%`, type: p >= 100 ? "success" : "info", duration: p >= 100 ? 2000 : 0, icon: p >= 100 ? "check" : "download" });
          if (p >= 100) clearInterval(t);
        }, 600);
      }}
    >
      START DOWNLOAD
    </Button>
  ),
};
