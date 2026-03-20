
import Button from "@/app/src/components/atoms/Button";
import BookCard from "@/app/src/components/molecules/BookCard";
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import ReviewCard from "@/app/src/components/molecules/ReviewCard";
import { getRomans } from "@/app/src/lib/romans";
import { getPageBySlug } from "@/app/src/lib/pages";
import { getTestimonials } from "@/app/src/lib/testimonials";
import Link from "next/link";

export default async function Book() {
  const [romans, page, testimonials] = await Promise.all([
    getRomans(),
    getPageBySlug("romans"),
    getTestimonials("romans"),
  ]);
  const heroSection = page?.sections.find((section) => section.type === "romans-hero")?.data ?? {};
  const catalogueSection =
    page?.sections.find((section) => section.type === "romans-catalogue")?.data ?? {};
  const essenceSection =
    page?.sections.find((section) => section.type === "romans-essence")?.data ?? {};
  const reviewSection =
    page?.sections.find((section) => section.type === "romans-reviews")?.data ?? {};

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="section-bleed bg-surface-mint">
        <div className="section-wrap-sm section-pad-md stack-md text-ink">
          <p className="eyebrow">
            {(heroSection.eyebrow as string) ?? "Romans"}
          </p>
          <h1 className="text-h2 font-bold leading-tight tracking-title sm:text-7xl-custom">
            {(heroSection.title as string) ?? "Mes romans"}
          </h1>
          <p className="text-body leading-body-lg sm:text-body-lg">
            {(heroSection.description as string) ??
              "Chaque histoire que j'écris naît d'une conviction simple : les personnages en situation de handicap méritent des récits qui les célèbrent, les questionnent, les transforment. Mes romans traversent des genres variés, du thriller à la romance, de l'autobiographie à la fiction, mais tous partagent cette même profondeur d'âme."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={(heroSection.primaryCta as { href?: string })?.href ?? "#catalogue"}>
              <Button variant="primary" size="lg">
                {(heroSection.primaryCta as { label?: string })?.label ?? "Découvrir"}
              </Button>
            </Link>
            <a
              href={(heroSection.secondaryCta as { href?: string })?.href ?? "https://www.amazon.fr"}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="secondary" size="lg">
                {(heroSection.secondaryCta as { label?: string })?.label ?? "Amazon"}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="catalogue" className="section-wrap-lg stack-lg text-ink">
        <div className="stack-sm">
          <p className="eyebrow">
            {(catalogueSection.eyebrow as string) ?? "Catalogue"}
          </p>
          <h1 className="text-3xl-custom font-bold leading-title sm:text-h1">
            {(catalogueSection.title as string) ?? "Tous mes romans en un seul endroit"}
          </h1>
          <p className="text-body leading-body-lg sm:text-body-lg">
            {(catalogueSection.description as string) ??
              "Chaque roman que j'écris porte en lui une part de vérité, une exploration de l'âme humaine face aux défis qui la façonnent. Retrouvez ici l'intégralité de mes oeuvres, classées par genre pour vous guider dans votre découverte."}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {romans.map((roman) => (
            <BookCard
              key={roman.id}
              title={roman.title}
              description={roman.shortDescription}
              image={roman.cover}
              href={`/romans/${roman.slug}`}
              className="rounded-2xl"
            />
          ))}
        </div>
      </section>

      <section className="section-wrap-sm text-center text-ink">
        <p className="eyebrow">
          {(essenceSection.eyebrow as string) ?? "Essence"}
        </p>
        <h1 className="mt-4 text-4xl-custom font-bold leading-tight tracking-title sm:text-5xl-custom">
          {(essenceSection.title as string) ?? "Ce qui rend mes romans"}<br />
          {(essenceSection.subtitle as string) ?? "différents"}
        </h1>
        <p className="mt-4 text-body leading-body-lg sm:text-body-lg">
          {(essenceSection.description as string) ??
            "Mes histoires refusent les clichés et les regards apitoyés. Elles célèbrent la complexité, la force et la beauté de ceux qui vivent avec un handicap."}
        </p>

        <div className="mt-12 stack-lg text-left">
          <div className="stack-md">
            <div className="h-56 overflow-hidden rounded-2xl bg-surface-placeholder">
              <HeroImagePlaceholder />
            </div>
            <h3 className="text-2xl-custom font-semibold leading-subtitle">
              Représentation authentique et sans compromis
            </h3>
            <p className="text-body leading-body-lg">
              Des personnages en situation de handicap au coeur du récit, pas
              en marge de l&apos;histoire.
            </p>
          </div>

          <div className="stack-md">
            <div className="h-56 overflow-hidden rounded-2xl bg-surface-placeholder">
              <HeroImagePlaceholder />
            </div>
            <h3 className="text-2xl-custom font-semibold leading-subtitle">
              Émotions brutes et vérité littéraire
            </h3>
            <p className="text-body leading-body-lg">
              Chaque page respire l&apos;authenticité, loin des sentimentalisme
              facile et des narratifs convenus.
            </p>
          </div>

          <div className="stack-md">
            <div className="h-56 overflow-hidden rounded-2xl bg-surface-placeholder">
              <HeroImagePlaceholder />
            </div>
            <h3 className="text-2xl-custom font-semibold leading-subtitle">
              Récits qui transforment et inspirent
            </h3>
            <p className="text-body leading-body-lg">
              Mes romans invitent à la réflexion, au questionnement et à la
              découverte de soi.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="https://www.amazon.fr" target="_blank" rel="noreferrer">
            <Button variant="secondary" size="lg">
              Amazon
            </Button>
          </a>
          <Link href="#catalogue" className="inline-flex items-center gap-2">
            <span className="text-body font-medium leading-body text-ink">
              Lire
            </span>
            <span aria-hidden="true" className="text-body-lg">
              →
            </span>
          </Link>
        </div>
      </section>

      <section className="section-wrap-sm text-center text-ink">
        <h1 className="text-4xl-custom font-bold leading-tight tracking-title sm:text-5xl-custom">
          {(reviewSection.title as string) ?? "Ce qu'en disent"}<br />
          {(reviewSection.subtitle as string) ?? "les lecteurs"}
        </h1>
        <p className="mt-4 text-body leading-body-lg sm:text-body-lg">
          {(reviewSection.description as string) ?? "Des voix qui résonnent avec authenticité"}
        </p>

        <div className="mt-12 stack-lg text-ink">
          {testimonials.length > 0 ? (
            testimonials.map((review) => (
              <ReviewCard
                key={review.id}
                logo={review.logo}
                quote={review.quote}
                name={review.name}
                role={review.role}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-border-subtle bg-surface p-6 text-left">
              <h3 className="text-h5 font-semibold">Aucun avis pour le moment</h3>
              <p className="mt-2 text-body leading-body">
                Revenez bientôt pour découvrir les retours de lecteurs.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
