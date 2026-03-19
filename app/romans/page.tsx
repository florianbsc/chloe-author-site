
import Button from "@/app/src/components/atoms/Button";
import BookCard from "@/app/src/components/molecules/BookCard";
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import { getRomans } from "@/app/src/lib/romans";
import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";

export default async function Book() {
  const romans = await getRomans();

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-surface-mint">
        <div className="mx-auto w-full max-w-[720px] space-y-6 px-5 py-12 text-ink sm:py-16">
          <p className="text-sm2-custom font-semibold uppercase tracking-eyebrow">
            Romans
          </p>
          <h1 className="text-h2 font-bold leading-tight tracking-title sm:text-7xl-custom">
            Mes romans
          </h1>
          <p className="text-sm-custom leading-body-lg sm:text-base-custom">
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

      <section
        id="catalogue"
        className="mx-auto w-full max-w-[1200px] space-y-10 px-5 text-ink"
      >
        <div className="space-y-4">
          <p className="text-sm2-custom font-semibold uppercase tracking-eyebrow">
            Catalogue
          </p>
          <h2 className="text-3xl-custom font-bold leading-title sm:text-h1">
            Tous mes romans en un seul endroit
          </h2>
          <p className="text-sm-custom leading-body-lg sm:text-base-custom">
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

      <section className="mx-auto w-full max-w-[720px] px-5 text-center text-ink">
        <p className="text-sm2-custom font-semibold uppercase tracking-eyebrow">
          Essence
        </p>
        <h2 className="mt-4 text-4xl-custom font-bold leading-tight tracking-title sm:text-5xl-custom">
          Ce qui rend mes romans
          <br />
          différents
        </h2>
        <p className="mt-4 text-sm-custom leading-body-lg sm:text-base-custom">
          Mes histoires refusent les clichés et les regards apitoyés. Elles
          célèbrent la complexité, la force et la beauté de ceux qui vivent
          avec un handicap.
        </p>

        <div className="mt-12 space-y-12 text-left">
          <div className="space-y-6">
            <div className="h-[220px] overflow-hidden rounded-2xl bg-surface-placeholder">
              <HeroImagePlaceholder />
            </div>
            <h3 className="text-2xl-custom font-semibold leading-subtitle">
              Représentation authentique et sans compromis
            </h3>
            <p className="text-sm-custom leading-body-lg">
              Des personnages en situation de handicap au coeur du récit, pas
              en marge de l&apos;histoire.
            </p>
          </div>

          <div className="space-y-6">
            <div className="h-[220px] overflow-hidden rounded-2xl bg-surface-placeholder">
              <HeroImagePlaceholder />
            </div>
            <h3 className="text-2xl-custom font-semibold leading-subtitle">
              Émotions brutes et vérité littéraire
            </h3>
            <p className="text-sm-custom leading-body-lg">
              Chaque page respire l&apos;authenticité, loin des sentimentalisme
              facile et des narratifs convenus.
            </p>
          </div>

          <div className="space-y-6">
            <div className="h-[220px] overflow-hidden rounded-2xl bg-surface-placeholder">
              <HeroImagePlaceholder />
            </div>
            <h3 className="text-2xl-custom font-semibold leading-subtitle">
              Récits qui transforment et inspirent
            </h3>
            <p className="text-sm-custom leading-body-lg">
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
            <span className="text-sm3-custom font-medium leading-body text-ink">
              Lire
            </span>
            <span aria-hidden="true" className="text-base-custom">
              →
            </span>
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[720px] px-5 text-center text-ink">
        <h2 className="text-4xl-custom font-bold leading-tight tracking-title sm:text-5xl-custom">
          Ce qu&apos;en disent
          <br />
          les lecteurs
        </h2>
        <p className="mt-4 text-sm-custom leading-body-lg sm:text-base-custom">
          Des voix qui résonnent avec authenticité
        </p>

        <div className="mt-12 space-y-12 text-ink">
          <div className="space-y-6">
            <div className="text-base-custom font-semibold">Webflow</div>
            <p className="text-xl-custom font-semibold leading-title">
              &laquo; Ces romans m&apos;ont permis de me voir enfin représentée dans
              une histoire vraie. &raquo;
            </p>
            <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-surface-placeholder-strong text-icon-placeholder">
              <ImageIcon className="size-5" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-md2-custom font-semibold">Marie Dupont</p>
              <p className="text-sm3-custom">Lectrice passionnée</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-base-custom font-semibold">Webflow</div>
            <p className="text-xl-custom font-semibold leading-title">
              &laquo; Chloé écrit avec une force brute qui traverse les pages et
              s&apos;installe en vous. &raquo;
            </p>
            <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-surface-placeholder-strong text-icon-placeholder">
              <ImageIcon className="size-5" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-md2-custom font-semibold">Thomas Mercier</p>
              <p className="text-sm3-custom">Critique littéraire</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-base-custom font-semibold">Webflow</div>
            <p className="text-xl-custom font-semibold leading-title">
              &laquo; Un roman qui ne vous lâche pas. L&apos;humanité crue et sans
              détour qu&apos;on attendait. &raquo;
            </p>
            <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-surface-placeholder-strong text-icon-placeholder">
              <ImageIcon className="size-5" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-md2-custom font-semibold">Sophie Bernard</p>
              <p className="text-sm3-custom">Lectrice assidue</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
