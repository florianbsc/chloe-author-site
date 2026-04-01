import type { RecordModel } from "pocketbase";
import { getFileUrl, logPbError, pb, pbEnabled } from "@/app/src/lib/pb";

export type ListQueryParams = {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
  expand?: string;
  fields?: string;
  skipTotal?: boolean;
};

export type PaginatedResult<T> = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
};

export type ArticleAuthor = {
  name: string;
  role?: string;
  avatar?: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string | Array<{ type: string; value?: string; data?: Record<string, unknown> }>;
  conclusion?: string | string[];
  cover?: string;
  coverAlt?: string;
  author?: ArticleAuthor;
  readTime?: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
};

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

type ListRecordOptions = Omit<ListQueryParams, "page" | "perPage">;

type GetRecordByIdOrSlugOptions = {
  slugField?: string;
  filter?: string;
} & ListRecordOptions;

type ArticleRecord = RecordModel & {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string | Array<{ type: string; value?: string; data?: Record<string, unknown> }>;
  conclusion?: string | string[];
  read_time?: string;
  seo_title?: string;
  seo_description?: string;
  cover?: string;
  category?: string;
  tags?: string[];
  published_at?: string;
  expand?: {
    cover?: RecordModel;
    author?: RecordModel;
    tags?: Array<{ name?: string }>;
    category?: { name?: string };
  };
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

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 30;
const inFlightReads = new Map<string, Promise<unknown>>();

const DEFAULT_ARTICLES_OPTIONS: ListRecordOptions = {
  sort: "-published_at",
  filter: 'status = "published"',
  expand: "cover,author,tags,category",
  fields: [
    "id",
    "slug",
    "title",
    "excerpt",
    "content",
    "conclusion",
    "cover",
    "read_time",
    "category",
    "tags",
    "published_at",
    "seo_title",
    "seo_description",
    "expand.cover.file",
    "expand.author.name",
    "expand.author.role",
    "expand.author.avatar",
    "expand.tags.name",
    "expand.category.name",
  ].join(","),
};

const DEFAULT_ROMANS_OPTIONS: ListRecordOptions = {
  sort: "bestseller_rank,sales_rank,-published_at",
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
};

function emptyPaginatedResult<T>(
  page = DEFAULT_PAGE,
  perPage = DEFAULT_PER_PAGE,
): PaginatedResult<T> {
  return {
    page,
    perPage,
    totalItems: 0,
    totalPages: 0,
    items: [],
  };
}

function mergeFilters(...filters: Array<string | undefined>) {
  return filters.filter(Boolean).join(" && ");
}

function serializeListParams(params: ListQueryParams) {
  const normalized = Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)),
  );

  return JSON.stringify(normalized);
}

function isClientResponseError(error: unknown): error is { status?: number } {
  return typeof error === "object" && error !== null && "status" in error;
}

async function withInFlightDedup<T>(key: string, factory: () => Promise<T>) {
  const running = inFlightReads.get(key);
  if (running) {
    return running as Promise<T>;
  }

  const request = factory().finally(() => {
    inFlightReads.delete(key);
  });

  inFlightReads.set(key, request);
  return request;
}

async function listRecords<TRecord extends RecordModel>(
  collection: string,
  params: ListQueryParams,
): Promise<PaginatedResult<TRecord>> {
  const page = params.page ?? DEFAULT_PAGE;
  const perPage = params.perPage ?? DEFAULT_PER_PAGE;

  if (!pbEnabled || !pb) {
    return emptyPaginatedResult<TRecord>(page, perPage);
  }

  try {
    const result = await pb.collection(collection).getList<TRecord>(page, perPage, {
      sort: params.sort,
      filter: params.filter,
      expand: params.expand,
      fields: params.fields,
      skipTotal: params.skipTotal,
    });

    return {
      page: result.page,
      perPage: result.perPage,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      items: result.items,
    };
  } catch (error) {
    logPbError(`listRecords:${collection}`, error, {
      page,
      perPage,
      sort: params.sort,
      filter: params.filter,
    });
    return emptyPaginatedResult<TRecord>(page, perPage);
  }
}

async function getRecordByIdOrSlug<TRecord extends RecordModel>(
  collection: string,
  idOrSlug: string,
  options: GetRecordByIdOrSlugOptions,
): Promise<TRecord | null> {
  const identifier = idOrSlug.trim();

  if (!identifier || !pbEnabled || !pb) {
    return null;
  }

  try {
    return await pb.collection(collection).getOne<TRecord>(identifier, {
      expand: options.expand,
      fields: options.fields,
    });
  } catch (error) {
    if (!isClientResponseError(error) || (error.status !== 404 && error.status !== 400)) {
      logPbError(`getRecordById:${collection}`, error, { identifier });
      return null;
    }
  }

  try {
    const slugField = options.slugField ?? "slug";
    const slugFilter = pb.filter(`${slugField} = {:value}`, { value: identifier });
    const filter = mergeFilters(options.filter, slugFilter);

    return await pb.collection(collection).getFirstListItem<TRecord>(filter, {
      expand: options.expand,
      fields: options.fields,
    });
  } catch (error) {
    if (!isClientResponseError(error) || error.status !== 404) {
      logPbError(`getRecordBySlug:${collection}`, error, { identifier });
    }
    return null;
  }
}

