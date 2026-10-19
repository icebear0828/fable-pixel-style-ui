import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, ButtonGroup } from "./Button";
import { Icon } from "../Icon/Icon";

const meta = {
  title: "General/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["default", "primary", "success", "warning", "danger", "ghost", "text"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    block: { control: "boolean" },
    square: { control: "boolean" },
    icon: { control: false },
    onClick: { action: "clicked" },
  },
  args: { children: "PRESS START", type: "primary", size: "md", loading: false, disabled: false, block: false },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Types: Story = {
  render: () => (
    <div className="sb-row">
      <Button>DEFAULT</Button>
      <Button type="primary">PRIMARY</Button>
      <Button type="success">SUCCESS</Button>
      <Button type="warning">WARNING</Button>
      <Button type="danger">DANGER</Button>
      <Button type="ghost">GHOST</Button>
      <Button type="text">TEXT</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="sb-row">
      <Button type="primary" size="sm">
        SMALL
      </Button>
      <Button type="primary">MEDIUM</Button>
      <Button type="primary" size="lg">
        LARGE
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: { icon: <Icon name="sword" />, children: "ATTACK" },
};

export const IconOnly: Story = {
  args: { icon: <Icon name="potion" />, children: undefined, type: "success", "aria-label": "potion" },
};

export const Loading: Story = {
  args: { loading: true, children: "SAVING", type: "warning" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "DISABLED" },
};

export const Block: Story = {
  args: { block: true, children: "BLOCK BUTTON", type: "success" },
  parameters: { layout: "padded" },
};

export const Group: Story = {
  render: () => (
    <ButtonGroup>
      <Button icon={<Icon name="chevronLeft" />}>PREV</Button>
      <Button type="primary">1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>
        NEXT <Icon name="chevronRight" />
      </Button>
    </ButtonGroup>
  ),
};
