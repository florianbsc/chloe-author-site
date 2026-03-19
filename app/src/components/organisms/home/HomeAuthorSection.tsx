import AuthorActions from "@/app/src/components/molecules/AuthorActions";

export default function HomeAuthorSection() {
  return (
    <section className="section-bleed bg-surface-ash">
      <div className="section-wrap-xl py-16 lg:py-28">
        <div className="flex w-full flex-col gap-12 text-ink lg:flex-row lg:gap-20">
          <div className="flex flex-1 flex-col gap-4">
            <p className="text-body font-semibold leading-subtitle">Auteure</p>
            <h2 className="text-h1 font-bold leading-tight tracking-title lg:text-display">
              Une handi-auteure
            </h2>
          </div>

          <div className="flex flex-1 flex-col gap-8">
            <p className="text-body-sm leading-body lg:text-h5">
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
