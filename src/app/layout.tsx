import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Citation Cleaner",
  description: "Browser-local Markdown cleanup for AI chatbot citations and source artifacts."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
