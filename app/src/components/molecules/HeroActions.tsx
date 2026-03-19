import Button from "@/app/src/components/atoms/Button";
import { cn } from "@/app/src/lib/utils";

type HeroActionsProps = {
  primaryLabel?: string;
  primaryHref?: string;
  primaryVariant?: "primary" | "secondary" | "third" | "cta" | "ghost" | "link";
  primaryClassName?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryVariant?: "primary" | "secondary" | "third" | "cta" | "ghost" | "link";
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
        size="sm"
        className={cn(
          "lg:text-body-lg",
          primaryClassName,
        )}
      >
        {primaryLabel}
      </Button>

      <Button
        href={secondaryHref}
        variant={secondaryVariant}
        size="sm"
        className={cn(
          "lg:text-body-lg",
          secondaryClassName,
        )}
      >
        {secondaryLabel}
      </Button>
    </div>
  );
}
