// Temporary stand-in while sections are built one by one in V6 order.
export function Placeholder({ id, num, title, height = 480 }: { id: string; num: string; title: string; height?: number }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="container-page py-16">
      <div className="rounded-xl border border-dashed flex items-center justify-center" style={{ minHeight: height, borderColor: "var(--sds-clr-lilac-08)", background: "var(--sds-clr-lilac-02)" }}>
        <h2 id={`${id}-h`} className="text-[14px] font-mono" style={{ color: "var(--sds-clr-lilac-11)" }}>{num} · {title}</h2>
      </div>
    </section>
  );
}
