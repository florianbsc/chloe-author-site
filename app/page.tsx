import SectionRenderer from "@/app/src/components/organisms/sections/SectionRenderer";
import { getPageBySlug } from "@/app/src/lib/pages";
import { getRomans } from "@/app/src/lib/romans";

export default async function Home() {
  const [page, romans] = await Promise.all([
    getPageBySlug("home"),
    getRomans(),
  ]);

  if (!page) {
    return null;
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
