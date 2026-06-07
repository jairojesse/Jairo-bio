"use client";

import { useState, useRef, useEffect, useCallback } from "react";

function squirclePath(w: number, h: number, r: number): string {
  const k = r * 0.45;
  return [
    `M ${r},0`,
    `L ${w - r},0`,
    `C ${w - k},0 ${w},${k} ${w},${r}`,
    `L ${w},${h - r}`,
    `C ${w},${h - k} ${w - k},${h} ${w - r},${h}`,
    `L ${r},${h}`,
    `C ${k},${h} 0,${h - k} 0,${h - r}`,
    `L 0,${r}`,
    `C 0,${k} ${k},0 ${r},0`,
    `Z`,
  ].join(" ");
}

let squircleIdCounter = 0;

export function useSquircle({ radius = 28 }: { radius?: number } = {}) {
  const ref = useRef<HTMLElement>(null);
  const [clipId] = useState(() => `sq-${++squircleIdCounter}`);
  const [pathD, setPathD] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });

  const update = useCallback(
    (w: number, h: number) => {
      if (w === 0 || h === 0) return;
      const r = Math.min(radius, w / 2, h / 2);
      setPathD(squirclePath(w, h, r));
      setSize({ w, h });
    },
    [radius]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      update(Math.round(width), Math.round(height));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  const svgClip = pathD ? (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <path d={pathD} />
        </clipPath>
      </defs>
    </svg>
  ) : null;

  const clipStyle: React.CSSProperties = pathD
    ? { clipPath: `url(#${clipId})` }
    : { borderRadius: radius };

  return { ref, svgClip, clipStyle, size };
}
