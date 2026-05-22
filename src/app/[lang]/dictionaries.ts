import "server-only";
import type { Locale } from "@/i18n/config";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
} satisfies Record<Locale, () => Promise<unknown>>;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
