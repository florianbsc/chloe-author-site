import SectionRenderer from "@/app/src/components/organisms/sections/SectionRenderer";
import { getPageBySlug } from "@/app/src/lib/pages";
import { getArticles } from "@/app/src/lib/articles";

export default async function Actualite() {
  const [page, articles] = await Promise.all([
    getPageBySlug("actualites"),
    getArticles(),
  ]);

  if (!page) {
    return null;
  }

  return (
    <div className="flex flex-col gap-16 pb-16 lg:gap-24">
      <SectionRenderer
        sections={page.sections}
        context={{
          articles,
        }}
      />
    </div>
  );
}
