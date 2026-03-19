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
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-surface-ash px-5 py-16 md:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-16 lg:gap-20">
        <div className="flex w-full max-w-[768px] flex-col items-center gap-4 text-center text-ink">
          <p className="text-base font-semibold leading-[1.5]">Romans</p>

          <div className="flex w-full flex-col items-center gap-6">
            <h2 className="text-[2.5rem] font-bold leading-[1.2] tracking-[0.01em] lg:text-[3.75rem]">
              Mes romans
            </h2>
            <p className="text-[1rem] leading-[1.6] lg:text-[1.25rem]">
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
