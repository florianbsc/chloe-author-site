"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Button from "@/app/src/components/ui/Button";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="border-b bg-white relative">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        <Link href="/" className="text-xl font-semibold">
          LOGO
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center">
          <Button>
            <Link href={"/src/about"}>
            À propos</Link>
          </Button>

          <Button>
            <Link href={"/src/actualites"}>Actualités</Link>
          </Button>

          <Button>
            <Link href={"/src/books"}>Mes Romans</Link>
          </Button>
        </nav>

        {/* Burger Button (mobile only) */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b shadow-md transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col p-4 gap-4">
          <Link href="/src/about" onClick={closeMenu} className="hover:text-gray-600">
            À propos
          </Link>

          <Link href="/src/actualites" onClick={closeMenu} className="hover:text-gray-600">
            Actualités
          </Link>

          <Link href="/src/books" onClick={closeMenu} className="hover:text-gray-600">
            Mes Romans
          </Link>
        </nav>
      </div>
    </header>
  );
}