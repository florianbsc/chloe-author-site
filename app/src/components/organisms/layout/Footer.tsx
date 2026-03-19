import Link from "next/link";
import Image from "next/image";
import Button from "@/app/src/components/atoms/Button";
import Input from "@/app/src/components/atoms/Input";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

type SocialItem = {
  label: string;
  href: string;
  icon: string;
};

const NAVIGATION_LINKS: NavItem[] = [
  { label: "À propos", href: "/about" },
  { label: "Mes romans", href: "/romans" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
  { label: "Amazon", href: "https://amazon.fr", external: true },
];

const CONTACT_LINKS: NavItem[] = [
  { label: "Email", href: "/contact" },
  { label: "Téléphone", href: "/contact" },
  { label: "Adresse", href: "/contact" },
  { label: "Formulaire", href: "/contact" },
  { label: "Partenaires", href: "/contact" },
];

const SOCIAL_LINKS: SocialItem[] = [
  { label: "Facebook", href: "#", icon: "/icons/footer/facebook.svg" },
  { label: "Instagram", href: "#", icon: "/icons/footer/instagram.svg" },
  { label: "Twitter", href: "#", icon: "/icons/footer/twitter.svg" },
  { label: "LinkedIn", href: "#", icon: "/icons/footer/linkedin.svg" },
  { label: "YouTube", href: "#", icon: "/icons/footer/youtube.svg" },
];

const LEGAL_LINKS: NavItem[] = [
  { label: "Politique de confidentialité", href: "/privacy" },
  { label: "Conditions d'utilisation", href: "/terms" },
  { label: "Paramètres de cookies", href: "/cookies" },
];

function FooterLinksColumn({
  title,
  links,
}: {
  title: string;
  links: NavItem[];
}) {
  return (
    <div className="min-w-0 flex-1 space-y-4">
      <h3 className="text-base-custom font-semibold leading-[1.6] text-ink">
        {title}
      </h3>
      <ul>
        {links.map((link) => (
          <li key={link.label} className="py-2">
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm-custom leading-[1.6] text-ink"
              >
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="text-sm-custom leading-[1.6] text-ink">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-surface-ash px-5 py-16 md:px-8 lg:px-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1280px] space-y-16 lg:space-y-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-32">
          <div className="w-full max-w-[500px] space-y-6">
            <Image
              src="/brand/logo-wide.svg"
              alt="Logo Chloé Simart"
              width={84}
              height={36}
              className="h-9 w-[84px]"
            />

            <p className="text-base-custom leading-[1.6] text-ink">
              Recevez les actualités et dates de sortie de mes romans.
            </p>

            <div className="space-y-3">
              <form className="flex w-full flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex min-h-px min-w-px flex-1 items-center py-2">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Votre email
                  </label>
                  <Input
                    id="footer-newsletter-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Votre email"
                    variant="underline"
                    size="md"
                  />
                </div>

                <Button type="submit" variant="secondary" size="sm">
                  S&apos;abonner
                </Button>
              </form>

              <p className="text-xs-custom leading-[1.6] text-ink">
                En vous abonnant, vous acceptez notre politique de confidentialité
                et consentez à recevoir nos communications.
              </p>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-3">
            <FooterLinksColumn title="Navigation" links={NAVIGATION_LINKS} />
            <FooterLinksColumn title="Contact" links={CONTACT_LINKS} />

            <div className="min-w-0 flex-1 space-y-4">
              <h3 className="text-base-custom font-semibold leading-[1.6] text-ink">
                Suivez-moi
              </h3>
              <ul>
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label} className="py-2">
                    <a
                      href={social.href}
                      className="inline-flex items-center gap-3 text-sm-custom leading-[1.6] text-ink"
                    >
                      <Image
                        src={social.icon}
                        alt=""
                        width={24}
                        height={24}
                        aria-hidden="true"
                        className="size-6"
                      />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8 border-t border-border-soft pt-8">
          <div className="flex flex-col gap-4 text-sm-custom leading-[1.6] text-ink lg:flex-row lg:items-center lg:justify-between">
            <p>© 2025 Chloé Simart. Tous droits réservés.</p>

            <div className="flex flex-wrap items-center gap-6">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm-custom leading-[1.6] text-ink underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
