import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { changelog, changelogText, type ChangelogText } from "@/lib/changelog/data";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typed: Locale = isLocale(locale) ? locale : "en";
  const text = changelogText[typed];
  return {
    title: `${text.title} · ${getDictionary(typed).hero.brand}`,
    description: text.intro
  };
}

function updateCount(count: number, locale: Locale, updates: ChangelogText["updates"]) {
  const form = new Intl.PluralRules(locale).select(count) === "one" ? updates.one : updates.other;
  return form.replace("{n}", String(count));
}

function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  }).format(new Date(iso));
}

/** Chevron that rotates when its parent <details> is open (see globals.css). */
function Caret() {
  return (
    <svg className="cl-caret" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path
        d="M4 6l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function ChangelogPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const text = changelogText[locale];
  const dict = getDictionary(locale);

  return (
    <>
      <a className="skip-link" href="#changelog">
        {dict.skipLink}
      </a>

      <nav className="nav-bar-top" aria-label="Primary">
        <Link className="wordmark" href={`/${locale}`} aria-label={dict.nav.home}>
          CC
        </Link>
        <div className="nav-links" aria-label="Page sections">
          <Link className="nav-link" href={`/${locale}`}>
            {dict.nav.cleaner}
          </Link>
          <span className="nav-link active" aria-current="page">
            {text.nav}
          </span>
        </div>
        <div className="nav-right">
          <LanguageSwitcher locale={locale} label={dict.language.label} />
          <Link className="nav-cta" href={`/${locale}`}>
            {text.back}
          </Link>
        </div>
      </nav>

      <main className="app-shell">
        <header className="cl-header">
          <p className="eyebrow">{text.eyebrow}</p>
          <h1>{text.title}</h1>
          <p className="cl-intro">{text.intro}</p>
        </header>

        <div id="changelog" className="changelog">
          {changelog.map((major, majorIndex) => (
            <section key={major.major} className="cl-major" aria-label={`v${major.major}`}>
              <div className="cl-major-head">
                <span className="cl-major-chip">v{major.major}</span>
                <div className="cl-major-copy">
                  <p className="cl-major-label">{text.majorLabel}</p>
                  <h2>{major.headline}</h2>
                  <p className="cl-major-summary">{major.summary}</p>
                </div>
                <span className="cl-major-count">
                  {updateCount(major.minors.length, locale, text.updates)}
                </span>
              </div>

              <ol className="cl-minors">
                {major.minors.map((minor, minorIndex) => {
                  const isLatest = majorIndex === 0 && minorIndex === 0;
                  return (
                    <li key={minor.version}>
                      <details className="cl-entry">
                        <summary className="cl-entry-summary">
                          <span className="cl-version">v{minor.version}</span>
                          <span className="cl-entry-title">{minor.title}</span>
                          {isLatest ? <span className="cl-latest">{text.latest}</span> : null}
                          <time className="cl-date" dateTime={minor.date}>
                            {formatDate(minor.date, locale)}
                          </time>
                          <Caret />
                        </summary>
                        <ul className="cl-changes">
                          {minor.changes.map((change, changeIndex) => (
                            <li key={changeIndex} className="cl-change">
                              <span className={`cl-type cl-type-${change.type}`}>
                                {text.types[change.type]}
                              </span>
                              <span className="cl-change-text">{change.text}</span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
