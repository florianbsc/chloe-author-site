import AuthorActions from "@/app/src/components/molecules/AuthorActions";

export default function HomeAuthorSection() {
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-surface-ash px-5 py-16 md:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="flex w-full flex-col gap-12 text-ink lg:flex-row lg:gap-20">
          <div className="flex flex-1 flex-col gap-4">
            <p className="text-base font-semibold leading-[1.5]">Auteure</p>
            <h2 className="text-h1 font-bold leading-[1.1] tracking-[0.01em] lg:text-display">
              Une handi-auteure
            </h2>
          </div>

          <div className="flex flex-1 flex-col gap-8">
            <p className="text-sm2-custom leading-[1.6] lg:text-h5">
              Chloé Simart écrit des histoires où le handicap n&apos;est pas un
              obstacle mais une part authentique de l&apos;existence. Elle brise
              les tabous en donnant voix à ceux qu&apos;on oublie souvent.
            </p>

            <AuthorActions />
          </div>
        </div>
      </div>
    </section>
  );
}
