import Button from "@/app/src/components/atoms/Button";
import Badge from "@/app/src/components/atoms/Badge";
import Input from "@/app/src/components/atoms/Input";
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import ReviewCard from "@/app/src/components/molecules/ReviewCard";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Image as ImageIcon,
  Link2,
  Linkedin,
  X,
} from "lucide-react";
import { getArticleBySlug } from "@/app/src/lib/articles";
import { getTestimonials } from "@/app/src/lib/testimonials";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { subscribeNewsletterAction } from "@/app/src/actions/newsletter";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ContentBlock = {
  type: string;
  value?: string;
  data?: Record<string, unknown>;
};

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

function normalizeContent(content: string | ContentBlock[]) {
  if (Array.isArray(content)) {
    return content;
  }
  return content
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => ({ type: "paragraph", value: paragraph }));
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "heading":
      return (
        <h3 key={`heading-${index}`} className="text-h5 font-semibold leading-title">
          {block.value}
        </h3>
      );
    case "quote":
      return (
        <blockquote
          key={`quote-${index}`}
          className="border-l border-border-medium pl-6 text-body-lg italic leading-body-lg text-ink"
        >
          {block.value}
        </blockquote>
      );
    case "image": {
      const src = block.data?.src as string | undefined;
      const caption = block.data?.caption as string | undefined;
      return (
        <div key={`image-${index}`} className="stack-sm">
          <div className="h-56 overflow-hidden rounded-2xl bg-surface-placeholder">
            {src ? (
              <Image
                src={src}
                alt={caption ?? "Image d'illustration"}
                width={900}
                height={560}
                className="h-full w-full object-cover"
              />
            ) : (
              <HeroImagePlaceholder />
            )}
          </div>
          {caption && (
            <p className="text-caption leading-body text-ink">{caption}</p>
          )}
        </div>
      );
    }
    default:
      return (
        <p key={`paragraph-${index}`} className="text-body leading-body-lg">
          {block.value}
        </p>
      );
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug.toLowerCase());
  return {
    title: article?.seoTitle ?? article?.title ?? "Article",
    description: article?.seoDescription ?? article?.excerpt ?? "Article",
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug.toLowerCase());
  const testimonials = await getTestimonials("articles");

  if (!article) {
    notFound();
  }

  const contentBlocks = normalizeContent(article.content);

  return (
    <div className="section-wrap-sm section-pad-md text-ink">
      <section className="stack-md">
        <p className="eyebrow">
          Actualités <span className="mx-2">›</span> Articles
        </p>
        <h1 className="text-h2 font-bold leading-tight tracking-title sm:text-6xl-custom">
          {article.title}
        </h1>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-placeholder-strong text-icon-placeholder">
            {article.author?.avatar ? (
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={48}
                height={48}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <ImageIcon className="size-5" aria-hidden="true" />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-body font-semibold">
              {article.author?.name ?? "Chloé Simart"}
            </p>
            <p className="text-body-sm text-ink">
              {formatDate(article.publishedAt)} <span className="mx-2">•</span>{" "}
              {article.readTime ?? "4 min"}
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
          {article.cover ? (
            <Image
              src={article.cover}
              alt={article.coverAlt ?? article.title}
              width={900}
              height={560}
              className="h-full w-full object-cover"
            />
          ) : (
            <HeroImagePlaceholder />
          )}
        </div>
      </section>

      <section className="mt-12 stack-md">
        <h2 className="text-h3 font-semibold leading-title">Introduction</h2>
        <div className="stack-md">
          {contentBlocks.length === 0 ? (
            <p className="text-body leading-body-lg">
              Le contenu de cet article arrive bientôt.
            </p>
          ) : (
            contentBlocks.map((block, index) => renderBlock(block, index))
          )}
        </div>
      </section>

      {article.conclusion && (
        <section className="mt-12 stack-md">
          <h2 className="text-h3 font-semibold leading-title">Conclusion</h2>
          <div className="stack-sm text-body leading-body-lg">
            {Array.isArray(article.conclusion)
              ? article.conclusion.map((paragraph, index) => (
                  <p key={`conclusion-${index}`}>{paragraph}</p>
                ))
              : (
                  <p>{article.conclusion}</p>
                )}
          </div>
        </section>
      )}

      <section className="mt-12 stack-md">
        <p className="eyebrow">Partager cet article</p>
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

        <div className="flex flex-wrap gap-2 pt-2">
          {(article.tags ?? []).map((tag) => (
            <Badge key={tag} variant="outline" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-3 border-t border-border-subtle pt-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-placeholder-strong text-icon-placeholder">
            <ImageIcon className="size-4" aria-hidden="true" />
          </div>
          <div className="stack-xs">
            <p className="text-body font-semibold">
              {article.author?.name ?? "Chloé Simart"}
            </p>
            <p className="text-body-sm text-ink">
              {article.author?.role ?? "Auteure de romans"}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 stack-md text-center">
        <h2 className="text-4xl-custom font-bold leading-tight tracking-title">
          Avis de lecteurs
        </h2>
        <p className="text-body leading-body-lg text-ink">
          Ce que les lecteurs en pensent
        </p>

        <div className="mt-10 stack-lg text-ink">
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
                Soyez le premier à partager votre ressenti.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mt-16 rounded-3xl bg-surface-mint px-5 py-12 text-center text-ink sm:px-8">
        <h2 className="text-4xl-custom font-bold leading-tight tracking-title sm:text-5xl-custom">
          Poursuivez la lecture
          <br />
          Explorez mes univers
        </h2>
        <p className="mt-4 text-body leading-body-lg sm:text-body-lg">
          Découvrez mes autres romans et plongez dans des histoires qui
          transforment.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/romans">
            <Button variant="primary" size="md">
              Lire
            </Button>
          </Link>
          <Link href="#newsletter">
            <Button variant="secondary" size="md">
              S&apos;abonner
            </Button>
          </Link>
        </div>
      </section>

      <section
        id="newsletter"
        className="mt-16 text-center text-ink"
      >
        <h2 className="text-4xl-custom font-bold leading-tight tracking-title sm:text-5xl-custom">
          Restez connecté
          <br />À l&apos;actualité
        </h2>
        <p className="mt-4 text-body leading-body-lg sm:text-body-lg">
          Recevez les dates de sortie et les nouvelles directement dans votre
          boîte.
        </p>

        <form action={subscribeNewsletterAction} className="mt-8 stack-sm">
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />
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
            S&apos;abonner
          </Button>
        </form>

        <p className="mt-4 text-caption leading-body text-ink">
          Nous respectons votre vie privée. Désinscription possible à tout
          moment.
        </p>
      </section>
    </div>
  );
}
