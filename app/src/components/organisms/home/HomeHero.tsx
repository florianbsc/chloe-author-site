import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import HeroActions from "@/app/src/components/molecules/HeroActions";
import Image from "next/image";

type HomeHeroProps = {
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
};

export default function HomeHero({
  title = "Chloé Simart",
  subtitle = "Une auteure pas comme les autres. Auteure de romans qui touchent l'âme.",
  primaryCta,
  secondaryCta,
  image,
  imageAlt,
}: HomeHeroProps) {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="section-bleed bg-surface-mint"
    >
      <div className="flex w-full flex-col hero-split lg:flex-row">
        <div className="w-full px-5 py-16 lg:flex hero-split lg:flex-1 lg:items-center lg:py-0 lg:pl-16 lg:pr-20">
          <div className="w-full max-w-xl stack-md lg:stack-xl">
            <div className="stack-sm text-ink lg:stack-md">
              <h1
                id="home-hero-title"
                className="text-h1 font-bold leading-tight tracking-title lg:text-display"
              >
                {title}
              </h1>
              <p className="text-body-sm leading-body lg:text-h5">
                {subtitle}
              </p>
            </div>

            <HeroActions
              primaryLabel={primaryCta?.label}
              primaryHref={primaryCta?.href}
              secondaryLabel={secondaryCta?.label}
              secondaryHref={secondaryCta?.href}
            />
          </div>
        </div>

        <div className="hero-panel w-full lg:flex-1">
          {image ? (
            <Image
              src={image}
              alt={imageAlt ?? title}
              width={960}
              height={920}
              className="h-full w-full object-cover"
            />
          ) : (
            <HeroImagePlaceholder />
          )}
        </div>
      </div>
    </section>
  );
}
