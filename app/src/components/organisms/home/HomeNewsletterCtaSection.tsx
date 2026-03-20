import NewsletterCtaForm from "@/app/src/components/molecules/NewsletterCtaForm";

type HomeNewsletterCtaSectionProps = {
  titleLines?: string[];
  description?: string;
  form?: {
    buttonLabel?: string;
    placeholder?: string;
    note?: string;
  };
};

export default function HomeNewsletterCtaSection({
  titleLines = ["Restez informé", "Des nouvelles"],
  description = "Recevez les actualités et les dates de sortie de mes prochains romans.",
  form,
}: HomeNewsletterCtaSectionProps) {
  return (
    <section className="section-bleed bg-surface-ash">
      <div className="section-wrap-xl py-16 lg:py-28">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8">
          <div className="w-full stack-md text-center text-ink">
            <h1 className="text-h1 font-bold leading-tight tracking-title lg:text-display">
              {titleLines.map((line, index) => (
                <span key={`${line}-${index}`} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="text-body-sm leading-body lg:text-h5">
              {description}
            </p>
          </div>

          <NewsletterCtaForm
            buttonLabel={form?.buttonLabel}
            placeholder={form?.placeholder}
            note={form?.note}
          />
        </div>
      </div>
    </section>
  );
}
