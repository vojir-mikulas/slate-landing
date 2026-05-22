import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TermsPage } from "@/components/landing/TermsPage";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "../dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.metadata.termsTitle,
    description: dict.metadata.termsDescription,
  };
}

export default async function Terms({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <TermsPage dict={dict} />;
}
