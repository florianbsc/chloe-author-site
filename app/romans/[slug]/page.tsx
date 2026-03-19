import Button from "@/app/src/components/atoms/Button";
import Badge from "@/app/src/components/atoms/Badge";
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import ReviewCard from "@/app/src/components/molecules/ReviewCard";
import {
  getReviewsByRomanId,
  getRomanBySlug,
  getTopRomans,
} from "@/app/src/lib/romans";
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
      <section className="section-bleed bg-surface-mint">
        <div className="section-wrap-sm section-pad-md stack-md text-ink">
          <h1 className="text-h2 font-bold leading-tight tracking-title sm:text-7xl-custom">
            {roman.title}
          </h1>

          <div className="flex flex-wrap gap-3">
            {roman.tags.map((tag) => (
              <Badge key={tag} variant="outline" size="md">
                {tag}
              </Badge>
            ))}
          </div>

          <p className="text-body leading-body-lg sm:text-body-lg">
            {roman.summary}
          </p>

          <div className="h-60 overflow-hidden rounded-2xl bg-surface-placeholder">
            <HeroImagePlaceholder />
          </div>
        </div>
      </section>

      <section className="section-wrap-sm stack-xl text-ink">
        <div className="stack-sm">
          <h2 className="text-3xl-custom font-bold leading-tight tracking-title sm:text-h1">
            L&apos;histoire qui vous attend
          </h2>
        </div>

        <div className="stack-md text-body leading-body-lg sm:text-body-lg">
          {roman.story.map((paragraph, index) => (
            <p key={`${roman.slug}-story-${index}`}>{paragraph}</p>
          ))}
        </div>

        <div className="rounded-2xl border border-border-subtle bg-surface p-6">
          <h3 className="text-h5 font-semibold leading-title">
            Informations complémentaires
          </h3>
          <dl className="mt-4 space-y-3 text-body">
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
            <Button variant="primary" size="lg">
              {roman.availability.label}
            </Button>
          </a>
          <Link href="/romans">
            <Button variant="secondary" size="lg">
              Voir tous les romans
            </Button>
          </Link>
        </div>
      </section>

      <section className="section-wrap-sm text-center text-ink">
        <p className="eyebrow">
          Essence
        </p>
        <h2 className="mt-4 text-4xl-custom font-bold leading-tight tracking-title sm:text-5xl-custom">
          Pourquoi ce roman vous
          <br />
          touchera
        </h2>
        <p className="mt-4 text-body leading-body-lg sm:text-body-lg">
          Chloé Simart crée des mondes où le handicap n&apos;est jamais une limite
          narrative, mais une richesse narrative.
        </p>

        {topRomans.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border-subtle bg-surface px-6 py-10 text-left">
            <h3 className="text-h5 font-semibold">
              Aucun autre roman disponible
            </h3>
            <p className="mt-2 text-body leading-body">
              Revenez bientôt pour découvrir de nouvelles lectures.
            </p>
          </div>
        ) : (
          <div className="mt-12 stack-lg text-left">
            {topRomans.map((item) => (
              <div key={item.id} className="stack-md">
                <div className="h-56 overflow-hidden rounded-2xl bg-surface-placeholder">
                  <HeroImagePlaceholder />
                </div>
                <h3 className="text-2xl-custom font-semibold leading-subtitle">
                  {item.title}
                </h3>
                <p className="text-body leading-body-lg">
                  {item.shortDescription}
                </p>
                <Link href={`/romans/${item.slug}`}>
                  <Button variant="secondary" size="md">
                    Découvrir
                  </Button>
                </Link>
              </div>
            ))}
            {topRomans.length < 3 &&
              Array.from({ length: 3 - topRomans.length }).map((_, index) => (
                <div
                  key={`roman-placeholder-${index}`}
                  className="stack-sm rounded-2xl border border-dashed border-border-subtle p-6 text-center"
                >
                  <p className="text-body">
                    Un nouveau roman arrive bientôt.
                  </p>
                </div>
              ))}
          </div>
        )}
      </section>

      <section className="section-wrap-sm text-center text-ink">
        <h2 className="text-4xl-custom font-bold leading-tight tracking-title sm:text-5xl-custom">
          Avis de lecteurs
        </h2>
        <p className="mt-4 text-body leading-body-lg sm:text-body-lg">
          Ce que disent ceux qui ont lu
        </p>

        {reviews.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border-subtle bg-surface px-6 py-10 text-left">
            <h3 className="text-h5 font-semibold">
              Aucun avis pour le moment
            </h3>
            <p className="mt-2 text-body leading-body">
              Soyez le premier à partager votre ressenti sur ce roman.
            </p>
            <p className="mt-4 text-body-sm text-ink">
              Un formulaire d&apos;avis pourra être ajouté ici prochainement.
            </p>
          </div>
        ) : (
          <div className="mt-12 stack-lg text-ink">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                quote={review.comment}
                name={review.name}
                role={review.role}
                date={new Date(review.date).toLocaleDateString("fr-FR")}
                rating={review.rating ?? undefined}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
