import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Button from "@/app/src/components/atoms/Button";

type RomansActionsProps = {
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function RomansActions({
  primaryLabel = "Voir",
  primaryHref = "/romans",
  secondaryLabel = "Tous",
  secondaryHref = "/romans",
}: RomansActionsProps) {
  return (
    <div className="flex items-center gap-6">
      <Button
        href={primaryHref}
        variant="third"
        size="sm"
        className="md:text-body-lg"
      >
        {primaryLabel}
      </Button>

      <Link
        href={secondaryHref}
        className="inline-flex items-center gap-2 text-body-sm font-medium leading-body text-ink md:text-body-lg"
      >
        {secondaryLabel}
        <ChevronRight aria-hidden="true" className="size-5" />
      </Link>
    </div>
  );
}
