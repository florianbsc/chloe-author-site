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
    <article className="mx-auto flex w-full max-w-xs flex-col items-center gap-6 text-center text-ink">
      <Icon aria-hidden="true" className="size-12 icon-stroke-lg" />

      <div className="stack-sm">
        <h3 className="text-2xl-custom font-bold leading-title tracking-title md:text-h3">
          {title}
        </h3>

        <p className="text-body leading-body md:text-body-lg">
          {description}
        </p>
      </div>
    </article>
  );
}
