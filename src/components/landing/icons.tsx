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

export const Kbd = ({ children }: { children: ReactNode }) => (
  <span className="sp__kbd">{children}</span>
);
