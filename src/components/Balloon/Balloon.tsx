import React from "react";
import { cx } from "../utils/cx";

export type BalloonTail = "left" | "right" | "none";

export interface BalloonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 尾巴方向（相对气泡，left 表示说话者在左） */
  tail?: BalloonTail;
  /** 深色（RPG 对话框风格） */
  dark?: boolean;
  /** 说话者名称 */
  speaker?: React.ReactNode;
  /** 头像/立绘，放在气泡旁 */
  avatar?: React.ReactNode;
  /** 显示“继续”小三角 */
  next?: boolean;
  children?: React.ReactNode;
}

export const Balloon: React.FC<BalloonProps> = ({ tail = "left", dark, speaker, avatar, next, className, children, ...rest }) => {
  const bubble = (
    <div className={cx("pxui-balloon", `pxui-balloon--${tail}`, dark && "pxui-balloon--dark", className)} {...rest}>
      {speaker && <span className="pxui-balloon__title">{speaker}</span>}
      {children}
      {next && <span className="pxui-balloon__next" aria-hidden="true" />}
    </div>
  );
  if (!avatar) return bubble;
  return (
    <div className={cx("pxui-balloon-wrap", tail === "right" && "pxui-balloon-wrap--right")}>
      <div style={{ flexShrink: 0, marginBottom: 14 }}>{avatar}</div>
      {bubble}
    </div>
  );
};
Balloon.displayName = "Balloon";
