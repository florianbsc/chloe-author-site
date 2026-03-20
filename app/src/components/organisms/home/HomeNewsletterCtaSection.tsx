import NewsletterCtaForm from "@/app/src/components/molecules/NewsletterCtaForm";

export default function HomeNewsletterCtaSection() {
  return (
    <section className="section-bleed bg-surface-ash">
      <div className="section-wrap-xl py-16 lg:py-28">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8">
          <div className="w-full stack-md text-center text-ink">
            <h1 className="text-h1 font-bold leading-tight tracking-title lg:text-display">
              <span className="block">Restez informé</span>
              <span className="block">Des nouvelles</span>
            </h1>

            <p className="text-body-sm leading-body lg:text-h5">
              Recevez les actualités et les dates de sortie de mes prochains
              romans.
            </p>
          </div>

          <NewsletterCtaForm />
        </div>
      </div>
    </section>
  );
}
