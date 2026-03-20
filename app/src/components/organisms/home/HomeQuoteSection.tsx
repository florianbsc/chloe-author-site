type HomeQuoteSectionProps = {
  title?: string;
  subtitle?: string;
};

export default function HomeQuoteSection({
  title = "Parce que survivre n'était que le début",
  subtitle = "« Parce que survivre n'était que le début... » — Mon éternel combat",
}: HomeQuoteSectionProps) {
  return (
    <section className="section-bleed bg-surface-ash">
      <div className="section-wrap-xl py-16 lg:py-28">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center text-ink">
          <h1 className="w-full text-h1 font-bold leading-tight tracking-title lg:text-display">
            {title}
          </h1>

          <p className="w-full text-body-sm leading-body lg:text-h5">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
