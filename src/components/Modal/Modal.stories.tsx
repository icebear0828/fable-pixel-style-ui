import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal, type ModalProps } from "./Modal";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Sprite, SLIME_SPRITE } from "../Sprite/Sprite";
import { ICON_NAMES } from "../Icon/Icon";

const Demo = (props: Partial<ModalProps> & { label?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {props.label ?? "OPEN MODAL"}
      </Button>
      <Modal {...props} open={open} onClose={() => setOpen(false)} onOk={props.onOk ?? (() => setOpen(false))} />
    </>
  );
};

const meta = {
  title: "Feedback/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    icon: { control: "select", options: [undefined, ...ICON_NAMES] },
    okType: { control: "select", options: ["default", "primary", "success", "warning", "danger"] },
    closable: { control: "boolean" },
    maskClosable: { control: "boolean" },
    centered: { control: "boolean" },
    open: { control: false },
    footer: { control: false },
  },
  args: {
    open: false,
    title: "SAVE GAME",
    children: "是否覆盖存档 #1？此操作不可撤销。",
    size: "md",
    okText: "OK",
    cancelText: "CANCEL",
    okType: "primary",
    closable: true,
    maskClosable: true,
    centered: false,
  },
  render: (args) => <Demo {...args} />,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithForm: Story = {
  args: {
    children: (
      <>
        <p style={{ margin: "0 0 12px" }}>给存档起个名字：</p>
        <Input placeholder="SAVE NAME" defaultValue="PIXEL ISLAND - DAY 42" block />
      </>
    ),
  },
};

export const SmallCentered: Story = {
  args: {
    title: "LEVEL UP!",
    icon: "star",
    size: "sm",
    centered: true,
    okText: "NICE",
    children: (
      <>
        <Sprite {...SLIME_SPRITE} scale={4} animation="bounce" />
        <p style={{ margin: "12px 0 0", fontFamily: "var(--pxui-font)", fontSize: 11 }}>SLIME → LV.8</p>
      </>
    ),
  },
};

export const AsyncOk: Story = {
  args: {
    title: "DELETE SAVE",
    icon: "warning",
    okType: "danger",
    okText: "DELETE",
    children: "onOk 返回 Promise 时，确认按钮自动进入 loading（1.2s 后关闭）。",
  },
  render: (args) => {
    const Wrapper = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button type="danger" onClick={() => setOpen(true)}>
            DELETE SAVE
          </Button>
          <Modal {...args} open={open} onClose={() => setOpen(false)} onOk={() => new Promise<void>((r) => setTimeout(() => (r(), setOpen(false)), 1200))} />
        </>
      );
    };
    return <Wrapper />;
  },
};

export const NoFooter: Story = { args: { footer: null, title: "CREDITS", children: "PIXELNEST UI — MADE WITH ♥ AND 4×4 PIXELS." } };
