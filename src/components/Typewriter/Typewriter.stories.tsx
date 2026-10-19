import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typewriter } from "./Typewriter";

const meta = {
  title: "Data/Typewriter",
  component: Typewriter,
  tags: ["autodocs"],
  argTypes: {
    speed: { control: { type: "range", min: 10, max: 300, step: 10 } },
    delay: { control: "number" },
    cursor: { control: "boolean" },
    loop: { control: "boolean" },
    pixel: { control: "boolean" },
    onComplete: { action: "complete" },
  },
  args: { text: "欢迎来到像素岛！这里的一切都是由 4×4 的小方块组成的……", speed: 60, delay: 0, cursor: true, loop: true, pixel: false },
  decorators: [(Story) => <div style={{ width: 420, fontSize: 15 }}>{Story()}</div>],
} satisfies Meta<typeof Typewriter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Pixel: Story = { args: { text: ["> LOADING WORLD...", "> SPAWNING CAT...", "> READY. PRESS START"], pixel: true, speed: 45 } };
