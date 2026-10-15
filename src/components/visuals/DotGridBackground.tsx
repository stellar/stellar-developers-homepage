"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/**
 * DotGridBackground — exported from the Dot Grid Background jig.
 * Dark-mode ready (Stellar developer site, V6).
 * Self-contained: React only, no other dependencies.
 *
 * Usage: render inside a positioned ancestor (e.g. relative/absolute);
 * the canvas fills it and listens for pointer events on it. Dots and the
 * canvas background come from SDS tokens (see TOKENS), so Light and Dark
 * follow the page's data-theme with no extra build. The `color` prop still
 * overrides the dot colour.
 *
 * Dialed values are baked into OPTIONS below — paste them back into the
 * jig's controls to iterate on this export later.
 */

const OPTIONS = {
  fullscreen: false,
  rows: 13,
  cols: 13,
  gap: 59, // px between dots
  baseRadius: 8, // px
  breathSpeed: 0.000966644, // rad/ms (~6.5s cycle)
  breathDepth: 0.57, // 0..1 size swing
  influenceRadius: 340, // px around the cursor
  pushStrength: 24, // max px of displacement
  magnify: 0.75, // extra radius at the cursor (0..2)
  smoothing: 54.95, // ms cursor-follow time constant
};

/**
 *   dot        → --sds-clr-dev-dot-grid  (Light #aa99ec = lilac-08 · Dark #9e8cfc = lilac-11)
 *   background → --sds-clr-gray-01       (Light #fcfcfc            · Dark #161616)
 * Fallback hex values apply only if the tokens are not defined on the page.
 */
const TOKENS = {
  dot: "--sds-clr-dev-dot-grid",
  background: "--sds-clr-gray-01",
};
const FALLBACK = {
  light: { dot: "#aa99ec", background: "#fcfcfc" },
  dark: { dot: "#9e8cfc", background: "#161616" },
};

function isDark(): boolean {
  const theme = document.documentElement.getAttribute("data-theme");
  if (theme) return theme === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolveColor(el: Element, token: string, key: "dot" | "background"): string {
  const v = getComputedStyle(el).getPropertyValue(token).trim();
  return v || FALLBACK[isDark() ? "dark" : "light"][key];
}

interface Dot {
  x: number;
  y: number;
  phase: number;
}

function seededPhase(index: number): number {
  const s = Math.sin(index * 127.1 + 311.7) * 43758.5453;
  return (s - Math.floor(s)) * Math.PI * 2;
}

function makeDots(rows: number, cols: number, left: number, top: number, gap: number): Dot[] {
  const dots: Dot[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ x: left + c * gap, y: top + r * gap, phase: seededPhase(r * cols + c) });
    }
  }
  return dots;
}

function buildGrid(width: number, height: number): Dot[] {
  if (OPTIONS.fullscreen) {
    const gap = Math.max(OPTIONS.gap, Math.sqrt((width * height) / 4000));
    const cols = Math.ceil(width / gap) + 1;
    const rows = Math.ceil(height / gap) + 1;
    return makeDots(rows, cols, (width - (cols - 1) * gap) / 2, (height - (rows - 1) * gap) / 2, gap);
  }
  const { rows, cols } = OPTIONS;
  const maxSpan = Math.min(width, height) * 0.78;
  const gap = Math.min(OPTIONS.gap, maxSpan / (Math.max(rows, cols) - 1));
  return makeDots(rows, cols, (width - (cols - 1) * gap) / 2, (height - (rows - 1) * gap) / 2, gap);
}

function smoothstep(t: number): number {
  const x = Math.min(Math.max(t, 0), 1);
  return x * x * (3 - 2 * x);
}

export function DotGridBackground({
  color,
  className,
  style,
}: {
  /** dot color; defaults to the canvas's inherited CSS color */
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = canvas?.parentElement;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let fillColor = color || resolveColor(canvas, TOKENS.dot, "dot");
    const applyTheme = () => {
      if (!color) fillColor = resolveColor(canvas, TOKENS.dot, "dot");
      canvas.style.background = resolveColor(canvas, TOKENS.background, "background");
    };
    const cursor = { x: -9999, y: -9999, strength: 0 };
    const target = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = buildGrid(width, height);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = fillColor;
      for (const dot of dots) {
        const breath = 0.5 + 0.5 * Math.sin(time * OPTIONS.breathSpeed + dot.phase);
        let radius = OPTIONS.baseRadius * (1 - OPTIONS.breathDepth / 2 + OPTIONS.breathDepth * breath);
        let alpha = 0.33 + 0.3 * OPTIONS.breathDepth * (breath - 0.5);
        let x = dot.x;
        let y = dot.y;
        if (cursor.strength > 0.001) {
          const dx = x - cursor.x;
          const dy = y - cursor.y;
          const dist = Math.hypot(dx, dy);
          const falloff = smoothstep(1 - dist / OPTIONS.influenceRadius) * cursor.strength;
          if (falloff > 0 && dist > 0.0001) {
            const push = falloff * OPTIONS.pushStrength;
            x += (dx / dist) * push;
            y += (dy / dist) * push;
            radius *= 1 + OPTIONS.magnify * falloff;
            alpha += 0.4 * falloff;
          }
        }
        ctx.globalAlpha = Math.min(alpha, 0.85);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      target.active = true;
    };
    const onPointerLeave = () => {
      target.active = false;
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const k = 1 - Math.exp(-dt / OPTIONS.smoothing);
      if (cursor.strength < 0.01 && target.active) {
        cursor.x = target.x;
        cursor.y = target.y;
      } else {
        cursor.x += (target.x - cursor.x) * k;
        cursor.y += (target.y - cursor.y) * k;
      }
      cursor.strength += ((target.active ? 1 : 0) - cursor.strength) * k;
      draw(reducedMotion ? 0 : now);
      raf = requestAnimationFrame(frame);
    };

    resize();
    applyTheme();
    // Re-resolve colours when the theme changes (SDS data-theme or OS setting).
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", applyTheme);
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerdown", onPointerMove);
    stage.addEventListener("pointerleave", onPointerLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      themeObserver.disconnect();
      mq.removeEventListener("change", applyTheme);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerdown", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={"dot-grid-canvas" + (className ? " " + className : "")}
      style={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        ...style,
      }}
    />
  );
}
