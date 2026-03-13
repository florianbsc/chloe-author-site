import Button from "@/app/src/components/atoms/Button";
import AboutHero from "@/app/src/components/organisms/about/AboutHero";
// import { Import } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";


export default function About() {
  return (
    <div className="flex flex-col">
      <AboutHero />

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

      <section className="space-y-4 max-w-xl bg-green-50">
        
        <h4>Valeurs</h4>
        <h1>Ce qui guide mon écriture</h1>
        <p>Chaque roman que j&apos;écris porte en lui une conviction profonde. Je crois que les hisoires vraues changent les lecteurs</p>
        <div>
            <Image
              src="/books.jpg"
              alt="Valeurs"
              width={200}
              height={300}
              className="rounded-md object-cover mx-auto mt-8"
            />

            <h3>Engagement pour la diversité</h3>
            <p>Les personnages en situation de handicap méritent des histoires qui les honorent.</p>

        </div>
        <div>
            <Image
              src="/books.jpg"
              alt="Valeurs"
              width={200}
              height={300}
              className="rounded-md object-cover mx-auto mt-8"
            />

            <h3>Histoires autentiques</h3>
            <p>Pas de clichés, pas de pité, juste la beauté brute de la vie.</p>
            
        </div>
        <div>
            <Image
              src="/books.jpg"
              alt="aleurs"
              width={200}
              height={100}
              className="rounded-md mx-auto mt-8"
            />

            <h3>Communauté bienveillante</h3>
            <p>Mes lecteurs forment une famille où chacun se sent compris et entendu</p>
            
        </div>
        <div>
          <Link href="/blogs">
            <Button variant="third">
              Explorer
            </Button>
          </Link>
        </div>
      </section>
      <section>
        <div>
          <h4>Auteur</h4>
          <h1>Chloé Simart</h1>
          <p>Écrivaine française passionnée par les histoires qui dérangent et qui guérissent. Depuis huit ans, je transforme mes expérience en romans.</p>
          
          <Link href="/about">
            <Button variant="third">
              Lire plus
            </Button>
          </Link>
          
        </div>
        <div>
          <Image
            src="/globe.svg"
            alt="Chloé Simart"
            width={100}
            height={300}
            className="rounded-md object-cover "
          />
          <h2>Chloé Simart</h2>
          <p>Romancière</p>
          <p>J&apos;écris pour que ke silence ne gagne jamais. <br /> Chaque page est une victiore contre l&apos;oubli.</p>
          <div>
            <Linkedin></Linkedin>
            <Twitter></Twitter>
          </div>
        </div>
        <div>
          <Image
            src="/globe.svg"
            alt="Chloé Simart"
            width={100}
            height={300}
            className="rounded-md object-cover "
          />
          <h2>Chloé Simart</h2>
          <p>Romancière</p>
          <p>J&apos;écris pour que ke silence ne gagne jamais. <br /> Chaque page est une victiore contre l&apos;oubli.</p>
          <div>
            <Linkedin></Linkedin>
            <Twitter></Twitter>
          </div>
        </div>
        <div>
          <Image
            src="/globe.svg"
            alt="Chloé Simart"
            width={100}
            height={300}
            className="rounded-md object-cover "
          />
          <h2>Chloé Simart</h2>
          <p>Romancière</p>
          <p>J&apos;écris pour que ke silence ne gagne jamais. <br /> Chaque page est une victiore contre l&apos;oubli.</p>
          <div>
            <Linkedin></Linkedin>
            <Twitter></Twitter>
          </div>
        </div>
      </section>
      <section className="space-y-6 bg-green-50 ">
        <div>
          <h1>Lectures parlent</h1>
          <p>Leurs mots me portent</p>
        </div>
        <div >
          <h1>Webflow</h1>
          <p>&quot;Enfin une auteur qui comprend ce que c&apos;est de cicre avec le handicap sans le transformer en tragédie&quot;.</p>

          <Image
            src="/globe.svg"
            alt="photo de profile"
            width={40}
            height={60}
            className="rounded-md object-cover"
          />
          <h3>Marie Dupont</h3>
          <p>Lectrice, Lyon</p>
        </div>
                <div>
          <h1>Webflow</h1>
          <p>&quot;les secrets de Clara m&apos;a fait plaurer et rire. C&apos;est rare de trouver une telle hôneté dans la fiction.</p>

          <Image
            src="/globe.svg"
            alt="photo de profile"
            width={40}
            height={60}
            className="rounded-md object-cover"
          />
          <h3>Thomas bernard</h3>
          <p>Lectreur, Paris</p>
        </div>
                <div>
          <h1>Webflow</h1>
          <p>&quot;Chloé écrit comme elle respire. Ses histriores deviennent les nôtres, et on ne s&apos;en remet jamais&quot;.</p>

          <Image
            src="/globe.svg"
            alt="photo de profile"
            width={40}
            height={60}
            className="rounded-md object-cover"
          />
          <h3>Isabelle Moreau</h3>
          <p>Lectrice, Marseille</p>
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
