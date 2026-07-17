import type { Locale } from "@/i18n/config";

/** The kind of change, used for the coloured badge next to each line. */
export type ChangeType = "added" | "fixed" | "improved" | "changed";

export type Change = {
  type: ChangeType;
  text: string;
};

/** A single minor release, collapsed by default in the UI. */
export type MinorRelease = {
  /** Display version, e.g. "1.6". */
  version: string;
  /** ISO date (UTC) the release shipped. */
  date: string;
  /** One-line headline shown in the collapsed row. */
  title: string;
  changes: Change[];
};

/** A major release groups the minor releases shipped under it. */
export type MajorRelease = {
  /** Display major number, e.g. "2". */
  major: string;
  headline: string;
  summary: string;
  /** Newest minor release first. */
  minors: MinorRelease[];
};

/**
 * The changelog, newest major first and newest minor first within each major.
 * Content is authored once here (language-neutral); the page chrome is
 * translated via {@link changelogText}. Append a new entry on every release.
 */
export const changelog: MajorRelease[] = [
  {
    major: "3",
    headline: "Citation Fingerprint",
    summary: "Evidence-based source detection keeps Auto cleanup precise and explainable.",
    minors: [
      {
        version: "3.0",
        date: "2026-07-18",
        title: "Provider detection with an audit trail",
        changes: [
          {
            type: "added",
            text: "Detect provider-specific export signatures locally and report the confidence and matching evidence."
          },
          {
            type: "improved",
            text: "Auto mode now runs provider-only rules only when the source fingerprint supports them."
          },
          {
            type: "added",
            text: "Expose the same provider fingerprint in the public API response for reproducible integrations."
          }
        ]
      }
    ]
  },
  {
    major: "2",
    headline: "Provider-aware cleanup",
    summary: "Cleanup rules that understand where the pasted text came from.",
    minors: [
      {
        version: "2.0",
        date: "2026-07-05",
        title: "Perplexity export artifacts",
        changes: [
          {
            type: "added",
            text: "Strip the Perplexity logo image, the centered ⁂ divider, and hidden citation spans."
          },
          {
            type: "improved",
            text: "Footnote and inline-citation matchers now catch Perplexity's group-prefixed IDs such as [^4_1]."
          },
          {
            type: "added",
            text: "Perplexity-only rules run automatically under the default Auto provider."
          }
        ]
      }
    ]
  },
  {
    major: "1",
    headline: "Launch",
    summary: "The first public build: a fast, private, browser-local cleaner.",
    minors: [
      {
        version: "1.7",
        date: "2026-06-11",
        title: "Extension becomes a thin launcher",
        changes: [
          {
            type: "changed",
            text: "The Chrome extension now opens the web app with your selection instead of bundling its own copy of the cleaner."
          }
        ]
      },
      {
        version: "1.6",
        date: "2026-06-11",
        title: "Line-break handling",
        changes: [
          { type: "added", text: "Convert literal \\n escape sequences into real paragraph breaks." },
          { type: "fixed", text: "Inline diff no longer marks CJK text as removed around \\n escapes." },
          { type: "fixed", text: "Render real paragraph breaks in the inline diff for \\n escapes." }
        ]
      },
      {
        version: "1.5",
        date: "2026-05-31",
        title: "Chrome extension",
        changes: [
          { type: "added", text: "MV3 Chrome extension that reuses the same on-device cleaner." }
        ]
      },
      {
        version: "1.4",
        date: "2026-05-31",
        title: "Analysis & sharing",
        changes: [
          { type: "added", text: "AI-ness analysis score with the detected tells that drive it." },
          { type: "added", text: "Share card, live clean-as-you-type, and a public cleaning API." }
        ]
      },
      {
        version: "1.3",
        date: "2026-05-31",
        title: "Multilingual UI",
        changes: [
          { type: "added", text: "Nine-language interface with automatic browser-locale detection." }
        ]
      },
      {
        version: "1.2",
        date: "2026-05-30",
        title: "Design system",
        changes: [{ type: "changed", text: "Apply the Design.md UI system across the app." }]
      },
      {
        version: "1.1",
        date: "2026-05-30",
        title: "Product UI polish",
        changes: [{ type: "improved", text: "Refined the citation-cleaner product UI." }]
      },
      {
        version: "1.0",
        date: "2026-05-30",
        title: "First release",
        changes: [
          {
            type: "added",
            text: "Browser-local citation cleaner: paste Markdown, get clean Markdown, nothing leaves your device."
          }
        ]
      }
    ]
  }
];

