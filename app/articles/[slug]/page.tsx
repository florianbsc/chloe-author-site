import Button from "@/app/src/components/atoms/Button";
import Input from "@/app/src/components/atoms/Input";
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import Link from "next/link";
import {
  Facebook,
  Image as ImageIcon,
  Link2,
  Linkedin,
  X,
} from "lucide-react";

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export default function ArticlePage({ params }: ArticlePageProps) {
  return (
    <div className="section-wrap-sm section-pad-md text-ink">
      <section className="space-y-6">
        <h2 className="text-h3 font-semibold leading-title">
          Introduction
        </h2>

        <div className="space-y-4 text-sm-custom leading-body-lg">
          <p>
            Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
            suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum
            quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris
            posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At
            feugiat sapien varius id.
          </p>
          <p>
            Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat
            mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu
            quis fusce augue enim. Quis at habitant amet, at. Suscipit tristique
            risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie
            aliquet sodales id est ac volutpat.
          </p>
        </div>

        <div className="space-y-3">
          <div className="h-[220px] overflow-hidden rounded-2xl bg-surface-placeholder">
            <HeroImagePlaceholder />
          </div>
          <p className="text-xs-custom leading-body text-ink">
            Image caption goes here
          </p>
        </div>

        <div className="space-y-4 text-sm-custom leading-body-lg">
          <h3 className="text-h5 font-semibold leading-title">
            Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla
            odio nisl vitae. In aliquet pellentesque aenean hac vestibulum
            turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada
            fringilla.
          </h3>
          <p>
            Elit nisl in eleifend sed nisi. Pulvinar at orci, proin imperdiet
            commodo consectetur varius risus. Sed condimentum enim dignissim
            adipiscing faucibus consequat, urna. Viverra purus et erat auctor
            aliquam. Risus, volutpat vulputate posuere purus sit congue
            convallis aliquet. Arcu id augue ut feugiat donec porttitor neque.
            Mauris, neque ultrices eu vestibulum, bibendum quam lorem id.
            Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
          </p>
        </div>

        <blockquote className="border-l border-border-medium pl-6 text-base-custom italic leading-body-lg text-ink">
          &quot;Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
          mauris id. Non pellentesque congue eget consectetur turpis. Sapien,
          dictum molestie sem tempor. Diam elit, orci, tincidunt aenean
          tempus.&quot;
        </blockquote>

        <div className="space-y-4 text-sm-custom leading-body-lg">
          <p>
            Tristique odio senectus nam posuere ornare leo metus, ultrices.
            Blandit duis ultricies vulputate morbi feugiat cras placerat elit.
            Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque
            suscipit accumsan. Cursus viverra aenean magna, risus elementum
            faucibus molestie pellentesque. Arcu ultricies sed mauris
            vestibulum.
          </p>
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="text-h3 font-semibold leading-title">
          Conclusion
        </h2>

        <div className="space-y-4 text-sm-custom leading-body-lg">
          <p>
            Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id
            scelerisque est ultricies ultricies. Duis est sit sed leo nisl,
            blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at
            scelerisque amet nulla purus habitasse.
          </p>
          <p>
            Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas
            condimentum mi massa. In tincidunt pharetra consectetur sed duis
            facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit
            dictum eget nibh tortor commodo cursus.
          </p>
          <p>
            Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce
            aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id
            morbi eget ipsum. Aliquam senectus neque ut id eget consectetur
            diam. Donec posuere pharetra odio consequat scelerisque et, nunc
            tortor. Nulla adipiscing erat a erat. Condimentum lorem posuere
            gravida enim posuere cursus diam.
          </p>
        </div>

        <div className="space-y-4">
          <p className="eyebrow">
            Partager cet article
          </p>
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
            {["Thriller", "Handicap", "Sortie", "Roman"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border-medium px-3 py-1 text-xs-custom"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-border-subtle pt-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-placeholder-strong text-icon-placeholder">
            <ImageIcon className="size-4" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="text-sm3-custom font-semibold">Chloé Simart</p>
            <p className="text-xs2-custom text-ink">Auteure de romans</p>
          </div>
        </div>
      </section>

      <section className="mt-16 space-y-6 text-center">
        <h2 className="text-4xl-custom font-bold leading-tight tracking-title">
          Avis de lecteurs
        </h2>
        <p className="text-sm-custom leading-body-lg text-ink">
          Ce que les lecteurs en pensent
        </p>

        <div className="mt-10 space-y-12 text-ink">
          <div className="space-y-6">
            <div className="text-base-custom font-semibold">Webflow</div>
            <p className="text-xl-custom font-semibold leading-title">
              &laquo; Un roman qui m&apos;a bouleversée du début à la fin. &raquo;
            </p>
            <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-surface-placeholder-strong text-icon-placeholder">
              <ImageIcon className="size-5" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-md2-custom font-semibold">Marie Dupont</p>
              <p className="text-sm3-custom">Lectrice passionnée</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-base-custom font-semibold">Webflow</div>
            <p className="text-xl-custom font-semibold leading-title">
              &laquo; Chloé écrit avec une sincérité rare et profonde. &raquo;
            </p>
            <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-surface-placeholder-strong text-icon-placeholder">
              <ImageIcon className="size-5" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-md2-custom font-semibold">Thomas Bernard</p>
              <p className="text-sm3-custom">Lecteur engagé</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-3xl bg-surface-mint px-5 py-12 text-center text-ink sm:px-8">
        <h2 className="text-4xl-custom font-bold leading-tight tracking-title sm:text-5xl-custom">
          Poursuivez la lecture
          <br />
          Explorez mes univers
        </h2>
        <p className="mt-4 text-sm-custom leading-body-lg sm:text-base-custom">
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
        <p className="mt-4 text-sm-custom leading-body-lg sm:text-base-custom">
          Recevez les dates de sortie et les nouvelles directement dans votre
          boîte.
        </p>

        <form className="mt-8 space-y-4">
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
          <Button variant="primary" size="md" className="w-full">
            S&apos;abonner
          </Button>
        </form>

        <p className="mt-4 text-xxs-custom leading-body text-ink">
          Nous respectons votre vie privée. Désinscription possible à tout
          moment.
        </p>
      </section>
    </div>
  );
}
