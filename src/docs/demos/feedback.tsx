import { useState } from "react";
import { Modal, toast, Alert, Loading, Spinner, Button, Icon, Input, Card, Sprite, SLIME_SPRITE, Select, type ToastPosition } from "@/components";
import type { ComponentDoc } from "../types";

const Row = ({ children, gap = 12, align = "center" }: { children: React.ReactNode; gap?: number; align?: string }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: align }}>{children}</div>
);
const Col = ({ children, gap = 16 }: { children: React.ReactNode; gap?: number }) => <div style={{ display: "grid", gap }}>{children}</div>;

const BasicModal = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  return (
    <Row>
      <Button type="primary" onClick={() => setOpen(true)}>
        OPEN MODAL
      </Button>
      <Button onClick={() => setOpen2(true)}>SMALL + ICON</Button>
      <Button type="danger" onClick={() => setOpen3(true)}>
        ASYNC OK
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} title="SAVE GAME" onOk={() => setOpen(false)}>
        <p style={{ margin: "0 0 12px" }}>是否覆盖存档 #1？</p>
        <Input placeholder="SAVE NAME" defaultValue="PIXEL ISLAND - DAY 42" block />
      </Modal>

      <Modal open={open2} onClose={() => setOpen2(false)} title="LEVEL UP!" icon="star" size="sm" centered okText="NICE" footer={undefined}>
        <Sprite {...SLIME_SPRITE} scale={4} animation="bounce" />
        <p style={{ margin: "12px 0 0", fontFamily: "var(--pxui-font)", fontSize: 11 }}>SLIME → LV.8</p>
      </Modal>

      <Modal
        open={open3}
        onClose={() => setOpen3(false)}
        title="DELETE SAVE"
        icon="warning"
        okType="danger"
        okText="DELETE"
        onOk={() =>
          new Promise<void>((r) =>
            setTimeout(() => {
              r();
              setOpen3(false);
              toast.success("DELETED", { description: "存档已删除。" });
            }, 1200),
          )
        }
      >
        此操作不可撤销。onOk 返回 Promise 时按钮会自动进入 loading。
      </Modal>
    </Row>
  );
};

const ToastDemo = () => {
  const [pos, setPos] = useState<ToastPosition>("top-right");
  return (
    <Col>
      <Row>
        <Button type="primary" onClick={() => toast.info("NEW MESSAGE", { description: "村长有新的任务给你。", position: pos })}>
          INFO
        </Button>
        <Button type="success" onClick={() => toast.success("QUEST COMPLETE", { description: "+500 EXP · +100 G", position: pos })}>
          SUCCESS
        </Button>
        <Button type="warning" onClick={() => toast.warning("LOW HP", { description: "生命值低于 20%！", position: pos })}>
          WARNING
        </Button>
        <Button type="danger" onClick={() => toast.error("GAME OVER", { description: "按 START 继续。", position: pos, duration: 0 })}>
          ERROR (STAY)
        </Button>
      </Row>
      <Row>
        <Select
          size="sm"
          value={pos}
          onChange={(v) => setPos(v)}
          options={["top-right", "top-left", "top", "bottom-right", "bottom-left", "bottom"].map((p) => ({ label: p.toUpperCase(), value: p }))}
          style={{ width: 160 }}
        />
        <Button
          size="sm"
          onClick={() => {
            toast.open({ key: "dl", title: "DOWNLOADING...", description: "0%", type: "info", duration: 0, position: pos, icon: "download" });
            let p = 0;
            const t = setInterval(() => {
              p += 25;
              toast.open({ key: "dl", title: p >= 100 ? "DONE" : "DOWNLOADING...", description: `${p}%`, type: p >= 100 ? "success" : "info", duration: p >= 100 ? 2000 : 0, position: pos, icon: p >= 100 ? "check" : "download" });
              if (p >= 100) clearInterval(t);
            }, 600);
          }}
        >
          UPDATE BY KEY
        </Button>
        <Button size="sm" type="ghost" onClick={() => toast.destroyAll()}>
          DESTROY ALL
        </Button>
      </Row>
    </Col>
  );
};

const LoadingDemo = () => {
  const [full, setFull] = useState(false);
  const [spin, setSpin] = useState(true);
  return (
    <Col>
      <Row gap={20}>
        <Button size="sm" onClick={() => setSpin((s) => !s)}>
          {spin ? "STOP" : "START"}
        </Button>
        <Button
          size="sm"
          type="primary"
          onClick={() => {
            setFull(true);
            setTimeout(() => setFull(false), 2000);
          }}
        >
          FULLSCREEN 2S
        </Button>
      </Row>
      <Loading spinning={spin} tip="LOADING">
        <Card title="WORLD MAP" style={{ maxWidth: 460 }}>
          已探索 42%。北方森林、村庄、史莱姆沼泽、被遗忘的城堡……还有一片未知的海域。
        </Card>
      </Loading>
      <Loading fullscreen spinning={full} tip="NOW LOADING" variant="ring" size={40} />
    </Col>
  );
};

