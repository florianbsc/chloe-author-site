import Button from "@/app/src/components/atoms/Button";
import Input from "@/app/src/components/atoms/Input";
import { subscribeNewsletterAction } from "@/app/src/actions/newsletter";

type NewsletterCtaFormProps = {
  buttonLabel?: string;
  placeholder?: string;
  note?: string;
};

export default function NewsletterCtaForm({
  buttonLabel = "S'abonner",
  placeholder = "Votre email",
  note = "En vous abonnant, vous acceptez notre politique de confidentialité.",
}: NewsletterCtaFormProps) {
  return (
    <div className="w-full max-w-lg stack-sm">
      <form action={subscribeNewsletterAction} className="flex w-full items-start gap-4">
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />
        <div className="flex min-h-px min-w-px flex-1 items-center py-2">
          <label htmlFor="newsletter-email" className="sr-only">
            {placeholder}
          </label>
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder={placeholder}
            variant="underline"
            size="md"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="sm"
        >
          {buttonLabel}
        </Button>
      </form>

      <p className="w-full text-center text-caption leading-body text-ink">
        {note}
      </p>
    </div>
  );
}
