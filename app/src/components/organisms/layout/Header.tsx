"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

const PRIMARY_LINKS = [
  { href: "/about", label: "À propos" },
  { href: "/actualites", label: "Actualités" },
];

const ROMAN_LINKS = [
  { href: "/romans", label: "Les secrets de Clara" },
  { href: "/romans", label: "Mon éternel combat" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRomansMenuOpen, setIsRomansMenuOpen] = useState(false);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function closeAllMenus() {
    setIsMobileMenuOpen(false);
    setIsRomansMenuOpen(false);
  }

  return (
    <header className="relative z-50 bg-surface-mint">
      <div className="mx-auto flex w-full items-center justify-between gap-6 px-5 py-3 md:px-8 lg:px-16">
        <div className="hidden min-h-px min-w-px flex-1 items-center lg:flex">
          <nav className="flex items-center gap-8 text-base-custom leading-body text-ink">
            {PRIMARY_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setIsRomansMenuOpen(true)}
              onMouseLeave={() => setIsRomansMenuOpen(false)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1"
                aria-haspopup="menu"
                aria-expanded={isRomansMenuOpen}
                onClick={() => setIsRomansMenuOpen((prev) => !prev)}
              >
                Mes romans
                <ChevronDown
                  aria-hidden="true"
                  className={`size-5 transition-transform ${
                    isRomansMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isRomansMenuOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-full mt-2 w-[222px] rounded-lg border border-border-soft bg-surface-mint p-6"
                >
                  <div className="flex flex-col gap-4 text-base-custom leading-body text-ink">
                    {ROMAN_LINKS.map((roman) => (
                      <Link
                        key={roman.label}
                        href={roman.href}
                        role="menuitem"
                        onClick={() => setIsRomansMenuOpen(false)}
                      >
                        {roman.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        <Link href="/" className="shrink-0" onClick={closeAllMenus}>
          <Image
            src="/brand/logo-wide.svg"
            alt="Logo Chloé Simart"
            width={84}
            height={36}
            className="h-9 w-[84px]"
          />
        </Link>

        <div className="hidden min-h-px min-w-px flex-1 items-center justify-end lg:flex">
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-[6px] border border-brand bg-brand px-2.5 py-1 text-base-custom font-medium leading-body text-white transition hover:bg-brand-hover"
          >
            Contactez-moi
          </Link>
        </div>

        <div className="flex flex-1 justify-end lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="rounded-md p-2 text-ink hover:bg-black/5"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Ouvrir le menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border-soft bg-surface-mint px-5 py-4 md:px-8"
        >
          <nav className="flex flex-col gap-4 text-base-custom leading-body text-ink">
            {PRIMARY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMobileMenu}>
                {link.label}
              </Link>
            ))}

            <div className="space-y-3">
              <Link href="/romans" onClick={closeMobileMenu}>
                Mes romans
              </Link>
              <div className="pl-4">
                {ROMAN_LINKS.map((roman) => (
                  <Link
                    key={roman.label}
                    href={roman.href}
                    onClick={closeMobileMenu}
                    className="block py-1 text-sm-custom"
                  >
                    {roman.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="mt-2 inline-flex w-full items-center justify-center rounded-[6px] border border-brand bg-brand px-3 py-1.5 text-sm-custom font-medium leading-body text-white"
            >
              Contactez-moi
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
