import {
  BookOpen,
  Compass,
  House,
  Video,
  ConciergeBell,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import RomansActions from "@/app/src/components/molecules/RomansActions";
import RomansFeatureCard from "@/app/src/components/molecules/RomansFeatureCard";
import type { Roman } from "@/app/src/lib/romans";

const ROMANS = [
  {
    title: "Les secrets de Clara",
    description:
      "Un thriller sombre qui explore les mystères enfouis au cœur des familles.",
    icon: Compass,
  },
  {
    title: "Mon éternel combat",
    description:
      "L'autobiographie d'une femme qui refuse de se laisser définir par ses limites.",
    icon: House,
  },
  {
    title: "Nos blessures sous la peau",
    description:
      "Une romance où deux âmes blessées apprennent à se reconstruire ensemble.",
    icon: Video,
  },
  {
    title: "La Loge des Silences",
    description:
      "Un thriller captivant qui murmure les secrets que personne n'ose prononcer.",
    icon: ConciergeBell,
  },
];

type HomeRomansSectionProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  romans?: Roman[];
  items?: Array<Record<string, unknown>>;
};

const ICONS: Record<string, LucideIcon> = {
  Compass,
  House,
  Video,
  ConciergeBell,
};

export default function HomeRomansSection({
  eyebrow = "Romans",
  title = "Mes romans",
  subtitle = "Disponibles sur Amazon",
  primaryCta,
  secondaryCta,
  romans,
  items,
}: HomeRomansSectionProps) {
  const sectionItems =
    items && items.length > 0
      ? items.map((item) => ({
          title: item.title as string,
          description: item.description as string,
          icon: ICONS[item.icon as string] ?? BookOpen,
        }))
      : romans && romans.length > 0
        ? romans.slice(0, 4).map((roman) => ({
            title: roman.title,
            description: roman.shortDescription,
            icon: BookOpen,
          }))
        : ROMANS;

  return (
    <section className="section-bleed bg-surface-ash">
      <div className="section-wrap-xl flex flex-col items-center gap-16 py-16 lg:gap-20 lg:py-28">
        <div className="flex w-full max-w-3xl flex-col items-center gap-4 text-center text-ink">
          <p className="text-body font-semibold leading-subtitle">{eyebrow}</p>

          <div className="flex w-full flex-col items-center gap-6">
            <h1 className="text-4xl-custom font-bold leading-title tracking-title lg:text-6xl-custom">
              {title}
            </h1>
            <p className="text-body leading-body lg:text-h5">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {sectionItems.map((roman) => (
            <RomansFeatureCard
              key={roman.title}
              title={roman.title}
              description={roman.description}
              icon={roman.icon}
            />
          ))}
        </div>

        <RomansActions
          primaryLabel={primaryCta?.label}
          primaryHref={primaryCta?.href}
          secondaryLabel={secondaryCta?.label}
          secondaryHref={secondaryCta?.href}
        />
      </div>
    </section>
  );
}
