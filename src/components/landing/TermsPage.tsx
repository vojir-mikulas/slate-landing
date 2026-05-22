"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { LinkIcon } from "./icons";
import { useTheme } from "./useTheme";

type TermsPageProps = {
  dict: Dictionary;
};

const SECTION_IDS = [
  "acceptance",
  "service",
  "browserStore",
  "localFirst",
  "futureFeatures",
  "thirdParties",
  "ownership",
  "acceptableUse",
  "availability",
  "ai",
  "warranties",
  "liability",
  "termination",
  "changes",
  "age",
  "law",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

function useActiveSection() {
  const [active, setActive] = useState<SectionId>(SECTION_IDS[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      let cur: SectionId = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
}

type SectionHeadingProps = {
  num: string;
  label: string;
};

function SectionHeading({ num, label }: SectionHeadingProps) {
  return (
    <h2>
      <span className="prose__num">{num}</span>
      {label}
    </h2>
  );
}

export function TermsPage({ dict }: TermsPageProps) {
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection();
  const t = dict.terms;
  const s = t.sections;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const root = document.documentElement;
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="lp priv">
      <div className="lp__glow" />
      <Nav theme={theme} toggleTheme={toggleTheme} dict={dict.nav} />

      <header className="priv__header">
        <div className="lp__wrap">
          <span className="priv__eyebrow">{t.eyebrow}</span>
          <h1 className="priv__title">
            {t.titleStart}
            <em>{t.titleAccent}</em>
          </h1>
          <div className="priv__meta">
            <span>{t.effective}</span>
            <span className="priv__meta-sep" />
            <span>{t.lastUpdated}</span>
          </div>
          <p className="priv__lede">{t.lede}</p>
        </div>
      </header>

      <main className="priv__body">
        <aside className="toc">
          <div className="toc__label">{t.toc.label}</div>
          <ul className="toc__list">
            {SECTION_IDS.map((id) => (
              <li key={id} className="toc__item">
                <a href={`#${id}`} data-active={active === id || undefined}>
                  <span className="toc__num">{s[id].num}</span>
                  <span>{s[id].label}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <article className="prose">
          {SECTION_IDS.map((id) => {
            const sec = s[id];
            return (
              <section key={id} id={id}>
                <SectionHeading num={sec.num} label={sec.label} />
                <p>{sec.p1}</p>
                {"p2" in sec && <p>{sec.p2}</p>}
                {"p3" in sec && <p>{sec.p3}</p>}
              </section>
            );
          })}

          <div className="priv__contact">
            <div className="priv__contact-text">
              <strong>{t.contact.title}</strong>
              <br />
              {t.contact.body}
              <br />
              <small>{t.contact.controller}</small>
            </div>
            <a href={`mailto:${t.contact.email}`}>
              <LinkIcon size={13} /> {t.contact.email}
            </a>
          </div>

          <p className="priv__closing">{t.closing}</p>
        </article>
      </main>

      <Footer dict={dict.footer} />
    </div>
  );
}
