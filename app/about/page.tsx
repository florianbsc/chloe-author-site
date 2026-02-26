import Button from "@/app/src/components/ui/Button";
import Image from "next/image";


export default function About() {
  return (
    <div className="flex flex-col">

      <section >
        <p>
          Auteure
        </p>

        <h1>
          À propos de moi
        </h1>

        <p>
          Je suis une auteure française qui écrit des histoires où le handicap n’est pas une limite mais une réalité vivante. 
          Mes romans mettent en lumière des personnages authentiques, des âmes qui se battent et qui aiment, loin des clichés.
        </p>

        <div>
          <Button href="/about" variant="secondary">
            Découvrir
          </Button>

          <Button href="/contact" variant="secondary">
            Contact
          </Button>
        </div>
      </section>

      <section>
        <div>
           <Image
              src="/file.svg"
              alt="icon"
              width={40}
              height={60}
              className="rounded-md object-cover"
            /> 
          </div>

          <h2>
            Mon parcours
          </h2>

          <p>
            J’ai commencé à écrire sans savoir que mes histoires changeraient des vies. 
            Le handicap m’a enseigné la résilience, et l’écriture m’a donné une voix.
          </p>



        <div>
          <Image
            src="/file.svg"
            alt="icon"
            width={40}
            height={60}
            className="rounded-md object-cover"
          />

          <h2>
            L’écriture inclusive
          </h2>

          <p>
            Je refuse les stéréotypes. Mes personnages vivent, aiment, souffrent avec authenticité, loin des regards pitoyables.
          </p>
        </div>


        <div>
          <Image
            src="/file.svg"
            alt="icon"
            width={40}
            height={60}
            className="rounded-md object-cover"
          />
          <h2 >
            Une vision différente
          </h2>

          <p>
            La romance existe pour tous. Elle n’a pas de limite, pas de forme préétablie, juste des cœurs qui se trouvent.
          </p>
        </div>


        <div>
          <Image
            src="/file.svg"
            alt="icon"
            width={40}
            height={60}
            className="rounded-md object-cover"
          />
          <h2>
            Pourquoi j’écris
          </h2>

          <p>
            Parce que chaque histoire compte. Parce que le silence tue plus que les mots ne guérissent.
          </p>
        </div>


        <div>
          <Image
            src="/file.svg"
            alt="icon"
            width={40}
            height={60}
            className="rounded-md object-cover"
          />

          <h2>
            Short heading here
          </h2>

          <p>
            Texte descriptif correspondant à cette section.
          </p>
        </div>
        <div>
          <Button href="/books" variant="secondary">
          lire
          </Button>
        </div>
        <Image src="/image.jpg" alt="About me" width={400} height={300} className="rounded-md object-cover mx-auto mt-8" />
      </section>

      <section>
        <p>Chiffres</p>
        <h1>Une trajectoire qui parle d&apos;elle-même </h1>
        <p>Chaque nombre représente une lectrice, un lecteur qui à trouvé quelque chose de vrrai dans mes mots.</p>
        <div>
          <Button href="/books" variant="secondary">
            Découvrir mes livres
          </Button>
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

      <section>
        
        <h2>Valeurs</h2>
        <h1>Ce qui guide mon écriture</h1>
        <p>Chaque roman que j&apos;écris porte en lui une conviction profonde. Je crois que les hisoires vraues changent les lecteurs</p>
        <div>
            <Image
              src="/image.jpg"
              alt="Valeurs"
              width={400}
              height={300}
              className="rounded-md object-cover mx-auto mt-8"
            />

            <h1>Engagement pour la diversité</h1>
            <p>Les personnages en situation de handicap méritent des histoires qui les honorent.</p>

        </div>
        <div>
            <Image
              src="/image.jpg"
              alt="Valeurs"
              width={400}
              height={300}
              className="rounded-md object-cover mx-auto mt-8"
            />

            <h1>Histoires autentiques</h1>
            <p>Pas de clichés, pas de pité, juste la beauté brute de la vie.</p>
            
        </div>
        <div>
            <Image
              src="/image.jpg"
              alt="Valeurs"
              width={400}
              height={300}
              className="rounded-md object-cover mx-auto mt-8"
            />

            <h1>Communauté bienveillante</h1>
            <p>Mes lecteurs forment une famille où chacun se sent compris et entendu</p>
            
        </div>
        <div>
          <Button href="/#" variant="secondary">
            Explorer
          </Button>
        </div>
      </section>
      <section>
        <div>
          <h2>Auteur</h2>
          <h1>Chloé Simart</h1>
          <p>Écrivaine française passionnée par les histoires qui dérangent et qui guérissent. Depuis huit ans, je transforme mes expérience en romans.</p>
          <Button href="/#" variant="secondary">
            Explorer
          </Button>
        </div>
        <div>
          <Image
            src="/image.jpg"
            alt="Chloé Simart"
            width={400}
            height={300}
            className="rounded-md object-cover mx-auto mt-8"
          />
          <h2>Chloé Simart</h2>
          <h3>Romancière</h3>
          <p>J&apos;écris pour que ke silence ne gagne jamais. <br /> Chaque page est une victiore contre l&apos;oubli.</p>
        </div>
      </section>
      <section>
        <div>
          <h1>Lectures parlent</h1>
          <p>Leurs mots me portent</p>
        </div>
        <div>
          <h1>Webflow</h1>
          <p>&quot;Enfin une auteur qui comprend ce que c&apos;est de cicre avec le handicap sans le transformer en tragédie&quot;.</p>

          <Image
            src="/image.jpg"
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
          <p>&quot;Enfin une auteur qui comprend ce que c&apos;est de cicre avec le handicap sans le transformer en tragédie&quot;.</p>

          <Image
            src="/image.jpg"
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
          <p>&quot;Enfin une auteur qui comprend ce que c&apos;est de cicre avec le handicap sans le transformer en tragédie&quot;.</p>

          <Image
            src="/image.jpg"
            alt="photo de profile"
            width={40}
            height={60}
            className="rounded-md object-cover"
          />
          <h3>Marie Dupont</h3>
          <p>Lectrice, Lyon</p>
        </div>
      </section>
      <section>
        <div>
          <h1>Prêt à découvrir mes histoires ?</h1>
          <p>Quatre roman vous attendent, chacun porteur d&apos;une verité differente. Venez les rencontrer sur Amazon.</p>
        </div>
        <Button href="/books" variant="secondary">Lire</Button>
        <Button href="/contact" variant="secondary">Contact</Button>
      </section>
      
    </div>
  );
}