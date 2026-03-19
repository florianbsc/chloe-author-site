import type { LucideIcon } from "lucide-react";

type AboutFeatureItemProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export default function AboutFeatureItem({
  title,
  description,
  icon: Icon,
}: AboutFeatureItemProps) {
  return (
    <article className="flex flex-col items-start gap-4 text-ink">
      <Icon aria-hidden="true" className="size-12 icon-stroke-lg" />

      <h3 className="text-h3 font-bold leading-title tracking-title">
        {title}
      </h3>

      <p className="text-body-lg leading-body">{description}</p>
    </article>
  );
}
