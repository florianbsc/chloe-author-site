import Link from "next/link";
import { Menu } from "lucide-react";
import Button from "@/app/src/components/ui/Button";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          LOGO
        </Link>

        <nav className="hidden md:flex gap-4 items-center">

          <Button href="/about" variant="secondary">
            À propos
          </Button>

          <Button href="/news" variant="secondary">
            Actualités
          </Button>


          <Button href="/books" variant="secondary">
            Mes Romans
          </Button>
        </nav>

        <button className="md:hidden">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}