import { MarkStack } from "./Mark";

export function ClosingCTA() {
  return (
    <section className="section" id="get">
      <div className="lp__wrap close">
        <h2 className="close__title">
          You can safely <em>close this tab now.</em>
        </h2>
        <p className="close__sub">
          Slate will remember it for you. Free forever for capture, search, and
          archive.
        </p>
        <div className="close__cta">
          <button type="button" className="btn btn--primary">
            <MarkStack size={14} /> Add Slate to your browser
          </button>
        </div>
      </div>
    </section>
  );
}
