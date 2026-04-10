export type PublicationStatus = "draft" | "published" | "archived";

export type CategoryType = "roman" | "article";

export type Media = {
  id: string;
  title: string;
  file?: string;
  alt?: string;
  caption?: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  type: CategoryType;
};

export type Section = {
  id: string;
  pageId: string;
  name: string;
  type: string;
  contentJson: Record<string, unknown>;
  order: number;
  status: PublicationStatus;
};

export type Page = {
  id: string;
  title: string;
  slug: string;
  status: PublicationStatus;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  sections?: Section[];
};

export type Roman = {
  id: string;
  title: string;
  slug: string;
  fullDescription: string;
  status: PublicationStatus;
  publishedAt?: string;
  isFeatured: boolean;
  salesRank?: number;
  amazonUrl?: string;
  cover?: Media | null;
  tagIds: string[];
  categoryIds: string[];
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: PublicationStatus;
  publishedAt?: string;
  featured: boolean;
  cover?: Media | null;
  writtenBy?: User | null;
  categoryIds: string[];
};

export type Review = {
  id: string;
  romanId: string;
  name: string;
  comment: string;
  rating: number;
  status: PublicationStatus;
  publishedAt?: string;
};
