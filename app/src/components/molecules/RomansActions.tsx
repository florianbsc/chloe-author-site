import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Button from "@/app/src/components/atoms/Button";

export default function RomansActions() {
  return (
    <div className="flex items-center gap-6">
      <Button
        href="/romans"
        variant="third"
        className="rounded-[6px] border-border-soft px-3 py-1.5 text-[0.875rem] leading-[1.6] md:text-[1.125rem]"
      >
        Voir
      </Button>

      <Link
        href="/romans"
        className="inline-flex items-center gap-2 text-[0.875rem] font-medium leading-[1.6] text-ink md:text-[1.125rem]"
      >
        Tous
        <ChevronRight aria-hidden="true" className="size-5" />
      </Link>
    </div>
  );
}
