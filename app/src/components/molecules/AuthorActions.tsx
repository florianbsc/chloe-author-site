import Button from "@/app/src/components/atoms/Button";

type AuthorActionsProps = {
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function AuthorActions({
  primaryLabel = "Découvrir",
  primaryHref = "/about",
  secondaryLabel = "Plus",
  secondaryHref = "/about",
}: AuthorActionsProps) {
  return (
    <div className="flex items-start gap-4">
      <Button
        href={primaryHref}
        variant="primary"
        size="sm"
        className="md:text-body-lg"
      >
        {primaryLabel}
      </Button>

      <Button
        href={secondaryHref}
        variant="third"
        size="sm"
        className="md:text-body-lg"
      >
        {secondaryLabel}
      </Button>
    </div>
  );
}
