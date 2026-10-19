import React, { useState } from "react";
import { cx } from "../utils/cx";
import { Icon, type IconName } from "../Icon/Icon";

export type AlertType = "info" | "success" | "warning" | "error";

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  type?: AlertType;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** 自定义图标；false 隐藏 */
  icon?: IconName | false;
  closable?: boolean;
  onClose?: () => void;
  /** 顶部通栏样式 */
  banner?: boolean;
  /** 右侧操作 */
  action?: React.ReactNode;
  children?: React.ReactNode;
}

const ICONS: Record<AlertType, IconName> = { info: "info", success: "check", warning: "warning", error: "close" };

export const Alert: React.FC<AlertProps> = ({ type = "info", title, description, icon, closable, onClose, banner, action, className, children, ...rest }) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className={cx("pxui-alert", `pxui-alert--${type}`, banner && "pxui-alert--banner", className)} role="alert" {...rest}>
      {icon !== false && (
        <span className="pxui-alert__icon">
          <Icon name={icon ?? ICONS[type]} size={14} />
        </span>
      )}
      <div className="pxui-alert__content">
        {title && <div className="pxui-alert__title">{title}</div>}
        {(description || children) && <div className="pxui-alert__desc">{description ?? children}</div>}
      </div>
      {action && <div className="pxui-alert__action">{action}</div>}
      {closable && (
        <button
          type="button"
          className="pxui-alert__close"
          aria-label="close"
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
        >
          <Icon name="close" size={10} />
        </button>
      )}
    </div>
  );
};
Alert.displayName = "Alert";
