"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header">
      <nav className={`nav-shell ${isScrolled ? "nav-shell-scrolled" : ""}`}>
        <Link href="/" className="brand-mark" aria-label="ASI home">
          <span className="brand-dot" />
          ASI
        </Link>

        <div className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </div>

        <Link href="#contact" className="nav-cta">
          Let&apos;s Talk
          <span className="nav-cta-arrow" aria-hidden="true">
            {"\u2192"}
          </span>
        </Link>
      </nav>
    </header>
  );
}
