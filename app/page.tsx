import Image from "next/image";
import Link from "next/link";
import Button from "@/app/src/components/ui/Button";
import { House, Triangle, Search } from 'lucide-react';


export default function Home() {
  return (
    <section className="text-foreground py-16 space-y-16 ">

      {/* HERO */}
      <div className="space-y-4 max-w-xl bg-green-50">
        <h1>
          Chloé Simart
        </h1>

        <p>
          Une auteure pas comme les autres. Auteure de roman qui touche l&apos;âme.
        </p>

        <div className="flex gap-4">
          <Link href="/about">
            <Button variant="primary">Découvrir</Button>
          </Link>
          <Link href="/books">
            <Button variant="secondary">Lire</Button>
          </Link>
        </div>
          <Image
          className="w-full max-w-md"
          src="/books.jpg"
          alt="Pile de livres sur une table"
          width={640}
          height={960}
          />
      </div>

      {/* ROMANS */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h6>Romans</h6>
          <h1>Mes romans</h1>
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
          <Link href="/books">
            <Button variant="primary">Voir</Button>
          </Link>
          <Link href="/books">
            <Button variant="secondary">Tous</Button>
          </Link>
        </div>

      </div>


      {/* AUTEURE */}
      <div className="space-y-6 max-w-2xl">
        <h3>Auteure</h3>

        <h1>Une handi-auteure</h1>

        <p className="text-md-custom text-neutral-500">
          Chloé Simart écrit des histoires où le handicap n&apos;est pas un obstacle
          mais une part authentique de l&apos;existence.
        </p>

        <div className="flex gap-4">
          
          <Link href="/about">
              <Button variant="primary">Découvrir</Button>
          </Link>

          <Link href="/#">
            <Button variant="secondary">Plus</Button>
          </Link>
         
        </div>

      </div>

      {/* Liste infos */}
      <div className="space-y-4 max-w-xl bg-green-50">
        <div>
          <Image src="/globe.svg" alt="icon" width={24} height={24} />
          <h3>Sortie octobre</h3>

          <p>Le 29 octobre arrive enfin le moment de la révélation.</p>
        </div>
        <div>
          <House />
          <h3>La Loge des Silences</h3>

          <p>Un thrille où chaque silence cache une vérité qui attend d&apos;être découverte.</p>
        </div>
        <div>
          <Triangle />
          <h3>Ectait exclusif</h3>
          <p>Parce que survivre n&apos;était que le début de cette histroire qui change tout.</p>

        </div>
        <div>
          <Search></Search>
          <h3>En savoir plus</h3>

          <p>Découvrez le roman complet et plongez dans ses mystères.</p>
        </div>
        <div  className="flex gap-4">
          <Button variant="secondary">Lire</Button>
          <Button variant="secondary">Suite</Button>
        </div>
        <Image
          src="/books.jpg"
          alt="Pile de livres sur une table"
          width={640}
          height={960}
          className="rounded-lg object-cover"
        />
      </div>
      {/* <div>
        <h1>Parce que survivre n'était que le début </h1>
      </div> */}

      {/* QUOTE */}
      <div className="max-w-xl space-y-3">
        <h1>
          Parce que survivre n&apos;était que le début
        </h1>

        <p className="text-md-custom text-neutral-500">
          &quot;Parce que survivre n&apos;était que le début...&quot;
          <br />
          — Mon éternel combat
        </p>
      </div>

      {/* NEWS */}
      <div className="space-y-6 max-w-xl">

        <h1>
          Restez informé des nouvelles
        </h1>

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




    </section>
  );
}