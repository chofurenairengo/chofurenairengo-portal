import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "調布恋AI連合 | ポータル",
  description: "renai と emotion-readar を紹介する調布恋AI連合のポータル",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
