import Link from "next/link";
import { Facebook, Image as ImageIcon, Link2, Linkedin, X } from "lucide-react";

import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import { getArticles } from "@/app/src/lib/pocketbase";

function formatDate(date?: string): string {
  if (!date) {
    return "Date a venir";
  }

  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlesPage() {
  const articles = await getArticles();
  const featured = articles[0];

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="section-bleed bg-surface-mint">
        <div className="section-wrap-sm section-pad-md text-ink">
          <p className="eyebrow">
            Actualites <span className="mx-2">›</span> Articles
          </p>

          <h1 className="mt-4 text-h2 font-bold leading-tight tracking-title sm:text-6xl-custom">
            {featured?.title ?? "Les derniers articles"}
          </h1>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-placeholder-strong text-icon-placeholder">
              <span className="sr-only">Photo de l autrice</span>
              <ImageIcon className="size-5" aria-hidden="true" />
            </div>

            <div className="space-y-1">
              <p className="text-body font-semibold">
                {featured?.writtenBy?.name ?? "Chloe Simart"}
              </p>
              <p className="text-body-sm text-ink">
                {formatDate(featured?.publishedAt)}
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
        <h2 className="text-h3 font-semibold leading-title">Articles recents</h2>

        {articles.length === 0 ? (
          <div className="rounded-2xl border border-border-subtle bg-surface p-6">
            <h3 className="text-h5 font-semibold">Aucun article publie</h3>
            <p className="mt-2 text-body leading-body">
              Revenez bientot pour lire les prochains contenus.
            </p>
          </div>
        ) : (
          <div className="stack-sm">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="block rounded-2xl border border-border-subtle bg-surface p-5 transition hover:shadow-sm"
              >
                <div className="flex items-center justify-between text-body-sm text-ink">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span>{article.featured ? "A la une" : "Article"}</span>
                </div>
                <h3 className="mt-3 text-h5 font-semibold leading-title">{article.title}</h3>
                <p className="mt-2 text-body leading-body">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
