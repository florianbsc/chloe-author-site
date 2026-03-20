
import Button from "@/app/src/components/atoms/Button";
import BookCard from "@/app/src/components/molecules/BookCard";
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import ReviewCard from "@/app/src/components/molecules/ReviewCard";
import { getRomans } from "@/app/src/lib/romans";
import Link from "next/link";

export default async function Book() {
  const romans = await getRomans();

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="section-bleed bg-surface-mint">
        <div className="section-wrap-sm section-pad-md stack-md text-ink">
          <p className="eyebrow">
            Romans
          </p>
          <h1 className="text-h2 font-bold leading-tight tracking-title sm:text-7xl-custom">
            Mes romans
          </h1>
          <p className="text-body leading-body-lg sm:text-body-lg">
            Chaque histoire que j&apos;écris naît d&apos;une conviction simple : les
            personnages en situation de handicap méritent des récits qui les
            célèbrent, les questionnent, les transforment. Mes romans traversent
            des genres variés, du thriller à la romance, de l&apos;autobiographie à
            la fiction, mais tous partagent cette même profondeur d&apos;âme.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="#catalogue">
              <Button variant="primary" size="lg">
                Découvrir
              </Button>
            </Link>
            <a href="https://www.amazon.fr" target="_blank" rel="noreferrer">
              <Button variant="secondary" size="lg">
                Amazon
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="catalogue" className="section-wrap-lg stack-lg text-ink">
        <div className="stack-sm">
          <p className="eyebrow">
            Catalogue
          </p>
          <h1 className="text-3xl-custom font-bold leading-title sm:text-h1">
            Tous mes romans en un seul endroit
          </h1>
          <p className="text-body leading-body-lg sm:text-body-lg">
            Chaque roman que j&apos;écris porte en lui une part de vérité, une
            exploration de l&apos;âme humaine face aux défis qui la façonnent.
            Retrouvez ici l&apos;intégralité de mes oeuvres, classées par genre
            pour vous guider dans votre découverte.
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
          Essence
        </p>
        <h1 className="mt-4 text-4xl-custom font-bold leading-tight tracking-title sm:text-5xl-custom">
          Ce qui rend mes romans
          <br />
          différents
        </h1>
        <p className="mt-4 text-body leading-body-lg sm:text-body-lg">
          Mes histoires refusent les clichés et les regards apitoyés. Elles
          célèbrent la complexité, la force et la beauté de ceux qui vivent
          avec un handicap.
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
          Ce qu&apos;en disent
          <br />
          les lecteurs
        </h1>
        <p className="mt-4 text-body leading-body-lg sm:text-body-lg">
          Des voix qui résonnent avec authenticité
        </p>

        <div className="mt-12 stack-lg text-ink">
          <ReviewCard
            logo="Webflow"
            quote="Ces romans m'ont permis de me voir enfin représentée dans une histoire vraie."
            name="Marie Dupont"
            role="Lectrice passionnée"
          />
          <ReviewCard
            logo="Webflow"
            quote="Chloé écrit avec une force brute qui traverse les pages et s'installe en vous."
            name="Thomas Mercier"
            role="Critique littéraire"
          />
          <ReviewCard
            logo="Webflow"
            quote="Un roman qui ne vous lâche pas. L'humanité crue et sans détour qu'on attendait."
            name="Sophie Bernard"
            role="Lectrice assidue"
          />
        </div>
      </section>
    </div>
  );
}
