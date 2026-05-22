import "server-only";
import enDictionary from "@/dictionaries/en.json";
import type { Locale } from "@/i18n/config";

export type Dictionary = typeof enDictionary;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
