import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cx } from "../utils/cx";
import { Icon, type IconName } from "../Icon/Icon";
import { Button, type ButtonType } from "../Button/Button";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  onOk?: () => void | Promise<void>;
  title?: React.ReactNode;
  /** 标题图标 */
  icon?: IconName;
  /** 自定义底部，null 隐藏 */
  footer?: React.ReactNode | null;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  okType?: ButtonType;
  okLoading?: boolean;
  size?: "sm" | "md" | "lg";
  width?: number | string;
  /** 显示关闭按钮 */
  closable?: boolean;
  /** 点击遮罩关闭 */
  maskClosable?: boolean;
  /** 内容居中 */
  centered?: boolean;
  /** 关闭后销毁 */
  destroyOnClose?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  onOk,
  title,
  icon,
  footer,
  okText = "OK",
  cancelText = "CANCEL",
  okType = "primary",
  okLoading,
  size = "md",
  width,
  closable = true,
  maskClosable = true,
  centered,
  className,
  children,
}) => {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const [innerLoading, setInnerLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
    } else if (mounted) {
      setClosing(true);
      const t = window.setTimeout(() => {
        setMounted(false);
        setClosing(false);
      }, 160);
      return () => window.clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    ref.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  const handleOk = async () => {
    if (!onOk) return onClose?.();
    const r = onOk();
    if (r instanceof Promise) {
      setInnerLoading(true);
      try {
        await r;
      } finally {
        setInnerLoading(false);
      }
    }
  };

  return createPortal(
    <div className={cx("pxui-modal-mask", closing && "pxui-modal-mask--closing")} onMouseDown={(e) => maskClosable && e.target === e.currentTarget && onClose?.()}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={cx("pxui-modal", size !== "md" && `pxui-modal--${size}`, centered && "pxui-modal--center", className)}
        style={width ? { width } : undefined}
      >
        {(title || closable) && (
          <div className="pxui-modal__header">
            <div className="pxui-modal__title">
              {icon && (
                <span className="pxui-modal__icon">
                  <Icon name={icon} size={14} />
                </span>
              )}
              {title}
            </div>
            {closable && (
              <button type="button" className="pxui-modal__close" aria-label="close" onClick={onClose}>
                <Icon name="close" size={10} />
              </button>
            )}
          </div>
        )}
        <div className="pxui-modal__body">{children}</div>
        {footer !== null && (
          <div className="pxui-modal__footer">
            {footer ?? (
              <>
                <Button onClick={onClose}>{cancelText}</Button>
                <Button type={okType} loading={okLoading || innerLoading} onClick={handleOk}>
                  {okText}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};
Modal.displayName = "Modal";
