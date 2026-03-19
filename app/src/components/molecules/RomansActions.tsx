import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Button from "@/app/src/components/atoms/Button";

export default function RomansActions() {
  return (
    <div className="flex items-center gap-6">
      <Button
        href="/romans"
        variant="third"
        size="sm"
        className="md:text-body-lg"
      >
        Voir
      </Button>

      <Link
        href="/romans"
        className="inline-flex items-center gap-2 text-body-sm font-medium leading-body text-ink md:text-body-lg"
      >
        Tous
        <ChevronRight aria-hidden="true" className="size-5" />
      </Link>
    </div>
  );
}
