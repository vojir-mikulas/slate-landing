import type { Dictionary } from "@/app/[lang]/dictionaries";
import { MarkStack, Wordmark } from "./Mark";

type FooterProps = {
  dict: Dictionary["footer"];
};

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="lp__wrap footer">
      <span className="footer__brand">
        <MarkStack size={14} />
        <Wordmark size={13} />
        <span style={{ marginLeft: 8, color: "var(--fg-faint)" }}>
          {dict.copyright}
        </span>
      </span>
      <span className="footer__links">
        <a href="/privacy">{dict.privacyLink}</a>
      </span>
    </footer>
  );
}
