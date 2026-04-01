import type { RecordModel } from "pocketbase";
import {
  getRoman,
  getRomans as getRomansFromPocketBase,
  type Roman,
} from "@/app/src/lib/pocketbaseService";
import { andFilters, eqFilter, logPbError, pb, pbEnabled } from "@/app/src/lib/pb";

export type { Roman };

export type RomanReview = {
  id: string;
  romanId: string;
  name: string;
  role: string;
  rating?: number;
  comment: string;
  date: string;
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
  const result = await getRomansFromPocketBase();
  return result.items;
}

export async function getRomanBySlug(slug: string): Promise<Roman | null> {
  return getRoman(slug);
}

export async function getRomanSlugs(): Promise<string[]> {
  const result = await getRomansFromPocketBase({
    page: 1,
    perPage: 200,
    sort: "slug",
    fields: "id,slug",
  });

  return result.items.map((roman) => roman.slug || roman.id);
}

export async function getReviewsByRomanId(
  romanId: string,
): Promise<RomanReview[]> {
  if (!pbEnabled || !pb) {
    return [];
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
    return [];
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
