import {
  getArticle,
  getArticles as getArticlesFromPocketBase,
  type Article,
  type ArticleAuthor,
} from "@/app/src/lib/pocketbaseService";

export type { Article, ArticleAuthor };

export async function getArticles(): Promise<Article[]> {
  const result = await getArticlesFromPocketBase();
  return result.items;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return getArticle(slug);
}

export async function getArticleSlugs(): Promise<string[]> {
  const result = await getArticlesFromPocketBase({
    page: 1,
    perPage: 200,
    sort: "slug",
    fields: "id,slug",
  });

  return result.items.map((article) => article.slug || article.id);
}
