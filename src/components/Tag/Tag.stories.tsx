import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "./Tag";
import { Icon } from "../Icon/Icon";
import { PALETTE, type PaletteColor } from "../utils/cx";

const COLORS = ["default", ...Object.keys(PALETTE)];

const meta = {
  title: "General/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    color: { control: "select", options: COLORS },
    variant: { control: "inline-radio", options: ["solid", "light", "outlined"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    closable: { control: "boolean" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    icon: { control: false },
    onClose: { action: "close" },
  },
  args: { children: "PIXEL", color: "blue", variant: "solid", size: "md" },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const PALETTE_KEYS: PaletteColor[] = ["red", "orange", "yellow", "green", "blue", "indigo", "pink", "peach", "brown", "plum", "forest", "navy"];

export const Colors: Story = {
  render: () => (
    <div className="sb-col">
      {(["solid", "light", "outlined"] as const).map((v) => (
        <div className="sb-row" key={v} style={{ gap: 8 }}>
          {PALETTE_KEYS.map((c) => (
            <Tag key={c} color={c} variant={v}>
              {c.toUpperCase()}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Closable: Story = {
  args: { closable: true, color: "pink", children: "CLOSABLE" },
};

export const WithIcon: Story = {
  args: { icon: <Icon name="coin" size={10} />, color: "yellow", children: "100 G", size: "lg" },
};
