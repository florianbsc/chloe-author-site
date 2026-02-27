import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
// import NewsletterForm from "@/app/src/components/ellements/NewsletterForm";


export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="max-w-md mx-auto px-6 py-10 space-y-10 text-sm text-gray-700">
        
        {/* Logo + Newsletter */}
        {/* <NewsletterForm></NewsletterForm> */}

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Logo</h2>

          <p className="text-gray-600">
            Recevez les actualités et dates de sortie de mes romans.
          </p>

          <div className="space-y-3">
            <input
              type="email"
              placeholder="Votre email"
              className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black"
            />

            <button className="w-full border border-gray-300 rounded-md py-2 font-medium hover:bg-gray-200 transition">
              S&apos;abonner
            </button>

            <p className="text-xs text-gray-500">
              En vous abonnant, vous acceptez notre politique de confidentialité et consentez à recevoir nos communications.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h3 className="font-semibold">Navigation</h3>
          <div className="flex flex-col space-y-2">
            <Link href="/about">À propos</Link>
            <Link href="/books">Mes romans</Link>
            <Link href="/actualites">Actualités</Link>
            <Link href="/contact">Contact</Link>
            <Link href="https://amazon.fr">Amazon</Link>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h3 className="font-semibold">Contact</h3>
          <div className="flex flex-col space-y-2">
            <Link href="#">Email</Link>
            <Link href="#">Téléphone</Link>
            <Link href="#">Adresse</Link>
            <Link href="/contact">Formulaire</Link>
            <Link href="#">Partenaires</Link>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="space-y-3">
          <h3 className="font-semibold">Suivez-moi</h3>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-3">
              <Facebook size={18} />
              <span>Facebook</span>
            </div>
            <div className="flex items-center gap-3">
              <Instagram size={18} />
              <span>Instagram</span>
            </div>
            <div className="flex items-center gap-3">
              <Twitter size={18} />
              <span>Twitter</span>
            </div>
            <div className="flex items-center gap-3">
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </div>
            <div className="flex items-center gap-3">
              <Youtube size={18} />
              <span>YouTube</span>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-300 pt-6 space-y-3 text-xs text-gray-600">
          <div className="flex flex-col space-y-2">
            <Link href="/privacy">Politique de confidentialité</Link>
            <Link href="/terms">Conditions d&apos;utilisation</Link>
            <Link href="/cookies">Paramètres de cookies</Link>
          </div>

          <p className="pt-4">
            © 2025 Chloé Simart. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}