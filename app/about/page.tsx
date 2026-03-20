import Button from "@/app/src/components/atoms/Button";
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import AboutHero from "@/app/src/components/organisms/about/AboutHero";
import ReviewCard from "@/app/src/components/molecules/ReviewCard";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Box,
  Clock,
  EyeOff,
  FileText,
  Globe,
  Linkedin,
  User,
  X,
} from "lucide-react";

const ABOUT_FEATURES = [
  {
    title: "Mon parcours",
    description:
      "J'ai commencé à écrire sans savoir que mes histoires changeraient des vies. Le handicap m'a enseigné la résilience, et l'écriture m'a donné une voix.",
    icon: Clock,
  },
  {
    title: "L'écriture inclusive",
    description:
      "Je refuse les stéréotypes. Mes personnages vivent, aiment, souffrent avec authenticité, loin des regards pitoyables.",
    icon: User,
  },
  {
    title: "Une vision différente",
    description:
      "La romance existe pour tous. Elle n'a pas de limite, pas de forme préétablie, juste des coeurs qui se trouvent.",
    icon: FileText,
  },
  {
    title: "Pourquoi j'écris",
    description:
      "Parce que chaque histoire compte. Parce que le silence tue plus que les mots ne guérissent.",
    icon: EyeOff,
  },
  {
    title: "Short heading here",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    icon: Box,
  },
  {
    title: "Short heading here",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in leros.",
    icon: Box,
  },
];

const AUTHOR_CARDS = [
  {
    name: "Chloé Simart",
    role: "Romancière",
    quote:
      "J'écris pour que le silence ne gagne jamais. Chaque page est une victoire contre l'oubli.",
  },
  {
    name: "Chloé Simart",
    role: "Romancière",
    quote:
      "J'écris pour que le silence ne gagne jamais. Chaque page est une victoire contre l'oubli.",
  },
  {
    name: "Chloé Simart",
    role: "Romancière",
    quote:
      "J'écris pour que le silence ne gagne jamais. Chaque page est une victoire contre l'oubli.",
  },
];


