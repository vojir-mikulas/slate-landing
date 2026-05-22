"use client";

import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { MarkStack } from "./Mark";
import { MoonIcon, SunIcon } from "./icons";
import type { Theme } from "./useTheme";

type NavProps = {
  theme: Theme;
  toggleTheme: () => void;
};

export function Nav({ theme, toggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="nav" data-scrolled={scrolled || undefined}>
      <div className="lp__wrap nav__inner">
        <Brand />
        <div className="nav__center">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            <span
              className="theme-toggle__icon"
              data-on={theme === "light" ? "true" : "false"}
            >
              <MoonIcon size={14} />
            </span>
            <span
              className="theme-toggle__icon"
              data-on={theme === "dark" ? "true" : "false"}
            >
              <SunIcon size={14} />
            </span>
          </button>
          <a
            className="btn btn--primary"
            href="#get"
            style={{ marginLeft: 6 }}
          >
            <MarkStack size={13} /> Add to browser
          </a>
        </div>
      </div>
    </nav>
  );
}
