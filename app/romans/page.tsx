
import Button from "@/app/src/components/atoms/Button";
import BookCard from "@/app/src/components/molecules/BookCard";
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";

type Roman = {
  id: string;
  title: string;
  description: string;
  cover: string;
  href: string;
};

async function getRomans(): Promise<Roman[]> {
  return [
    {
      id: "les-secrets-de-clara",
      title: "Les secrets de Clara",
      description:
        "Un thriller sombre où les mensonges s'accumulent et où chaque secret cache une blessure plus profonde.",
      cover: "/books.jpg",
      href: "/romans/les-secrets-de-clara",
    },
    {
      id: "mon-eternel-combat",
      title: "Mon éternel combat",
      description:
        "Mon autobiographie, écriture brute et sincère de ma vie, de mes luttes et de mes victoires quotidiennes.",
      cover: "/books.jpg",
      href: "/romans/mon-eternel-combat",
    },
    {
      id: "nos-blessures-sous-la-peau",
      title: "Nos blessures sous la peau",
      description:
        "Une romance qui explore comment l'amour naît et s'épanouit entre deux âmes marquées par la vie.",
      cover: "/books.jpg",
      href: "/romans/nos-blessures-sous-la-peau",
    },
    {
      id: "la-loge-des-silences",
      title: "La loge des silences",
      description:
        "Un thriller captivant où le silence devient complice et où la vérité doit être arrachée à l'obscurité.",
      cover: "/books.jpg",
      href: "/romans/la-loge-des-silences",
    },
  ];
}

