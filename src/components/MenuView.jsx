import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PRIMARY_LINKS = [
  { label: "NEW ARRIVAL", href: "#new-arrival" },
  { label: "BE@RTREE", href: "#beartree" },
  { label: "ARCHIVE", href: "#archive" },
  { label: "ONLINE SHOP", href: "#shop" },
  { label: "BLOG", href: "#blog" },
];

const FOOTER_LINKS = [
  { label: "SITE MAP", href: "#sitemap" },
  { label: "PRIVACY POLICY", href: "#privacy" },
  { label: "CONTACT", href: "#contact" },
];

export const MenuView = ({ isOpen }) => {
  const containerRef = useRef(null);
  const primaryLinksRef = useRef([]);
  const footerLinksRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    if (isOpen) {
      const tl = gsap.timeline();

      tl.fromTo(
        primaryLinksRef.current,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.out",
        }
      ).fromTo(
        footerLinksRef.current,
        { y: 8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="relative z-20 flex h-full w-full flex-col items-center justify-between pb-3 md:pb-6 pt-0 py-2 md:py-8"
    >
      {/* Primary Links: pt-0 & leading-none membuat teks langsung menempel tepat di garis atas */}
      <nav className="flex flex-col items-center justify-start gap-3.5 md:gap-5 pt-0 leading-none">
        {PRIMARY_LINKS.map((item, idx) => (
          <a
            key={item.label}
            ref={(el) => (primaryLinksRef.current[idx] = el)}
            href={item.href}
            className="group relative font-mono text-sm md:text-2xl font-black tracking-[0.22em] md:tracking-[0.25em] text-black leading-none transition-transform duration-300 hover:scale-105"
          >
            <span>{item.label}</span>
            <span className="absolute -bottom-1 left-0 h-0.5 md:h-[2.5px] w-0 bg-[#D61B1F] transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>

      {/* Footer Secondary Links: Terkunci di batas bawah */}
      <footer className="mt-auto flex flex-wrap items-center justify-center gap-4 md:gap-10 pt-4">
        {FOOTER_LINKS.map((item, idx) => (
          <a
            key={item.label}
            ref={(el) => (footerLinksRef.current[idx] = el)}
            href={item.href}
            className="group relative font-mono text-[9px] md:text-xs font-bold tracking-[0.14em] md:tracking-[0.18em] text-black/70 leading-none transition-colors hover:text-black"
          >
            <span>{item.label}</span>
            <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </footer>
    </div>
  );
};

export default MenuView;