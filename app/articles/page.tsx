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
      <section className="section-bleed bg-surface-mint">
        <div className="section-wrap-sm section-pad-md text-ink">
          <p className="eyebrow">
            Actualités <span className="mx-2">›</span> Articles
          </p>

          <h1 className="mt-4 text-h2 font-bold leading-tight tracking-title sm:text-6xl-custom">
            La Loge des Silences sort enfin au monde
          </h1>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-placeholder-strong text-icon-placeholder">
              <span className="sr-only">Photo de l&aops;autrice</span>
              <ImageIcon className="size-5" aria-hidden="true" />
            </div>

            <div className="space-y-1">
              <p className="text-body font-semibold">Chloé Simart</p>
              <p className="text-body-sm text-ink">
                29 octobre 2024 <span className="mx-2">•</span> 4 min
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-ink"
              aria-label="Copier le lien"
            >
              <Link2 className="size-4" />
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-ink"
              aria-label="Partager sur LinkedIn"
            >
              <Linkedin className="size-4" />
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-ink"
              aria-label="Partager sur X"
            >
              <X className="size-4" />
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-ink"
              aria-label="Partager sur Facebook"
            >
              <Facebook className="size-4" />
            </button>
          </div>

          <div className="mt-8 h-56 overflow-hidden rounded-2xl bg-surface-placeholder">
            <HeroImagePlaceholder />
          </div>
        </div>
      </section>

      <section className="section-wrap-sm stack-md text-ink">
        <h2 className="text-h3 font-semibold leading-title">
          Articles récents
        </h2>
        <div className="stack-sm">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block rounded-2xl border border-border-subtle bg-surface p-5 transition hover:shadow-sm"
            >
              <div className="flex items-center justify-between text-body-sm text-ink">
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="mt-3 text-h5 font-semibold leading-title">
                {article.title}
              </h3>
              <p className="mt-2 text-body leading-body">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
