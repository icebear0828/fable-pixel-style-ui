import type { Meta, StoryObj } from "@storybook/react-vite";
import { PALETTE, DARK_COLORS, type PaletteColor } from "../../components/utils/cx";
import { Tag } from "../../components/Tag/Tag";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";

const Palette = () => {
  const colors = Object.entries(PALETTE) as [PaletteColor, string][];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 14, width: 760 }}>
      {colors.map(([k, v]) => (
        <div key={k} style={{ border: "3px solid #1d2b53", background: "#fff", boxShadow: "4px 4px 0 rgba(29,43,83,.25)" }}>
          <div style={{ height: 64, background: v, borderBottom: "3px solid #1d2b53", display: "flex", alignItems: "flex-end", padding: 6 }}>
            <span style={{ fontFamily: "var(--pxui-font)", fontSize: 7, color: DARK_COLORS.includes(k) ? "#fff" : "#1d2b53" }}>{DARK_COLORS.includes(k) ? "LIGHT TEXT" : "INK TEXT"}</span>
          </div>
          <div style={{ padding: "8px 10px", fontFamily: "var(--pxui-font)", fontSize: 8, lineHeight: 1.8 }}>
            {k.toUpperCase()}
            <small style={{ display: "block", fontFamily: "monospace", fontSize: 11, color: "#5f574f" }}>{v}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

const meta = {
  title: "Overview/Palette",
  component: Palette,
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta<typeof Palette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {};

export const Semantic: Story = {
  render: () => (
    <div className="sb-col" style={{ width: 520 }}>
      <div className="sb-row">
        <Button type="primary">PRIMARY</Button>
        <Button type="success">SUCCESS</Button>
        <Button type="warning">WARNING</Button>
        <Button type="danger">DANGER</Button>
      </div>
      <div className="sb-row" style={{ gap: 8 }}>
        {(Object.keys(PALETTE) as PaletteColor[]).map((c) => (
          <Tag key={c} color={c}>
            {c.toUpperCase()}
          </Tag>
        ))}
      </div>
      <div className="sb-row">
        <Card color="yellow" size="sm">
          <span style={{ fontFamily: "var(--pxui-font)", fontSize: 10 }}>YELLOW CARD</span>
        </Card>
        <Card color="navy" size="sm">
          <span style={{ fontFamily: "var(--pxui-font)", fontSize: 10 }}>NAVY CARD</span>
        </Card>
      </div>
    </div>
  ),
};
