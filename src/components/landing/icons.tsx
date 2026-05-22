import type { ReactNode, SVGProps } from "react";

type SvgIconProps = Omit<SVGProps<SVGSVGElement>, "stroke" | "strokeWidth"> & {
  size?: number;
  strokeWidth?: number;
  children: ReactNode;
};

export function SvgIcon({
  children,
  size = 14,
  strokeWidth = 1.6,
  ...rest
}: SvgIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

type IconProps = { size?: number };

export const CheckIcon = ({ size = 14 }: IconProps) => (
  <SvgIcon size={size}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </SvgIcon>
);

export const MoonIcon = ({ size = 14 }: IconProps) => (
  <SvgIcon size={size}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
  </SvgIcon>
);

export const SunIcon = ({ size = 14 }: IconProps) => (
  <SvgIcon size={size}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
  </SvgIcon>
);

export const ArchiveIcon = ({ size = 14 }: IconProps) => (
  <SvgIcon size={size}>
    <rect x="3" y="4" width="18" height="4" rx="1" />
    <path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" />
    <path d="M10 13h4" />
  </SvgIcon>
);

export const BookmarkIcon = ({ size = 14 }: IconProps) => (
  <SvgIcon size={size}>
    <path d="M6 4h12v17l-6-4-6 4z" />
  </SvgIcon>
);

export const XIcon = ({ size = 14 }: IconProps) => (
  <SvgIcon size={size}>
    <path d="M6 6l12 12M18 6 6 18" />
  </SvgIcon>
);

export const LinkIcon = ({ size = 14 }: IconProps) => (
  <SvgIcon size={size}>
    <path d="M10 14a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1" />
    <path d="M14 10a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1" />
  </SvgIcon>
);

export const ShieldIcon = ({ size = 14 }: IconProps) => (
  <SvgIcon size={size}>
    <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6z" />
  </SvgIcon>
);

export const Kbd = ({ children }: { children: ReactNode }) => (
  <span className="sp__kbd">{children}</span>
);
