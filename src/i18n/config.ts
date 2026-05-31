export const locales = ["en", "es", "fr", "de", "ja", "zh", "ko", "pt", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export type LocaleMeta = {
  native: string;
  abbr: string;
  dir: "ltr" | "rtl";
};

/** Native name + abbreviation shown in the language switcher, matching the design. */
export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { native: "English", abbr: "EN", dir: "ltr" },
  es: { native: "Español", abbr: "ES", dir: "ltr" },
  fr: { native: "Français", abbr: "FR", dir: "ltr" },
  de: { native: "Deutsch", abbr: "DE", dir: "ltr" },
  ja: { native: "日本語", abbr: "JA", dir: "ltr" },
  zh: { native: "繁體中文", abbr: "ZH", dir: "ltr" },
  ko: { native: "한국어", abbr: "KO", dir: "ltr" },
  pt: { native: "Português", abbr: "PT", dir: "ltr" },
  ar: { native: "العربية", abbr: "AR", dir: "rtl" }
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
