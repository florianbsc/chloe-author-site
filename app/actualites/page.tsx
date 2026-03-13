import Button from "@/app/src/components/atoms/Button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

const BLOG_POSTS = [
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

export default function New() {
  return (
    <div className="flex flex-col gap-16 pb-16 lg:gap-24">
      <section className="mx-auto w-full max-w-[720px] space-y-6 px-5 pt-10 text-[#0c0c0c] lg:pt-16">
        <p className="text-[0.875rem] font-semibold uppercase tracking-[0.2em]">
          Actualités
        </p>
        <h1 className="text-[2.75rem] font-bold leading-[1.1] tracking-[0.01em] sm:text-[3.75rem]">
          Les dernières nouvelles
        </h1>
        <p className="text-[1rem] leading-[1.7] sm:text-[1.125rem]">
          Suivez l&apos;évolution de mes projets et découvrez les dates de sortie
          de mes prochains romans. Chaque histoire porte en elle une part de
          vérité qui mérite d&apos;être partagée.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            className="rounded-[10px] border border-[#2abab0] bg-[#2abab0] px-4 py-2 text-[0.875rem] leading-[1.6] text-white hover:bg-[#239f96]"
          >
            Découvrir
          </Button>
          <Button
            variant="secondary"
            className="rounded-[10px] border border-[rgba(12,12,12,0.2)] px-4 py-2 text-[0.875rem] leading-[1.6] text-[#0c0c0c]"
          >
            Retour
          </Button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[960px] space-y-8 px-5 text-[#0c0c0c]">
        <div className="space-y-4">
          <p className="text-[0.875rem] font-semibold uppercase tracking-[0.2em]">
            Blog
          </p>
          <h2 className="text-[2.25rem] font-bold leading-[1.1] tracking-[0.01em] sm:text-[3rem]">
            Short heading goes here
          </h2>
          <p className="text-[1rem] leading-[1.7] sm:text-[1.125rem]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2">
          {BLOG_POSTS.map((post, index) => (
            <article
              key={`${post.title}-${index}`}
              className="min-w-[260px] flex-1 snap-start space-y-4 rounded-2xl border border-[rgba(12,12,12,0.1)] bg-white p-4 shadow-sm sm:min-w-[320px]"
            >
              <div className="h-[180px] rounded-xl bg-[#dedede]" />

              <div className="flex items-center gap-3 text-[0.875rem] text-[#0c0c0c]">
                <span className="rounded-full border border-[rgba(12,12,12,0.2)] px-3 py-1">
                  {post.category}
                </span>
                <span className="text-[0.875rem]">{post.readTime}</span>
              </div>

              <h3 className="text-[1.25rem] font-semibold leading-[1.4]">
                {post.title}
              </h3>
              <p className="text-[0.95rem] leading-[1.6]">{post.excerpt}</p>

              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-[0.95rem] font-medium"
              >
                Read more
                <ChevronRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#0c0c0c]" />
            <span className="h-2 w-2 rounded-full bg-[#cfd6d5]" />
            <span className="h-2 w-2 rounded-full bg-[#cfd6d5]" />
            <span className="h-2 w-2 rounded-full bg-[#cfd6d5]" />
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              className="h-10 w-10 rounded-[10px] border border-[rgba(12,12,12,0.2)] p-0"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </Button>
            <Button
              variant="secondary"
              className="h-10 w-10 rounded-[10px] border border-[rgba(12,12,12,0.2)] p-0"
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Link href="/blogs">
            <Button
              variant="secondary"
              className="rounded-[10px] border border-[rgba(12,12,12,0.2)] px-4 py-2 text-[0.875rem] leading-[1.6] text-[#0c0c0c]"
            >
              View all
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[720px] px-5 text-center text-[#0c0c0c]">
        <h2 className="text-[2.5rem] font-bold leading-[1.1] tracking-[0.01em] sm:text-[3.5rem]">
          Ne manquez rien
          <br />
          Restez informé(e)
        </h2>
        <p className="mt-4 text-[1rem] leading-[1.7] sm:text-[1.125rem]">
          Recevez les actualités et les dates de sortie de mes prochains romans
          directement dans votre boîte mail.
        </p>

        <form className="mt-8 space-y-4">
          <div className="border-b border-[rgba(12,12,12,0.2)] py-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Votre email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="Votre email"
              className="w-full border-0 bg-transparent text-[1rem] leading-[1.6] text-[#0c0c0c] placeholder:text-[#0c0c0c99] outline-none"
            />
          </div>
          <Button
            variant="primary"
            className="w-full rounded-[10px] border border-[#2abab0] bg-[#2abab0] px-4 py-2 text-[0.875rem] leading-[1.6] text-white hover:bg-[#239f96]"
          >
            S&apos;abonner
          </Button>
        </form>

        <p className="mt-4 text-[0.75rem] leading-[1.6] text-[#0c0c0c]">
          En vous abonnant, vous acceptez nos conditions d&apos;utilisation et
          politique de confidentialité.
        </p>
      </section>
    </div>
  );
}
