import Button from "@/app/src/components/atoms/Button";

export default function AuthorActions() {
  return (
    <div className="flex items-start gap-4">
      <Button
        href="/about"
        variant="primary"
        className="rounded-[6px] border border-brand bg-brand px-3 py-1.5 text-[0.875rem] leading-[1.6] md:text-[1.125rem]"
      >
        Découvrir
      </Button>

      <Button
        href="/about"
        variant="third"
        className="rounded-[6px] border-border-soft px-3 py-1.5 text-[0.875rem] leading-[1.6] hover:bg-ink/5 md:text-[1.125rem]"
      >
        Plus
      </Button>
    </div>
  );
}
