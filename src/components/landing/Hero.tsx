"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { HeroCard, type HeroItem } from "./HeroCard";
import { MarkStack } from "./Mark";
import { CheckIcon, Kbd } from "./icons";

type HeroProps = {
  dict: Dictionary["hero"];
  cardDict: Dictionary["heroCard"];
  itemsDict: Dictionary["heroItems"];
};

const INITIAL_ITEM_DATA: Omit<HeroItem, "title">[] = [
  { thumb: "GH", tone: "gh", domain: "github.com", time: "34m" },
  { thumb: "YT", tone: "yt", domain: "youtube.com · 24:18", time: "1h" },
  { thumb: "H", tone: "indigo", domain: "works.hey.com · 7 min", time: "2h" },
  {
    thumb: "P",
    tone: "green",
    domain: "pragmaticengineer.com · 14 min",
    time: "5h",
  },
];

const INCOMING_ITEM_DATA: Omit<HeroItem, "title"> = {
  thumb: "A",
  tone: "amber",
  domain: "inkandswitch.com · 22 min",
  time: "now",
  incoming: true,
};

const TOAST_MS = 2600;

export function Hero({ dict, cardDict, itemsDict }: HeroProps) {
  const initialItems = useMemo<HeroItem[]>(
    () =>
      INITIAL_ITEM_DATA.map((data, i) => ({
        ...data,
        title: itemsDict.initial[i],
      })),
    [itemsDict],
  );

  const [items, setItems] = useState<HeroItem[]>(initialItems);
  const [toast, setToast] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveOne = useCallback(() => {
    if (toast) return;
    setToast(true);
    setItems((prev) => [
      { ...INCOMING_ITEM_DATA, title: itemsDict.incoming, key: Math.random() },
      ...prev.slice(0, 3),
    ]);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(false), TOAST_MS);
  }, [toast, itemsDict.incoming]);

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
          {dict.eyebrow}
        </span>
        <h1 className="hero__title">
          {dict.titleStart}
          <em>{dict.titleAccent}</em>
          <span className="accent-period">.</span>
        </h1>
        <p className="hero__sub">{dict.subtitle}</p>
        <div className="hero__cta">
          <button type="button" className="btn btn--primary" onClick={saveOne}>
            <MarkStack size={14} /> {dict.ctaSave}
            <Kbd>⌘S</Kbd>
          </button>
          <span className="hero__cta-note">
            <CheckIcon size={11} /> {dict.ctaNote}
          </span>
        </div>
      </div>

      <div className="hero__device">
        <HeroCard items={items} dict={cardDict} />
        <div className="qs-float" data-visible={toast || undefined}>
          <div className="qs-float__check">
            <CheckIcon size={13} />
          </div>
          <div className="qs-float__body">
            <div className="qs-float__title">{dict.toastTitle}</div>
            <div className="qs-float__sub">{dict.toastSub}</div>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              color: "var(--fg-mute)",
            }}
          >
            {dict.toastUndo}
          </span>
          <span className="qs-float__progress" />
        </div>
      </div>
    </section>
  );
}
