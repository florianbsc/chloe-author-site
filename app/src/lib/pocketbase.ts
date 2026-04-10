import PocketBase, { ClientResponseError, type RecordModel } from "pocketbase";

import {
  FALLBACK_ARTICLES,
  FALLBACK_REVIEWS,
  FALLBACK_ROMANS,
  getFallbackPageBySlug,
  getFallbackPages,
} from "@/app/src/lib/fallbackData";
import type { Article, Media, Page, Review, Roman, Section, User } from "@/app/src/types/content";

const PB_BASE_URL =
  process.env.PB_URL ?? process.env.NEXT_PUBLIC_PB_URL ?? "http://127.0.0.1:8090";

const FALLBACK_ON_EMPTY = process.env.PB_FALLBACK_ON_EMPTY !== "false";

export const pb = new PocketBase(PB_BASE_URL);
pb.autoCancellation(false);

type PocketBaseRecord = RecordModel & {
  [key: string]: unknown;
};

type RawMediaRecord = PocketBaseRecord & {
  title?: string;
  file?: string | string[];
  alt?: string;
  caption?: string;
};

type RawUserRecord = PocketBaseRecord & {
  email?: string;
  name?: string;
};

type RawSectionRecord = PocketBaseRecord & {
  page_id?: string;
  name?: string;
  type?: string;
  content_json?: Record<string, unknown>;
  order?: number;
  status?: "draft" | "published" | "archived";
};

type RawPageRecord = PocketBaseRecord & {
  title?: string;
  slug?: string;
  status?: "draft" | "published" | "archived";
  seo_title?: string;
  seo_description?: string;
  published_at?: string;
};

type RawRomanRecord = PocketBaseRecord & {
  title?: string;
  slug?: string;
  full_description?: string;
  status?: "draft" | "published" | "archived";
  published_at?: string;
  is_featured?: boolean;
  sales_rank?: number;
  amazon_url?: string;
  tag_ids?: string[];
  category_ids?: string[];
  cover?: string;
  expand?: {
    cover?: RawMediaRecord;
  };
};

type RawArticleRecord = PocketBaseRecord & {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  status?: "draft" | "published" | "archived";
  published_at?: string;
  featured?: boolean;
  category_ids?: string[];
  cover?: string;
  written_by?: string;
  expand?: {
    cover?: RawMediaRecord;
    written_by?: RawUserRecord;
  };
};

type RawReviewRecord = PocketBaseRecord & {
  name?: string;
  comment?: string;
  rating?: number;
  status?: "draft" | "published" | "archived";
  published_at?: string;
  roman?: string;
};

function escapeFilterValue(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\"/g, '\\\"');
}

function toSingleFileName(fileValue: string | string[] | undefined): string | undefined {
  if (!fileValue) {
    return undefined;
  }

  return Array.isArray(fileValue) ? fileValue[0] : fileValue;
}

function toMedia(record: RawMediaRecord | undefined): Media | null {
  if (!record) {
    return null;
  }

  const fileName = toSingleFileName(record.file);

  return {
    id: record.id,
    title: record.title ?? "Media",
    file: fileName ? pb.files.getURL(record, fileName) : undefined,
    alt: record.alt,
    caption: record.caption,
  };
}

function toUser(record: RawUserRecord | undefined): User | null {
  if (!record) {
    return null;
  }

  return {
    id: record.id,
    email: record.email ?? "",
    name: record.name ?? "Auteur",
  };
}

function toSection(record: RawSectionRecord): Section {
  return {
    id: record.id,
    pageId: record.page_id ?? "",
    name: record.name ?? "Section",
    type: record.type ?? "content",
    contentJson: record.content_json ?? {},
    order: typeof record.order === "number" ? record.order : 0,
    status: record.status ?? "draft",
  };
}

function toPage(record: RawPageRecord, sections: Section[]): Page {
  return {
    id: record.id,
    title: record.title ?? "Page",
    slug: record.slug ?? "page",
    status: record.status ?? "draft",
    seoTitle: record.seo_title,
    seoDescription: record.seo_description,
    publishedAt: record.published_at,
    sections,
  };
}

function toRoman(record: RawRomanRecord): Roman {
  return {
    id: record.id,
    title: record.title ?? "Roman",
    slug: record.slug ?? "roman",
    fullDescription: record.full_description ?? "",
    status: record.status ?? "draft",
    publishedAt: record.published_at,
    isFeatured: Boolean(record.is_featured),
    salesRank: typeof record.sales_rank === "number" ? record.sales_rank : undefined,
    amazonUrl: record.amazon_url,
    cover: toMedia(record.expand?.cover),
    tagIds: Array.isArray(record.tag_ids) ? record.tag_ids : [],
    categoryIds: Array.isArray(record.category_ids) ? record.category_ids : [],
  };
}

function toArticle(record: RawArticleRecord): Article {
  return {
    id: record.id,
    title: record.title ?? "Article",
    slug: record.slug ?? "article",
    excerpt: record.excerpt ?? "",
    content: record.content ?? "",
    status: record.status ?? "draft",
    publishedAt: record.published_at,
    featured: Boolean(record.featured),
    cover: toMedia(record.expand?.cover),
    writtenBy: toUser(record.expand?.written_by),
    categoryIds: Array.isArray(record.category_ids) ? record.category_ids : [],
  };
}

function toReview(record: RawReviewRecord): Review {
  return {
    id: record.id,
    romanId: record.roman ?? "",
    name: record.name ?? "Lecteur",
    comment: record.comment ?? "",
    rating: typeof record.rating === "number" ? record.rating : 0,
    status: record.status ?? "draft",
    publishedAt: record.published_at,
  };
}

