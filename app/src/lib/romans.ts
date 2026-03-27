import type { RecordModel } from "pocketbase";
import {
  andFilters,
  eqFilter,
  getFileUrl,
  logPbError,
  pb,
  pbEnabled,
} from "@/app/src/lib/pb";

export type Roman = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  summary: string;
  cover: string;
  coverAlt?: string;
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

type RomanRecord = RecordModel & {
  slug?: string;
  title?: string;
  short_description?: string;
  shortDescription?: string;
  summary?: string;
  cover?: string;
  details?: Roman["details"];
  story?: string[];
  full_description?: string;
  availability_label?: string;
  availability_url?: string;
  bestseller_rank?: number;
  bestsellerRank?: number;
  sales_rank?: number;
  amazon_url?: string;
  tags?: string[];
  expand?: {
    cover?: RecordModel;
    tags?: Array<{ name?: string }>;
  };
};

type ReviewRecord = RecordModel & {
  roman?: string;
  name?: string;
  role?: string;
  rating?: number;
  comment?: string;
  published_at?: string;
  date?: string;
};

const ROMANS: Roman[] = [
  {
    id: "les-secrets-de-clara",
    slug: "les-secrets-de-clara",
    title: "Les secrets de Clara",
    shortDescription:
      "Un thriller sombre où les mensonges s'accumulent et où chaque secret cache une blessure plus profonde.",
    summary:
      "Dans l'ombre d'une vieille demeure, des secrets enfouis refusent de rester silencieux. Un roman qui explore les zones grises de l'âme humaine.",
    cover: "/books.jpg",
    bestsellerRank: 2,
    tags: ["Thriller", "Handicap", "Suspense"],
    details: {
      genre: "Thriller psychologique",
      pages: 368,
      year: 2024,
      isbn: "978-2-0000-0000-0",
    },
    story: [
      "La Loge des Silences plonge le lecteur dans une atmosphère étouffante où chaque personnage porte le poids de ses non-dits. Chloé Simart tisse une intrigue complexe autour d'une femme en situation de handicap qui découvre progressivement que sa maison cache bien plus que des murs.",
      "Ce roman explore les thèmes de l'isolement, de la résilience et de la force cachée en chacun de nous. L'auteure peint avec finesse les nuances psychologiques des personnages, refusant les clichés pour offrir une représentation authentique et profonde.",
      "Le suspense s'épaissit au fil des pages, révélant comment le handicap n'est jamais un obstacle à la découverte de la vérité. Chloé Simart démontre que la vulnérabilité peut être une source de pouvoir insoupçonné.",
      "Ce livre s'adresse à ceux qui cherchent des histoires nuancées, loin des sentiers battus. Une lecture qui marque et qui fait réfléchir longtemps après la dernière page.",
    ],
    availability: {
      label: "Disponible sur Amazon",
      url: "https://www.amazon.fr",
    },
  },
  {
    id: "mon-eternel-combat",
    slug: "mon-eternel-combat",
    title: "Mon éternel combat",
    shortDescription:
      "Mon autobiographie, écriture brute et sincère de ma vie, de mes luttes et de mes victoires quotidiennes.",
    summary:
      "Un récit intime qui raconte le courage, les doutes et la détermination d'une femme qui refuse d'être définie par ses limites.",
    cover: "/books.jpg",
    bestsellerRank: 3,
    tags: ["Autobiographie", "Résilience", "Handicap"],
    details: {
      genre: "Autobiographie",
      pages: 312,
      year: 2023,
      isbn: "978-2-0000-0000-1",
    },
    story: [
      "Mon éternel combat est un témoignage puissant sur l'acceptation de soi et la force intérieure.",
      "L'auteure partage ses victoires et ses moments de doute avec une sincérité rare.",
      "Un récit qui inspire et invite à reconsidérer la notion de normalité.",
    ],
    availability: {
      label: "Disponible sur Amazon",
      url: "https://www.amazon.fr",
    },
  },
  {
    id: "nos-blessures-sous-la-peau",
    slug: "nos-blessures-sous-la-peau",
    title: "Nos blessures sous la peau",
    shortDescription:
      "Une romance qui explore comment l'amour naît et s'épanouit entre deux âmes marquées par la vie.",
    summary:
      "Une histoire d'amour qui se construit dans la fragilité et la confiance, loin des clichés romantiques.",
    cover: "/books.jpg",
    bestsellerRank: 4,
    tags: ["Romance", "Contemporain", "Émotions"],
    details: {
      genre: "Romance",
      pages: 340,
      year: 2022,
      isbn: "978-2-0000-0000-2",
    },
    story: [
      "Nos blessures sous la peau raconte la rencontre de deux êtres cabossés qui apprennent à se reconstruire.",
      "Chaque chapitre révèle un peu plus la profondeur de leurs émotions.",
      "Un roman sur la tendresse, la confiance et l'acceptation.",
    ],
    availability: {
      label: "Disponible sur Amazon",
      url: "https://www.amazon.fr",
    },
  },
  {
    id: "la-loge-des-silences",
    slug: "la-loge-des-silences",
    title: "La Loge des Silences",
    shortDescription:
      "Un thriller captivant où le silence devient complice et où la vérité doit être arrachée à l'obscurité.",
    summary:
      "Dans l'ombre d'une vieille demeure, des secrets enfouis refusent de rester silencieux. Un roman qui explore les zones grises de l'âme humaine.",
    cover: "/books.jpg",
    bestsellerRank: 1,
    tags: ["Thriller", "Handicap", "Suspense"],
    details: {
      genre: "Thriller psychologique",
      pages: 384,
      year: 2024,
      isbn: "978-2-0000-0000-3",
    },
    story: [
      "La Loge des Silences plonge le lecteur dans une atmosphère étouffante où chaque personnage porte le poids de ses non-dits. Chloé Simart tisse une intrigue complexe autour d'une femme en situation de handicap qui découvre progressivement que sa maison cache bien plus que des murs.",
      "Ce roman explore les thèmes de l'isolement, de la résilience et de la force cachée en chacun de nous. L'auteure peint avec finesse les nuances psychologiques des personnages, refusant les clichés pour offrir une représentation authentique et profonde.",
      "Le suspense s'épaissit au fil des pages, révélant comment le handicap n'est jamais un obstacle à la découverte de la vérité. Chloé Simart démontre que la vulnérabilité peut être une source de pouvoir insoupçonné.",
      "Ce livre s'adresse à ceux qui cherchent des histoires nuancées, loin des sentiers battus. Une lecture qui marque et qui fait réfléchir longtemps après la dernière page.",
    ],
    availability: {
      label: "Disponible sur Amazon",
      url: "https://www.amazon.fr",
    },
  },
];

