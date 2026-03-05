import Image from "next/image";
import Link from "next/link";
import Button from "@/app/src/components/ui/Button";

export default function Home() {
  return (
    <section className="text-foreground py-16 space-y-16">

      {/* HERO */}
      <div className="space-y-4 max-w-xl hero-background">
        <h1 className="text-h1 ">
          Chloé Simart
        </h1>

        <p className="text-md-custom text-neutral-500">
          Une auteure pas comme les autres. Auteure de roman qui touche l&apos;âme.
        </p>

        <div className="flex gap-4">
          <Button variant="primary">Découvrir</Button>
          <Button variant="secondary">Lire</Button>
        </div>
      </div>

      <div className="w-full max-w-md">
        <Image
          src="/books.jpg"
          alt="Pile de livres sur une table"
          width={640}
          height={960}
          className="rounded-lg object-cover"
        />
      </div>


      {/* ROMANS */}
      <div className="space-y-8">

        <div className="space-y-2">
          <h3 className="text-h4 font-heading">Romans</h3>
          <h1 className="text-h2 font-heading">Mes Romans</h1>
          <p className="text-neutral-500">Disponibles sur Amazon</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="space-y-3">
            <Image src="/file.svg" alt="icon" width={40} height={60} className="rounded-md" />
            <h3 className="text-h5 font-heading">Les secrets de Clara</h3>
            <p className="text-sm-custom text-neutral-500">
              Un thriller sombre qui explore les mystères enfouis au cœur des familles
            </p>
          </div>

          <div className="space-y-3">
            <Image src="/file.svg" alt="icon" width={40} height={60} className="rounded-md" />
            <h3 className="text-h5 font-heading">Mon éternel combat</h3>
            <p className="text-sm-custom text-neutral-500">
              L&apos;autobiographie d&apos;une femme qui refuse de se laisser définir par ses limites
            </p>
          </div>

          <div className="space-y-3">
            <Image src="/file.svg" alt="icon" width={40} height={60} className="rounded-md" />
            <h3 className="text-h5 font-heading">Nos blessures sous la peau</h3>
            <p className="text-sm-custom text-neutral-500">
              Une romance où deux âmes blessées apprennent à se reconstruire ensemble
            </p>
          </div>

        </div>

        <div className="flex gap-4">
          <Button>
            <Link href="/books">Voir</Link>
          </Button>

          <Button>
            <Link href="/books">Tous</Link>
          </Button>
        </div>

      </div>


      {/* AUTEURE */}
      <div className="space-y-6 max-w-2xl">

        <h2 className="text-h4 font-heading">Auteure</h2>

        <h3 className="text-h2 font-heading">
          Une handi-auteure
        </h3>

        <p className="text-md-custom text-neutral-500">
          Chloé Simart écrit des histoires où le handicap n&apos;est pas un obstacle
          mais une part authentique de l&apos;existence.
        </p>

        <div className="flex gap-4">
          <Button>
            <Link href="/about">Découvrir</Link>
          </Button>

          <Button>
            <Link href="/about">Plus</Link>
          </Button>
        </div>

      </div>


      {/* NEWS */}
      <div className="space-y-6 max-w-xl">

        <h2 className="text-h2 font-heading">
          Restez informé des nouvelles
        </h2>

        <p className="text-md-custom text-neutral-500">
          Recevez les actualités et les dates de sortie de mes prochains romans.
        </p>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Votre email"
            className="border border-border rounded-md px-4 py-2 w-full"
          />

          <Button variant="primary">
            S&apos;inscrire
          </Button>
        </div>

        <p className="text-xs-custom text-neutral-400">
          En vous abonnant, vous acceptez notre politique de confidentialité.
        </p>

      </div>


      {/* QUOTE */}
      <div className="max-w-xl space-y-3">
        <h2 className="text-h3 font-heading">
          Parce que survivre n&apos;était que le début
        </h2>

        <p className="text-md-custom text-neutral-500">
          &quot;Parce que survivre n&apos;était que le début...&quot;
          <br />
          — Mon éternel combat
        </p>
      </div>

    </section>
  );
}