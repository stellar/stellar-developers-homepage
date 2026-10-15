import type { Metadata } from "next";
import { Inter, Inconsolata } from "next/font/google";
import "@stellar/design-system/build/styles.min.css";
import "./globals.css";
import { AnnouncementBar } from "@/components/shell/AnnouncementBar";
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
    <html lang="en" className={`sds-theme-light ${inter.variable} ${inconsolata.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">Skip to content</a>
        <AnnouncementBar />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
