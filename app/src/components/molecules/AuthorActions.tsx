import Button from "@/app/src/components/ui/Button";

export default function AuthorActions() {
  return (
    <div className="flex items-start gap-4">
      <Button
        href="/about"
        variant="primary"
        className="rounded-[6px] border border-[#2abab0] bg-[#2abab0] px-3 py-1.5 text-[0.875rem] leading-[1.6] md:text-[1.125rem]"
      >
        Découvrir
      </Button>

      <Button
        href="/about"
        variant="third"
        className="rounded-[6px] border-[rgba(12,12,12,0.15)] px-3 py-1.5 text-[0.875rem] leading-[1.6] hover:bg-[#0c0c0c]/5 md:text-[1.125rem]"
      >
        Plus
      </Button>
    </div>
  );
}
