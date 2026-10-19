import React from "react";
import { cx } from "../utils/cx";
import { Icon } from "../Icon/Icon";

export type SkeletonVariant = "text" | "title" | "rect" | "circle" | "button" | "input" | "image";

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  /** 关闭闪光动画 */
  animated?: boolean;
  /** 段落行数（variant=text 时） */
  rows?: number;
  /** 是否显示头像 + 段落组合 */
  avatar?: boolean;
  /** loading 为 false 时直接渲染 children */
  loading?: boolean;
  children?: React.ReactNode;
}

const Block: React.FC<{ variant: SkeletonVariant; animated: boolean; style?: React.CSSProperties; className?: string }> = ({ variant, animated, style, className }) => (
  <span className={cx("pxui-skeleton", `pxui-skeleton--${variant}`, animated && "pxui-skeleton--animated", className)} style={style} aria-hidden="true">
    {variant === "image" && <Icon name="ghost" size={32} />}
  </span>
);

export const Skeleton: React.FC<SkeletonProps> = ({ variant = "text", width, height, animated = true, rows, avatar, loading = true, className, style, children, ...rest }) => {
  if (!loading) return <>{children}</>;
  const sizeStyle: React.CSSProperties = { width, height, ...style };
  if (variant === "circle") {
    sizeStyle.width = width ?? 48;
    sizeStyle.height = height ?? width ?? 48;
  }
  if (variant === "rect") {
    sizeStyle.width = width ?? "100%";
    sizeStyle.height = height ?? 80;
  }

  const paragraph = (
    <span className={cx("pxui-skeleton-group__body", className)} {...rest}>
      <Block variant="title" animated={animated} />
      {Array.from({ length: rows ?? 3 }).map((_, i) => (
        <Block key={i} variant="text" animated={animated} style={{ width: i === (rows ?? 3) - 1 ? "60%" : "100%" }} />
      ))}
    </span>
  );

  if (avatar) {
    return (
      <span className="pxui-skeleton-group">
        <Block variant="circle" animated={animated} style={{ width: 48, height: 48, flexShrink: 0 }} />
        {paragraph}
      </span>
    );
  }
  if (rows !== undefined && variant === "text") return paragraph;
  return <Block variant={variant} animated={animated} style={sizeStyle} className={className} />;
};
Skeleton.displayName = "Skeleton";
