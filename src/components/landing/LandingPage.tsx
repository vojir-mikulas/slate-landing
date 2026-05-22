"use client";

import { useEffect } from "react";
import { ClosingCTA } from "./ClosingCTA";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Nav } from "./Nav";
import { useTheme } from "./useTheme";

export function LandingPage() {
  const [theme, toggleTheme] = useTheme();

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
    <div className="lp">
      <div className="lp__glow" />
      <div className="lp__grid" />
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
