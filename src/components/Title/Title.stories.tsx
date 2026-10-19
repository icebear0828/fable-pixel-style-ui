import type { Meta, StoryObj } from "@storybook/react-vite";
import { Title } from "./Title";
import { Icon } from "../Icon/Icon";
import { PALETTE } from "../utils/cx";

const meta = {
  title: "General/Title",
  component: Title,
  tags: ["autodocs"],
  argTypes: {
    level: { control: "inline-radio", options: [1, 2, 3, 4] },
    variant: { control: "select", options: ["default", "ribbon", "bar", "underline"] },
    color: { control: "select", options: Object.keys(PALETTE) },
    shadow: { control: "boolean" },
    icon: { control: false },
  },
  args: { children: "STAGE CLEAR", level: 2, variant: "ribbon", color: "yellow", shadow: false },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Levels: Story = {
  render: () => (
    <div>
      <Title level={1} shadow>
        LEVEL 1
      </Title>
      <Title level={2}>LEVEL 2</Title>
      <Title level={3}>LEVEL 3</Title>
      <Title level={4}>LEVEL 4</Title>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      <Title variant="ribbon" color="red" icon={<Icon name="heart" />}>
        BOSS BATTLE
      </Title>
      <Title variant="bar" color="blue" level={3}>
        INVENTORY
      </Title>
      <Title variant="underline" color="green" level={3}>
        QUEST LOG
      </Title>
    </div>
  ),
};
