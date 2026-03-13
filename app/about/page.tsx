import Button from "@/app/src/components/atoms/Button";
import HeroImagePlaceholder from "@/app/src/components/atoms/HeroImagePlaceholder";
import AboutHero from "@/app/src/components/organisms/about/AboutHero";
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
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

      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-white">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-16 lg:px-16 lg:py-24">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="flex-1 space-y-10 text-[#0c0c0c]">
              {ABOUT_FEATURES.map((feature, index) => (
                <div
                  key={`${feature.title}-${index}`}
                  className="space-y-3"
                >
                  <feature.icon aria-hidden="true" className="size-8 stroke-[1.5]" />
                  <h3 className="text-[1.5rem] font-semibold leading-[1.3]">
                    {feature.title}
                  </h3>
                  <p className="text-[1rem] leading-[1.6]">
                    {feature.description}
                  </p>
                </div>
              ))}

              <div className="flex items-center gap-4 pt-2">
                <Button
                  variant="third"
                  className="rounded-[10px] border border-[rgba(12,12,12,0.2)] px-4 py-2 text-[0.875rem] leading-[1.6] text-[#0c0c0c]"
                >
                  Lire
                </Button>

                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(12,12,12,0.2)] text-[#0c0c0c]"
                  aria-label="Défiler vers le bas"
                >
                  <ArrowDown className="size-5" />
                </button>

                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(12,12,12,0.2)] text-[#0c0c0c]"
                  aria-label="Suivant"
                >
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </div>

            <div className="flex-1">
              <div className="h-[420px] md:h-[520px] lg:min-h-[680px]">
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

      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#e9f8f7]">
        <div className="mx-auto w-full max-w-[720px] px-5 py-16 text-center lg:py-24">
          <p className="text-[0.875rem] font-semibold uppercase tracking-[0.2em] text-[#0c0c0c]">
            Valeurs
          </p>
          <h2 className="mt-4 text-[2.75rem] font-bold leading-[1.1] tracking-[0.01em] text-[#0c0c0c] sm:text-[3.5rem]">
            Ce qui guide mon écriture
          </h2>
          <p className="mt-4 text-[1rem] leading-[1.7] text-[#0c0c0c] sm:text-[1.125rem]">
            Chaque roman que j&apos;écris porte en lui une conviction profonde. Je
            crois que les histoires vraies changent les lecteurs.
          </p>

          <div className="mt-12 space-y-12 text-left sm:mt-16">
            <div className="space-y-6">
              <div className="h-[220px] overflow-hidden rounded-2xl bg-[#dedede]">
                   <Image
                  src="/books.png"
                  alt="Photo illustrative"
                  width={100}
                  height={300}
                  className="rounded-md object-cover "
                />
                {/* <HeroImagePlaceholder /> */}
              </div>
              <h3 className="text-[1.75rem] font-semibold leading-[1.25] text-[#0c0c0c]">
                Engagement pour la diversité
              </h3>
              <p className="text-[1rem] leading-[1.7] text-[#0c0c0c]">
                Les personnages en situation de handicap méritent des histoires
                qui les honorent.
              </p>
            </div>

            <div className="space-y-6">
              <div className="h-[220px] overflow-hidden rounded-2xl bg-[#dedede]">
                   <Image
                  src="/books.png"
                  alt="Photo illustrative"
                  width={100}
                  height={300}
                  className="rounded-md object-cover "
                />
                {/* <HeroImagePlaceholder /> */}
              </div>
              <h3 className="text-[1.75rem] font-semibold leading-[1.25] text-[#0c0c0c]">
                Histoires authentiques
              </h3>
              <p className="text-[1rem] leading-[1.7] text-[#0c0c0c]">
                Pas de clichés, pas de pitié, juste la beauté brute de la vie
                réelle.
              </p>
            </div>

            <div className="space-y-6">
              <div className="h-[220px] overflow-hidden rounded-2xl bg-[#dedede]">
                <Image
                  src="/books.png"
                  alt="Photo illustrative"
                  width={100}
                  height={300}
                  className="rounded-md object-cover "
                />
                {/* <HeroImagePlaceholder /> */}
              </div>
              <h3 className="text-[1.75rem] font-semibold leading-[1.25] text-[#0c0c0c]">
                Communauté bienveillante
              </h3>
              <p className="text-[1rem] leading-[1.7] text-[#0c0c0c]">
                Mes lecteurs forment une famille où chacun se sent compris et
                entendu.
              </p>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-4">
            <Link href="/blogs">
              <Button
                variant="third"
                className="rounded-[10px] border border-[rgba(12,12,12,0.2)] px-4 py-2 text-[0.875rem] leading-[1.6] text-[#0c0c0c]"
              >
                Explorer
              </Button>
            </Link>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(12,12,12,0.2)] text-[#0c0c0c]"
              aria-label="Défiler vers le bas"
            >
              <ArrowDown className="size-5" />
            </button>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(12,12,12,0.2)] text-[#0c0c0c]"
              aria-label="Suivant"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </section>
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-white">
        <div className="mx-auto w-full max-w-[720px] px-5 py-16 lg:py-24">
          <div className="space-y-4 text-[#0c0c0c]">
            <p className="text-[0.875rem] font-semibold uppercase tracking-[0.2em]">
              Auteure
            </p>
            <h2 className="text-[2.75rem] font-bold leading-[1.1] tracking-[0.01em] sm:text-[3.75rem]">
              Chloé Simart
            </h2>
            <p className="text-[1rem] leading-[1.7] sm:text-[1.125rem]">
              Écrivaine française passionnée par les histoires qui dérangent et
              qui guérissent. Depuis huit ans, je transforme mes expériences en
              romans.
            </p>
            <Link href="/about">
              <Button
                variant="third"
                className="mt-4 rounded-[10px] border border-[rgba(12,12,12,0.2)] px-4 py-2 text-[0.875rem] leading-[1.6]"
              >
                Lire plus
              </Button>
            </Link>
          </div>

          <div className="mt-12 space-y-12">
            {AUTHOR_CARDS.map((author, index) => (
              <div key={`${author.name}-${index}`} className="space-y-4">
                <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full bg-[#dedede] text-[#b5b5b5]">
                  <Globe className="size-8" aria-hidden="true" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-[1.5rem] font-semibold leading-[1.3] text-[#0c0c0c]">
                    {author.name}
                  </h3>
                  <p className="text-[1rem] leading-[1.6] text-[#0c0c0c]">
                    {author.role}
                  </p>
                </div>

                <p className="text-[1rem] leading-[1.7] text-[#0c0c0c]">
                  {author.quote}
                </p>

                <div className="flex items-center gap-4 text-[#0c0c0c]">
                  <Linkedin className="size-5" aria-hidden="true" />
                  <X className="size-5" aria-hidden="true" />
                  <Globe className="size-5" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#e9f8f7]">
        <div className="mx-auto w-full max-w-[720px] px-5 py-16 text-center lg:py-24">
          <h2 className="text-[2.75rem] font-bold leading-[1.1] tracking-[0.01em] text-[#0c0c0c] sm:text-[3.75rem]">
            Lecteurs parlent
          </h2>
          <p className="mt-4 text-[1rem] leading-[1.7] text-[#0c0c0c] sm:text-[1.125rem]">
            Leurs mots me portent
          </p>

          <div className="mt-12 space-y-12 text-[#0c0c0c]">
            <div className="space-y-6">
              <div className="text-[1.125rem] font-semibold">Webflow</div>
              <p className="text-[1.5rem] font-semibold leading-[1.4]">
                &quot;Enfin une auteure qui comprend ce que c&apos;est de vivre avec
                le handicap sans le transformer en tragédie.&quot;
              </p>
              <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#d7d7d7] text-[#b5b5b5]">
                <Globe className="size-6" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <p className="text-[1.125rem] font-semibold">Marie Dupont</p>
                <p className="text-[1rem]">Lectrice, Lyon</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-[1.125rem] font-semibold">Webflow</div>
              <p className="text-[1.5rem] font-semibold leading-[1.4]">
                &quot;Les secrets de Clara m&apos;a fait pleurer et rire. C&apos;est
                rare de trouver une telle honnêteté dans la fiction.&quot;
              </p>
              <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#d7d7d7] text-[#b5b5b5]">
                <Globe className="size-6" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <p className="text-[1.125rem] font-semibold">Thomas Bernard</p>
                <p className="text-[1rem]">Lecteur, Paris</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-[1.125rem] font-semibold">Webflow</div>
              <p className="text-[1.5rem] font-semibold leading-[1.4]">
                &quot;Chloé écrit comme elle respire. Ses histoires deviennent les
                nôtres, et on ne s&apos;en remet jamais.&quot;
              </p>
              <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#d7d7d7] text-[#b5b5b5]">
                <Globe className="size-6" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <p className="text-[1.125rem] font-semibold">Isabelle Moreau</p>
                <p className="text-[1rem]">Lectrice, Marseille</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <h1>Prêt à découvrir mes histoires ?</h1>
          <p>Quatre roman vous attendent, chacun porteur d&apos;une verité differente. Venez les rencontrer sur Amazon.</p>
        </div>
        <Link href="/romans">
          <Button variant="primary">Lire</Button>
        </Link>
        <Link href="/contact">
          <Button variant="third">Contact</Button>
        </Link>
      </section>
      
    </div>
  );
}
