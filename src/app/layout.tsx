import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Inconsolata } from "next/font/google";
import "@stellar/design-system/build/styles.min.css";
import "./globals.css";
import { Header } from "@/components/shell/Header";
import { Footer } from "@/components/shell/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const inconsolata = Inconsolata({ variable: "--font-inconsolata", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Stellar Developers",
  description: "Build on better financial infrastructure. Reliable rails, financial building blocks, and an ecosystem connected to where money moves.",
  metadataBase: new URL("https://developers.stellar.org"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`sds-theme-light ${inter.variable} ${inconsolata.variable} h-full antialiased`}>
      <head>
        {/* Apply the saved appearance before first paint (System / Light / Dark). */}
        <Script id="theme-init" strategy="beforeInteractive">{`(function(){try{var p=localStorage.getItem('theme')||'system';var d=p==='dark'||(p==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);var e=document.documentElement;e.classList.toggle('sds-theme-dark',d);e.classList.toggle('sds-theme-light',!d);e.setAttribute('data-theme',d?'dark':'light');e.style.colorScheme=d?'dark':'light';}catch(e){}})();`}</Script>
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">Skip to content</a>
        {/* Announcement bar hidden for now (not in the 10/09 deck). Re-enable by rendering <AnnouncementBar /> here. */}
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
