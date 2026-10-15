"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@stellar/design-system";

export type Partner = { name: string; tagline: string; logo: string; href: string };

/** Ramps partner carousel: 6 cards, 3 visible on desktop, scroll-snap with prev/next and pagination (Figma 1836:6016). */
export function PartnerCarousel({ partners }: { partners: Partner[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const perPage = Math.max(1, Math.round(el.clientWidth / (el.firstElementChild?.clientWidth || el.clientWidth)));
      setPages(Math.ceil(partners.length / perPage));
      setPage(Math.round(el.scrollLeft / el.clientWidth));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", update); ro.disconnect(); };
  }, [partners.length]);

  const go = (p: number) => { const el = track.current; if (!el) return; el.scrollTo({ left: p * el.clientWidth, behavior: "smooth" }); };

  return (
    <div className="carousel">
      <ul ref={track} className="carousel__track nav-list" aria-label="Ramp partners">
        {partners.map((c) => (
          <li key={c.name} className="carousel__item">
            <a href={c.href} className="ramp-card" target="_blank" rel="noreferrer">
              <div className="ramp-card__top">
                <Image src={c.logo} alt="" width={40} height={40} className="ramp-card__logo" />
                <Icon.ArrowUpRight width={16} height={16} aria-hidden className="ramp-card__ext" />
              </div>
              <div className="ramp-card__copy">
                <h3 className="ramp-card__title">{c.name}</h3>
                <p className="ramp-card__body">{c.tagline}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="carousel__controls">
        <button type="button" className="carousel__arrow" aria-label="Previous partners" disabled={page === 0} onClick={() => go(page - 1)}><Icon.ArrowLeft width={16} height={16} aria-hidden /></button>
        <button type="button" className="carousel__arrow" aria-label="Next partners" disabled={page >= pages - 1} onClick={() => go(page + 1)}><Icon.ArrowRight width={16} height={16} aria-hidden /></button>
        <div className="carousel__dots" role="tablist" aria-label="Partner pages">
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} type="button" role="tab" className="carousel__dot" aria-current={i === page} aria-label={`Page ${i + 1}`} onClick={() => go(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}
