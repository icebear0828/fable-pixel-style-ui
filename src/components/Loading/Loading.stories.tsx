import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loading, Spinner } from "./Loading";
import { Card } from "../Card/Card";
import { Button } from "../Button/Button";
import { PALETTE } from "../utils/cx";

const meta = {
  title: "Feedback/Loading",
  component: Loading,
  subcomponents: { Spinner },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: ["dots", "ring", "bar"] },
    size: { control: { type: "range", min: 16, max: 80, step: 4 } },
    spinning: { control: "boolean" },
    fullscreen: { control: "boolean" },
    tip: { control: "text" },
    indicator: { control: false },
  },
  args: { spinning: true, tip: "LOADING", variant: "dots", size: 32, fullscreen: false },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Spinners: Story = {
  render: () => (
    <div className="sb-row" style={{ gap: 32 }}>
      <Spinner />
      <Spinner variant="ring" color="blue" />
      <Spinner variant="bar" color="red" size={24} />
      <Spinner size={48} color="pink" />
      {(Object.keys(PALETTE) as (keyof typeof PALETTE)[]).slice(11, 15).map((c) => (
        <Spinner key={c} variant="ring" color={c} size={28} />
      ))}
    </div>
  ),
};

export const Wrapper: Story = {
  args: { tip: "LOADING MAP" },
  render: (args) => (
    <Loading {...args}>
      <Card title="WORLD MAP" style={{ width: 420 }}>
        已探索 42%。北方森林、村庄、史莱姆沼泽、被遗忘的城堡……
      </Card>
    </Loading>
  ),
};

const FullscreenDemo = () => {
  const [on, setOn] = useState(false);
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOn(true);
          setTimeout(() => setOn(false), 2000);
        }}
      >
        FULLSCREEN 2S
      </Button>
      <Loading fullscreen spinning={on} tip="NOW LOADING" variant="ring" size={40} />
    </>
  );
};
export const Fullscreen: Story = { render: () => <FullscreenDemo /> };