const ROMAN_REVIEWS: RomanReview[] = [
  {
    id: "review-1",
    romanId: "la-loge-des-silences",
    name: "Marie Leclerc",
    role: "Lectrice passionnée",
    rating: 5,
    comment:
      "Un roman qui m'a bouleversée, des personnages si vrais qu'on les porte longtemps après la dernière page.",
    date: "2024-10-12",
  },
  {
    id: "review-2",
    romanId: "la-loge-des-silences",
    name: "Thomas Beaumont",
    role: "Critique littéraire",
    rating: 5,
    comment:
      "Chloé écrit comme on respire, avec une naturel qui désarme. Ses histoires restent gravées.",
    date: "2024-11-03",
  },
  {
    id: "review-3",
    romanId: "la-loge-des-silences",
    name: "Sophie Arnaud",
    role: "Lectrice fidèle",
    rating: 4,
    comment:
      "J'ai trouvé dans ces pages une compréhension que je cherchais depuis longtemps. Merci.",
    date: "2024-11-18",
  },
];

function mapTags(record: RomanRecord) {
  const expandedTags = record.expand?.tags ?? [];
  const byExpand = expandedTags
    .map((tag) => tag.name)
    .filter((tag): tag is string => Boolean(tag));
  if (byExpand.length > 0) {
    return byExpand;
  }

  if (Array.isArray(record.tags) && record.tags.length > 0) {
    return record.tags;
  }
  return [];
}

