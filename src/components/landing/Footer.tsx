import { MarkStack, Wordmark } from "./Mark";

export function Footer() {
  return (
    <footer className="lp__wrap footer">
      <span className="footer__brand">
        <MarkStack size={14} />
        <Wordmark size={13} />
        <span style={{ marginLeft: 8, color: "var(--fg-faint)" }}>
          © 2026 — Proudly made in Czech Republic 🇨🇿
        </span>
      </span>
      <span className="footer__links">
        <a href="/privacy">privacy</a>
      </span>
    </footer>
  );
}
