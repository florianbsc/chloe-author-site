import Button from "@/app/src/components/atoms/Button";
import { cn } from "@/app/src/lib/utils";

type HeroActionsProps = {
  primaryLabel?: string;
  primaryHref?: string;
  primaryVariant?: "primary" | "secondary" | "third";
  primaryClassName?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryVariant?: "primary" | "secondary" | "third";
  secondaryClassName?: string;
  className?: string;
};

export default function HeroActions({
  primaryLabel = "Découvrir",
  primaryHref = "/about",
  primaryVariant = "primary",
  primaryClassName,
  secondaryLabel = "Lire",
  secondaryHref = "/romans",
  secondaryVariant = "third",
  secondaryClassName,
  className,
}: HeroActionsProps) {
  return (
    <div className={cn("flex items-start gap-4", className)}>
      <Button
        href={primaryHref}
        variant={primaryVariant}
        className={cn(
          "rounded-[6px] border border-brand bg-brand px-3 py-1.5 text-[0.875rem] leading-[1.6] lg:text-[1.125rem]",
          primaryClassName,
        )}
      >
        {primaryLabel}
      </Button>

      <Button
        href={secondaryHref}
        variant={secondaryVariant}
        className={cn(
          "rounded-[6px] border-border-soft px-3 py-1.5 text-[0.875rem] leading-[1.6] hover:bg-ink/5 lg:text-[1.125rem]",
          secondaryClassName,
        )}
      >
        {secondaryLabel}
      </Button>
    </div>
  );
}