function mapRoman(record: RomanRecord): Roman {
  const details = record.details ?? {
    genre: "",
    pages: 0,
    year: new Date().getFullYear(),
  };
  const story = Array.isArray(record.story)
    ? record.story
    : record.story
      ? [record.story as unknown as string]
      : record.full_description
        ? [record.full_description]
      : [];

  const coverRecord = record.expand?.cover ?? record;
  const coverFile = record.expand?.cover
    ? (record.expand.cover as RecordModel & { file?: string }).file ?? ""
    : record.cover ?? "";

  return {
    id: record.id,
    slug: record.slug ?? record.id,
    title: record.title ?? "",
    shortDescription: record.short_description ?? record.shortDescription ?? "",
    summary: record.summary ?? "",
    cover: getFileUrl(coverRecord, coverFile) || record.cover || "",
    coverAlt: record.title ?? "Couverture",
    bestsellerRank: record.bestseller_rank ?? record.bestsellerRank ?? record.sales_rank,
    tags: mapTags(record),
    details,
    story,
    availability: {
      label: record.availability_label ?? "Disponible",
      url: record.availability_url ?? record.amazon_url ?? "#",
    },
  };
}

function mapReview(record: ReviewRecord): RomanReview {
  return {
    id: record.id,
    romanId: record.roman ?? "",
    name: record.name ?? "",
    role: record.role ?? "",
    rating: record.rating,
    comment: record.comment ?? "",
    date: record.published_at ?? record.date ?? new Date().toISOString(),
  };
}

export async function getRomans(): Promise<Roman[]> {
  if (!pbEnabled || !pb) {
    return ROMANS;
  }

  try {
    const result = await pb.collection("romans").getList<RomanRecord>(1, 100, {
      sort: "bestseller_rank,sales_rank",
      filter: 'status = "published"',
      expand: "cover,tags",
      fields: [
        "id",
        "slug",
        "title",
        "short_description",
        "shortDescription",
        "summary",
        "cover",
        "tags",
        "details",
        "story",
        "full_description",
        "availability_label",
        "availability_url",
        "amazon_url",
        "bestseller_rank",
        "bestsellerRank",
        "sales_rank",
        "expand.cover.file",
        "expand.tags.name",
      ].join(","),
    });
    return result.items.map(mapRoman);
  } catch (error) {
    logPbError("getRomans", error);
    return ROMANS;
  }
}

export async function getRomanBySlug(slug: string): Promise<Roman | null> {
  if (!pbEnabled || !pb) {
    return ROMANS.find((roman) => roman.slug === slug) ?? null;
  }

  try {
    const record = await pb
      .collection("romans")
      .getFirstListItem<RomanRecord>(eqFilter("slug", slug), {
        expand: "cover,tags",
      });
    return mapRoman(record);
  } catch (error) {
    logPbError("getRomanBySlug", error, { slug });
    const fallback = ROMANS.find((roman) => roman.slug === slug) ?? null;
    return fallback;
  }
}

export async function getRomanSlugs(): Promise<string[]> {
  if (!pbEnabled || !pb) {
    return ROMANS.map((roman) => roman.slug);
  }

  try {
    const result = await pb.collection("romans").getList<RomanRecord>(1, 200, {
      fields: "slug",
    });
    return result.items.map((record) => record.slug ?? record.id);
  } catch (error) {
    logPbError("getRomanSlugs", error);
    return ROMANS.map((roman) => roman.slug);
  }
}

export async function getReviewsByRomanId(
  romanId: string,
): Promise<RomanReview[]> {
  if (!pbEnabled || !pb) {
    return ROMAN_REVIEWS.filter((review) => review.romanId === romanId);
  }

  try {
    const result = await pb.collection("reviews").getList<ReviewRecord>(1, 100, {
      filter: andFilters([
        eqFilter("roman", romanId),
        'status = "approved"',
      ]),
      sort: "-published_at",
      fields: "id,roman,name,role,rating,comment,published_at,date",
    });
    return result.items.map(mapReview);
  } catch (error) {
    logPbError("getReviewsByRomanId", error, { romanId });
    return ROMAN_REVIEWS.filter((review) => review.romanId === romanId);
  }
}

export async function getTopRomans(
  excludeId: string,
  limit = 3,
): Promise<Roman[]> {
  const romans = await getRomans();
  const ranked = [...romans].sort((a, b) => {
    const aRank = a.bestsellerRank ?? Number.MAX_SAFE_INTEGER;
    const bRank = b.bestsellerRank ?? Number.MAX_SAFE_INTEGER;
    return aRank - bRank;
  });

  return ranked.filter((roman) => roman.id !== excludeId).slice(0, limit);
}