export default function About() {
  return (
    <div className="flex flex-col">
      <AboutHero />

      <section className="section-bleed bg-surface">
        <div className="section-wrap-xl py-16 lg:py-24">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="flex-1 stack-lg text-ink">
              {ABOUT_FEATURES.map((feature, index) => (
                <div
                  key={`${feature.title}-${index}`}
                  className="stack-sm"
                >
                  <feature.icon aria-hidden="true" className="size-8 icon-stroke" />
                  <h3 className="text-h4 font-semibold leading-subtitle">
                    {feature.title}
                  </h3>
                  <p className="text-body leading-body">
                    {feature.description}
                  </p>
                </div>
              ))}

              <div className="flex items-center gap-4 pt-2">
                <Link href="/romans">
                  <Button variant="third" size="md">
                    Lire
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex-1">
              <div className="hero-media-alt">
                <HeroImagePlaceholder />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h4>Chiffres</h4>
        <h1>Une trajectoire qui parle d&apos;elle-même </h1>
        <p>Chaque nombre représente une lectrice, un lecteur qui à trouvé quelque chose de vrrai dans mes mots.</p>
        <div>
          <Link href="/romans">
            <Button variant="third">
              Découvrir
            </Button>
          </Link>
        </div>
        <div>
          <h1> 4</h1>
          <p>Romans publiés</p>
          <h1>1 5000</h1>
          <p>Lectrices et lecteurs touchés</p>
          <h1>8</h1>
          <p>Années d&apos;écriture</p>
          <h1>3</h1>
          <p>Prix littéraires</p>
          <h1>50%</h1>
          <p>De lecteurs qui recommandent mes livres</p>
        </div>
      </section>

      <section className="section-bleed bg-surface-mint">
        <div className="section-wrap-sm section-pad-lg text-center">
          <p className="eyebrow">
            Valeurs
          </p>
          <h2 className="mt-4 text-h2 font-bold leading-tight tracking-title text-ink sm:text-5xl-custom">
            Ce qui guide mon écriture
          </h2>
          <p className="mt-4 text-body leading-body-lg text-ink sm:text-body-lg">
            Chaque roman que j&apos;écris porte en lui une conviction profonde. Je
            crois que les histoires vraies changent les lecteurs.
          </p>

          <div className="mt-12 stack-lg text-left sm:mt-16">
            <div className="stack-md">
              <div className="h-56 overflow-hidden rounded-2xl bg-surface-placeholder">
                   <Image
                  src="/books.png"
                  alt="Photo illustrative"
                  width={100}
                  height={300}
                  className="rounded-md object-cover "
                />
                {/* <HeroImagePlaceholder /> */}
              </div>
              <h3 className="text-2xl-custom font-semibold leading-subtitle text-ink">
                Engagement pour la diversité
              </h3>
              <p className="text-body leading-body-lg text-ink">
                Les personnages en situation de handicap méritent des histoires
                qui les honorent.
              </p>
            </div>

            <div className="stack-md">
              <div className="h-56 overflow-hidden rounded-2xl bg-surface-placeholder">
                   <Image
                  src="/books.png"
                  alt="Photo illustrative"
                  width={100}
                  height={300}
                  className="rounded-md object-cover "
                />
                {/* <HeroImagePlaceholder /> */}
              </div>
              <h3 className="text-2xl-custom font-semibold leading-subtitle text-ink">
                Histoires authentiques
              </h3>
              <p className="text-body leading-body-lg text-ink">
                Pas de clichés, pas de pitié, juste la beauté brute de la vie
                réelle.
              </p>
            </div>

            <div className="stack-md">
              <div className="h-56 overflow-hidden rounded-2xl bg-surface-placeholder">
                <Image
                  src="/books.png"
                  alt="Photo illustrative"
                  width={100}
                  height={300}
                  className="rounded-md object-cover "
                />
                {/* <HeroImagePlaceholder /> */}
              </div>
              <h3 className="text-2xl-custom font-semibold leading-subtitle text-ink">
                Communauté bienveillante
              </h3>
              <p className="text-body leading-body-lg text-ink">
                Mes lecteurs forment une famille où chacun se sent compris et
                entendu.
              </p>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-4">
            <Link href="/articles">
              <Button variant="third" size="md">
                Explorer
              </Button>
            </Link>

            
          </div>
        </div>
      </section>
      <section className="section-bleed bg-surface">
        <div className="section-wrap-sm section-pad-lg">
          <div className="stack-sm text-ink">
            <p className="eyebrow">
              Auteure
            </p>
            <h2 className="text-h2 font-bold leading-tight tracking-title sm:text-6xl-custom">
              Chloé Simart
            </h2>
            <p className="text-body leading-body-lg sm:text-body-lg">
              Écrivaine française passionnée par les histoires qui dérangent et
              qui guérissent. Depuis huit ans, je transforme mes expériences en
              romans.
            </p>
            <Link href="/about">
              <Button variant="third" size="md" className="mt-4">
                Lire plus
              </Button>
            </Link>
          </div>

          <div className="mt-12 stack-lg">
            {AUTHOR_CARDS.map((author, index) => (
              <div key={`${author.name}-${index}`} className="stack-sm">
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

                <p className="text-body leading-body-lg text-ink">
                  {author.quote}
                </p>

                <div className="flex items-center gap-4 text-ink">
                  <Linkedin className="size-5" aria-hidden="true" />
                  <X className="size-5" aria-hidden="true" />
                  <Globe className="size-5" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-bleed bg-surface-mint">
        <div className="section-wrap-sm section-pad-lg text-center">
          <h2 className="text-h2 font-bold leading-tight tracking-title text-ink sm:text-6xl-custom">
            Lecteurs parlent
          </h2>
          <p className="mt-4 text-body leading-body-lg text-ink sm:text-body-lg">
            Leurs mots me portent
          </p>

          <div className="mt-12 stack-lg text-ink">
            <ReviewCard
              logo="Webflow"
              quote="Enfin une auteure qui comprend ce que c'est de vivre avec le handicap sans le transformer en tragédie."
              name="Marie Dupont"
              role="Lectrice, Lyon"
            />
            <ReviewCard
              logo="Webflow"
              quote="Les secrets de Clara m'a fait pleurer et rire. C'est rare de trouver une telle honnêteté dans la fiction."
              name="Thomas Bernard"
              role="Lecteur, Paris"
            />
            <ReviewCard
              logo="Webflow"
              quote="Chloé écrit comme elle respire. Ses histoires deviennent les nôtres, et on ne s'en remet jamais."
              name="Isabelle Moreau"
              role="Lectrice, Marseille"
            />
          </div>
        </div>
      </section>
      <section className="section-bleed bg-surface">
        <div>
          <h1>Prêt à découvrir mes histoires ?</h1>
          <p>Quatre roman vous attendent, chacun porteur d&apos;une verité differente. Venez les rencontrer sur Amazon.</p>
        </div>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Link href="/romans">
            <Button variant="primary">Lire</Button>
          </Link>
          <Link href="/contact">
            <Button variant="third">Contact</Button>
          </Link>
        </div>
      </section>
      
    </div>
  );
}