export const feedbackDocs: ComponentDoc[] = [
  {
    key: "modal",
    name: "Modal",
    cn: "对话框",
    desc: "复古窗口风格对话框：条纹标题栏、棋盘抖动遮罩、阶梯弹出动画，支持异步确认。",
    category: "feedback",
    icon: "home",
    preview: () => (
      <div style={{ fontFamily: "var(--pxui-font)", fontSize: 9, background: "#fff", border: "3px solid #1d2b53", width: 150 }}>
        <div style={{ background: "#1d2b53", color: "#fff1e8", padding: "6px 8px" }}>SAVE?</div>
        <div style={{ padding: 8, display: "flex", gap: 6 }}>
          <Button size="sm" type="primary">
            OK
          </Button>
          <Button size="sm">NO</Button>
        </div>
      </div>
    ),
    demos: [
      {
        title: "基础用法",
        desc: "Esc 或点击遮罩关闭；onOk 返回 Promise 时自动 loading。",
        code: `const [open, setOpen] = useState(false);

<Button type="primary" onClick={() => setOpen(true)}>OPEN MODAL</Button>
<Modal open={open} onClose={() => setOpen(false)} title="SAVE GAME" onOk={() => setOpen(false)}>
  是否覆盖存档 #1？
</Modal>

<Modal open={open2} title="LEVEL UP!" icon="star" size="sm" centered okText="NICE" />

<Modal open={open3} title="DELETE SAVE" icon="warning" okType="danger" okText="DELETE"
  onOk={() => new Promise((r) => setTimeout(r, 1200))} />`,
        render: () => <BasicModal />,
      },
    ],
    props: [
      {
        rows: [
          { name: "open", desc: "是否显示", type: "boolean" },
          { name: "onClose", desc: "关闭回调", type: "() => void" },
          { name: "onOk", desc: "确认回调（可返回 Promise）", type: "() => void | Promise<void>" },
          { name: "title", desc: "标题", type: "ReactNode" },
          { name: "icon", desc: "标题图标", type: "IconName" },
          { name: "footer", desc: "自定义底部，null 隐藏", type: "ReactNode | null" },
          { name: "okText / cancelText", desc: "按钮文案", type: "ReactNode", default: "'OK' / 'CANCEL'" },
          { name: "okType", desc: "确认按钮类型", type: "ButtonType", default: "'primary'" },
          { name: "size", desc: "尺寸", type: "'sm' | 'md' | 'lg'", default: "'md'" },
          { name: "width", desc: "自定义宽度", type: "number | string" },
          { name: "closable / maskClosable", desc: "关闭按钮 / 遮罩关闭", type: "boolean", default: "true" },
          { name: "centered", desc: "内容居中", type: "boolean", default: "false" },
        ],
      },
    ],
  },
  {
    key: "toast",
    name: "Toast",
    cn: "全局通知",
    desc: "命令式全局通知：4 种类型 × 6 个位置，支持 key 原地更新、常驻与销毁全部。",
    category: "feedback",
    icon: "bell",
    preview: () => (
      <div style={{ display: "flex", gap: 8, alignItems: "center", background: "#fff", border: "3px solid #1d2b53", padding: "8px 10px", boxShadow: "3px 3px 0 #1d2b53" }}>
        <span style={{ width: 20, height: 20, background: "#00e436", boxShadow: "0 0 0 2px #1d2b53", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="check" size={10} />
        </span>
        <span style={{ fontFamily: "var(--pxui-font)", fontSize: 9 }}>SAVED!</span>
      </div>
    ),
    demos: [
      {
        title: "类型、位置与更新",
        code: `import { toast } from "pixelnest-ui";

toast.info("NEW MESSAGE", { description: "村长有新的任务给你。" });
toast.success("QUEST COMPLETE", { description: "+500 EXP" });
toast.warning("LOW HP", { position: "bottom" });
toast.error("GAME OVER", { duration: 0 });

// 相同 key 原地更新
toast.open({ key: "dl", title: "DOWNLOADING...", description: "0%", duration: 0 });
toast.open({ key: "dl", title: "DONE", type: "success", duration: 2000 });

toast.destroyAll();`,
        render: () => <ToastDemo />,
      },
    ],
    props: [
      {
        title: "ToastOptions",
        rows: [
          { name: "title", desc: "标题", type: "ReactNode" },
          { name: "description", desc: "描述", type: "ReactNode" },
          { name: "type", desc: "类型", type: "'info' | 'success' | 'warning' | 'error'", default: "'info'" },
          { name: "duration", desc: "持续 ms，0 不自动关闭", type: "number", default: "3000" },
          { name: "position", desc: "位置", type: "'top-right' | 'top-left' | 'top' | 'bottom-right' | 'bottom-left' | 'bottom'", default: "'top-right'" },
          { name: "key", desc: "相同 key 原地更新", type: "string" },
          { name: "icon", desc: "自定义图标", type: "IconName" },
          { name: "closable", desc: "显示关闭按钮", type: "boolean", default: "true" },
          { name: "onClose", desc: "关闭回调", type: "() => void" },
        ],
      },
      {
        title: "方法",
        rows: [
          { name: "toast.open(options)", desc: "打开通知，返回 id", type: "(opts) => string" },
          { name: "toast.info / success / warning / error", desc: "快捷方法", type: "(title, opts?) => string" },
          { name: "toast.close(id)", desc: "关闭指定通知", type: "(id) => void" },
          { name: "toast.destroyAll()", desc: "销毁全部", type: "() => void" },
        ],
      },
    ],
  },
  {
    key: "alert",
    name: "Alert",
    cn: "警告提示",
    desc: "页面内静态提示，4 种类型，支持描述、关闭、操作区与通栏模式。",
    category: "feedback",
    icon: "warning",
    preview: () => (
      <Alert type="warning" title="LOW HP!" style={{ width: 170, padding: "6px 10px" }} />
    ),
    demos: [
      {
        title: "类型",
        code: `<Alert type="info" title="TIP" description="按 START 暂停游戏。" />
<Alert type="success" title="SAVED" description="进度已保存到存档 #1。" closable />
<Alert type="warning" title="LOW HP" description="生命值低于 20%，请尽快使用药水。" action={<Button size="sm" type="warning">USE</Button>} />
<Alert type="error" title="CONNECTION LOST" description="与服务器断开连接。" />`,
        render: () => (
          <Col gap={12}>
            <Alert type="info" title="TIP" description="按 START 暂停游戏，按 SELECT 打开地图。" />
            <Alert type="success" title="SAVED" description="进度已保存到存档 #1。" closable />
            <Alert
              type="warning"
              title="LOW HP"
              description="生命值低于 20%，请尽快使用药水。"
              action={
                <Button size="sm" type="warning">
                  USE
                </Button>
              }
            />
            <Alert type="error" title="CONNECTION LOST" description="与服务器断开连接，正在重试……" closable />
          </Col>
        ),
      },
      {
        title: "通栏与无图标",
        code: `<Alert banner type="warning" title="SERVER MAINTENANCE 02:00 - 04:00" />
<Alert icon={false} type="info">没有图标的简单提示。</Alert>`,
        render: () => (
          <Col gap={12}>
            <Alert banner type="warning" title="SERVER MAINTENANCE 02:00 - 04:00" closable />
            <Alert icon={false} type="info">
              没有图标的简单提示，children 作为描述内容。
            </Alert>
          </Col>
        ),
      },
    ],
    props: [
      {
        rows: [
          { name: "type", desc: "类型", type: "'info' | 'success' | 'warning' | 'error'", default: "'info'" },
          { name: "title", desc: "标题", type: "ReactNode" },
          { name: "description", desc: "描述（或 children）", type: "ReactNode" },
          { name: "icon", desc: "自定义图标，false 隐藏", type: "IconName | false" },
          { name: "closable", desc: "可关闭", type: "boolean", default: "false" },
          { name: "banner", desc: "通栏", type: "boolean", default: "false" },
          { name: "action", desc: "右侧操作", type: "ReactNode" },
          { name: "onClose", desc: "关闭回调", type: "() => void" },
        ],
      },
    ],
  },
  {
    key: "loading",
    name: "Loading",
    cn: "加载",
    desc: "三点 / 八格环 / 进度条三种像素加载指示器，支持区域遮罩与全屏。",
    category: "feedback",
    icon: "gear",
    preview: () => (
      <Row gap={16}>
        <Spinner size={24} />
        <Spinner variant="ring" size={24} color="blue" />
      </Row>
    ),
    demos: [
      {
        title: "指示器",
        code: `<Spinner />
<Spinner variant="ring" color="blue" />
<Spinner variant="bar" color="red" size={24} />
<Spinner size={48} color="pink" />`,
        render: () => (
          <Row gap={32}>
            <Spinner />
            <Spinner variant="ring" color="blue" />
            <Spinner variant="bar" color="red" size={24} />
            <Spinner size={48} color="pink" />
            <Spinner variant="ring" size={56} color="forest" />
          </Row>
        ),
      },
      {
        title: "区域遮罩与全屏",
        code: `<Loading spinning={spin} tip="LOADING">
  <Card title="WORLD MAP">...</Card>
</Loading>

<Loading fullscreen spinning={full} tip="NOW LOADING" variant="ring" size={40} />`,
        render: () => <LoadingDemo />,
      },
    ],
    props: [
      {
        title: "Spinner",
        rows: [
          { name: "variant", desc: "类型", type: "'dots' | 'ring' | 'bar'", default: "'dots'" },
          { name: "size", desc: "尺寸", type: "number", default: "32" },
          { name: "color", desc: "颜色", type: "PaletteColor", default: "'ink'" },
        ],
      },
      {
        title: "Loading",
        rows: [
          { name: "spinning", desc: "是否加载中", type: "boolean", default: "true" },
          { name: "tip", desc: "提示文案", type: "ReactNode" },
          { name: "fullscreen", desc: "全屏", type: "boolean", default: "false" },
          { name: "variant / size", desc: "同 Spinner", type: "-" },
          { name: "indicator", desc: "自定义指示器", type: "ReactNode" },
        ],
      },
    ],
  },
];
