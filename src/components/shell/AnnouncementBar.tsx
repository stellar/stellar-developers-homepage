import Link from "next/link";

// 10/09 deck does not include this bar. Kept per V6; cut by deleting it from layout.tsx.
export function AnnouncementBar() {
  return (
    <div className="w-full h-10 flex items-center justify-center text-[14px] leading-[18px]"
         style={{ background: "var(--sds-clr-lilac-03)", color: "var(--sds-clr-gray-12)" }}>
      <p className="px-4 text-center">
        <span>[Announcement] One-line release or preview note</span>
        <Link href="#" className="ml-2 underline underline-offset-2" style={{ color: "var(--sds-clr-lilac-11)" }}>
          Read more →
        </Link>
      </p>
    </div>
  );
}
