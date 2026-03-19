import Button from "@/app/src/components/atoms/Button";
import Input from "@/app/src/components/atoms/Input";

export default function NewsletterCtaForm() {
  return (
    <div className="w-full max-w-[513px] space-y-4">
      <form className="flex w-full items-start gap-4">
        <div className="flex min-h-px min-w-px flex-1 items-center py-2">
          <label htmlFor="newsletter-email" className="sr-only">
            Votre email
          </label>
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="Votre email"
            variant="underline"
            size="md"
          />
        </div>

        <Button
          variant="primary"
          size="sm"
        >
          S&apos;abonner
        </Button>
      </form>

      <p className="w-full text-center text-xs-custom leading-[1.6] text-ink">
        En vous abonnant, vous acceptez notre politique de confidentialité.
      </p>
    </div>
  );
}
