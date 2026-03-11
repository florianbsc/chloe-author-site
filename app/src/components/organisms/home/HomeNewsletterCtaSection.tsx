import NewsletterCtaForm from "@/app/src/components/molecules/NewsletterCtaForm";

export default function HomeNewsletterCtaSection() {
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#e9e9ea] px-5 py-16 md:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mx-auto flex w-full max-w-[768px] flex-col items-center gap-8">
          <div className="w-full space-y-6 text-center text-[#0c0c0c]">
            <h2 className="text-[3rem] font-bold leading-[1.1] tracking-[0.01em] lg:text-[5.25rem]">
              <span className="block">Restez informé</span>
              <span className="block">Des nouvelles</span>
            </h2>

            <p className="text-[0.875rem] leading-[1.6] lg:text-[1.25rem]">
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
