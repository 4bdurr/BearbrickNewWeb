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

      // Animasi masuk: Stagger meluncur ke atas dan memudar masuk
      tl.fromTo(
        primaryLinksRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
        }
      ).fromTo(
        footerLinksRef.current,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
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
      className="relative z-20 flex h-full w-full flex-col justify-between py-12"
    >
      {/* Primary Centered Menu Links */}
      <nav className="flex flex-1 flex-col items-center justify-center gap-7">
        {PRIMARY_LINKS.map((item, idx) => (
          <a
            key={item.label}
            ref={(el) => (primaryLinksRef.current[idx] = el)}
            href={item.href}
            className="group relative font-mono text-2xl font-black tracking-[0.25em] text-black transition-transform duration-300 hover:scale-105 hover:tracking-[0.3em]"
          >
            <span>{item.label}</span>
            {/* Red Underline Indicator saat hover */}
            <span className="absolute -bottom-1 left-0 h-[2.5px] w-0 bg-[#D61B1F] transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>

      {/* Footer Secondary / Legal Links */}
      <footer className="flex items-center justify-center gap-12">
        {FOOTER_LINKS.map((item, idx) => (
          <a
            key={item.label}
            ref={(el) => (footerLinksRef.current[idx] = el)}
            href={item.href}
            className="group relative font-mono text-xs font-bold tracking-[0.18em] text-black/75 transition-colors hover:text-black"
          >
            <span>{item.label}</span>
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </footer>
    </div>
  );
};

export default MenuView;