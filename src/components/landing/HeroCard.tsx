import { MarkStack } from "./Mark";

export type HeroItem = {
  key?: number;
  thumb: string;
  tone: "gh" | "yt" | "indigo" | "green" | "amber" | "rose" | "blue";
  title: string;
  domain: string;
  time: string;
  incoming?: boolean;
};

type HeroCardProps = {
  items: HeroItem[];
};

export function HeroCard({ items }: HeroCardProps) {
  return (
    <div className="slate-card">
      <div className="slate-card__head">
        <span className="slate-card__head-brand">
          <MarkStack size={14} />
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              display: "inline-flex",
              alignItems: "baseline",
            }}
          >
            slate
            <span
              style={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "var(--accent)",
                marginLeft: 1.5,
                marginBottom: 1.5,
                alignSelf: "flex-end",
              }}
            />
          </span>
        </span>
        <span
          className="slate-card__head-meta"
          style={{ whiteSpace: "nowrap" }}
        >
          67 saves
        </span>
      </div>
      <div className="slate-card__tabs">
        <span className="slate-card__tab" data-active="true">
          Queue{" "}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              color: "var(--fg-mute)",
              marginLeft: 4,
            }}
          >
            {items.length}
          </span>
        </span>
        <span className="slate-card__tab">Saved</span>
      </div>
      <div className="slate-card__list">
        <div className="lc-group-label">Today</div>
        {items.map((it, i) => (
          <div
            key={it.key ?? `${it.title}-${i}`}
            className="lc-item"
            data-incoming={it.incoming || undefined}
          >
            <div className="lc-thumb" data-tone={it.tone}>
              {it.thumb}
            </div>
            <div className="lc-main">
              <div className="lc-title">{it.title}</div>
              <div className="lc-meta">
                <span>{it.domain}</span>
              </div>
            </div>
            <div className="lc-time">{it.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
