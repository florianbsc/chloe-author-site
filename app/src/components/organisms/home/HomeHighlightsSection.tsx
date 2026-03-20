import Link from "next/link";
import type { ElementType } from "react";
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in peros.",
    icon: Box,
  },
];

type HomeHighlightsSectionProps = {
  primaryFeatures?: Array<Record<string, unknown>>;
  secondaryFeatures?: Array<Record<string, unknown>>;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

const ICONS: Record<string, ElementType> = {
  PartyPopper,
  House,
  Triangle,
  Search,
  Box,
};

export default function HomeHighlightsSection({
  primaryFeatures,
  secondaryFeatures,
  primaryCta,
  secondaryCta,
}: HomeHighlightsSectionProps) {
  const resolvedPrimary =
    primaryFeatures && primaryFeatures.length > 0
      ? primaryFeatures.map((feature) => ({
          title: feature.title as string,
          description: feature.description as string,
          icon: ICONS[feature.icon as string] ?? Box,
        }))
      : PRIMARY_FEATURES;
  const resolvedSecondary =
    secondaryFeatures && secondaryFeatures.length > 0
      ? secondaryFeatures.map((feature) => ({
          title: feature.title as string,
          description: feature.description as string,
          icon: ICONS[feature.icon as string] ?? Box,
        }))
      : SECONDARY_FEATURES;

  return (
    <section className="section-bleed bg-surface-mint">
      <div className="section-wrap-xl py-16 lg:py-28">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="w-full lg:flex-1">
            <div className="hero-media">
              <HeroImagePlaceholder />
            </div>
          </div>

          <div className="w-full stack-xl lg:flex-1">
            <div className="stack-md py-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                {resolvedPrimary.map((feature) => (
                  <AboutFeatureItem
                    key={feature.title}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                {resolvedSecondary.map((feature, index) => (
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
                href={primaryCta?.href ?? "/romans"}
                variant="third"
                size="sm"
              >
                {primaryCta?.label ?? "Lire"}
              </Button>

              <Link
                href={secondaryCta?.href ?? "/romans"}
                className="inline-flex items-center gap-2 text-body-lg font-medium leading-body text-ink"
              >
                {secondaryCta?.label ?? "Suite"}
                <ChevronRight aria-hidden="true" className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
