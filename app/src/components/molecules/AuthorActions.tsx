import Button from "@/app/src/components/atoms/Button";

export default function AuthorActions() {
  return (
    <div className="flex items-start gap-4">
      <Button
        href="/about"
        variant="primary"
        size="sm"
        className="md:text-base-custom"
      >
        Découvrir
      </Button>

      <Button
        href="/about"
        variant="third"
        size="sm"
        className="md:text-base-custom"
      >
        Plus
      </Button>
    </div>
  );
}