function mapArticle(record: ArticleRecord): Article {
  const coverRecord = record.expand?.cover ?? record;
  const coverFile = record.expand?.cover
    ? (record.expand.cover as RecordModel & { file?: string }).file ?? ""
    : record.cover ?? "";

  const authorRecord = record.expand?.author as RecordModel | undefined;
  const authorAvatar = authorRecord
    ? getFileUrl(authorRecord, (authorRecord as RecordModel & { avatar?: string }).avatar)
    : "";

  const tags =
    record.tags ??
    (record.expand?.tags ?? [])
      .map((tag) => tag.name)
      .filter((tag): tag is string => Boolean(tag));

  return {
    id: record.id,
    slug: record.slug ?? record.id,
    title: record.title ?? "",
    excerpt: record.excerpt ?? "",
    content: record.content ?? "",
    conclusion: record.conclusion,
    cover: getFileUrl(coverRecord, coverFile) || record.cover,
    coverAlt: record.title ?? "",
    author: authorRecord
      ? {
          name: (authorRecord as RecordModel & { name?: string }).name ?? "",
          role: (authorRecord as RecordModel & { role?: string }).role,
          avatar: authorAvatar,
        }
      : undefined,
    readTime: record.read_time,
    category: record.expand?.category?.name ?? record.category ?? undefined,
    tags,
    publishedAt: record.published_at,
    seoTitle: record.seo_title,
    seoDescription: record.seo_description,
  };
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

  const expandedTags = record.expand?.tags ?? [];
  const tagsByExpand = expandedTags
    .map((tag) => tag.name)
    .filter((tag): tag is string => Boolean(tag));

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
    tags: tagsByExpand.length > 0 ? tagsByExpand : record.tags ?? [],
    details,
    story,
    availability: {
      label: record.availability_label ?? "Disponible",
      url: record.availability_url ?? record.amazon_url ?? "#",
    },
  };
}

export async function getArticles(
  params: ListQueryParams = {},
): Promise<PaginatedResult<Article>> {
  return withInFlightDedup(
    `getArticles:${serializeListParams(params)}`,
    async () => {
      const page = params.page ?? DEFAULT_PAGE;
      const perPage = params.perPage ?? DEFAULT_PER_PAGE;

      const records = await listRecords<ArticleRecord>("articles", {
        ...DEFAULT_ARTICLES_OPTIONS,
        ...params,
        filter: mergeFilters(DEFAULT_ARTICLES_OPTIONS.filter, params.filter),
        page,
        perPage,
      });

      return {
        ...records,
        items: records.items.map(mapArticle),
      };
    },
  );
}

export async function getArticle(idOrSlug: string): Promise<Article | null> {
  return withInFlightDedup(`getArticle:${idOrSlug}`, async () => {
    const record = await getRecordByIdOrSlug<ArticleRecord>("articles", idOrSlug, {
      ...DEFAULT_ARTICLES_OPTIONS,
      filter: DEFAULT_ARTICLES_OPTIONS.filter,
    });

    return record ? mapArticle(record) : null;
  });
}

export async function getRomans(
  params: ListQueryParams = {},
): Promise<PaginatedResult<Roman>> {
  return withInFlightDedup(
    `getRomans:${serializeListParams(params)}`,
    async () => {
      const page = params.page ?? DEFAULT_PAGE;
      const perPage = params.perPage ?? DEFAULT_PER_PAGE;

      const records = await listRecords<RomanRecord>("romans", {
        ...DEFAULT_ROMANS_OPTIONS,
        ...params,
        filter: mergeFilters(DEFAULT_ROMANS_OPTIONS.filter, params.filter),
        page,
        perPage,
      });

      return {
        ...records,
        items: records.items.map(mapRoman),
      };
    },
  );
}

export async function getRoman(idOrSlug: string): Promise<Roman | null> {
  return withInFlightDedup(`getRoman:${idOrSlug}`, async () => {
    const record = await getRecordByIdOrSlug<RomanRecord>("romans", idOrSlug, {
      ...DEFAULT_ROMANS_OPTIONS,
      filter: DEFAULT_ROMANS_OPTIONS.filter,
    });

    return record ? mapRoman(record) : null;
  });
}

export async function checkPocketBaseConnection(): Promise<{ ok: boolean; message: string }> {
  if (!pbEnabled || !pb) {
    return {
      ok: false,
      message: "PocketBase client non initialise. Verifiez NEXT_PUBLIC_PB_URL ou PB_URL.",
    };
  }

  try {
    await pb.health.check();
    return {
      ok: true,
      message: "Connexion PocketBase OK.",
    };
  } catch (error) {
    logPbError("checkPocketBaseConnection", error);
    return {
      ok: false,
      message: "Connexion PocketBase KO. Verifiez l'URL et le serveur PocketBase.",
    };
  }
}
