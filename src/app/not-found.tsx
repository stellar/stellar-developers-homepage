import type { Metadata } from "next";
import { ErrorPage } from "@/components/sections/ErrorPage";

export const metadata: Metadata = { title: "Page not found · Stellar Developers", robots: { index: false } };

// Static export writes this to out/404.html; Netlify serves it with a real 404 status.
export default function NotFound() {
  return <ErrorPage code="404" />;
}
