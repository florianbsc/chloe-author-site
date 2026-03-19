import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import HeroActions from "@/app/src/components/molecules/HeroActions";

export default function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="section-bleed bg-surface-mint"
    >
      <div className="flex w-full flex-col lg:min-h-[720px] lg:flex-row">
        <div className="w-full px-5 py-16 lg:flex lg:min-h-[720px] lg:flex-1 lg:items-center lg:py-0 lg:pl-16 lg:pr-20">
          <div className="w-full max-w-[560px] stack-md lg:space-y-8">
            <div className="space-y-5 text-ink lg:stack-md">
              <h1
                id="home-hero-title"
                className="text-h1 font-bold leading-tight tracking-title lg:text-display"
              >
                Chloé Simart
              </h1>
              <p className="text-sm2-custom leading-body lg:text-h5">
                Une auteure pas comme les autres. Auteure de romans qui touchent
                l&apos;âme.
              </p>
            </div>

            <HeroActions />
          </div>
        </div>

        <div className="h-[721px] min-h-[720px] w-full lg:flex-1">
          <HeroImagePlaceholder />
        </div>
      </div>
    </section>
  );
}
