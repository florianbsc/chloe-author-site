import Link from "next/link";
import Image from "next/image";
import type { ElementType } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Clock,
  ConciergeBell,
  FileText,
  Globe,
  House,
  PartyPopper,
  Search,
  Triangle,
  User,
  EyeOff,
  Linkedin,
  X,
  ChevronRight,
  Compass,
  Video,
} from "lucide-react";
import type { PageSection } from "@/app/src/lib/pages";
import type { Roman } from "@/app/src/lib/romans";
import type { Article } from "@/app/src/lib/articles";
import type { Author } from "@/app/src/lib/authors";
import type { Testimonial } from "@/app/src/lib/testimonials";
import HomeHero from "@/app/src/components/organisms/home/HomeHero";
import HomeRomansSection from "@/app/src/components/organisms/home/HomeRomansSection";
import HomeAuthorSection from "@/app/src/components/organisms/home/HomeAuthorSection";
import HomeHighlightsSection from "@/app/src/components/organisms/home/HomeHighlightsSection";
import HomeQuoteSection from "@/app/src/components/organisms/home/HomeQuoteSection";
import HomeNewsletterCtaSection from "@/app/src/components/organisms/home/HomeNewsletterCtaSection";
import AboutHero from "@/app/src/components/organisms/about/AboutHero";
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import Button from "@/app/src/components/atoms/Button";
import Badge from "@/app/src/components/atoms/Badge";
import Input from "@/app/src/components/atoms/Input";
import ReviewCard from "@/app/src/components/molecules/ReviewCard";
import { subscribeNewsletterAction } from "@/app/src/actions/newsletter";

const ICONS: Record<string, ElementType> = {
  Box,
  Clock,
  FileText,
  User,
  EyeOff,
  PartyPopper,
  House,
  Triangle,
  Search,
  Compass,
  Video,
  ConciergeBell,
  Globe,
  Linkedin,
  X,
};

function resolveIcon(name?: string) {
  if (!name) {
    return Box;
  }
  return ICONS[name] ?? Box;
}

type SectionContext = {
  romans?: Roman[];
  articles?: Article[];
  authors?: Author[];
  testimonials?: Testimonial[];
};

type SectionRendererProps = {
  sections: PageSection[];
  context?: SectionContext;
};

