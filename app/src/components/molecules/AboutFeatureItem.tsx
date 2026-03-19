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
      <Icon aria-hidden="true" className="size-12 stroke-[1.75]" />

      <h3 className="text-h3 font-bold leading-[1.2] tracking-[0.01em]">
        {title}
      </h3>

      <p className="text-base-custom leading-[1.6]">{description}</p>
    </article>
  );
}
