import { notFound } from "next/navigation";
import { CitationCleaner } from "@/components/CitationCleaner";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function LocalePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return <CitationCleaner locale={locale} dict={getDictionary(locale)} />;
}