export default function SectionRenderer({ sections, context }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        const data = section.data ?? {};

        switch (section.type) {
          case "home-hero": {
            return (
              <HomeHero
                key={section.id}
                title={data.title as string}
                subtitle={data.subtitle as string}
                primaryCta={data.primaryCta as { label: string; href: string }}
                secondaryCta={data.secondaryCta as { label: string; href: string }}
                image={data.image as string}
                imageAlt={data.imageAlt as string}
              />
            );
          }
          case "home-romans": {
            return (
              <HomeRomansSection
                key={section.id}
                eyebrow={data.eyebrow as string}
                title={data.title as string}
                subtitle={data.subtitle as string}
                primaryCta={data.primaryCta as { label: string; href: string }}
                secondaryCta={data.secondaryCta as { label: string; href: string }}
                romans={context?.romans}
                items={data.items as Array<Record<string, unknown>>}
              />
            );
          }
          case "home-author": {
            return (
              <HomeAuthorSection
                key={section.id}
                eyebrow={data.eyebrow as string}
                title={data.title as string}
                description={data.description as string}
                primaryCta={data.primaryCta as { label: string; href: string }}
                secondaryCta={data.secondaryCta as { label: string; href: string }}
              />
            );
          }
          case "home-highlights": {
            return (
              <HomeHighlightsSection
                key={section.id}
                primaryFeatures={data.primaryFeatures as Array<Record<string, unknown>>}
                secondaryFeatures={data.secondaryFeatures as Array<Record<string, unknown>>}
                primaryCta={data.primaryCta as { label: string; href: string }}
                secondaryCta={data.secondaryCta as { label: string; href: string }}
              />
            );
          }
          case "home-quote": {
            return (
              <HomeQuoteSection
                key={section.id}
                title={data.title as string}
                subtitle={data.subtitle as string}
              />
            );
          }
          case "home-newsletter": {
            return (
              <HomeNewsletterCtaSection
                key={section.id}
                titleLines={data.titleLines as string[]}
                description={data.description as string}
                form={data.form as { buttonLabel?: string; placeholder?: string; note?: string }}
              />
            );
          }
          case "about-hero": {
            return (
              <AboutHero
                key={section.id}
                eyebrow={data.eyebrow as string}
                title={data.title as string}
                description={data.description as string}
                primaryCta={data.primaryCta as { label: string; href: string }}
                secondaryCta={data.secondaryCta as { label: string; href: string }}
              />
            );
          }
          case "about-features": {
            const items = (data.items as Array<Record<string, unknown>>) ?? [];
            return (
              <section key={section.id} className="section-bleed bg-surface">
                <div className="section-wrap-xl py-16 lg:py-24">
                  <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
                    <div className="flex-1 stack-lg text-ink">
                      {items.map((item, index) => {
                        const Icon = resolveIcon(item.icon as string);
                        return (
                          <div key={`${item.title}-${index}`} className="stack-sm">
                            <Icon aria-hidden="true" className="size-8 icon-stroke" />
                            <h3 className="text-h4 font-semibold leading-subtitle">
                              {item.title as string}
                            </h3>
                            <p className="text-body leading-body">
                              {item.description as string}
                            </p>
                          </div>
                        );
                      })}
                      {Boolean(data.cta) && (
                        <div className="flex items-center gap-4 pt-2">
                          <Link href={(data.cta as { href: string }).href}>
                            <Button variant="third" size="md">
                              {(data.cta as { label: string }).label}
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="hero-media-alt">
                        <HeroImagePlaceholder />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }
          case "about-stats": {
            const stats = (data.stats as Array<Record<string, unknown>>) ?? [];
            return (
              <section key={section.id} className="section-wrap-sm section-pad-md text-ink">
                <div className="stack-md">
                  {Boolean(data.eyebrow) && <p className="eyebrow">{data.eyebrow as string}</p>}
                  <h2 className="text-h2 font-bold leading-tight tracking-title">
                    {data.title as string}
                  </h2>
                  <p className="text-body leading-body-lg">{data.description as string}</p>
                  {Boolean(data.cta) && (
                    <Link href={(data.cta as { href: string }).href}>
                      <Button variant="third" size="md">
                        {(data.cta as { label: string }).label}
                      </Button>
                    </Link>
                  )}
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  {stats.map((stat, index) => (
                    <div key={`${stat.label}-${index}`} className="rounded-2xl border border-border-subtle bg-surface p-6">
                      <p className="text-3xl-custom font-semibold text-ink">
                        {stat.value as string}
                      </p>
                      <p className="mt-2 text-body leading-body text-ink">
                        {stat.label as string}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }
          case "about-values": {
            const items = (data.items as Array<Record<string, unknown>>) ?? [];
            return (
              <section key={section.id} className="section-bleed bg-surface-mint">
                <div className="section-wrap-sm section-pad-lg text-center">
                  {Boolean(data.eyebrow) && <p className="eyebrow">{data.eyebrow as string}</p>}
                  <h2 className="mt-4 text-h2 font-bold leading-tight tracking-title text-ink sm:text-5xl-custom">
                    {data.title as string}
                  </h2>
                  <p className="mt-4 text-body leading-body-lg text-ink sm:text-body-lg">
                    {data.description as string}
                  </p>

                  <div className="mt-12 stack-lg text-left sm:mt-16">
                    {items.map((item, index) => (
                      <div key={`${item.title}-${index}`} className="stack-md">
                        <div className="h-56 overflow-hidden rounded-2xl bg-surface-placeholder">
                          {item.image ? (
                            <Image
                              src={item.image as string}
                              alt={(item.title as string) ?? ""}
                              width={600}
                              height={360}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <HeroImagePlaceholder />
                          )}
                        </div>
                        <h3 className="text-2xl-custom font-semibold leading-subtitle text-ink">
                          {item.title as string}
                        </h3>
                        <p className="text-body leading-body-lg text-ink">
                          {item.description as string}
                        </p>
                      </div>
                    ))}
                  </div>

                  {Boolean(data.cta) && (
                    <div className="mt-12 flex items-center justify-center gap-4">
                      <Link href={(data.cta as { href: string }).href}>
                        <Button variant="third" size="md">
                          {(data.cta as { label: string }).label}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            );
          }
          case "about-authors": {
            const authors = context?.authors ?? [];
            return (
              <section key={section.id} className="section-bleed bg-surface">
                <div className="section-wrap-sm section-pad-lg">
                  <div className="stack-sm text-ink">
                    {Boolean(data.eyebrow) && <p className="eyebrow">{data.eyebrow as string}</p>}
                    <h2 className="text-h2 font-bold leading-tight tracking-title sm:text-6xl-custom">
                      {data.title as string}
                    </h2>
                    <p className="text-body leading-body-lg sm:text-body-lg">
                      {data.description as string}
                    </p>
                    {Boolean(data.cta) && (
                      <Link href={(data.cta as { href: string }).href}>
                        <Button variant="third" size="md" className="mt-4">
                          {(data.cta as { label: string }).label}
                        </Button>
                      </Link>
                    )}
                  </div>

                  <div className="mt-12 stack-lg">
                    {authors.length > 0 ? (
                      authors.map((author) => (
                        <div key={author.id} className="stack-sm">
                          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface-placeholder text-icon-placeholder">
                            <Globe className="size-8" aria-hidden="true" />
                          </div>

                          <div className="stack-sm">
                            <h3 className="text-h4 font-semibold leading-subtitle text-ink">
                              {author.name}
                            </h3>
                            <p className="text-body leading-body text-ink">
                              {author.role}
                            </p>
                          </div>

                          {author.quote && (
                            <p className="text-body leading-body-lg text-ink">
                              {author.quote}
                            </p>
                          )}

                          <div className="flex items-center gap-4 text-ink">
                            {(author.socials ?? []).length > 0 ? (
                              author.socials?.map((social) => (
                                <Link key={social.label} href={social.href}>
                                  {social.label}
                                </Link>
                              ))
                            ) : (
                              <>
                                <Linkedin className="size-5" aria-hidden="true" />
                                <X className="size-5" aria-hidden="true" />
                                <Globe className="size-5" aria-hidden="true" />
                              </>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-border-subtle bg-surface p-6 text-body leading-body text-ink">
                        Les auteurs seront bientôt disponibles.
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          }
          case "about-reviews": {
            const testimonials = context?.testimonials ?? [];
            return (
              <section key={section.id} className="section-bleed bg-surface-mint">
                <div className="section-wrap-sm section-pad-lg text-center">
                  <h2 className="text-h2 font-bold leading-tight tracking-title text-ink sm:text-6xl-custom">
                    {(data.title as string) ?? "Lecteurs parlent"}
                  </h2>
                  <p className="mt-4 text-body leading-body-lg text-ink sm:text-body-lg">
                    {(data.subtitle as string) ?? "Leurs mots me portent"}
                  </p>

                  <div className="mt-12 stack-lg text-ink">
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
                          Les premiers témoignages seront publiés prochainement.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          }
          case "about-cta": {
            return (
              <section key={section.id} className="section-bleed bg-surface">
                <div className="section-wrap-sm section-pad-lg text-center">
                  <h2 className="text-h2 font-bold leading-tight tracking-title text-ink">
                    {data.title as string}
                  </h2>
                  <p className="mt-4 text-body leading-body-lg text-ink">
                    {data.description as string}
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-4">
                    {Boolean(data.primaryCta) && (
                      <Link href={(data.primaryCta as { href: string }).href}>
                        <Button variant="primary">
                          {(data.primaryCta as { label: string }).label}
                        </Button>
                      </Link>
                    )}
                    {Boolean(data.secondaryCta) && (
                      <Link href={(data.secondaryCta as { href: string }).href}>
                        <Button variant="third">
                          {(data.secondaryCta as { label: string }).label}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </section>
            );
          }
          case "actualites-hero": {
            return (
              <section key={section.id} className="section-wrap-sm stack-md pt-10 text-ink lg:pt-16">
                {Boolean(data.eyebrow) && <p className="eyebrow">{data.eyebrow as string}</p>}
                <h1 className="text-h1 font-bold leading-tight tracking-title sm:text-6xl-custom">
                  {data.title as string}
                </h1>
                <p className="text-body leading-body-lg sm:text-body-lg">
                  {data.description as string}
                </p>
                <div className="flex flex-wrap gap-3">
                  {Boolean(data.primaryCta) && (
                    <Link href={(data.primaryCta as { href: string }).href}>
                      <Button variant="primary" size="md">
                        {(data.primaryCta as { label: string }).label}
                      </Button>
                    </Link>
                  )}
                  {Boolean(data.secondaryCta) && (
                    <Link href={(data.secondaryCta as { href: string }).href}>
                      <Button variant="secondary" size="md">
                        {(data.secondaryCta as { label: string }).label}
                      </Button>
                    </Link>
                  )}
                </div>
              </section>
            );
          }
          case "actualites-blog": {
            const items = context?.articles ?? [];
            const tag = (data.tag as string | undefined)?.toLowerCase();
            const limit = (data.limit as number | undefined) ?? 4;
            const filtered = tag
              ? items.filter((article) =>
                  (article.tags ?? []).some((articleTag) =>
                    articleTag.toLowerCase().includes(tag),
                  ) || article.category?.toLowerCase().includes(tag),
                )
              : items;
            const posts = filtered.slice(0, limit);

            return (
              <section key={section.id} className="section-wrap-md stack-xl text-ink">
                <div className="stack-sm">
                  {Boolean(data.eyebrow) && <p className="eyebrow">{data.eyebrow as string}</p>}
                  <h1 className="text-3xl-custom font-bold leading-tight tracking-title sm:text-h1">
                    {data.title as string}
                  </h1>
                  <p className="text-body leading-body-lg sm:text-body-lg">
                    {data.description as string}
                  </p>
                </div>

                <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2">
                  {posts.length === 0 ? (
                    <div className="min-w-64 flex-1 rounded-2xl border border-border-subtle bg-surface p-6 text-body text-ink">
                      Aucun article disponible pour le moment.
                    </div>
                  ) : posts.map((post) => (
                    <article
                      key={post.id}
                      className="min-w-64 flex-1 snap-start stack-sm rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm sm:min-w-80"
                    >
                      <div className="h-44 overflow-hidden rounded-xl bg-surface-placeholder">
                        {post.cover ? (
                          <Image
                            src={post.cover}
                            alt={post.coverAlt ?? post.title}
                            width={640}
                            height={360}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <HeroImagePlaceholder />
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-body-sm text-ink">
                        {post.category && (
                          <Badge variant="outline" size="sm">
                            {post.category}
                          </Badge>
                        )}
                        {post.readTime && <span className="text-body-sm">{post.readTime}</span>}
                      </div>

                      <h3 className="text-h5 font-semibold leading-title">
                        {post.title}
                      </h3>
                      <p className="text-body leading-body">{post.excerpt}</p>

                      <Link
                        href={`/articles/${post.slug}`}
                        className="inline-flex items-center gap-2 text-body font-medium"
                      >
                        Read more
                        <ChevronRight className="size-4" aria-hidden="true" />
                      </Link>
                    </article>
                  ))}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-ink" />
                    <span className="h-2 w-2 rounded-full bg-dot-muted" />
                    <span className="h-2 w-2 rounded-full bg-dot-muted" />
                    <span className="h-2 w-2 rounded-full bg-dot-muted" />
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant="secondary" size="icon" aria-label="Précédent">
                      <ArrowLeft className="size-5" aria-hidden="true" />
                    </Button>
                    <Button variant="secondary" size="icon" aria-label="Suivant">
                      <ArrowRight className="size-5" aria-hidden="true" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link href="/articles">
                    <Button variant="secondary" size="md">
                      View all
                    </Button>
                  </Link>
                </div>
              </section>
            );
          }
          case "actualites-newsletter": {
            return (
              <section key={section.id} className="section-wrap-sm text-center text-ink">
                <h1 className="text-4xl-custom font-bold leading-tight tracking-title sm:text-5xl-custom">
                  {typeof data.title === "string"
                    ? (data.title as string).split("\n").map((line, index) => (
                        <span key={`${section.id}-title-${index}`} className="block">
                          {line}
                        </span>
                      ))
                    : null}
                </h1>
                <p className="mt-4 text-body leading-body-lg sm:text-body-lg">
                  {data.description as string}
                </p>

                <form action={subscribeNewsletterAction} className="mt-8 stack-sm">
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />
                  <div className="py-2">
                    <label htmlFor="newsletter-email" className="sr-only">
                      {(data.form as { placeholder?: string })?.placeholder ?? "Votre email"}
                    </label>
                    <Input
                      id="newsletter-email"
                      name="email"
                      type="email"
                      required
                      placeholder={(data.form as { placeholder?: string })?.placeholder ?? "Votre email"}
                      variant="underline"
                      size="md"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="md" className="w-full">
                    {(data.form as { buttonLabel?: string })?.buttonLabel ?? "S'abonner"}
                  </Button>
                </form>

                <p className="mt-4 text-caption leading-body text-ink">
                  {(data.form as { note?: string })?.note}
                </p>
              </section>
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
}
