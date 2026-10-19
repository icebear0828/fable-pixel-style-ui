import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";

const meta = {
  title: "Data/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    placement: { control: "inline-radio", options: ["top", "bottom", "left", "right"] },
    trigger: { control: "inline-radio", options: ["hover", "click", "focus"] },
    light: { control: "boolean" },
    delay: { control: "number" },
    children: { control: false },
  },
  args: { title: "A WILD TOOLTIP APPEARED!", placement: "top", trigger: "hover", light: false, children: <Button>HOVER ME</Button> },
  decorators: [(Story) => <div style={{ padding: 60 }}>{Story()}</div>],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Light: Story = { args: { light: true, placement: "bottom" } };
export const Click: Story = { args: { trigger: "click", children: <Button type="primary">CLICK ME</Button> } };
export const AlwaysOpen: Story = { args: { open: true, placement: "right" } };

export const Placements: Story = {
  render: () => (
    <div className="sb-row" style={{ gap: 24 }}>
      {(["top", "bottom", "left", "right"] as const).map((p) => (
        <Tooltip key={p} title={p.toUpperCase()} placement={p}>
          <Button>{p.toUpperCase()}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
