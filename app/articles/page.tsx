import Link from "next/link";
import Image from "next/image";
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import { Facebook, Image as ImageIcon, Link2, Linkedin, X } from "lucide-react";
import { getArticles } from "@/app/src/lib/articles";
import { getPageBySlug } from "@/app/src/lib/pages";

function formatDate(value?: string) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function ArticlesPage() {
  const [articles, page] = await Promise.all([
    getArticles(),
    getPageBySlug("articles"),
  ]);
  const featured = articles[0];
  const otherArticles = articles.slice(1);
  const heroSection = page?.sections.find((section) => section.type === "articles-hero")?.data ?? {};

  if (!featured) {
    return (
      <div className="section-wrap-sm section-pad-md text-ink">
        <h1 className="text-h2 font-bold leading-tight tracking-title">
          Aucun article disponible
        </h1>
        <p className="mt-4 text-body leading-body-lg">
          Revenez bientôt pour découvrir les dernières actualités.
        </p>
      </div>
    );
  }

  const authorName = featured.author?.name ?? "Chloé Simart";
  const authorRole = featured.author?.role ?? "Autrice";

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="section-bleed bg-surface-mint">
        <div className="section-wrap-sm section-pad-md text-ink">
          <p className="eyebrow">
            Actualités <span className="mx-2">›</span> Articles
          </p>

          <h1 className="mt-4 text-h2 font-bold leading-tight tracking-title sm:text-6xl-custom">
            {(heroSection.title as string) ?? featured.title}
          </h1>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-placeholder-strong text-icon-placeholder">
              {featured.author?.avatar ? (
                <Image
                  src={featured.author.avatar}
                  alt={authorName}
                  width={48}
                  height={48}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <ImageIcon className="size-5" aria-hidden="true" />
              )}
            </div>

            <div className="space-y-1">
              <p className="text-body font-semibold">{authorName}</p>
              <p className="text-body-sm text-ink">
                {formatDate(featured.publishedAt)} <span className="mx-2">•</span>{" "}
                {featured.readTime ?? "4 min"}
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
            {featured.cover ? (
              <Image
                src={featured.cover}
                alt={featured.coverAlt ?? featured.title}
                width={900}
                height={540}
                className="h-full w-full object-cover"
              />
            ) : (
              <HeroImagePlaceholder />
            )}
          </div>

          <div className="mt-6">
            <Link
              href={`/articles/${featured.slug}`}
              className="text-body font-semibold text-ink underline"
            >
              Lire l&apos;article
            </Link>
          </div>
        </div>
      </section>

      <section className="section-wrap-sm stack-md text-ink">
        <h2 className="text-h3 font-semibold leading-title">
          Articles récents
        </h2>
        <div className="stack-sm">
          {otherArticles.length === 0 ? (
            <div className="rounded-2xl border border-border-subtle bg-surface p-5 text-body leading-body">
              Aucun autre article disponible pour le moment.
            </div>
          ) : (
            otherArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="block rounded-2xl border border-border-subtle bg-surface p-5 transition hover:shadow-sm"
              >
                <div className="flex items-center justify-between text-body-sm text-ink">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span>{article.readTime ?? "4 min"}</span>
                </div>
                <h3 className="mt-3 text-h5 font-semibold leading-title">
                  {article.title}
                </h3>
                <p className="mt-2 text-body leading-body">
                  {article.excerpt}
                </p>
              </Link>
            ))
          )}
        </div>

        <div className="mt-8 text-body-sm text-ink">
          <p>{authorRole}</p>
        </div>
      </section>
    </div>
  );
}
