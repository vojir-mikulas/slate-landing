"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import {
  ArchiveIcon,
  BookmarkIcon,
  CheckIcon,
  LinkIcon,
  ShieldIcon,
  XIcon,
} from "./icons";
import { useTheme } from "./useTheme";

type PrivacyPageProps = {
  dict: Dictionary;
};

const SECTION_IDS = [
  "principles",
  "collect",
  "storage",
  "analytics",
  "integrations",
  "sharing",
  "rights",
  "children",
  "changes",
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

type PledgeProps = {
  icon: React.ReactNode;
  title: string;
  sub: string;
};

function PledgeCard({ icon, title, sub }: PledgeProps) {
  return (
    <div className="priv__pledge-card">
      <div className="priv__pledge-icon">{icon}</div>
      <h3 className="priv__pledge-title">{title}</h3>
      <p className="priv__pledge-sub">{sub}</p>
    </div>
  );
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

export function PrivacyPage({ dict }: PrivacyPageProps) {
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection();
  const t = dict.privacy;
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

        <div className="priv__pledge">
          <PledgeCard
            icon={<ArchiveIcon size={13} />}
            title={t.pledge.local.title}
            sub={t.pledge.local.sub}
          />
          <PledgeCard
            icon={<ShieldIcon size={13} />}
            title={t.pledge.noTracking.title}
            sub={t.pledge.noTracking.sub}
          />
          <PledgeCard
            icon={<BookmarkIcon size={13} />}
            title={t.pledge.exportable.title}
            sub={t.pledge.exportable.sub}
          />
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
          <section id="principles">
            <SectionHeading num={s.principles.num} label={s.principles.label} />
            <p>{s.principles.intro}</p>
            <ul>
              {s.principles.bullets.map((b) => (
                <li key={b.strong}>
                  <strong>{b.strong}</strong> {b.text}
                </li>
              ))}
            </ul>
          </section>

          <section id="collect">
            <SectionHeading num={s.collect.num} label={s.collect.label} />
            <p>{s.collect.intro}</p>

            <div className="prose__split">
              <div className="prose__split-card" data-tone="positive">
                <div className="prose__split-label">
                  <CheckIcon size={11} /> {s.collect.onDevice.label}
                </div>
                <ul>
                  {s.collect.onDevice.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="prose__split-card" data-tone="negative">
                <div className="prose__split-label">
                  <XIcon size={11} /> {s.collect.neverCollected.label}
                </div>
                <ul>
                  {s.collect.neverCollected.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="storage">
            <SectionHeading num={s.storage.num} label={s.storage.label} />
            <p>
              {s.storage.p1Start}
              <code>IndexedDB</code>
              {s.storage.p1End}
            </p>
            <p>{s.storage.p2}</p>
            <p>{s.storage.p3}</p>
          </section>

          <section id="analytics">
            <SectionHeading num={s.analytics.num} label={s.analytics.label} />
            <p>{s.analytics.p1}</p>
            <p>{s.analytics.p2}</p>
          </section>

          <section id="integrations">
            <SectionHeading
              num={s.integrations.num}
              label={s.integrations.label}
            />
            <p>{s.integrations.p1}</p>
            <p>{s.integrations.p2}</p>
            <p>{s.integrations.p3}</p>
            <p>{s.integrations.p4}</p>
            <p>{s.integrations.p5}</p>
          </section>

          <section id="sharing">
            <SectionHeading num={s.sharing.num} label={s.sharing.label} />
            <p>{s.sharing.p1}</p>
            <p>{s.sharing.p2}</p>
            <p>{s.sharing.p3}</p>
          </section>

          <section id="rights">
            <SectionHeading num={s.rights.num} label={s.rights.label} />
            <p>{s.rights.intro}</p>
            <ul>
              {s.rights.bullets.map((b) => (
                <li key={b.strong}>
                  <strong>{b.strong}</strong> {b.text}
                </li>
              ))}
            </ul>
            <p>{s.rights.closing}</p>
          </section>

          <section id="children">
            <SectionHeading num={s.children.num} label={s.children.label} />
            <p>{s.children.p1}</p>
          </section>

          <section id="changes">
            <SectionHeading num={s.changes.num} label={s.changes.label} />
            <p>{s.changes.p1}</p>
            <p>{s.changes.p2}</p>
          </section>

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
        </article>
      </main>

      <Footer dict={dict.footer} />
    </div>
  );
}
