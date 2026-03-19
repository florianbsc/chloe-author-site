import type { LucideIcon } from "lucide-react";

type RomansFeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export default function RomansFeatureCard({
  title,
  description,
  icon: Icon,
}: RomansFeatureCardProps) {
  return (
    <article className="mx-auto flex w-full max-w-[280px] flex-col items-center gap-6 text-center text-ink">
      <Icon aria-hidden="true" className="size-12 stroke-[1.75]" />

      <div className="space-y-4">
        <h3 className="text-2xl-custom font-bold leading-[1.2] tracking-[0.01em] md:text-h3">
          {title}
        </h3>

        <p className="text-sm-custom leading-[1.6] md:text-base-custom">
          {description}
        </p>
      </div>
    </article>
  );
}
