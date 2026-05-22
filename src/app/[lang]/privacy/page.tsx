import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivacyPage } from "@/components/landing/PrivacyPage";
import { hasLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Slate — Privacy",
  description:
    "How Slate handles your memory. Local-first by default, no tracking, always exportable.",
};

export default async function Privacy({
  params,
}: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <PrivacyPage />;
}
