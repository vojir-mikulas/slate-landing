import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing/LandingPage";
import { hasLocale } from "@/i18n/config";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <LandingPage />;
}
