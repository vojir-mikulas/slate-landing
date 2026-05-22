"use client";

import { useEffect, useState } from "react";
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

type Section = { id: string; num: string; label: string };

const SECTIONS: Section[] = [
  { id: "principles", num: "01", label: "Principles" },
  { id: "collect", num: "02", label: "What we collect" },
  { id: "storage", num: "03", label: "Where it lives" },
  { id: "analytics", num: "04", label: "Analytics" },
  { id: "sharing", num: "05", label: "Sharing" },
  { id: "rights", num: "06", label: "Your rights" },
  { id: "children", num: "07", label: "Children" },
  { id: "changes", num: "08", label: "Changes" },
];

function useActiveSection() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      let cur = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) cur = s.id;
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

export function PrivacyPage() {
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection();

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
      <Nav theme={theme} toggleTheme={toggleTheme} />

      <header className="priv__header">
        <div className="lp__wrap">
          <span className="priv__eyebrow">Privacy · v0.1</span>
          <h1 className="priv__title">
            How Slate handles <em>your memory.</em>
          </h1>
          <div className="priv__meta">
            <span>Effective May 22, 2026</span>
            <span className="priv__meta-sep" />
            <span>Last updated May 22, 2026</span>
          </div>
          <p className="priv__lede">
            Slate is built on a simple premise: the things you save are
            yours. By default, your data stays on your device and we collect
            as little as possible — today, that&rsquo;s nothing at all.
          </p>
        </div>

        <div className="priv__pledge">
          <PledgeCard
            icon={<ArchiveIcon size={13} />}
            title="Local by default"
            sub="Your saves live in your browser. Nothing is shipped to any server we run."
          />
          <PledgeCard
            icon={<ShieldIcon size={13} />}
            title="No tracking"
            sub="No analytics SDKs, no cookies, no behavioural data. We don&rsquo;t watch you use Slate."
          />
          <PledgeCard
            icon={<BookmarkIcon size={13} />}
            title="Always exportable"
            sub="Your saves belong to you. One click to clean JSON or CSV — no lock-in, no holdout."
          />
        </div>
      </header>

      <main className="priv__body">
        <aside className="toc">
          <div className="toc__label">On this page</div>
          <ul className="toc__list">
            {SECTIONS.map((s) => (
              <li key={s.id} className="toc__item">
                <a
                  href={`#${s.id}`}
                  data-active={active === s.id || undefined}
                >
                  <span className="toc__num">{s.num}</span>
                  <span>{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <article className="prose">
          <section id="principles">
            <h2>
              <span className="prose__num">01</span>Principles
            </h2>
            <p>
              Slate is built on a small number of opinions that constrain
              every product decision below.
            </p>
            <ul>
              <li>
                <strong>Local first.</strong> Your saves are yours, stored
                in your browser, on your device. There is no &ldquo;cloud&rdquo; today.
              </li>
              <li>
                <strong>Minimum collection.</strong> If we don&rsquo;t need a
                piece of data to make Slate work for you, we don&rsquo;t collect
                it.
              </li>
              <li>
                <strong>No advertising.</strong> We do not run ads. We do
                not sell, rent, or share your saves with third parties.
              </li>
              <li>
                <strong>No training.</strong> We do not feed your saves into
                AI models — ours, or anyone else&rsquo;s.
              </li>
              <li>
                <strong>Honest defaults.</strong> Privacy-friendly settings
                are the defaults. We don&rsquo;t dark-pattern you out of them.
              </li>
            </ul>
          </section>

          <section id="collect">
            <h2>
              <span className="prose__num">02</span>What we collect
            </h2>
            <p>
              By default, we do not collect or process your data. Slate
              does not require an account, does not phone home, and does
              not run analytics on this website.
            </p>

            <div className="prose__split">
              <div className="prose__split-card" data-tone="positive">
                <div className="prose__split-label">
                  <CheckIcon size={11} /> On your device
                </div>
                <ul>
                  <li>URLs and titles of pages you save</li>
                  <li>Tags, notes, and collections you create</li>
                  <li>Timestamps and which list an item is in</li>
                </ul>
              </div>
              <div className="prose__split-card" data-tone="negative">
                <div className="prose__split-label">
                  <XIcon size={11} /> Never collected
                </div>
                <ul>
                  <li>Browsing history outside saved items</li>
                  <li>The contents of pages you didn&rsquo;t save</li>
                  <li>Keystrokes, mouse movement, or screen recordings</li>
                  <li>Inferred interests, topics, or profiles</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="storage">
            <h2>
              <span className="prose__num">03</span>Where your data lives
            </h2>
            <p>
              Slate is built on a local-first architecture. Your library
              lives in <code>IndexedDB</code> inside your browser. That
              copy is the source of truth — and the only copy.
            </p>
            <p>
              There is no sync, no backend, and no shared server today. If
              that ever changes, it will be opt-in, clearly labelled, and
              described on this page before it ships.
            </p>
            <p>
              Because your data is local, it may persist on your device
              even after you stop using Slate. You can wipe it at any time
              from Settings, or by clearing site data in your browser.
            </p>
          </section>

          <section id="analytics">
            <h2>
              <span className="prose__num">04</span>Analytics &amp; tracking
            </h2>
            <p>
              We do not use analytics or tracking SDKs. We do not track
              your behaviour, usage patterns, or interactions inside the
              app. The marketing site you&rsquo;re reading right now sets no
              cookies and runs no third-party scripts beyond what&rsquo;s
              required to load Google Fonts.
            </p>
          </section>

          <section id="sharing">
            <h2>
              <span className="prose__num">05</span>Sharing &amp; third parties
            </h2>
            <p>
              We do not sell or share your data with third parties.
              There&rsquo;s currently no payment processor, no AI provider, no
              hosted backend in the loop — because there&rsquo;s nothing for
              them to receive.
            </p>
            <p>
              If we ever add a paid plan or shared features, we&rsquo;ll list
              every third party we work with here, including what they
              receive and why.
            </p>
          </section>

          <section id="rights">
            <h2>
              <span className="prose__num">06</span>Your rights
            </h2>
            <p>
              Slate is built so that exercising these rights doesn&rsquo;t
              require an email — most of them are a button in Settings.
            </p>
            <ul>
              <li>
                <strong>Export.</strong> Download all your saves as JSON or
                CSV, anytime.
              </li>
              <li>
                <strong>Delete.</strong> Wipe your local library from
                Settings, or clear site data in your browser.
              </li>
              <li>
                <strong>Access.</strong> Everything Slate knows about you
                is visible in the app — there&rsquo;s nothing held server-side.
              </li>
              <li>
                <strong>Correct.</strong> Edit any field on any save
                directly in the app.
              </li>
            </ul>
            <p>
              If you&rsquo;re in the EU, UK, or California, you have these
              rights under GDPR, UK GDPR, and CCPA respectively. Since
              your data is stored locally, you can exercise them directly
              — but reach out if anything is unclear.
            </p>
          </section>

          <section id="children">
            <h2>
              <span className="prose__num">07</span>Children
            </h2>
            <p>
              Slate is not directed at children under 13, or under 16 in
              the European Union where applicable. We don&rsquo;t knowingly
              collect data from anyone in that age range. If you believe
              we have, please contact us and we&rsquo;ll delete it.
            </p>
          </section>

          <section id="changes">
            <h2>
              <span className="prose__num">08</span>Changes to this policy
            </h2>
            <p>
              If we make significant changes — especially anything that
              expands what we collect — we&rsquo;ll update the date above and
              clearly communicate them. We do not expand data collection
              silently.
            </p>
          </section>

          <div className="priv__contact">
            <div className="priv__contact-text">
              <strong>Questions?</strong>
              <br />
              Plain prose, no ticket forms. Reach a human and we&rsquo;ll get
              back to you within a few days.
            </div>
            <a href="mailto:hello@slate.app">
              <LinkIcon size={13} /> hello@slate.app
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
