import type { RecordModel } from "pocketbase";
import { getFileUrl, pb, pbEnabled } from "@/app/src/lib/pb";

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

type ArticleRecord = RecordModel & {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string | Array<{ type: string; value?: string; data?: Record<string, unknown> }>;
  conclusion?: string | string[];
  cover?: string;
  read_time?: string;
  category?: string;
  tags?: string[];
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  expand?: {
    cover?: RecordModel;
    author?: RecordModel;
    tags?: Array<{ name?: string }>;
    category?: { name?: string };
  };
  author?: string;
};

const ARTICLES: Article[] = [
  {
    id: "la-loge-des-silences",
    slug: "la-loge-des-silences",
    title: "La Loge des Silences sort enfin au monde",
    excerpt:
      "Un thriller qui révèle les secrets qu'on n'ose pas prononcer. Découvrez les coulisses de cette sortie attendue.",
    content:
      "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.\n\nEget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant amet, at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.",
    publishedAt: "2024-10-29",
    readTime: "4 min",
    author: { name: "Chloé Simart", role: "Auteure" },
  },
  {
    id: "ecrire-le-handicap",
    slug: "ecrire-le-handicap",
    title: "Écrire le handicap autrement",
    excerpt:
      "Pourquoi la représentation authentique change la manière dont on lit, ressent et se reconnaît dans une histoire.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.\n\nQuisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.",
    publishedAt: "2024-09-12",
    readTime: "6 min",
    author: { name: "Chloé Simart", role: "Auteure" },
  },
  {
    id: "romans-et-resilience",
    slug: "romans-et-resilience",
    title: "Romans et résilience",
    excerpt:
      "Quand l'écriture devient un acte de guérison et de transmission, au-delà des tabous.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    publishedAt: "2024-08-01",
    readTime: "5 min",
    author: { name: "Chloé Simart", role: "Auteure" },
  },
];

function mapArticle(record: ArticleRecord): Article {
  const coverRecord = record.expand?.cover ?? record;
  const coverFile = record.expand?.cover
    ? (record.expand.cover as RecordModel & { file?: string }).file ?? ""
    : record.cover ?? "";

  const authorRecord = record.expand?.author as RecordModel | undefined;
  const authorAvatar = authorRecord
    ? getFileUrl(authorRecord, (authorRecord as RecordModel & { avatar?: string }).avatar)
    : "";

  const tags = record.tags ??
    (record.expand?.tags ?? [])
      .map((tag) => tag.name)
      .filter((tag): tag is string => Boolean(tag));

  const contentValue = record.content ?? "";
  return {
    id: record.id,
    slug: record.slug ?? record.id,
    title: record.title ?? "",
    excerpt: record.excerpt ?? "",
    content: contentValue,
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
    category:
      record.expand?.category?.name ?? record.category ?? undefined,
    tags,
    publishedAt: record.published_at,
    seoTitle: record.seo_title,
    seoDescription: record.seo_description,
  };
}

export async function getArticles(): Promise<Article[]> {
  if (!pbEnabled || !pb) {
    return ARTICLES;
  }

  try {
    const records = await pb.collection("articles").getFullList<ArticleRecord>({
      sort: "-published_at",
      filter: 'status = "published"',
      expand: "cover,author,tags,category",
    });
    return records.map(mapArticle);
  } catch {
    try {
      const records = await pb.collection("articles").getFullList<ArticleRecord>({
        sort: "-published_at",
        expand: "cover,author,tags,category",
      });
      return records.map(mapArticle);
    } catch {
      return ARTICLES;
    }
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!pbEnabled || !pb) {
    return ARTICLES.find((article) => article.slug === slug) ?? null;
  }

  try {
    const record = await pb
      .collection("articles")
      .getFirstListItem<ArticleRecord>(`slug = "${slug}"`, {
        expand: "cover,author,tags,category",
      });
    return mapArticle(record);
  } catch {
    return ARTICLES.find((article) => article.slug === slug) ?? null;
  }
}

export async function getArticleSlugs(): Promise<string[]> {
  if (!pbEnabled || !pb) {
    return ARTICLES.map((article) => article.slug);
  }

  try {
    const records = await pb.collection("articles").getFullList<ArticleRecord>({
      fields: "slug",
    });
    return records.map((record) => record.slug ?? record.id);
  } catch {
    return ARTICLES.map((article) => article.slug);
  }
}
