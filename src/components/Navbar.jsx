"use client";

import ContactButton from "./ContactButton";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function NavArrow({ diagonal = false }) {
  const [width, height, , , path] = faArrowRight.icon;

  return (
    <svg width="1em" height="1em" viewBox={`0 0 ${width} ${height}`} fill="currentColor" aria-hidden="true" focusable="false" style={{ verticalAlign: "-0.125em", transform: diagonal ? "rotate(-45deg)" : undefined }}>
      <path d={path} />
    </svg>
  );
}

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Testimonials", href: "/#testimonials" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuToggleRef = useRef(null);

  useEffect(() => {
    let scrolled = window.scrollY > 16;
    let frame = window.requestAnimationFrame(() => {
      frame = null;
      setIsScrolled(scrolled);
    });

    const onScroll = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        // Separate thresholds prevent flickering around the scroll boundary.
        const next = scrolled ? window.scrollY > 8 : window.scrollY > 24;
        if (next !== scrolled) {
          scrolled = next;
          setIsScrolled(next);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const desktop = window.matchMedia("(min-width: 921px)");
    const closeOnDesktop = (event) => {
      if (event.matches) setIsMenuOpen(false);
    };
    const closeOnOutsideClick = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header ref={headerRef} className="site-header">
      <nav
        className={`nav-shell ${isScrolled ? "nav-shell-scrolled" : ""} ${
          isMenuOpen ? "nav-shell-menu-open" : ""
        }`}
      >
        <Link href="/" className="brand-mark" aria-label="ASI Solutions home" onClick={closeMenu}>
          <Image
            className="brand-logo"
            src="/imeges/ASI.webp"
            alt="ASI Solutions"
            width={879}
            height={348}
            sizes="(max-width: 640px) 112px, 128px"
            priority
          />
        </Link>

        <div className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </div>

        <ContactButton className="nav-cta">
          Let&apos;s Talk
          <span className="nav-cta-arrow" aria-hidden="true">
            <NavArrow />
          </span>
        </ContactButton>

        <button
          ref={menuToggleRef}
          type="button"
          className={`mobile-menu-toggle ${isMenuOpen ? "mobile-menu-toggle-open" : ""}`}
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          id="mobile-navigation"
          className={`mobile-nav-panel ${isMenuOpen ? "mobile-nav-panel-open" : ""}`}
          aria-hidden={!isMenuOpen}
          inert={!isMenuOpen}
        >
          <div className="mobile-nav-panel-inner">
            <div className="mobile-nav-links">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={closeMenu}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                  <span aria-hidden="true"><NavArrow diagonal /></span>
                </Link>
              ))}
            </div>

            <ContactButton
              className="mobile-nav-cta"
              onClick={closeMenu}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Let&apos;s Talk
              <span aria-hidden="true"><NavArrow /></span>
            </ContactButton>
          </div>
        </div>
      </nav>
    </header>
  );
}
