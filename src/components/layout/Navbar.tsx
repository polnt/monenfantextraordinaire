"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatPrice } from "@/lib/currency";
import { R2_IMAGES_BASE } from "@/lib/images";
import CurrencySwitch from "@/components/layout/CurrencySwitch";

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
  { label: "Réseaux", href: "/reseaux" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar(): React.JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [dotsOpen, setDotsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const mobileCartButtonRef = useRef<HTMLButtonElement>(null);
  const mobileCartPanelRef = useRef<HTMLDivElement>(null);

  const { items, totalItems, totalPriceEur, totalPriceXof, removeFromCart, updateQuantity } = useCart();
  const { currency } = useCurrency();

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
      const insideCart =
        (cartRef.current && cartRef.current.contains(e.target as Node)) ||
        (mobileCartButtonRef.current && mobileCartButtonRef.current.contains(e.target as Node)) ||
        (mobileCartPanelRef.current && mobileCartPanelRef.current.contains(e.target as Node));
      if (!insideCart) {
        setCartOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return (): void => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  const closeMenu = (): void => { setMenuOpen(false); setDotsOpen(false); };
  const isDotsActive = dotsLinks.some((l) => pathname === l.href);

  const handleCheckout = (): void => {
    setCartOpen(false);
    router.push("/checkout");
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] h-[72px] bg-white transition-shadow duration-300"
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
            src={`${R2_IMAGES_BASE}/logo-full.png`}
            alt="Mon Enfant Extra-Ordinaire"
            height={44}
            width={194}
            style={{ height: 44, width: "auto" }}
            className="hidden md:block"
            priority
          />
          <Image
            src={`${R2_IMAGES_BASE}/logo.png`}
            alt="Mon Enfant Extra-Ordinaire"
            height={44}
            width={44}
            style={{ height: 44, width: "auto" }}
            className="block md:hidden"
            priority
          />
        </Link>

        {/* Desktop: Nav links + dots + cart + CTA */}
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

          {/* EUR / FCFA currency switcher */}
          <div style={{ marginLeft: 4 }}>
            <CurrencySwitch />
          </div>

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

          {/* Cart icon */}
          <div ref={cartRef} style={{ position: "relative", marginLeft: 4 }}>
            <button
              onClick={() => setCartOpen((v) => !v)}
              title="Mon panier"
              style={{
                background: cartOpen ? "var(--blue-lt)" : "none",
                border: "none",
                width: 36,
                height: 36,
                borderRadius: 8,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                transition: "all 0.2s",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={cartOpen ? "var(--blue)" : "var(--gray)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && (
                <span style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  background: "var(--blue)",
                  color: "white",
                  borderRadius: "50%",
                  width: 16,
                  height: 16,
                  fontSize: 10,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-nunito)",
                  lineHeight: 1,
                }}>
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {/* Mini-cart dropdown */}
            {cartOpen && (
              <div style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                background: "white",
                borderRadius: 16,
                boxShadow: "0 12px 40px rgba(9,9,67,0.14)",
                padding: 16,
                minWidth: 320,
                maxWidth: 360,
                zIndex: 2000,
                animation: "mefFadeUp 0.2s ease both",
              }}>
                {items.length === 0 ? (
                  <div style={{ padding: "16px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>🛒</div>
                    <p style={{ fontFamily: "var(--font-nunito)", fontSize: 14, color: "var(--gray)", margin: 0 }}>
                      Votre panier est vide
                    </p>
                  </div>
                ) : (
                  <>
                    <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 14, color: "#090943", marginBottom: 12 }}>
                      Mon panier
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                      {items.map((item) => (
                        <div key={item.productId} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#fafbff", borderRadius: 10, border: "1px solid #f0f0f8" }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 13, color: "#090943", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {item.name}
                            </p>
                            <p style={{ fontFamily: "var(--font-nunito)", fontSize: 12, color: "var(--gray)", margin: "2px 0 0" }}>
                              {formatPrice(item.priceEur, item.priceXof, currency)}
                            </p>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              style={{ width: 22, height: 22, borderRadius: 6, border: "1px solid #e5e7eb", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#090943" }}
                            >−</button>
                            <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 13, minWidth: 16, textAlign: "center" }}>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              style={{ width: 22, height: 22, borderRadius: 6, border: "1px solid #e5e7eb", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#090943" }}
                            >+</button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            title="Supprimer"
                            style={{ width: 24, height: 24, borderRadius: 6, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontSize: 16, flexShrink: 0 }}
                          >×</button>
                        </div>
                      ))}
                    </div>
                    <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 12, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 13, color: "var(--gray)" }}>Total</span>
                      <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: 16, color: "#090943" }}>{formatPrice(totalPriceEur, totalPriceXof, currency)}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="mef-btn mef-btn-blue"
                      style={{ width: "100%", justifyContent: "center", fontSize: 14, padding: "12px 20px" }}
                    >
                      Commander →
                    </button>
                  </>
                )}
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
            Mon espace formation
          </a>
        </div>

        {/* Mobile: cart icon + CTA + hamburger */}
        <div ref={menuRef} className="mef-hamburger" style={{ gap: 8 }}>
          {/* Mobile cart icon */}
          <button
            ref={mobileCartButtonRef}
            onClick={() => { setCartOpen((v) => !v); setMenuOpen(false); }}
            title="Mon panier"
            style={{
              background: "none",
              border: "none",
              width: 36,
              height: 36,
              borderRadius: 8,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gray)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span style={{
                position: "absolute",
                top: 2,
                right: 2,
                background: "var(--blue)",
                color: "white",
                borderRadius: "50%",
                width: 16,
                height: 16,
                fontSize: 10,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-nunito)",
                lineHeight: 1,
              }}>
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>

          <a
            href={`${process.env.NEXT_PUBLIC_MOODLE_BASE_URL}/login/index.php`}
            target="_blank"
            rel="noopener noreferrer"
            className="mef-btn mef-btn-blue"
            style={{ padding: "9px 14px", fontSize: 13 }}
            onClick={closeMenu}
          >
            Ma formation
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
        <div className="mef-mobile-divider" />
        <div
          className="mef-mobile-link"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <span>Devise</span>
          <CurrencySwitch />
        </div>
      </div>

      {/* Mobile mini-cart (below navbar, fixed) */}
      {cartOpen && (
        <div ref={mobileCartPanelRef} className="flex flex-col md:hidden" style={{
          position: "fixed",
          top: 72,
          left: 0,
          right: 0,
          background: "white",
          boxShadow: "0 8px 32px rgba(9,9,67,0.12)",
          padding: 16,
          zIndex: 1999,
          gap: 12,
        }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <p style={{ fontFamily: "var(--font-nunito)", fontSize: 14, color: "var(--gray)", margin: 0 }}>
                🛒 Votre panier est vide
              </p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.productId} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#fafbff", borderRadius: 10, border: "1px solid #f0f0f8" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 13, color: "#090943", margin: 0 }}>{item.name}</p>
                    <p style={{ fontFamily: "var(--font-nunito)", fontSize: 12, color: "var(--gray)", margin: "2px 0 0" }}>{formatPrice(item.priceEur, item.priceXof, currency)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 20 }}
                  >×</button>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f3f4f6", paddingTop: 8 }}>
                <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 14, color: "var(--gray)" }}>Total</span>
                <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: 16, color: "#090943" }}>{formatPrice(totalPriceEur, totalPriceXof, currency)}</span>
              </div>
              <button onClick={handleCheckout} className="mef-btn mef-btn-blue" style={{ width: "100%", justifyContent: "center" }}>
                Commander →
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
