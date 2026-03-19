import Button from "@/app/src/components/atoms/Button";

export default function NewsletterCtaForm() {
  return (
    <div className="w-full max-w-[513px] space-y-4">
      <form className="flex w-full items-start gap-4">
        <div className="flex min-h-px min-w-px flex-1 items-center border-b border-border-soft bg-transparent py-2">
          <label htmlFor="newsletter-email" className="sr-only">
            Votre email
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="Votre email"
            className="w-full border-0 bg-transparent text-[0.875rem] leading-[1.6] text-ink placeholder:text-ink/60 outline-none lg:text-[1.125rem]"
          />
        </div>

        <Button
          variant="primary"
          className="rounded-[6px] border border-brand bg-brand px-3 py-1.5 text-[0.875rem] leading-[1.6] lg:text-[1.125rem]"
        >
          S&apos;abonner
        </Button>
      </form>

      <p className="w-full text-center text-[0.75rem] leading-[1.6] text-ink">
        En vous abonnant, vous acceptez notre politique de confidentialité.
      </p>
    </div>
  );
}
