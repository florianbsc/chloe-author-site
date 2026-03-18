import Button from "@/app/src/components/atoms/Button";
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import { getRomanBySlug } from "@/app/src/lib/romans";
import { Link } from "lucide-react";
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

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#e9f8f7]">
        <div className="mx-auto w-full max-w-[720px] space-y-6 px-5 py-12 text-[#0c0c0c] sm:py-16">
          <h1 className="text-[2.75rem] font-bold leading-[1.1] tracking-[0.01em] sm:text-[4rem]">
            {roman.title}
          </h1>

          <div className="flex flex-wrap gap-3">
            {roman.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[10px] border border-[rgba(12,12,12,0.2)] bg-white px-4 py-1 text-[0.875rem] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-[1rem] leading-[1.7] sm:text-[1.125rem]">
            {roman.summary}
          </p>

          <div className="h-[240px] overflow-hidden rounded-2xl bg-[#dedede]">
            <HeroImagePlaceholder />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[720px] space-y-8 px-5 text-[#0c0c0c]">
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

        <div className="rounded-2xl border border-[rgba(12,12,12,0.1)] bg-white p-6">
          <h3 className="text-[1.25rem] font-semibold leading-[1.4]">
            Informations complémentaires
          </h3>
          <dl className="mt-4 space-y-3 text-[0.95rem]">
            <div className="flex items-center justify-between">
              <dt className="text-[#0c0c0c]">Genre</dt>
              <dd className="font-medium text-[#0c0c0c]">
                {roman.details.genre}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[#0c0c0c]">Nombre de pages</dt>
              <dd className="font-medium text-[#0c0c0c]">
                {roman.details.pages}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[#0c0c0c]">Année</dt>
              <dd className="font-medium text-[#0c0c0c]">
                {roman.details.year}
              </dd>
            </div>
            {roman.details.isbn && (
              <div className="flex items-center justify-between">
                <dt className="text-[#0c0c0c]">ISBN</dt>
                <dd className="font-medium text-[#0c0c0c]">
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
              className="rounded-[12px] border border-[#2abab0] bg-[#2abab0] px-5 py-2 text-[0.95rem] leading-[1.6] text-white hover:bg-[#239f96]"
            >
              {roman.availability.label}
            </Button>
          </a>
          <Link href="/romans">
            <Button
              variant="secondary"
              className="rounded-[12px] border border-[rgba(12,12,12,0.25)] px-5 py-2 text-[0.95rem] leading-[1.6] text-[#0c0c0c]"
            >
              Voir tous les romans
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
