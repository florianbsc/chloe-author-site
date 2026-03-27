import type { RecordModel } from "pocketbase";
import { andFilters, eqFilter, logPbError, pb, pbEnabled } from "@/app/src/lib/pb";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role?: string;
  logo?: string;
  context?: string;
};

type TestimonialRecord = RecordModel & {
  quote?: string;
  name?: string;
  role?: string;
  logo?: string;
  context?: string;
  status?: string;
  order?: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    quote:
      "Enfin une auteure qui comprend ce que c'est de vivre avec le handicap sans le transformer en tragédie.",
    name: "Marie Dupont",
    role: "Lectrice, Lyon",
    context: "about",
  },
  {
    id: "testimonial-2",
    quote:
      "Les secrets de Clara m'a fait pleurer et rire. C'est rare de trouver une telle honnêteté dans la fiction.",
    name: "Thomas Bernard",
    role: "Lecteur, Paris",
    context: "about",
  },
  {
    id: "testimonial-3",
    quote:
      "Chloé écrit comme elle respire. Ses histoires deviennent les nôtres, et on ne s'en remet jamais.",
    name: "Isabelle Moreau",
    role: "Lectrice, Marseille",
    context: "about",
  },
  {
    id: "testimonial-4",
    quote:
      "Ces romans m'ont permis de me voir enfin représentée dans une histoire vraie.",
    name: "Marie Dupont",
    role: "Lectrice passionnée",
    context: "romans",
  },
  {
    id: "testimonial-5",
    quote:
      "Chloé écrit avec une force brute qui traverse les pages et s'installe en vous.",
    name: "Thomas Mercier",
    role: "Critique littéraire",
    context: "romans",
  },
  {
    id: "testimonial-6",
    quote:
      "Un roman qui ne vous lâche pas. L'humanité crue et sans détour qu'on attendait.",
    name: "Sophie Bernard",
    role: "Lectrice assidue",
    context: "romans",
  },
  {
    id: "testimonial-7",
    quote: "Un roman qui m'a bouleversée du début à la fin.",
    name: "Marie Dupont",
    role: "Lectrice passionnée",
    context: "articles",
  },
  {
    id: "testimonial-8",
    quote: "Chloé écrit avec une sincérité rare et profonde.",
    name: "Thomas Bernard",
    role: "Lecteur engagé",
    context: "articles",
  },
];

function mapTestimonial(record: TestimonialRecord): Testimonial {
  return {
    id: record.id,
    quote: record.quote ?? "",
    name: record.name ?? "",
    role: record.role,
    logo: record.logo,
    context: record.context,
  };
}

export async function getTestimonials(context?: string): Promise<Testimonial[]> {
  if (!pbEnabled || !pb) {
    return context
      ? TESTIMONIALS.filter((item) => item.context === context)
      : TESTIMONIALS;
  }

  try {
    const filter = andFilters([
      context ? eqFilter("context", context) : undefined,
      'status = "published"',
    ]);
    const result = await pb.collection("testimonials").getList<TestimonialRecord>(1, 100, {
      sort: "order,-created",
      filter,
      fields: "id,quote,name,role,logo,context,status,order",
    });
    return result.items.map(mapTestimonial);
  } catch (error) {
    logPbError("getTestimonials", error, { context });
    return context
      ? TESTIMONIALS.filter((item) => item.context === context)
      : TESTIMONIALS;
  }
}
