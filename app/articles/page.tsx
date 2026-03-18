import React from "react"
import Link from "next/link"
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder"
import { Facebook, Image as ImageIcon, Link2, Linkedin, X } from "lucide-react"

const ARTICLES = [
  {
    slug: "la-loge-des-silences",
    title: "La Loge des Silences sort enfin au monde",
    excerpt:
      "Un thriller qui révèle les secrets qu'on n'ose pas prononcer. Découvrez les coulisses de cette sortie attendue.",
    date: "29 octobre 2024",
    readTime: "4 min",
  },
  {
    slug: "ecrire-le-handicap",
    title: "Écrire le handicap autrement",
    excerpt:
      "Pourquoi la représentation authentique change la manière dont on lit, ressent et se reconnaît dans une histoire.",
    date: "12 septembre 2024",
    readTime: "6 min",
  },
  {
    slug: "romans-et-resilience",
    title: "Romans et résilience",
    excerpt:
      "Quand l'écriture devient un acte de guérison et de transmission, au-delà des tabous.",
    date: "01 août 2024",
    readTime: "5 min",
  },
]

export default function Article() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#e9f8f7]">
        <div className="mx-auto w-full max-w-[720px] px-5 py-12 text-[#0c0c0c] sm:py-16">
          <p className="text-[0.875rem] uppercase tracking-[0.2em]">
            Actualités <span className="mx-2">›</span> Articles
          </p>

          <h1 className="mt-4 text-[2.75rem] font-bold leading-[1.1] tracking-[0.01em] sm:text-[3.75rem]">
            La Loge des Silences sort enfin au monde
          </h1>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d7d7d7] text-[#b5b5b5]">
              <span className="sr-only">Photo de l&aops;autrice</span>
              <ImageIcon className="size-5" aria-hidden="true" />
            </div>

            <div className="space-y-1">
              <p className="text-[1rem] font-semibold">Chloé Simart</p>
              <p className="text-[0.875rem] text-[#0c0c0c]">
                29 octobre 2024 <span className="mx-2">•</span> 4 min
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#d7efe9] text-[#0c0c0c]"
              aria-label="Copier le lien"
            >
              <Link2 className="size-4" />
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#d7efe9] text-[#0c0c0c]"
              aria-label="Partager sur LinkedIn"
            >
              <Linkedin className="size-4" />
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#d7efe9] text-[#0c0c0c]"
              aria-label="Partager sur X"
            >
              <X className="size-4" />
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#d7efe9] text-[#0c0c0c]"
              aria-label="Partager sur Facebook"
            >
              <Facebook className="size-4" />
            </button>
          </div>

          <div className="mt-8 h-[220px] overflow-hidden rounded-2xl bg-[#dedede]">
            <HeroImagePlaceholder />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[720px] space-y-6 px-5 text-[#0c0c0c]">
        <h2 className="text-[2rem] font-semibold leading-[1.2]">
          Articles récents
        </h2>
        <div className="space-y-4">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block rounded-2xl border border-[rgba(12,12,12,0.1)] bg-white p-5 transition hover:shadow-sm"
            >
              <div className="flex items-center justify-between text-[0.875rem] text-[#0c0c0c]">
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="mt-3 text-[1.25rem] font-semibold leading-[1.4]">
                {article.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-[1.6]">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
