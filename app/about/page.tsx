import SectionRenderer from "@/app/src/components/organisms/sections/SectionRenderer";
import { getPageBySlug } from "@/app/src/lib/pages";

export default async function About() {
  const page = await getPageBySlug("about");

  if (!page) {
    return (
      <section className="section-wrap-sm section-pad-md text-ink">
        <h1 className="text-h2 font-bold leading-tight tracking-title">
          Contenu indisponible
        </h1>
        <p className="mt-4 text-body leading-body-lg">
          La page A propos est introuvable ou non publiee dans PocketBase.
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
          Ajoutez des sections a la page A propos depuis PocketBase.
        </p>
      </section>
    );
  }

  return (
    <div className="flex flex-col">
      <SectionRenderer sections={page.sections} />
    </div>
  );
}
