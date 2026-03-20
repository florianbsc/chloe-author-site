import AuthorActions from "@/app/src/components/molecules/AuthorActions";

type HomeAuthorSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export default function HomeAuthorSection({
  eyebrow = "Auteure",
  title = "Une handi-auteure",
  description = "Chloé Simart écrit des histoires où le handicap n'est pas un obstacle mais une part authentique de l'existence. Elle brise les tabous en donnant voix à ceux qu'on oublie souvent.",
  primaryCta,
  secondaryCta,
}: HomeAuthorSectionProps) {
  return (
    <section className="section-bleed bg-surface-ash">
      <div className="section-wrap-xl py-16 lg:py-28">
        <div className="flex w-full flex-col gap-12 text-ink lg:flex-row lg:gap-20">
          <div className="flex flex-1 flex-col gap-4">
            <p className="text-body font-semibold leading-subtitle">{eyebrow}</p>
            <h1 className="text-h1 font-bold leading-tight tracking-title lg:text-display">
              {title}
            </h1>
          </div>

          <div className="flex flex-1 flex-col gap-8">
            <p className="text-body-sm leading-body lg:text-h5">
              {description}
            </p>

            <AuthorActions
              primaryLabel={primaryCta?.label}
              primaryHref={primaryCta?.href}
              secondaryLabel={secondaryCta?.label}
              secondaryHref={secondaryCta?.href}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
