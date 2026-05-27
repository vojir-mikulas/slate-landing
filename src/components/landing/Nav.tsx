"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Brand } from "./Brand";
import { MarkStack } from "./Mark";
import { MoonIcon, SunIcon } from "./icons";
import type { Theme } from "./useTheme";

type NavProps = {
  theme: Theme;
  toggleTheme: () => void;
  dict: Dictionary["nav"];
};

export function Nav({ theme, toggleTheme, dict }: NavProps) {
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
        <Brand homeLabel={dict.brandHome} />
        <div className="nav__center">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === "light" ? dict.themeToDark : dict.themeToLight
            }
            suppressHydrationWarning
          >
            <span
              className="theme-toggle__icon"
              data-on={theme === "light" ? "true" : "false"}
              suppressHydrationWarning
            >
              <MoonIcon size={14} />
            </span>
            <span
              className="theme-toggle__icon"
              data-on={theme === "dark" ? "true" : "false"}
              suppressHydrationWarning
            >
              <SunIcon size={14} />
            </span>
          </button>
          <a
            className="btn btn--primary"
            href="https://chromewebstore.google.com/detail/slate/lacbdmnaejmfhbcelnmndbhndcgcpodi"
            style={{ marginLeft: 6 }}
          >
            <MarkStack size={13} /> {dict.addToBrowser}
          </a>
        </div>
      </div>
    </nav>
  );
}
