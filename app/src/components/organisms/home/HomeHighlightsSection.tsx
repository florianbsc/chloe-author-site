import Link from "next/link";
import {
  Box,
  ChevronRight,
  House,
  PartyPopper,
  Search,
  Triangle,
} from "lucide-react";
import Button from "@/app/src/components/atoms/Button";
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import AboutFeatureItem from "@/app/src/components/molecules/AboutFeatureItem";

const PRIMARY_FEATURES = [
  {
    title: "Sortie octobre",
    description: "Le 29 octobre arrive enfin le moment de la révélation.",
    icon: PartyPopper,
  },
  {
    title: "La Loge des Silences",
    description:
      "Un thriller où chaque silence cache une vérité qui attend d'être découverte.",
    icon: House,
  },
  {
    title: "Extrait exclusif",
    description:
      "Parce que survivre n'était que le début de cette histoire qui change tout.",
    icon: Triangle,
  },
  {
    title: "En savoir plus",
    description: "Découvrez le roman complet et plongez dans ses mystères.",
    icon: Search,
  },
];

const SECONDARY_FEATURES = [
  {
    title: "Short heading here",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    icon: Box,
  },
  {
    title: "Short heading here",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    icon: Box,
  },
];

export default function HomeHighlightsSection() {
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-surface-mint">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 lg:px-16 lg:py-28">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="w-full lg:flex-1">
            <div className="h-[420px] md:h-[560px] lg:h-[720px]">
              <HeroImagePlaceholder />
            </div>
          </div>

          <div className="w-full space-y-8 lg:flex-1">
            <div className="space-y-6 py-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                {PRIMARY_FEATURES.map((feature) => (
                  <AboutFeatureItem
                    key={feature.title}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                {SECONDARY_FEATURES.map((feature, index) => (
                  <AboutFeatureItem
                    key={`${feature.title}-${index}`}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Button
                href="/romans"
                variant="third"
                className="rounded-[6px] border-border-soft px-3 py-1.5 text-[1.125rem] leading-[1.6]"
              >
                Lire
              </Button>

              <Link
                href="/romans"
                className="inline-flex items-center gap-2 text-[1.125rem] font-medium leading-[1.6] text-ink"
              >
                Suite
                <ChevronRight aria-hidden="true" className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
