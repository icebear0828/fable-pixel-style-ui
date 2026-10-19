import React, { useEffect, useRef, useState } from "react";
import { cx } from "../utils/cx";

export interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 文本；数组表示多行（逐行输出） */
  text: string | string[];
  /** 每个字符间隔 ms */
  speed?: number;
  /** 开始前延迟 ms */
  delay?: number;
  /** 显示光标 */
  cursor?: boolean;
  /** 循环播放 */
  loop?: boolean;
  /** 使用像素字体 */
  pixel?: boolean;
  onComplete?: () => void;
}

export const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 60, delay = 0, cursor = true, loop, pixel, onComplete, className, ...rest }) => {
  const full = Array.isArray(text) ? text.join("\n") : text;
  const [len, setLen] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    setLen(0);
    done.current = false;
    let i = 0;
    let timer: number;
    const tick = () => {
      i++;
      setLen(i);
      if (i < full.length) {
        timer = window.setTimeout(tick, speed);
      } else if (loop) {
        timer = window.setTimeout(() => {
          i = 0;
          setLen(0);
          timer = window.setTimeout(tick, speed);
        }, 1400);
      } else if (!done.current) {
        done.current = true;
        onComplete?.();
      }
    };
    timer = window.setTimeout(tick, delay + speed);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full, speed, delay, loop]);

  return (
    <span className={cx("pxui-typewriter", pixel && "pxui-typewriter--pixel", className)} aria-label={full} {...rest}>
      {full.slice(0, len)}
      {cursor && <span className="pxui-typewriter__cursor" aria-hidden="true" />}
    </span>
  );
};
Typewriter.displayName = "Typewriter";