function isNotFoundError(error: unknown): boolean {
  return error instanceof ClientResponseError && error.status === 404;
}

function logPocketBaseError(scope: string, error: unknown): void {
  if (error instanceof ClientResponseError) {
    console.error(`[PocketBase:${scope}]`, {
      status: error.status,
      message: error.message,
      response: error.response,
      url: PB_BASE_URL,
    });
    return;
  }

  console.error(`[PocketBase:${scope}]`, error);
}

export async function getPages(): Promise<Page[]> {
  try {
    const [pages, sections] = await Promise.all([
      pb.collection<RawPageRecord>("pages").getFullList({ sort: "title" }),
      pb.collection<RawSectionRecord>("sections").getFullList({ sort: "page_id,order" }),
    ]);

    if (pages.length === 0) {
      return FALLBACK_ON_EMPTY ? getFallbackPages() : [];
    }

    const sectionsByPage = new Map<string, Section[]>();

    sections.forEach((sectionRecord) => {
      const mapped = toSection(sectionRecord);
      const current = sectionsByPage.get(mapped.pageId) ?? [];
      current.push(mapped);
      sectionsByPage.set(mapped.pageId, current);
    });

    return pages.map((pageRecord) => {
      const pageSections = (sectionsByPage.get(pageRecord.id) ?? []).sort(
        (a, b) => a.order - b.order,
      );
      return toPage(pageRecord, pageSections);
    });
  } catch (error) {
    logPocketBaseError("getPages", error);
    return getFallbackPages();
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const normalizedSlug = slug.trim().toLowerCase();

  if (!normalizedSlug) {
    return null;
  }

  try {
    const page = await pb
      .collection<RawPageRecord>("pages")
      .getFirstListItem(`slug=\"${escapeFilterValue(normalizedSlug)}\"`);

    const sections = await pb.collection<RawSectionRecord>("sections").getFullList({
      filter: `page_id=\"${escapeFilterValue(page.id)}\"`,
      sort: "order",
    });

    return toPage(
      page,
      sections.map((item) => toSection(item)).sort((a, b) => a.order - b.order),
    );
  } catch (error) {
    if (isNotFoundError(error)) {
      return FALLBACK_ON_EMPTY ? getFallbackPageBySlug(normalizedSlug) : null;
    }

    logPocketBaseError("getPageBySlug", error);
    return getFallbackPageBySlug(normalizedSlug);
  }
}

export async function getRomans(): Promise<Roman[]> {
  try {
    const romans = await pb.collection<RawRomanRecord>("romans").getFullList({
      sort: "sales_rank,title",
      expand: "cover",
    });

    if (romans.length === 0) {
      return FALLBACK_ON_EMPTY ? FALLBACK_ROMANS : [];
    }

    return romans.map((record) => toRoman(record));
  } catch (error) {
    logPocketBaseError("getRomans", error);
    return FALLBACK_ROMANS;
  }
}

export async function getRomanBySlug(slug: string): Promise<Roman | null> {
  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug) {
    return null;
  }

  try {
    const roman = await pb
      .collection<RawRomanRecord>("romans")
      .getFirstListItem(`slug=\"${escapeFilterValue(normalizedSlug)}\"`, {
        expand: "cover",
      });

    return toRoman(roman);
  } catch (error) {
    if (isNotFoundError(error)) {
      return FALLBACK_ROMANS.find((item) => item.slug === normalizedSlug) ?? null;
    }

    logPocketBaseError("getRomanBySlug", error);
    return FALLBACK_ROMANS.find((item) => item.slug === normalizedSlug) ?? null;
  }
}

export async function getArticles(): Promise<Article[]> {
  try {
    const articles = await pb.collection<RawArticleRecord>("articles").getFullList({
      sort: "-published_at,-created",
      expand: "cover,written_by",
    });

    if (articles.length === 0) {
      return FALLBACK_ON_EMPTY ? FALLBACK_ARTICLES : [];
    }

    return articles.map((record) => toArticle(record));
  } catch (error) {
    logPocketBaseError("getArticles", error);
    return FALLBACK_ARTICLES;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug) {
    return null;
  }

  try {
    const article = await pb
      .collection<RawArticleRecord>("articles")
      .getFirstListItem(`slug=\"${escapeFilterValue(normalizedSlug)}\"`, {
        expand: "cover,written_by",
      });

    return toArticle(article);
  } catch (error) {
    if (isNotFoundError(error)) {
      return FALLBACK_ARTICLES.find((item) => item.slug === normalizedSlug) ?? null;
    }

    logPocketBaseError("getArticleBySlug", error);
    return FALLBACK_ARTICLES.find((item) => item.slug === normalizedSlug) ?? null;
  }
}

export async function getReviewsByRomanId(romanId: string): Promise<Review[]> {
  if (!romanId) {
    return [];
  }

  try {
    const reviews = await pb.collection<RawReviewRecord>("reviews").getFullList({
      filter: `roman=\"${escapeFilterValue(romanId)}\"`,
      sort: "-published_at,-created",
    });

    if (reviews.length === 0) {
      return FALLBACK_REVIEWS.filter((review) => review.romanId === romanId);
    }

    return reviews.map((record) => toReview(record));
  } catch (error) {
    logPocketBaseError("getReviewsByRomanId", error);
    return FALLBACK_REVIEWS.filter((review) => review.romanId === romanId);
  }
}
