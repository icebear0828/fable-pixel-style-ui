import React, { forwardRef } from "react";
import { cx } from "../utils/cx";

export type ButtonType = "default" | "primary" | "success" | "warning" | "danger" | "ghost" | "text";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** 按钮类型 */
  type?: ButtonType;
  /** 原生 type */
  htmlType?: "button" | "submit" | "reset";
  /** 尺寸 */
  size?: ButtonSize;
  /** 加载中 */
  loading?: boolean;
  /** 撑满父容器 */
  block?: boolean;
  /** 图标 */
  icon?: React.ReactNode;
  /** 正方形（仅图标） */
  square?: boolean;
  /** 链接地址（渲染为 a 标签） */
  href?: string;
  target?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { type = "default", htmlType = "button", size = "md", loading, block, icon, square, href, target, className, children, disabled, ...rest },
    ref,
  ) => {
    const cls = cx(
      "pxui-btn",
      `pxui-btn--${type}`,
      size !== "md" && `pxui-btn--${size}`,
      block && "pxui-btn--block",
      (square || (!children && children !== 0)) && "pxui-btn--square",
      loading && "pxui-btn--loading",
      className,
    );
    const content = (
      <>
        {loading ? (
          <span className="pxui-btn__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        ) : (
          icon && <span className="pxui-btn__icon">{icon}</span>
        )}
        {children}
      </>
    );
    if (href) {
      return (
        <a
          className={cls}
          href={disabled ? undefined : href}
          target={target}
          rel={target === "_blank" ? "noreferrer" : undefined}
          aria-disabled={disabled || undefined}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }
    return (
      <button ref={ref} className={cls} type={htmlType} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}
export const ButtonGroup: React.FC<ButtonGroupProps> = ({ className, ...rest }) => (
  <div className={cx("pxui-btn-group", className)} role="group" {...rest} />
);
