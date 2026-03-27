import SectionRenderer from "@/app/src/components/organisms/sections/SectionRenderer";
import { getPageBySlug } from "@/app/src/lib/pages";
import { getAuthors } from "@/app/src/lib/authors";
import { getTestimonials } from "@/app/src/lib/testimonials";
import { notFound } from "next/navigation";

export default async function About() {
  const [page, authors, testimonials] = await Promise.all([
    getPageBySlug("about"),
    getAuthors(),
    getTestimonials("about"),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <SectionRenderer
        sections={page.sections}
        context={{
          authors,
          testimonials,
        }}
      />
    </div>
  );
}
