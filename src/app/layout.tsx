import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slate — The internet, remembered",
  description:
    "A calm buffer between browsing and forgetting. Save anything in one keystroke. Rediscover it naturally, when it matters again.",
};

// Resolve theme before first paint so the page never flashes the wrong palette.
const themeBootstrap = `
(function(){try{
  var stored = localStorage.getItem('slate-theme');
  var theme = (stored === 'light' || stored === 'dark') ? stored
    : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
}catch(e){
  document.documentElement.setAttribute('data-theme', 'light');
}})();
`.trim();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
