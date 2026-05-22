import Link from "next/link";
import { MarkStack, Wordmark } from "./Mark";

export function Brand() {
  return (
    <Link href="/" className="nav__brand" aria-label="Slate home">
      <MarkStack size={18} />
      <Wordmark size={16} />
    </Link>
  );
}
