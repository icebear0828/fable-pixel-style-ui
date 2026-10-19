import React, { useState } from "react";
import { cx, PALETTE, type PaletteColor } from "../utils/cx";
import { Icon, type IconName } from "../Icon/Icon";

export type RateSize = "sm" | "md" | "lg";

export interface RateProps {
  value?: number;
  defaultValue?: number;
  count?: number;
  onChange?: (v: number) => void;
  /** 图标：star / heart / coin 等 */
  character?: IconName;
  color?: PaletteColor;
  size?: RateSize;
  readonly?: boolean;
  disabled?: boolean;
  /** 再次点击清空 */
  allowClear?: boolean;
  /** 每个分值对应的提示文案 */
  texts?: string[];
  className?: string;
  style?: React.CSSProperties;
}

const SIZE = { sm: 16, md: 22, lg: 30 };

export const Rate: React.FC<RateProps> = ({
  value,
  defaultValue = 0,
  count = 5,
  onChange,
  character = "star",
  color = "yellow",
  size = "md",
  readonly,
  disabled,
  allowClear = true,
  texts,
  className,
  style,
}) => {
  const [inner, setInner] = useState(defaultValue);
  const [hover, setHover] = useState<number | null>(null);
  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;
  const shown = hover ?? current;
  const interactive = !readonly && !disabled;

  const pick = (n: number) => {
    const next = allowClear && n === current ? 0 : n;
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  return (
    <span
      className={cx("pxui-rate", readonly && "pxui-rate--readonly", disabled && "pxui-rate--disabled", className)}
      style={{ ["--_color" as string]: PALETTE[color], ...style }}
      role="radiogroup"
      onMouseLeave={() => setHover(null)}
    >
      {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={current === n}
          aria-label={`${n} / ${count}`}
          className={cx("pxui-rate__item", n <= shown && "pxui-rate__item--active")}
          disabled={!interactive}
          onMouseEnter={() => interactive && setHover(n)}
          onClick={() => interactive && pick(n)}
        >
          <Icon name={character} size={SIZE[size]} />
        </button>
      ))}
      {texts && shown > 0 && <span className="pxui-rate__text">{texts[shown - 1]}</span>}
    </span>
  );
};
Rate.displayName = "Rate";
