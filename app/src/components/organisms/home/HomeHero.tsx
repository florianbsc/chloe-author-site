import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import HeroActions from "@/app/src/components/molecules/HeroActions";

export default function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-surface-mint"
    >
      <div className="flex w-full flex-col lg:min-h-[720px] lg:flex-row">
        <div className="w-full px-5 py-16 lg:flex lg:min-h-[720px] lg:flex-1 lg:items-center lg:py-0 lg:pl-16 lg:pr-20">
          <div className="w-full max-w-[560px] space-y-6 lg:space-y-8">
            <div className="space-y-5 text-ink lg:space-y-6">
              <h1
                id="home-hero-title"
                className="text-[3rem] font-bold leading-[1.1] tracking-[0.01em] lg:text-[5.25rem]"
              >
                Chloé Simart
              </h1>
              <p className="text-[0.875rem] leading-[1.6] lg:text-[1.25rem]">
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
