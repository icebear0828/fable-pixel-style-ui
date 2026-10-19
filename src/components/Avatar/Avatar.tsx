import React, { useState } from "react";
import { cx, PALETTE, type PaletteColor } from "../utils/cx";
import { Icon } from "../Icon/Icon";

export type AvatarSize = "sm" | "md" | "lg" | "xl" | number;
export type AvatarShape = "square" | "circle";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 图片地址 */
  src?: string;
  alt?: string;
  /** 尺寸 */
  size?: AvatarSize;
  /** 形状 */
  shape?: AvatarShape;
  /** 背景色 */
  color?: PaletteColor;
  /** 图标（无图片时） */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const AvatarBase: React.FC<AvatarProps> = ({ src, alt = "", size = "md", shape = "square", color = "peach", icon, className, style, children, ...rest }) => {
  const [error, setError] = useState(false);
  const numeric = typeof size === "number";
  const content =
    src && !error ? <img src={src} alt={alt} onError={() => setError(true)} /> : children ?? icon ?? <Icon name="user" size="50%" />;
  return (
    <span
      className={cx("pxui-avatar", !numeric && size !== "md" && `pxui-avatar--${size}`, shape === "circle" && "pxui-avatar--circle", className)}
      style={{ ["--_bg" as string]: PALETTE[color], ...(numeric ? { ["--_size" as string]: `${size}px` } : {}), ...style }}
      {...rest}
    >
      <span className="pxui-avatar__inner">{content}</span>
    </span>
  );
};

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 最多显示数量，超出折叠为 +N */
  maxCount?: number;
  size?: AvatarSize;
  shape?: AvatarShape;
  children?: React.ReactNode;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ maxCount, size = "md", shape, className, children, ...rest }) => {
  const items = React.Children.toArray(children).filter(Boolean) as React.ReactElement<AvatarProps>[];
  const shown = maxCount ? items.slice(0, maxCount) : items;
  const rest_ = maxCount ? items.length - maxCount : 0;
  return (
    <div className={cx("pxui-avatar-group", className)} {...rest}>
      {shown.map((el, i) => React.cloneElement(el, { key: el.key ?? i, size: el.props.size ?? size, shape: el.props.shape ?? shape }))}
      {rest_ > 0 && (
        <AvatarBase size={size} shape={shape} className="pxui-avatar--more" color="sand">
          +{rest_}
        </AvatarBase>
      )}
    </div>
  );
};

type AvatarComponent = React.FC<AvatarProps> & { Group: typeof AvatarGroup };
export const Avatar = AvatarBase as AvatarComponent;
Avatar.Group = AvatarGroup;
Avatar.displayName = "Avatar";
