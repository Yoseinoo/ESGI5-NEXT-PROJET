// /store/locales.ts
export type LocaleCode = "en" | "fr";

export interface Language {
  code: LocaleCode;
  label: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export const DEFAULT_LOCALE: LocaleCode = "fr";
