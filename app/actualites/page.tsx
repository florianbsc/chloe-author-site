import Button from "@/app/src/components/atoms/Button";
import Image from "next/image";

export default function New() {
  return (
    <div>


      <section>
        <p>
          Actualités
        </p>

        <h1>
          Les dernières nouvelles
        </h1>

        <p>
          Suivez l’évolution de mes projets et découvrez les dates de sortie
          de mes prochains romans. Chaque histoire porte en elle une part
          de vérité qui mérite d’être partagée.
        </p>

        <div>
          <Button variant="primary">
            Découvrir
          </Button>

          <Button variant="secondary">
            Retour
          </Button>
        </div>
      </section>

      <section>

        <div>
          <p>Blog</p>
          <h2 >
            Short heading goes here
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div>
          <article>
            <div/>

            <div>
              <span>
                Category
              </span>
              <span>8 min lecture</span>
            </div>

            <h3>
              Blog titre
            </h3>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros.
            </p>

            <Button variant="secondary">
              Lire →
            </Button>
          </article>



        </div>


{/* a rendre dynamique */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="w-2 h-2 bg-black rounded-full" />
            <span className="w-2 h-2 bg-gray-300 rounded-full" />
            <span className="w-2 h-2 bg-gray-300 rounded-full" />
          </div>

          <div>
            <Button variant="secondary">
              ←
            </Button>
            <Button variant="secondary">
              →
            </Button>
          </div>
        </div>

      </section>



      <section >
        <h2>
          Ne manquez rien
          <br />
          Restez informé(e)
        </h2>

        <p>
          Recevez les actualités et les dates de sortie de mes prochains romans
          directement dans votre boîte mail.
        </p>

        <div>
          <input
            type="email"
            placeholder="Votre email"
            className="flex-1 border rounded px-4 py-2"
          />
          <Button>
            S’abonner
          </Button>
        </div>

        <p className="text-xs text-muted-foreground max-w-md">
          En vous abonnant, vous acceptez mes conditions d’utilisation
          et politique de confidentialité.
        </p>
      </section>

    </div>
  );
}