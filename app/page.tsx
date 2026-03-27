import SectionRenderer from "@/app/src/components/organisms/sections/SectionRenderer";
import { getPageBySlug } from "@/app/src/lib/pages";
import { getRomans } from "@/app/src/lib/romans";
import { notFound } from "next/navigation";

export default async function Home() {
  const [page, romans] = await Promise.all([
    getPageBySlug("home"),
    getRomans(),
  ]);

  if (!page) {
    notFound();
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