export default async function Book() {
  const romans = await getRomans();

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#e9f8f7]">
        <div className="mx-auto w-full max-w-[720px] space-y-6 px-5 py-12 text-[#0c0c0c] sm:py-16">
          <p className="text-[0.875rem] font-semibold uppercase tracking-[0.2em]">
            Romans
          </p>
          <h1 className="text-[2.75rem] font-bold leading-[1.1] tracking-[0.01em] sm:text-[4rem]">
            Mes romans
          </h1>
          <p className="text-[1rem] leading-[1.7] sm:text-[1.125rem]">
            Chaque histoire que j&apos;écris naît d&apos;une conviction simple : les
            personnages en situation de handicap méritent des récits qui les
            célèbrent, les questionnent, les transforment. Mes romans traversent
            des genres variés, du thriller à la romance, de l&apos;autobiographie à
            la fiction, mais tous partagent cette même profondeur d&apos;âme.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="#catalogue">
              <Button
                variant="primary"
                className="rounded-[12px] border border-[#2abab0] bg-[#2abab0] px-5 py-2 text-[0.95rem] leading-[1.6] text-white hover:bg-[#239f96]"
              >
                Découvrir
              </Button>
            </Link>
            <a href="https://www.amazon.fr" target="_blank" rel="noreferrer">
              <Button
                variant="secondary"
                className="rounded-[12px] border border-[rgba(12,12,12,0.25)] px-5 py-2 text-[0.95rem] leading-[1.6] text-[#0c0c0c]"
              >
                Amazon
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[720px] px-5 text-center text-[#0c0c0c]">
        <p className="text-[0.875rem] font-semibold uppercase tracking-[0.2em]">
          Essence
        </p>
        <h2 className="mt-4 text-[2.5rem] font-bold leading-[1.1] tracking-[0.01em] sm:text-[3.5rem]">
          Ce qui rend mes romans
          <br />
          différents
        </h2>
        <p className="mt-4 text-[1rem] leading-[1.7] sm:text-[1.125rem]">
          Mes histoires refusent les clichés et les regards apitoyés. Elles
          célèbrent la complexité, la force et la beauté de ceux qui vivent
          avec un handicap.
        </p>

        <div className="mt-12 space-y-12 text-left">
          <div className="space-y-6">
            <div className="h-[220px] overflow-hidden rounded-2xl bg-[#dedede]">
              <HeroImagePlaceholder />
            </div>
            <h3 className="text-[1.75rem] font-semibold leading-[1.25]">
              Représentation authentique et sans compromis
            </h3>
            <p className="text-[1rem] leading-[1.7]">
              Des personnages en situation de handicap au coeur du récit, pas
              en marge de l&apos;histoire.
            </p>
          </div>

          <div className="space-y-6">
            <div className="h-[220px] overflow-hidden rounded-2xl bg-[#dedede]">
              <HeroImagePlaceholder />
            </div>
            <h3 className="text-[1.75rem] font-semibold leading-[1.25]">
              Émotions brutes et vérité littéraire
            </h3>
            <p className="text-[1rem] leading-[1.7]">
              Chaque page respire l&apos;authenticité, loin des sentimentalisme
              facile et des narratifs convenus.
            </p>
          </div>

          <div className="space-y-6">
            <div className="h-[220px] overflow-hidden rounded-2xl bg-[#dedede]">
              <HeroImagePlaceholder />
            </div>
            <h3 className="text-[1.75rem] font-semibold leading-[1.25]">
              Récits qui transforment et inspirent
            </h3>
            <p className="text-[1rem] leading-[1.7]">
              Mes romans invitent à la réflexion, au questionnement et à la
              découverte de soi.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="https://www.amazon.fr" target="_blank" rel="noreferrer">
            <Button
              variant="secondary"
              className="rounded-[12px] border border-[rgba(12,12,12,0.25)] px-5 py-2 text-[0.95rem] leading-[1.6] text-[#0c0c0c]"
            >
              Amazon
            </Button>
          </a>
          <Link href="#catalogue" className="inline-flex items-center gap-2">
            <span className="text-[0.95rem] font-medium leading-[1.6] text-[#0c0c0c]">
              Lire
            </span>
            <span aria-hidden="true" className="text-[1.1rem]">
              →
            </span>
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[720px] px-5 text-center text-[#0c0c0c]">
        <h2 className="text-[2.5rem] font-bold leading-[1.1] tracking-[0.01em] sm:text-[3.5rem]">
          Ce qu&apos;en disent
          <br />
          les lecteurs
        </h2>
        <p className="mt-4 text-[1rem] leading-[1.7] sm:text-[1.125rem]">
          Des voix qui résonnent avec authenticité
        </p>

        <div className="mt-12 space-y-12 text-[#0c0c0c]">
          <div className="space-y-6">
            <div className="text-[1.125rem] font-semibold">Webflow</div>
            <p className="text-[1.35rem] font-semibold leading-[1.4]">
              &laquo; Ces romans m&apos;ont permis de me voir enfin représentée dans
              une histoire vraie. &raquo;
            </p>
            <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#d7d7d7] text-[#b5b5b5]">
              <ImageIcon className="size-5" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-[1.05rem] font-semibold">Marie Dupont</p>
              <p className="text-[0.95rem]">Lectrice passionnée</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-[1.125rem] font-semibold">Webflow</div>
            <p className="text-[1.35rem] font-semibold leading-[1.4]">
              &laquo; Chloé écrit avec une force brute qui traverse les pages et
              s&apos;installe en vous. &raquo;
            </p>
            <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#d7d7d7] text-[#b5b5b5]">
              <ImageIcon className="size-5" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-[1.05rem] font-semibold">Thomas Mercier</p>
              <p className="text-[0.95rem]">Critique littéraire</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-[1.125rem] font-semibold">Webflow</div>
            <p className="text-[1.35rem] font-semibold leading-[1.4]">
              &laquo; Un roman qui ne vous lâche pas. L&apos;humanité crue et sans
              détour qu&apos;on attendait. &raquo;
            </p>
            <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#d7d7d7] text-[#b5b5b5]">
              <ImageIcon className="size-5" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-[1.05rem] font-semibold">Sophie Bernard</p>
              <p className="text-[0.95rem]">Lectrice assidue</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="catalogue"
        className="mx-auto w-full max-w-[1200px] space-y-10 px-5 text-[#0c0c0c]"
      >
        <div className="space-y-4">
          <p className="text-[0.875rem] font-semibold uppercase tracking-[0.2em]">
            Catalogue
          </p>
          <h2 className="text-[2.25rem] font-bold leading-[1.2] sm:text-[3rem]">
            Tous mes romans en un seul endroit
          </h2>
          <p className="text-[1rem] leading-[1.7] sm:text-[1.125rem]">
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
              description={roman.description}
              image={roman.cover}
              href={roman.href}
              className="rounded-2xl"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
