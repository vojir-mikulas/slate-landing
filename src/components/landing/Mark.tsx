type MarkProps = { size?: number };

export function MarkStack({ size = 48 }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <rect x="14" y="11" width="28" height="7" rx="1.5" fill="currentColor" opacity="0.30" />
      <rect x="10" y="22" width="28" height="7" rx="1.5" fill="currentColor" opacity="0.6" />
      <rect x="6" y="33" width="28" height="7" rx="1.5" fill="currentColor" />
    </svg>
  );
}

type WordmarkProps = { size?: number };

export function Wordmark({ size = 16 }: WordmarkProps) {
  return (
    <span className="wm" style={{ fontSize: size }}>
      slate
      <span
        className="wm__dot"
        style={{ width: size * 0.22, height: size * 0.22 }}
      />
    </span>
  );
}
