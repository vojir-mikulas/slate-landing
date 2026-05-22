"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HeroCard, type HeroItem } from "./HeroCard";
import { MarkStack } from "./Mark";
import { CheckIcon, Kbd } from "./icons";

const INITIAL_ITEMS: HeroItem[] = [
  {
    thumb: "GH",
    tone: "gh",
    title: "rauchg / next.js — discussion #58219",
    domain: "github.com",
    time: "34m",
  },
  {
    thumb: "YT",
    tone: "yt",
    title: "How Linear thinks about engineering velocity",
    domain: "youtube.com · 24:18",
    time: "1h",
  },
  {
    thumb: "H",
    tone: "indigo",
    title: "On craft and the cost of caring too much",
    domain: "works.hey.com · 7 min",
    time: "2h",
  },
  {
    thumb: "P",
    tone: "green",
    title: "Pricing teardown of 14 dev tools",
    domain: "pragmaticengineer.com · 14 min",
    time: "5h",
  },
];

const NEXT_INCOMING: HeroItem = {
  thumb: "A",
  tone: "amber",
  title: "Local-first software — the new old way",
  domain: "inkandswitch.com · 22 min",
  time: "now",
  incoming: true,
};

const TOAST_MS = 2600;

export function Hero() {
  const [items, setItems] = useState<HeroItem[]>(INITIAL_ITEMS);
  const [toast, setToast] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveOne = useCallback(() => {
    if (toast) return;
    setToast(true);
    setItems((prev) => [
      { ...NEXT_INCOMING, key: Math.random() },
      ...prev.slice(0, 3),
    ]);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(false), TOAST_MS);
  }, [toast]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return (
    <section className="hero lp__wrap">
      <div className="hero__copy">
        <span className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          v0.67.3 — public beta is open
        </span>
        <h1 className="hero__title">
          The internet, <em>remembered</em>
          <span className="accent-period">.</span>
        </h1>
        <p className="hero__sub">
          Slate is a calm buffer between browsing and forgetting. Save anything
          in one keystroke. Rediscover it naturally, when it matters again.
        </p>
        <div className="hero__cta">
          <button type="button" className="btn btn--primary" onClick={saveOne}>
            <MarkStack size={14} /> Try saving a link
            <Kbd>⌘S</Kbd>
          </button>
          <a className="btn btn--ghost" href="#get">
            Watch the demo
          </a>
          <span className="hero__cta-note">
            <CheckIcon size={11} /> Captures in one keystroke. No accounts. No
            backlog.
          </span>
        </div>
      </div>

      <div className="hero__device">
        <HeroCard items={items} />
        <div className="qs-float" data-visible={toast || undefined}>
          <div className="qs-float__check">
            <CheckIcon size={13} />
          </div>
          <div className="qs-float__body">
            <div className="qs-float__title">Saved to your slate</div>
            <div className="qs-float__sub">inkandswitch.com · queued</div>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              color: "var(--fg-mute)",
            }}
          >
            Undo
          </span>
          <span className="qs-float__progress" />
        </div>
      </div>
    </section>
  );
}