export type ChangelogText = {
  /** Label for the nav link that points at this page. */
  nav: string;
  eyebrow: string;
  title: string;
  intro: string;
  latest: string;
  majorLabel: string;
  /** Singular/plural forms, each with a {n} placeholder for the count. */
  updates: { one: string; other: string };
  types: Record<ChangeType, string>;
  back: string;
};

/** Page chrome translated per locale. Entry content stays in {@link changelog}. */
export const changelogText: Record<Locale, ChangelogText> = {
  en: {
    nav: "Changelog",
    eyebrow: "Changelog",
    title: "What's new",
    intro: "Every update to Citation Cleaner, newest first.",
    latest: "Latest",
    majorLabel: "Major update",
    updates: { one: "{n} update", other: "{n} updates" },
    types: { added: "Added", fixed: "Fixed", improved: "Improved", changed: "Changed" },
    back: "Back to cleaner"
  },
  es: {
    nav: "Cambios",
    eyebrow: "Registro de cambios",
    title: "Novedades",
    intro: "Cada actualización de Citation Cleaner, la más reciente primero.",
    latest: "Reciente",
    majorLabel: "Actualización mayor",
    updates: { one: "{n} actualización", other: "{n} actualizaciones" },
    types: { added: "Añadido", fixed: "Corregido", improved: "Mejorado", changed: "Cambiado" },
    back: "Volver al limpiador"
  },
  fr: {
    nav: "Journal",
    eyebrow: "Journal des modifications",
    title: "Nouveautés",
    intro: "Chaque mise à jour de Citation Cleaner, la plus récente en premier.",
    latest: "Récent",
    majorLabel: "Mise à jour majeure",
    updates: { one: "{n} mise à jour", other: "{n} mises à jour" },
    types: { added: "Ajouté", fixed: "Corrigé", improved: "Amélioré", changed: "Modifié" },
    back: "Retour au nettoyeur"
  },
  de: {
    nav: "Änderungen",
    eyebrow: "Änderungsprotokoll",
    title: "Neuigkeiten",
    intro: "Jede Aktualisierung von Citation Cleaner, neueste zuerst.",
    latest: "Neu",
    majorLabel: "Großes Update",
    updates: { one: "{n} Update", other: "{n} Updates" },
    types: { added: "Hinzugefügt", fixed: "Behoben", improved: "Verbessert", changed: "Geändert" },
    back: "Zurück zum Bereiniger"
  },
  ja: {
    nav: "変更履歴",
    eyebrow: "変更履歴",
    title: "新着情報",
    intro: "Citation Cleaner のすべての更新（新しい順）。",
    latest: "最新",
    majorLabel: "メジャー更新",
    updates: { one: "{n} 件の更新", other: "{n} 件の更新" },
    types: { added: "追加", fixed: "修正", improved: "改善", changed: "変更" },
    back: "クリーナーに戻る"
  },
  zh: {
    nav: "更新日誌",
    eyebrow: "更新日誌",
    title: "最新變更",
    intro: "Citation Cleaner 的每次更新，最新在前。",
    latest: "最新",
    majorLabel: "重大更新",
    updates: { one: "{n} 項更新", other: "{n} 項更新" },
    types: { added: "新增", fixed: "修正", improved: "優化", changed: "變更" },
    back: "返回清理工具"
  },
  ko: {
    nav: "변경 로그",
    eyebrow: "변경 로그",
    title: "새로운 기능",
    intro: "Citation Cleaner의 모든 업데이트, 최신순.",
    latest: "최신",
    majorLabel: "주요 업데이트",
    updates: { one: "{n}개 업데이트", other: "{n}개 업데이트" },
    types: { added: "추가", fixed: "수정", improved: "개선", changed: "변경" },
    back: "클리너로 돌아가기"
  },
  pt: {
    nav: "Alterações",
    eyebrow: "Registro de alterações",
    title: "Novidades",
    intro: "Cada atualização do Citation Cleaner, a mais recente primeiro.",
    latest: "Recente",
    majorLabel: "Atualização importante",
    updates: { one: "{n} atualização", other: "{n} atualizações" },
    types: { added: "Adicionado", fixed: "Corrigido", improved: "Melhorado", changed: "Alterado" },
    back: "Voltar ao limpador"
  },
  ar: {
    nav: "سجل التغييرات",
    eyebrow: "سجل التغييرات",
    title: "الجديد",
    intro: "كل تحديث لـ Citation Cleaner، الأحدث أولاً.",
    latest: "الأحدث",
    majorLabel: "تحديث كبير",
    updates: { one: "{n} تحديث", other: "{n} تحديثات" },
    types: { added: "إضافة", fixed: "إصلاح", improved: "تحسين", changed: "تغيير" },
    back: "العودة إلى المنظّف"
  }
};
