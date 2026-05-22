import Link from "next/link";
import { MarkStack, Wordmark } from "./Mark";

type BrandProps = {
  homeLabel: string;
};

export function Brand({ homeLabel }: BrandProps) {
  return (
    <Link href="/" className="nav__brand" aria-label={homeLabel}>
      <MarkStack size={18} />
      <Wordmark size={16} />
    </Link>
  );
}
