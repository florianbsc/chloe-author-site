import SectionRenderer from "@/app/src/components/organisms/sections/SectionRenderer";
import { getPageBySlug } from "@/app/src/lib/pages";
import { getRomans } from "@/app/src/lib/romans";

export default async function Home() {
  const [page, romans] = await Promise.all([
    getPageBySlug("home"),
    getRomans(),
  ]);

  if (!page) {
    return (
      <section className="section-wrap-sm section-pad-md text-ink">
        <h1 className="text-h2 font-bold leading-tight tracking-title">
          Contenu indisponible
        </h1>
        <p className="mt-4 text-body leading-body-lg">
          La page Accueil est introuvable ou non publiee dans PocketBase.
        </p>
      </section>
    );
  }

  if (page.sections.length === 0) {
    return (
      <section className="section-wrap-sm section-pad-md text-ink">
        <h1 className="text-h2 font-bold leading-tight tracking-title">
          Aucune section publiee
        </h1>
        <p className="mt-4 text-body leading-body-lg">
          Ajoutez des sections a la page Accueil depuis PocketBase.
        </p>
      </section>
    );
  }

  return (
    <SectionRenderer
      sections={page.sections}
      context={{
        romans,
      }}
    />
  );
}
