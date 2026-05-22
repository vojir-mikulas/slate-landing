import type { Metadata } from "next";
import { PrivacyPage } from "@/components/landing/PrivacyPage";

export const metadata: Metadata = {
  title: "Slate — Privacy",
  description:
    "How Slate handles your memory. Local-first by default, no tracking, always exportable.",
};

export default function Privacy() {
  return <PrivacyPage />;
}
