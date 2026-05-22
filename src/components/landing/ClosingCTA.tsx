import type { Dictionary } from "@/app/[lang]/dictionaries";
import { MarkStack } from "./Mark";

type ClosingCTAProps = {
  dict: Dictionary["closingCta"];
};

export function ClosingCTA({ dict }: ClosingCTAProps) {
  return (
    <section className="section" id="get">
      <div className="lp__wrap close">
        <h2 className="close__title">
          {dict.titleStart}
          <em>{dict.titleAccent}</em>
        </h2>
        <p className="close__sub">{dict.sub}</p>
        <div className="close__cta">
          <button type="button" className="btn btn--primary">
            <MarkStack size={14} /> {dict.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
