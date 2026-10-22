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

// GA4 property "developers.Stellar.org" (same as the docs and the USDT0 page). Set NEXT_PUBLIC_GA_ID="" to disable.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-ZCT4GYX8KN";
// OneTrust cookie consent, same setup as stellar.org. Unset = no banner and no Cookie settings link.
const ONETRUST_ID = process.env.NEXT_PUBLIC_ONETRUST_DOMAIN_SCRIPT_ID ?? "";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`sds-theme-light ${inter.variable} ${inconsolata.variable} h-full antialiased`}>
      <head>
        {/* Apply the saved appearance before first paint (System / Light / Dark). */}
        <Script id="theme-init" strategy="beforeInteractive">{`(function(){try{var p=localStorage.getItem('theme')||'system';var d=p==='dark'||(p==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);var e=document.documentElement;e.classList.toggle('sds-theme-dark',d);e.classList.toggle('sds-theme-light',!d);e.setAttribute('data-theme',d?'dark':'light');e.style.colorScheme=d?'dark':'light';}catch(e){}})();`}</Script>
        {ONETRUST_ID ? (
          <>
            <Script id="onetrust-stub" src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js" strategy="beforeInteractive" data-domain-script={ONETRUST_ID} />
            <Script id="onetrust-wrapper" strategy="beforeInteractive">{`function OptanonWrapper(){}`}</Script>
          </>
        ) : null}
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">Skip to content</a>
        {/* Announcement bar hidden for now (not in the 10/09 deck). Re-enable by rendering <AnnouncementBar /> here. */}
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}</Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
