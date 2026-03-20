import {
  Compass,
  House,
  Video,
  ConciergeBell,
} from "lucide-react";
import RomansActions from "@/app/src/components/molecules/RomansActions";
import RomansFeatureCard from "@/app/src/components/molecules/RomansFeatureCard";

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

export default function HomeRomansSection() {
  return (
    <section className="section-bleed bg-surface-ash">
      <div className="section-wrap-xl flex flex-col items-center gap-16 py-16 lg:gap-20 lg:py-28">
        <div className="flex w-full max-w-3xl flex-col items-center gap-4 text-center text-ink">
          <p className="text-body font-semibold leading-subtitle">Romans</p>

          <div className="flex w-full flex-col items-center gap-6">
            <h1 className="text-4xl-custom font-bold leading-title tracking-title lg:text-6xl-custom">
              Mes romans
            </h1>
            <p className="text-body leading-body lg:text-h5">
              Disponibles sur Amazon
            </p>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {ROMANS.map((roman) => (
            <RomansFeatureCard
              key={roman.title}
              title={roman.title}
              description={roman.description}
              icon={roman.icon}
            />
          ))}
        </div>

        <RomansActions />
      </div>
    </section>
  );
}
