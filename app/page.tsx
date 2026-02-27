import Image from "next/image";
import Link from 'next/link'
import Button from "@/app/src/components/ui/Button";

export default function Home() {
  return (
    <section className="py-16 space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          Chloé Simart
        </h1>

        <p className="text-gray-600 max-w-lg">
          Une auteure pas comme les autres. Auteure de roman qui touche l&apos;ame.
        </p>

        <Button>
          Découvrir
        </Button>
        <br />
        <Button>
          Lire
        </Button>
      </div>
      <div className="w-full max-w-md">
        <Image
          src="/books.jpg"
          alt="Pile de livres sur une table"
          width={640}
          height={960}
          className="rounded-md object-cover"
        />
      </div>
      <div>
        <h2>Romans</h2>
        <h1 className="text-2xl font-semibold">Mes Romans</h1>
        <h3>Disponibles sur amazon</h3>
          <div>
          <Image
          src="/file.svg"
          alt="icon"
          width={40}
          height={60}
          className="rounded-md object-cover"
        />
          <h2>Les secrets de Clara</h2>
          <p>Un thriller sombre qui explore les mystheres enfouis au coeur des fmailles </p>
        </div>
        <div>
          <Image
          src="/file.svg"
          alt="icon"
          width={40}
          height={60}
          className="rounded-md object-cover"
        /> 
          <h2>Mon éternel combat</h2>
          <p>L&apos;autobiographie d&apos;une femme qui refuse de se laisser définir par ses limites</p>
        </div>
        <div>
            <Image
          src="/file.svg"
          alt="icon"
          width={40}
          height={60}
          className="rounded-md object-cover"
        /> 
          <h2>Mon éternel combat</h2>
          <p>L&apos;autobiographie d&apos;une femme qui refuse de se laisser définir par ses limites</p>
        </div>
        <div>
            <Image
          src="/file.svg"
          alt="icon"
          width={40}
          height={60}
          className="rounded-md object-cover"
        /> 
          <h2>Nos blessures sous la peau</h2>
          <p>Une romance ou deux ames blessées apprennent à se reconstruire ensemble</p>
        </div>
        <div>
            <Image
          src="/file.svg"
          alt="icon"
          width={40}
          height={60}
          className="rounded-md object-cover"
        /> 
          <h2>Nos blessures sous la peau</h2>
          <p>Une romance ou deux ames blessées apprennent à se reconstruire ensemble</p>
        </div>
        <div>
          <Button>
            <Link href="src/books">Voir</Link>
          </Button >
          <br />
          <Button>
            <Link href="src/books">Tous</Link>
          </Button>
        </div>
      </div>

      <div>
        <h2>Auteure</h2>
        <h1 className="text-2xl font-semibold">Une handi-auteure</h1>
        <p>Chloé Simart écrit des histoires ou le handicap n&apos;est pas un obstacle mas une part authentique de l&apos;existance. Elle brise les tabous en donnent voix à ceux qu&apos;on oublie souvent.</p>
        <Button>
        <Link href="/about/{id}">Découvir </Link>
        </Button>
        <Button>
        <Link href="/about">Plus</Link>
        </Button>
        <div>
          <div className="w-full max-w-md">
          <Image
            src="/file.svg"
            alt="icon"
            width={40}
            height={60}
            className="rounded-md object-cover"
          />
        </div>
          <h2>Sortie ocrobre</h2>
          <p>Un nouveau roman sortira bientôt !</p>
        </div>
        <div>
          <Image
            src="/file.svg"
            alt="icon"
            width={40}
            height={60}
            className="rounded-md object-cover"
          />
          <h2>la loge des silences</h2>
          <p>un thriller ou chaque silence cache une vérité qui attend d&apos;etre decouverte</p>
        </div>
        <div>
          <Image
            src="/file.svg"
            alt="icon"
            width={40}
            height={60}
            className="rounded-md object-cover"
          />
          <h2>Extrait exclusif</h2>
          <p>Parce que survivre n&apos;était que le début de cette histoir qui change tout.</p>
        </div>
        <div>
          <Image
            src="/file.svg"
            alt="icon"
            width={40}
            height={60}
            className="rounded-md object-cover"
          />
          <h2>En savoir plus</h2>
          <p>Décourvrez le roman complet et plongez dans ses mystères.</p>
        </div>
        <div>
          <Image
            src="/file.svg"
            alt="icon"
            width={40}
            height={60}
            className="rounded-md object-cover"
          />
          <h2>Short heading here</h2>
          <p>Décourvrez le roman complet et plongez dans ses mystères.</p>
        </div>
        <div>
          <Button>
            <Link href="/read">Lire</Link>
          </Button>
          <Button>
            <Link href="/books">Suite</Link>
          </Button>
        </div>
        <div className="w-full max-w-md">
          <Image
            src="/books.jpg"
            alt="pile de livres"
            width={640}
            height={60}
            className="rounded-md object-cover"
          />
        </div>
      </div>
     
     <div>
      <h1>Parce que survivre n&apos;était que le début</h1>
      <p>&quot;Parce que survivre n&apos;était que le début...&quot; -- <br /> Mon éternel combat</p>
     </div>
     <div>
      <h1>Restez informé des nouvelles</h1>
      <p>Recevez les actualités et les dates de sortie de mes prochains romans.</p>
     </div>
     <div>
      <input type="text" placeholder="Votre email" />
      <Button variant="primary">S&apos;inscrire</Button>
      <p>En vous abonnant, vous acceptez notre politique de confidentialité.</p>
     </div>


    </section>
  );
}