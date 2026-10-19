import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon, ICON_NAMES } from "./Icon";

const meta = {
  title: "General/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: ICON_NAMES },
    size: { control: { type: "range", min: 8, max: 96, step: 8 } },
    color: { control: "color" },
    spin: { control: "boolean" },
  },
  args: { name: "heart", size: 48, color: "#ff004d", spin: false },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllIcons: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))", gap: 8 }}>
      {ICON_NAMES.map((n) => (
        <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: 14, background: "#fff", border: "2px solid #1d2b53", fontFamily: "var(--pxui-font)", fontSize: 7 }}>
          <Icon name={n} size={24} />
          {n}
        </div>
      ))}
    </div>
  ),
};

export const Spin: Story = {
  args: { name: "gear", spin: true, color: "#1d2b53" },
};
