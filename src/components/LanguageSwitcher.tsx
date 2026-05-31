"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CaretDown } from "@phosphor-icons/react";
import { locales, localeMeta, type Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
  /** Accessible label for the trigger, translated per locale. */
  label: string;
};

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function selectLocale(next: Locale) {
    setOpen(false);
    if (next === locale) {
      return;
    }
    // Persist the choice so the middleware honours it on future visits.
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    router.push(`/${next}`);
  }

  return (
    <div className="lang-switcher" ref={containerRef}>
      <button
        type="button"
        className="lang-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((value) => !value)}
      >
        {localeMeta[locale].abbr}
        <CaretDown aria-hidden="true" size={14} weight="bold" />
      </button>

      {open ? (
        <ul className="lang-menu" role="listbox" aria-label={label}>
          {locales.map((item) => (
            <li key={item}>
              <button
                type="button"
                role="option"
                aria-selected={item === locale}
                className={item === locale ? "lang-option current" : "lang-option"}
                onClick={() => selectLocale(item)}
              >
                <span className="lang-native">{localeMeta[item].native}</span>
                <span className="lang-abbr">{localeMeta[item].abbr}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
