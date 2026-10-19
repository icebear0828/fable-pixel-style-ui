import type { Meta, StoryObj } from "@storybook/react-vite";
import { Balloon } from "./Balloon";
import { Sprite, CAT_SPRITE, GHOST_SPRITE } from "../Sprite/Sprite";
import { Typewriter } from "../Typewriter/Typewriter";

const meta = {
  title: "Data/Balloon",
  component: Balloon,
  tags: ["autodocs"],
  argTypes: {
    tail: { control: "inline-radio", options: ["left", "right", "none"] },
    dark: { control: "boolean" },
    next: { control: "boolean" },
    speaker: { control: "text" },
    avatar: { control: false },
  },
  args: { children: "喵！欢迎来到像素岛。这里的任务板在村庄中央。", tail: "left", dark: false, next: false, speaker: "CAT" },
} satisfies Meta<typeof Balloon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const WithAvatar: Story = { args: { avatar: <Sprite {...CAT_SPRITE} scale={3} /> } };
export const Right: Story = { args: { tail: "right", speaker: "SLIME", children: "……（黏黏的声音）" } };

export const DarkRPG: Story = {
  render: () => (
    <div className="sb-row" style={{ alignItems: "flex-end", gap: 20 }}>
      <Sprite {...GHOST_SPRITE} scale={4} animation="float" />
      <Balloon dark tail="none" speaker="GHOSTY" next style={{ width: 420, fontSize: 14 }}>
        <Typewriter text="你终于来了……我在这座城堡里等了 300 年。" speed={60} loop />
      </Balloon>
    </div>
  ),
};
