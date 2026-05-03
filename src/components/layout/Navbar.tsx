"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const mainLinks = [
  { label: "Accueil", href: "/" },
  { label: "Comprendre", href: "/comprendre" },
  { label: "Aider", href: "/aider" },
  { label: "Outils", href: "/outils" },
  { label: "Ressources", href: "/ressources" },
  { label: "Formations", href: "/formations" },
];

const dotsLinks = [
  { label: "Le site", href: "/le-site" },
  { label: "Qui suis-je ?", href: "/qui-suis-je" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar(): React.JSX.Element {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dotsOpen, setDotsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
    const onScroll = (): void => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    const onClickOutside = (e: MouseEvent): void => {
      if (dotsRef.current && !dotsRef.current.contains(e.target as Node)) {
        setDotsOpen(false);
      }
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        drawerRef.current && !drawerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return (): void => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  // Close mobile menu on navigation
  const closeMenu = (): void => { setMenuOpen(false); setDotsOpen(false); };

  const isDotsActive = dotsLinks.some((l) => pathname === l.href);

  return (
    <nav
      className="fixed top-9 left-0 right-0 z-[1000] h-[72px] bg-white transition-shadow duration-300"
      style={{
        boxShadow: scrolled
          ? "0 2px 28px rgba(9,9,67,0.1)"
          : "0 1px 0 rgba(9,9,67,0.06)",
      }}
    >
      <div className="mef-container h-full flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 no-underline" onClick={closeMenu}>
          <Image
            src="/logo-full.png"
            alt="Mon Enfant Extra-Ordinaire"
            height={44}
            width={200}
            style={{ height: 44, width: "auto" }}
            className="hidden md:block"
            priority
          />
          <Image
            src="/logo.png"
            alt="Mon Enfant Extra-Ordinaire"
            height={44}
            width={44}
            style={{ height: 44, width: "auto" }}
            className="block md:hidden"
            priority
          />
        </Link>

        {/* Desktop: Nav links + dots + CTA */}
        <div className="mef-nav-desktop" style={{ gap: 2 }}>
          {mainLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "8px 13px",
                  borderRadius: 8,
                  fontFamily: "var(--font-nunito, 'Nunito', sans-serif)",
                  fontWeight: 600,
                  fontSize: 14,
                  color: isActive ? "var(--blue)" : "var(--gray)",
                  borderBottom: isActive
                    ? "2px solid var(--blue)"
                    : "2px solid transparent",
                  transition: "color 0.2s",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* ⋮ dots dropdown */}
          <div ref={dotsRef} style={{ position: "relative", marginLeft: 4 }}>
            <button
              onClick={() => setDotsOpen((v) => !v)}
              title="À propos"
              style={{
                background: dotsOpen || isDotsActive ? "var(--blue-lt)" : "none",
                border: "none",
                width: 36,
                height: 36,
                borderRadius: 8,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: dotsOpen || isDotsActive ? "var(--blue)" : "var(--gray)",
                fontSize: 20,
                letterSpacing: 1,
                fontWeight: 700,
                transition: "all 0.2s",
              }}
            >
              ⋮
            </button>

            {dotsOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "white",
                  borderRadius: 16,
                  boxShadow: "0 12px 40px rgba(9,9,67,0.14)",
                  padding: 8,
                  minWidth: 240,
                  zIndex: 2000,
                  animation: "mefFadeUp 0.2s ease both",
                }}
              >
                {dotsLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setDotsOpen(false)}
                    onMouseEnter={() => setHoveredHref(link.href)}
                    onMouseLeave={() => setHoveredHref(null)}
                    style={{
                      display: "block",
                      padding: "10px 16px",
                      borderRadius: 10,
                      fontFamily: "var(--font-nunito, 'Nunito', sans-serif)",
                      fontSize: 14,
                      fontWeight: 600,
                      color: hoveredHref === link.href ? "var(--blue)" : "var(--gray)",
                      background: hoveredHref === link.href ? "var(--blue-lt)" : "none",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <a
            href={`${process.env.NEXT_PUBLIC_MOODLE_BASE_URL}/login/index.php`}
            target="_blank"
            rel="noopener noreferrer"
            className="mef-btn mef-btn-blue"
            style={{ marginLeft: 10, padding: "9px 18px", fontSize: 13 }}
          >
            Accéder à Moodle
          </a>
        </div>

        {/* Mobile: CTA + hamburger */}
        <div ref={menuRef} className="mef-hamburger">
          <a
            href={`${process.env.NEXT_PUBLIC_MOODLE_BASE_URL}/login/index.php`}
            target="_blank"
            rel="noopener noreferrer"
            className="mef-btn mef-btn-blue"
            style={{ padding: "9px 14px", fontSize: 13 }}
            onClick={closeMenu}
          >
            Moodle
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            style={{
              background: menuOpen ? "var(--blue-lt)" : "none",
              border: "none",
              width: 40,
              height: 40,
              borderRadius: 10,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              transition: "background 0.2s",
            }}
          >
            <span style={{ display: "block", width: 20, height: 2, background: menuOpen ? "var(--blue)" : "var(--navy)", borderRadius: 2, transition: "all 0.25s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ display: "block", width: 20, height: 2, background: menuOpen ? "var(--blue)" : "var(--navy)", borderRadius: 2, transition: "all 0.25s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 20, height: 2, background: menuOpen ? "var(--blue)" : "var(--navy)", borderRadius: 2, transition: "all 0.25s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div ref={drawerRef} className={`mef-mobile-menu${menuOpen ? " open" : ""}`}>
        {mainLinks.map((link) => {
          const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`mef-mobile-link${isActive ? " active" : ""}`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          );
        })}
        <div className="mef-mobile-divider" />
        {dotsLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`mef-mobile-link${isActive ? " active" : ""}`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
