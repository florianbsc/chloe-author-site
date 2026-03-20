import HeroActions from "@/app/src/components/molecules/HeroActions";

type AboutHeroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export default function AboutHero({
  eyebrow = "Auteure",
  title = "À propos de moi",
  description = "Je suis une auteure française qui écrit des histoires où le handicap n'est pas une limite mais une réalité vivante. Mes romans mettent en lumière des personnages authentiques, des âmes qui se battent et qui aiment, loin des clichés.",
  primaryCta,
  secondaryCta,
}: AboutHeroProps) {
  return (
    <section
      aria-labelledby="about-hero-title"
      className="section-bleed bg-surface-mint"
    >
      <div className="section-wrap-xl py-16 lg:py-28">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
          <div className="flex-1 stack-sm text-ink">
            <p className="text-body font-semibold leading-subtitle">{eyebrow}</p>
            <h1
              id="about-hero-title"
              className="text-h1 leading-tight tracking-title sm:text-8xl-custom lg:text-display"
            >
              {title}
            </h1>
          </div>

          <div className="flex-1 stack-xl text-ink">
            <p className="text-body-lg leading-body lg:text-h5">
              {description}
            </p>
            <HeroActions
              primaryLabel={primaryCta?.label ?? "Découvrir"}
              primaryHref={primaryCta?.href ?? "/about"}
              primaryVariant="primary"
              primaryClassName="border-brand bg-brand text-white hover:border-brand-strong hover:bg-brand-strong"
              secondaryLabel={secondaryCta?.label ?? "Contact"}
              secondaryHref={secondaryCta?.href ?? "/contact"}
              secondaryVariant="third"
              secondaryClassName="border-border-subtle bg-transparent text-ink hover:bg-ink/5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
