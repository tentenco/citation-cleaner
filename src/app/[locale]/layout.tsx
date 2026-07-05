import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Figtree, Roboto_Mono } from "next/font/google";
import "../globals.css";
import { isLocale, locales, localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans"
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: "#0b57d0"
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    icons: {
      icon: "/icon.svg"
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  return (
    <html lang={typedLocale} dir={localeMeta[typedLocale].dir}>
      <body className={`${figtree.variable} ${robotoMono.variable}`}>{children}</body>
    </html>
  );
}
