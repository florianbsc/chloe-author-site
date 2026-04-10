import Link from "next/link";
import { notFound } from "next/navigation";
import { Facebook, Image as ImageIcon, Link2, Linkedin, X } from "lucide-react";

import Badge from "@/app/src/components/atoms/Badge";
import Button from "@/app/src/components/atoms/Button";
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import Input from "@/app/src/components/atoms/Input";
import ReviewCard from "@/app/src/components/molecules/ReviewCard";
import { getArticleBySlug, getArticles, getRomans } from "@/app/src/lib/pocketbase";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

function toTagLabel(raw: string): string {
  const value = raw.replace(/^cat-/, "").replace(/-/g, " ").trim();
  if (!value) {
    return "Article";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug.toLowerCase());

  if (!article) {
    notFound();
  }

  const [articles, romans] = await Promise.all([getArticles(), getRomans()]);
  const relatedArticles = articles.filter((item) => item.id !== article.id).slice(0, 2);
  const highlightedRoman = romans[0];
  const paragraphs = article.content
    .split(/\n{2,}/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="section-wrap-sm section-pad-md text-ink">
      <section className="stack-md">
        <p className="eyebrow">
          Actualites <span className="mx-2">›</span> {article.title}
        </p>

        <h1 className="text-h2 font-bold leading-tight tracking-title sm:text-6xl-custom">
          {article.title}
        </h1>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-placeholder-strong text-icon-placeholder">
            <ImageIcon className="size-5" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="text-body font-semibold">{article.writtenBy?.name ?? "Chloe Simart"}</p>
            <p className="text-body-sm text-ink">{formatDate(article.publishedAt)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
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

        <div className="h-56 overflow-hidden rounded-2xl bg-surface-placeholder">
          <HeroImagePlaceholder />
        </div>
      </section>

      <section className="mt-12 stack-md text-body leading-body-lg">
        <h2 className="text-h3 font-semibold leading-title">Introduction</h2>
        {paragraphs.map((paragraph, index) => (
          <p key={`${article.id}-paragraph-${index}`}>{paragraph}</p>
        ))}
      </section>

      <section className="mt-12 stack-sm">
        <p className="eyebrow">Tags</p>
        <div className="flex flex-wrap gap-2">
          {(article.categoryIds.length > 0 ? article.categoryIds : ["article"]).map((tag) => (
            <Badge key={tag} variant="outline" size="sm">
              {toTagLabel(tag)}
            </Badge>
          ))}
        </div>
      </section>

      <section className="mt-16 stack-md text-center">
        <h2 className="text-4xl-custom font-bold leading-tight tracking-title">Articles lies</h2>
        {relatedArticles.length === 0 ? (
          <div className="rounded-2xl border border-border-subtle bg-surface p-6 text-left">
            <h3 className="text-h5 font-semibold">Aucun article complementaire</h3>
            <p className="mt-2 text-body">De nouveaux contenus seront publies prochainement.</p>
          </div>
        ) : (
          <div className="stack-sm text-left">
            {relatedArticles.map((item) => (
              <Link
                key={item.id}
                href={`/articles/${item.slug}`}
                className="block rounded-2xl border border-border-subtle bg-surface p-5 transition hover:shadow-sm"
              >
                <p className="text-body-sm text-ink">{formatDate(item.publishedAt)}</p>
                <h3 className="mt-2 text-h5 font-semibold leading-title">{item.title}</h3>
                <p className="mt-2 text-body leading-body">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-16 stack-md text-center text-ink">
        <h2 className="text-4xl-custom font-bold leading-tight tracking-title sm:text-5xl-custom">
          Avis de lecteurs
        </h2>
        <p className="text-body leading-body-lg">Ce que les lecteurs en pensent</p>

        <div className="mt-10 stack-lg text-ink">
          <ReviewCard
            logo="Webflow"
            quote="Une ecriture juste et profonde qui reste longtemps en memoire."
            name="Marie Dupont"
            role="Lectrice passionnee"
          />
          <ReviewCard
            logo="Webflow"
            quote="Chaque article donne envie de lire encore plus de romans."
            name="Thomas Bernard"
            role="Lecteur engage"
          />
        </div>
      </section>

      <section className="mt-16 rounded-3xl bg-surface-mint px-5 py-12 text-center text-ink sm:px-8">
        <h2 className="text-4xl-custom font-bold leading-tight tracking-title sm:text-5xl-custom">
          Poursuivez la lecture
          <br />
          Explorez mes univers
        </h2>
        <p className="mt-4 text-body leading-body-lg sm:text-body-lg">
          Decouvrez mes autres romans et plongez dans des histoires qui transforment.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/romans">
            <Button variant="primary" size="md">
              Lire
            </Button>
          </Link>
          <Link href="#newsletter">
            <Button variant="secondary" size="md">
              S abonner
            </Button>
          </Link>
        </div>
      </section>

      <section id="newsletter" className="mt-16 text-center text-ink">
        <h2 className="text-4xl-custom font-bold leading-tight tracking-title sm:text-5xl-custom">
          Restez connecte
          <br />A l actualite
        </h2>
        <p className="mt-4 text-body leading-body-lg sm:text-body-lg">
          Recevez les dates de sortie et les nouvelles directement dans votre boite.
        </p>

        <form className="mt-8 stack-sm">
          <div className="py-2 text-left">
            <label htmlFor="article-newsletter-email" className="sr-only">
              Votre email
            </label>
            <Input
              id="article-newsletter-email"
              name="email"
              type="email"
              required
              placeholder="Votre email"
              variant="underline"
              size="md"
            />
          </div>
          <Button type="submit" variant="primary" size="md" className="w-full">
            S abonner
          </Button>
        </form>
      </section>

      {highlightedRoman && (
        <section className="mt-16 rounded-2xl border border-border-subtle bg-surface p-6 text-ink">
          <p className="eyebrow">Roman a la une</p>
          <h3 className="mt-2 text-h4 font-semibold">{highlightedRoman.title}</h3>
          <p className="mt-3 text-body leading-body">
            {highlightedRoman.fullDescription.split(/\n{2,}/)[0]}
          </p>
          <Link href={`/romans/${highlightedRoman.slug}`} className="mt-4 inline-flex">
            <Button variant="secondary" size="md">
              Voir le roman
            </Button>
          </Link>
        </section>
      )}
    </div>
  );
}
