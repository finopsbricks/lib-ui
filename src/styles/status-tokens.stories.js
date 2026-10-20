/**
 * Status and money colour tokens (design-standards decision 0002).
 *
 * Every number on this page is measured from the rendered tokens, not typed in,
 * so the play functions catch a token change that breaks contrast or the
 * warning/info match.
 */

import React, { useEffect, useRef, useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { expect } from 'storybook/test';

const TOKENS = [
  { name: 'warning-subtle', css: '--warning-subtle', utility: 'bg-warning-subtle', use: 'Band on an item that needs attention (missing comment)' },
  { name: 'warning-subtle-foreground', css: '--warning-subtle-foreground', utility: 'text-warning-subtle-foreground', use: 'Text on warning-subtle ("Add comment")' },
  { name: 'warning', css: '--warning', utility: 'text-warning', use: 'Icon or mark on warning-subtle' },
  { name: 'info-subtle', css: '--info-subtle', utility: 'bg-info-subtle', use: 'Band on a done, informational item (comment written)' },
  { name: 'amount-in', css: '--amount-in', utility: 'text-amount-in', use: 'Money coming in (credit)' },
  { name: 'amount-out', css: '--amount-out', utility: 'text-amount-out', use: 'Money going out (debit)' },
];

// [label, foreground token, background token, minimum ratio]
const PAIRS = [
  ['"Add comment" text on warning-subtle', '--warning-subtle-foreground', '--warning-subtle', 4.5],
  ['Icon on warning-subtle', '--warning', '--warning-subtle', 3],
  ['Comment text on info-subtle', '--foreground', '--info-subtle', 4.5],
  ['Credit amount on card', '--amount-in', '--card', 4.5],
  ['Debit amount on card', '--amount-out', '--card', 4.5],
];

function readRgb(ctx, css_colour) {
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = css_colour;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b].map((v) => v / 255);
}

const toLinear = (v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);

function luminance(rgb) {
  const [r, g, b] = rgb.map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function toOklch(rgb) {
  const [r, g, b] = rgb.map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { L, C: Math.hypot(A, B), h: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 };
}

function useMeasurements(root_ref) {
  const [m, setM] = useState(null);
  useEffect(() => {
    const style = getComputedStyle(root_ref.current);
    const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    const rgb = (token) => readRgb(ctx, style.getPropertyValue(token).trim());
    const raw = (token) => style.getPropertyValue(token).trim();
    setM({
      values: Object.fromEntries(TOKENS.map((t) => [t.css, raw(t.css)])),
      pairs: PAIRS.map(([label, fg, bg, min]) => ({ label, min, ratio: contrast(rgb(fg), rgb(bg)) })),
      warning: toOklch(rgb('--warning-subtle')),
      info: toOklch(rgb('--info-subtle')),
    });
  }, [root_ref]);
  return m;
}

const fmt = (o) => `L ${o.L.toFixed(3)} · C ${o.C.toFixed(3)} · h ${Math.round(o.h)}`;

function StatusTokens() {
  const root_ref = useRef(null);
  const m = useMeasurements(root_ref);

  return (
    <div ref={root_ref} className="w-[min(100vw-2rem,42rem)] space-y-6 bg-background p-4 text-sm text-foreground">
      <section className="space-y-2">
        <h2 className="font-semibold">Tokens</h2>
        <ul className="divide-y rounded-lg border bg-card">
          {TOKENS.map((t) => (
            <li key={t.name} className="flex items-center gap-3 p-3">
              <span
                className="size-8 shrink-0 rounded border"
                style={{ background: `var(${t.css})` }}
                aria-hidden
              />
              <div className="min-w-0">
                <div className="font-mono text-xs">{t.utility}</div>
                <div className="text-muted-foreground">{t.use}</div>
                <div className="font-mono text-xs text-muted-foreground">{m?.values[t.css]}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold">In use</h2>
        <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
          <div className="flex justify-between px-3 py-3">
            <span>Swiggy · UPI</span>
            <span className="font-semibold tabular-nums text-amount-out">−1,240.00</span>
          </div>
          <div className="border-t bg-warning-subtle px-3 py-2">
            <span className="flex items-center gap-2 font-medium text-warning-subtle-foreground">
              <MessageSquarePlus className="size-4 text-warning" aria-hidden />
              Add comment
            </span>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
          <div className="flex justify-between px-3 py-3">
            <span>Salary · NEFT</span>
            <span className="font-semibold tabular-nums text-amount-in">+85,000.00</span>
          </div>
          <div className="border-t bg-info-subtle px-3 py-2">October salary</div>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold">Contrast (measured)</h2>
        <ul className="divide-y rounded-lg border bg-card" data-testid="contrast">
          {m?.pairs.map((p) => (
            <li key={p.label} className="flex justify-between gap-3 p-3" data-ratio={p.ratio} data-min={p.min}>
              <span>{p.label}</span>
              <span className="tabular-nums">
                {p.ratio.toFixed(2)}:1 <span className="text-muted-foreground">(min {p.min})</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {m && (
        <section className="space-y-1" data-testid="match" data-dl={Math.abs(m.warning.L - m.info.L)} data-dc={Math.abs(m.warning.C - m.info.C)}>
          <h2 className="font-semibold">warning-subtle matched to info-subtle</h2>
          <p className="text-muted-foreground">Same lightness and chroma, so only the hue tells them apart.</p>
          <p className="font-mono text-xs">warning-subtle {fmt(m.warning)}</p>
          <p className="font-mono text-xs">info-subtle&nbsp;&nbsp;&nbsp; {fmt(m.info)}</p>
          <p className="font-mono text-xs">
            ΔL {Math.abs(m.warning.L - m.info.L).toFixed(3)} · ΔC {Math.abs(m.warning.C - m.info.C).toFixed(3)}
          </p>
        </section>
      )}
    </div>
  );
}

const meta = {
  title: 'foundations/Status and money colours',
  component: StatusTokens,
  parameters: {
    layout: 'centered',
    description: 'Semantic status (warning, info) and money direction (amount-in, amount-out) tokens. Contrast and the warning/info match are measured from the rendered colours.',
  },
};

export default meta;

async function checkTokens({ canvasElement }) {
  const contrast_list = await new Promise((resolve) => {
    const tick = () => {
      const el = canvasElement.querySelector('[data-testid="contrast"]');
      if (el?.children.length) resolve(el);
      else requestAnimationFrame(tick);
    };
    tick();
  });
  for (const row of contrast_list.children) {
    await expect(Number(row.dataset.ratio)).toBeGreaterThanOrEqual(Number(row.dataset.min));
  }
  const match = canvasElement.querySelector('[data-testid="match"]');
  await expect(Number(match.dataset.dl)).toBeLessThanOrEqual(0.035);
  await expect(Number(match.dataset.dc)).toBeLessThanOrEqual(0.02);
}

/** Light theme: every pair passes AA and the two bands differ only in hue. */
export const Light = {
  globals: { theme: 'light' },
  play: checkTokens,
};

/** Dark theme: same checks against the dark values. */
export const Dark = {
  globals: { theme: 'dark' },
  play: checkTokens,
};
