import Button from "@/app/src/components/atoms/Button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

const ARTICLES_POSTS = [
  {
    category: "Category",
    readTime: "5 min read",
    title: "Blog title heading will go here",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
  },
  {
    category: "Category",
    readTime: "8 min read",
    title: "Blog title heading will go here",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
  },
  {
    category: "Category",
    readTime: "6 min read",
    title: "Blog title heading will go here",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
  },
  {
    category: "Category",
    readTime: "7 min read",
    title: "Blog title heading will go here",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
  },
];

export default function Actualite() {
  return (
    <div className="flex flex-col gap-16 pb-16 lg:gap-24">
      <section className="mx-auto w-full max-w-[720px] space-y-6 px-5 pt-10 text-ink lg:pt-16">
        <p className="text-sm2-custom font-semibold uppercase tracking-[0.2em]">
          Actualités
        </p>
        <h1 className="text-h2 font-bold leading-[1.1] tracking-[0.01em] sm:text-6xl-custom">
          Les dernières nouvelles
        </h1>
        <p className="text-sm-custom leading-[1.7] sm:text-base-custom">
          Suivez l&apos;évolution de mes projets et découvrez les dates de sortie
          de mes prochains romans. Chaque histoire porte en elle une part de
          vérité qui mérite d&apos;être partagée.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            className="rounded-[10px] border border-brand bg-brand px-4 py-2 text-sm2-custom leading-[1.6] text-white hover:bg-brand-hover"
          >
            Découvrir
          </Button>
          <Button
            variant="secondary"
            className="rounded-[10px] border border-border-medium px-4 py-2 text-sm2-custom leading-[1.6] text-ink"
          >
            Retour
          </Button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[960px] space-y-8 px-5 text-ink">
        <div className="space-y-4">
          <p className="text-sm2-custom font-semibold uppercase tracking-[0.2em]">
            Blog
          </p>
          <h2 className="text-3xl-custom font-bold leading-[1.1] tracking-[0.01em] sm:text-h1">
            Short heading goes here
          </h2>
          <p className="text-sm-custom leading-[1.7] sm:text-base-custom">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2">
          {ARTICLES_POSTS.map((post, index) => (
            <article
              key={`${post.title}-${index}`}
              className="min-w-[260px] flex-1 snap-start space-y-4 rounded-2xl border border-border-subtle bg-white p-4 shadow-sm sm:min-w-[320px]"
            >
              <div className="h-[180px] rounded-xl bg-surface-placeholder" />

              <div className="flex items-center gap-3 text-sm2-custom text-ink">
                <span className="rounded-full border border-border-medium px-3 py-1">
                  {post.category}
                </span>
                <span className="text-sm2-custom">{post.readTime}</span>
              </div>

              <h3 className="text-h5 font-semibold leading-[1.4]">
                {post.title}
              </h3>
              <p className="text-sm3-custom leading-[1.6]">{post.excerpt}</p>

              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-sm3-custom font-medium"
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
            <Button
              variant="secondary"
              className="h-10 w-10 rounded-[10px] border border-border-medium p-0"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </Button>
            <Button
              variant="secondary"
              className="h-10 w-10 rounded-[10px] border border-border-medium p-0"
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Link href="/articles">
            <Button
              variant="secondary"
              className="rounded-[10px] border border-border-medium px-4 py-2 text-sm2-custom leading-[1.6] text-ink"
            >
              View all
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[720px] px-5 text-center text-ink">
        <h2 className="text-4xl-custom font-bold leading-[1.1] tracking-[0.01em] sm:text-5xl-custom">
          Ne manquez rien
          <br />
          Restez informé(e)
        </h2>
        <p className="mt-4 text-sm-custom leading-[1.7] sm:text-base-custom">
          Recevez les actualités et les dates de sortie de mes prochains romans
          directement dans votre boîte mail.
        </p>

        <form className="mt-8 space-y-4">
          <div className="border-b border-border-medium py-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Votre email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="Votre email"
              className="w-full border-0 bg-transparent text-sm-custom leading-[1.6] text-ink placeholder:text-ink/60 outline-none"
            />
          </div>
          <Button
            variant="primary"
            className="w-full rounded-[10px] border border-brand bg-brand px-4 py-2 text-sm2-custom leading-[1.6] text-white hover:bg-brand-hover"
          >
            S&apos;abonner
          </Button>
        </form>

        <p className="mt-4 text-xs-custom leading-[1.6] text-ink">
          En vous abonnant, vous acceptez nos conditions d&apos;utilisation et
          politique de confidentialité.
        </p>
      </section>
    </div>
  );
}
