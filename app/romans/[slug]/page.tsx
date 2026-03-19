import Button from "@/app/src/components/atoms/Button";
import BookCard from "@/app/src/components/molecules/BookCard";
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import {
  getReviewsByRomanId,
  getRomanBySlug,
  getTopRomans,
} from "@/app/src/lib/romans";
import { Image as ImageIcon, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type RomanPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function RomanPage({ params }: RomanPageProps) {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();
  const roman = await getRomanBySlug(normalizedSlug);

  if (!roman) {
    notFound();
  }
  const reviews = await getReviewsByRomanId(roman.id);
  const topRomans = await getTopRomans(roman.id, 3);

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-surface-mint">
        <div className="mx-auto w-full max-w-[720px] space-y-6 px-5 py-12 text-ink sm:py-16">
          <h1 className="text-[2.75rem] font-bold leading-[1.1] tracking-[0.01em] sm:text-[4rem]">
            {roman.title}
          </h1>

          <div className="flex flex-wrap gap-3">
            {roman.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[10px] border border-border-medium bg-white px-4 py-1 text-[0.875rem] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-[1rem] leading-[1.7] sm:text-[1.125rem]">
            {roman.summary}
          </p>

          <div className="h-[240px] overflow-hidden rounded-2xl bg-surface-placeholder">
            <HeroImagePlaceholder />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[720px] space-y-8 px-5 text-ink">
        <div className="space-y-3">
          <h2 className="text-[2.25rem] font-bold leading-[1.1] tracking-[0.01em] sm:text-[3rem]">
            L&apos;histoire qui vous attend
          </h2>
        </div>

        <div className="space-y-5 text-[1rem] leading-[1.7] sm:text-[1.125rem]">
          {roman.story.map((paragraph, index) => (
            <p key={`${roman.slug}-story-${index}`}>{paragraph}</p>
          ))}
        </div>

        <div className="rounded-2xl border border-border-subtle bg-white p-6">
          <h3 className="text-[1.25rem] font-semibold leading-[1.4]">
            Informations complémentaires
          </h3>
          <dl className="mt-4 space-y-3 text-[0.95rem]">
            <div className="flex items-center justify-between">
              <dt className="text-ink">Genre</dt>
              <dd className="font-medium text-ink">
                {roman.details.genre}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink">Nombre de pages</dt>
              <dd className="font-medium text-ink">
                {roman.details.pages}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink">Année</dt>
              <dd className="font-medium text-ink">
                {roman.details.year}
              </dd>
            </div>
            {roman.details.isbn && (
              <div className="flex items-center justify-between">
                <dt className="text-ink">ISBN</dt>
                <dd className="font-medium text-ink">
                  {roman.details.isbn}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <a href={roman.availability.url} target="_blank" rel="noreferrer">
            <Button
              variant="primary"
              className="rounded-[12px] border border-brand bg-brand px-5 py-2 text-[0.95rem] leading-[1.6] text-white hover:bg-brand-hover"
            >
              {roman.availability.label}
            </Button>
          </a>
          <Link href="/romans">
            <Button
              variant="secondary"
              className="rounded-[12px] border border-border-strong px-5 py-2 text-[0.95rem] leading-[1.6] text-ink"
            >
              Voir tous les romans
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[720px] px-5 text-center text-ink">
        <p className="text-[0.875rem] font-semibold uppercase tracking-[0.2em]">
          Essence
        </p>
        <h2 className="mt-4 text-[2.5rem] font-bold leading-[1.1] tracking-[0.01em] sm:text-[3.5rem]">
          Pourquoi ce roman vous
          <br />
          touchera
        </h2>
        <p className="mt-4 text-[1rem] leading-[1.7] sm:text-[1.125rem]">
          Chloé Simart crée des mondes où le handicap n&apos;est jamais une limite
          narrative, mais une richesse narrative.
        </p>

        {topRomans.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border-subtle bg-white px-6 py-10 text-left">
            <h3 className="text-[1.25rem] font-semibold">
              Aucun autre roman disponible
            </h3>
            <p className="mt-2 text-[0.95rem] leading-[1.6]">
              Revenez bientôt pour découvrir de nouvelles lectures.
            </p>
          </div>
        ) : (
          <div className="mt-12 space-y-12 text-left">
            {topRomans.map((item) => (
              <div key={item.id} className="space-y-6">
                <div className="h-[220px] overflow-hidden rounded-2xl bg-surface-placeholder">
                  <HeroImagePlaceholder />
                </div>
                <h3 className="text-[1.75rem] font-semibold leading-[1.25]">
                  {item.title}
                </h3>
                <p className="text-[1rem] leading-[1.7]">
                  {item.shortDescription}
                </p>
                <Link href={`/romans/${item.slug}`}>
                  <Button
                    variant="secondary"
                    className="rounded-[12px] border border-border-strong px-5 py-2 text-[0.95rem] leading-[1.6] text-ink"
                  >
                    Découvrir
                  </Button>
                </Link>
              </div>
            ))}
            {topRomans.length < 3 &&
              Array.from({ length: 3 - topRomans.length }).map((_, index) => (
                <div
                  key={`roman-placeholder-${index}`}
                  className="space-y-4 rounded-2xl border border-dashed border-border-soft p-6 text-center"
                >
                  <p className="text-[0.95rem]">
                    Un nouveau roman arrive bientôt.
                  </p>
                </div>
              ))}
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-[720px] px-5 text-center text-ink">
        <h2 className="text-[2.5rem] font-bold leading-[1.1] tracking-[0.01em] sm:text-[3.5rem]">
          Avis de lecteurs
        </h2>
        <p className="mt-4 text-[1rem] leading-[1.7] sm:text-[1.125rem]">
          Ce que disent ceux qui ont lu
        </p>

        {reviews.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border-subtle bg-white px-6 py-10 text-left">
            <h3 className="text-[1.25rem] font-semibold">
              Aucun avis pour le moment
            </h3>
            <p className="mt-2 text-[0.95rem] leading-[1.6]">
              Soyez le premier à partager votre ressenti sur ce roman.
            </p>
            <p className="mt-4 text-[0.85rem] text-ink">
              Un formulaire d&apos;avis pourra être ajouté ici prochainement.
            </p>
          </div>
        ) : (
          <div className="mt-12 space-y-12 text-ink">
            {reviews.map((review) => (
              <div key={review.id} className="space-y-6">
                <div className="text-[1.125rem] font-semibold">Webflow</div>
                <p className="text-[1.35rem] font-semibold leading-[1.4]">
                  &laquo; {review.comment} &raquo;
                </p>
                <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-surface-placeholder-strong text-icon-placeholder">
                  <ImageIcon className="size-5" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <p className="text-[1.05rem] font-semibold">{review.name}</p>
                  <p className="text-[0.95rem]">{review.role}</p>
                </div>
                <div className="flex items-center justify-center gap-3 text-[0.85rem] text-ink">
                  <span>
                    {new Date(review.date).toLocaleDateString("fr-FR")}
                  </span>
                  {review.rating && (
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-4" aria-hidden="true" />
                      {review.rating}/5
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
