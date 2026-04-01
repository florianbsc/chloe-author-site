"use client";

import Link from "next/link";
import Button from "@/app/src/components/atoms/Button";

type NavbarProps = {
  isMobile?: boolean;
  onLinkClick?: () => void;
};

const links = [
  { href: "/about", label: "À Propos" },
  { href: "/actualites", label: "Actualités" },
  { href: "/romans", label: "Mes Romans" },
];

export default function Navbar({ isMobile = false, onLinkClick }: NavbarProps) {
  if (isMobile) {
    return (
      <nav className="flex flex-col p-4 gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className="hover:text-ink/70 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden md:flex gap-4 items-center">
      {links.map((link) => (
        <Button key={link.href}>
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </nav>
  );
}