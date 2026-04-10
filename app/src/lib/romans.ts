import {
  getReviewsByRomanId as getPocketbaseReviewsByRomanId,
  getRomanBySlug as getPocketbaseRomanBySlug,
  getRomans as getPocketbaseRomans,
} from "@/app/src/lib/pocketbase";

export type Roman = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  summary: string;
  cover: string;
  bestsellerRank?: number;
  tags: string[];
  details: {
    genre: string;
    pages: number;
    year: number;
    isbn?: string;
  };
  story: string[];
  availability: {
    label: string;
    url: string;
  };
};

export type RomanReview = {
  id: string;
  romanId: string;
  name: string;
  role: string;
  rating?: number;
  comment: string;
  date: string;
};

function humanizeTag(tagId: string): string {
  const raw = tagId.replace(/^tag-/, "").replace(/^cat-/, "").replace(/-/g, " ").trim();
  if (!raw) {
    return "Roman";
  }

  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function splitParagraphs(content: string): string[] {
  return content
    .split(/\n{2,}/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function toShortDescription(content: string): string {
  const firstParagraph = splitParagraphs(content)[0] ?? "";
  if (firstParagraph.length <= 160) {
    return firstParagraph;
  }

  return `${firstParagraph.slice(0, 157)}...`;
}

function toRomanViewModel(data: Awaited<ReturnType<typeof getPocketbaseRomans>>[number]): Roman {
  const publishedYear = data.publishedAt ? new Date(data.publishedAt).getFullYear() : 2024;
  const story = splitParagraphs(data.fullDescription);
  const summary = story[0] ?? "";
  const tags = [...data.tagIds, ...data.categoryIds].map((tagId) => humanizeTag(tagId));

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    shortDescription: toShortDescription(data.fullDescription),
    summary,
    cover: data.cover?.file ?? "/books.jpg",
    bestsellerRank: data.salesRank,
    tags: tags.length > 0 ? tags : ["Roman"],
    details: {
      genre: tags[0] ?? "Roman",
      pages: 320,
      year: Number.isFinite(publishedYear) ? publishedYear : 2024,
    },
    story: story.length > 0 ? story : [data.fullDescription],
    availability: {
      label: "Disponible sur Amazon",
      url: data.amazonUrl ?? "https://www.amazon.fr",
    },
  };
}

export async function getRomans(): Promise<Roman[]> {
  const romans = await getPocketbaseRomans();
  return romans.map((roman) => toRomanViewModel(roman));
}

export async function getRomanBySlug(slug: string): Promise<Roman | null> {
  const roman = await getPocketbaseRomanBySlug(slug);
  if (!roman) {
    return null;
  }

  return toRomanViewModel(roman);
}

export async function getRomanSlugs(): Promise<string[]> {
  const romans = await getRomans();
  return romans.map((roman) => roman.slug);
}

export async function getReviewsByRomanId(romanId: string): Promise<RomanReview[]> {
  const reviews = await getPocketbaseReviewsByRomanId(romanId);
  return reviews.map((review) => ({
    id: review.id,
    romanId: review.romanId,
    name: review.name,
    role: "Lecteur",
    rating: review.rating,
    comment: review.comment,
    date: review.publishedAt ?? new Date().toISOString(),
  }));
}

export async function getTopRomans(excludeId: string, limit = 3): Promise<Roman[]> {
  const romans = await getRomans();
  const ranked = [...romans].sort((a, b) => {
    const aRank = a.bestsellerRank ?? Number.MAX_SAFE_INTEGER;
    const bRank = b.bestsellerRank ?? Number.MAX_SAFE_INTEGER;
    return aRank - bRank;
  });

  return ranked.filter((roman) => roman.id !== excludeId).slice(0, limit);
}
