"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import CartPanel from "@/app/components/cart-panel";
import { useCart } from "@/app/lib/store/cart";
import Image from "next/image";
import { clsx } from 'clsx';

export default function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/" || pathname === "/en" || pathname === "/es";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const cart = useCart();

  const toggleLocale = () => {
    const newLocale = locale === "es" ? "en" : "es";
    const newPath = `/${newLocale}${pathname.replace(/^\/(en|es)/, "") || "/"}`;
    router.replace(newPath);
  };

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const links = [
    { text: t("home"), href: "/" },
    { text: t("about"), href: "/#about" },
    { text: t("dive"), href: "/map" },
    { text: t("store"), href: "/shop" },
    { text: t("register"), href: "/auth/sign-up" },
    { text: t("expo"), href: "/#expo" },
    { text: t("contact"), href: "/#contact" },
  ];

  return (
    <>
      <nav
        className={clsx(
          "fixed z-50 transition-all duration-300 px-4 w-full md:w-auto max-w-7xl mx-auto",
          {
            // Home & not scrolled = bottom nav
            "md:bottom-4 left-1/2 -translate-x-1/2":
              isHome && !scrolled,
            // Scrolled or not home = top nav
            "top-0 left-0 bg-white/10 backdrop-blur-md rounded-full shadow-md": !isHome || scrolled,
          }
        )}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          {(scrolled || !isHome) && (
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Dive VZLA"
              className="h-8 w-auto"
              width={50}
              height={50}
            />
            <span
              className={`text-lg font-bold transition-colors duration-300 ${
                scrolled ? "text-blue-900" : "text-white"
              }`}
            >
              
            </span>
          </Link>
          )}

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-4 items-center font-semibold text-sm md:text-base">
            {links.map((link, idx) => (
              <li key={idx} className="flex items-center">
                <Link
                  href={link.href}
                  className={`hover:text-[#eaff00] transition-colors duration-300 ${
                    scrolled ? "text-blue-900" : "text-white"
                  }`}
                >
                  {link.text}
                </Link>
                {idx < links.length - 1 && (
                  <span className="ml-2 text-[#eaff00] hidden sm:inline">
                    |
                  </span>
                )}
              </li>
            ))}

            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              className={`ml-4 border px-3 py-1 rounded-full text-sm transition ${
                scrolled
                  ? "text-blue-900 border-blue-900 hover:bg-blue-900 hover:text-white"
                  : "text-white border-white hover:bg-white hover:text-blue-900"
              }`}
            >
              {locale === "es" ? "EN" : "ES"}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className={`relative ml-4 transition ${
                scrolled ? "text-blue-900" : "text-white"
              }`}
            >
              <ShoppingCart size={24} className="hover:stroke-[#eaff00]"/>
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-2 text-xs bg-[#eaff00] text-black rounded-full px-1">
                  {cart.items.length}
                </span>
              )}
            </button>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition ${
              scrolled ? "text-blue-900" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Slide-Down Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow">
            <ul className="flex flex-col px-4 py-3 space-y-2 font-semibold text-blue-900">
              {links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-[#eaff00]"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}

              <li>
                <button
                  onClick={() => {
                    toggleLocale();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left mt-2 hover:text-[#eaff00]"
                >
                  {locale === "es" ? "English" : "Español"}
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    setCartOpen(true);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-2 mt-2"
                >
                  <ShoppingCart size={20} />
                  {t("cart")}
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Cart Panel */}
      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

/* import {useTranslations} from 'next-intl';
import Link from 'next/link';

export default function Navbar() {
  const t = useTranslations('navbar');

  const links = [
    {
      text: t('home'),
      href: "#"
    },
    {
      text: t('about'),
      href: "#"
    },
    {
      text: t('dive'),
      href: "/map"
    },
    {
      text: t('store'),
      href: "/shop"
    },
    {
      text: t('register'),
      href: "/auth/sign-up"
    },
    {
      text: t('expo'),
      href: "#"
    },
    {
      text: t('contact'),
      href: "#"
    }
  ]


  return (
    <nav className="bg-transparent absolute bottom-10 w-full z-10">
      <ul className="flex justify-center flex-wrap gap-4 text-white font-semibold text-sm md:text-base">
        {links.map((value, idx) => (
          <li key={idx} className="flex items-center">
            <Link href={value.href} className="hover:text-[#eaff00]">
              {value.text}
            </Link>
            {idx < 6 && <span className="ml-2 text-[#eaff00]">|</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
} */
