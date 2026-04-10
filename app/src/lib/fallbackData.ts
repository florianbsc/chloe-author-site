import type {
  Article,
  Category,
  Media,
  Page,
  Review,
  Roman,
  Section,
  Tag,
  User,
} from "@/app/src/types/content";

export const FALLBACK_MEDIA: Media[] = [
  {
    id: "media-book-cover-default",
    title: "Book cover placeholder",
    file: "/books.jpg",
    alt: "Book cover",
    caption: "Default book cover",
  },
];

export const FALLBACK_USERS: User[] = [
  {
    id: "user-chloe",
    email: "contact@chloesimart.fr",
    name: "Chloe Simart",
  },
];

export const FALLBACK_TAGS: Tag[] = [
  { id: "tag-thriller", name: "Thriller", slug: "thriller" },
  { id: "tag-resilience", name: "Resilience", slug: "resilience" },
  { id: "tag-romance", name: "Romance", slug: "romance" },
  { id: "tag-handicap", name: "Handicap", slug: "handicap" },
];

export const FALLBACK_CATEGORIES: Category[] = [
  { id: "cat-roman-thriller", name: "Thrillers", slug: "thrillers", type: "roman" },
  { id: "cat-roman-bio", name: "Autobiographie", slug: "autobiographie", type: "roman" },
  { id: "cat-article-news", name: "Actualites", slug: "actualites", type: "article" },
  { id: "cat-article-writing", name: "Ecriture", slug: "ecriture", type: "article" },
];

export const FALLBACK_PAGES: Page[] = [
  {
    id: "page-home",
    title: "Accueil",
    slug: "accueil",
    status: "published",
    seoTitle: "Chloe Simart - Auteure",
    seoDescription: "Romans, articles et actualites autour de l'univers de Chloe Simart.",
    publishedAt: "2025-01-01T10:00:00.000Z",
  },
  {
    id: "page-romans",
    title: "Romans",
    slug: "romans",
    status: "published",
    seoTitle: "Romans - Chloe Simart",
    seoDescription: "Decouvrez les romans de Chloe Simart.",
    publishedAt: "2025-01-01T10:00:00.000Z",
  },
  {
    id: "page-articles",
    title: "Articles",
    slug: "articles",
    status: "published",
    seoTitle: "Articles - Chloe Simart",
    seoDescription: "Actualites, coulisses et reflexions de Chloe Simart.",
    publishedAt: "2025-01-01T10:00:00.000Z",
  },
];

export const FALLBACK_SECTIONS: Section[] = [
  {
    id: "section-home-hero",
    pageId: "page-home",
    name: "Hero",
    type: "hero",
    contentJson: {
      heading: "Chloe Simart",
      subheading: "Une auteure pas comme les autres.",
    },
    order: 1,
    status: "published",
  },
  {
    id: "section-romans-catalog",
    pageId: "page-romans",
    name: "Catalogue",
    type: "content",
    contentJson: {
      title: "Tous mes romans en un seul endroit",
    },
    order: 1,
    status: "published",
  },
  {
    id: "section-articles-list",
    pageId: "page-articles",
    name: "Liste articles",
    type: "content",
    contentJson: {
      title: "Articles recents",
    },
    order: 1,
    status: "published",
  },
];

export const FALLBACK_ROMANS: Roman[] = [
  {
    id: "roman-la-loge-des-silences",
    title: "La Loge des Silences",
    slug: "la-loge-des-silences",
    fullDescription:
      "Un thriller captivant ou le silence devient complice et ou la verite doit etre arrachee a l'obscurite.\n\nDans l'ombre d'une vieille demeure, des secrets enfouis refusent de rester silencieux. Ce roman explore les zones grises de l'ame humaine et la force de celles et ceux qu'on sous-estime.",
    status: "published",
    publishedAt: "2024-10-29T09:00:00.000Z",
    isFeatured: true,
    salesRank: 1,
    amazonUrl: "https://www.amazon.fr",
    cover: FALLBACK_MEDIA[0],
    tagIds: ["tag-thriller", "tag-handicap"],
    categoryIds: ["cat-roman-thriller"],
  },
  {
    id: "roman-mon-eternel-combat",
    title: "Mon eternel combat",
    slug: "mon-eternel-combat",
    fullDescription:
      "Mon autobiographie, ecriture brute et sincere de ma vie, de mes luttes et de mes victoires quotidiennes.\n\nUn recit intime sur le courage, les doutes et la determination d'une femme qui refuse d'etre definie par ses limites.",
    status: "published",
    publishedAt: "2023-11-10T09:00:00.000Z",
    isFeatured: false,
    salesRank: 2,
    amazonUrl: "https://www.amazon.fr",
    cover: FALLBACK_MEDIA[0],
    tagIds: ["tag-resilience", "tag-handicap"],
    categoryIds: ["cat-roman-bio"],
  },
  {
    id: "roman-nos-blessures-sous-la-peau",
    title: "Nos blessures sous la peau",
    slug: "nos-blessures-sous-la-peau",
    fullDescription:
      "Une romance qui explore comment l'amour nait et s'epanouit entre deux ames marquees par la vie.\n\nUne histoire d'amour qui se construit dans la fragilite et la confiance, loin des cliches romantiques.",
    status: "published",
    publishedAt: "2022-06-18T09:00:00.000Z",
    isFeatured: false,
    salesRank: 3,
    amazonUrl: "https://www.amazon.fr",
    cover: FALLBACK_MEDIA[0],
    tagIds: ["tag-romance", "tag-resilience"],
    categoryIds: ["cat-roman-thriller"],
  },
];

export const FALLBACK_ARTICLES: Article[] = [
  {
    id: "article-sortie-loge",
    title: "La Loge des Silences sort enfin au monde",
    slug: "la-loge-des-silences",
    excerpt:
      "Un thriller qui revele les secrets qu'on n'ose pas prononcer. Decouvrez les coulisses de cette sortie attendue.",
    content:
      "Le 29 octobre marque une date importante: la sortie de La Loge des Silences. Cet article revient sur la genese du roman, les inspirations et les choix d'ecriture qui ont structure son intrigue.\n\nJ'y partage aussi les themes centraux du livre: resilience, verite et transmission.",
    status: "published",
    publishedAt: "2024-10-29T08:30:00.000Z",
    featured: true,
    cover: FALLBACK_MEDIA[0],
    writtenBy: FALLBACK_USERS[0],
    categoryIds: ["cat-article-news"],
  },
  {
    id: "article-ecrire-handicap",
    title: "Ecrire le handicap autrement",
    slug: "ecrire-le-handicap",
    excerpt:
      "Pourquoi la representation authentique change la maniere dont on lit, ressent et se reconnait dans une histoire.",
    content:
      "Ecrire le handicap sans stereotype demande de partir du personnage, pas du diagnostic.\n\nJe detaille ici mon approche narrative: nuance, dignite et complexite des parcours.",
    status: "published",
    publishedAt: "2024-09-12T08:30:00.000Z",
    featured: false,
    cover: FALLBACK_MEDIA[0],
    writtenBy: FALLBACK_USERS[0],
    categoryIds: ["cat-article-writing"],
  },
  {
    id: "article-romans-resilience",
    title: "Romans et resilience",
    slug: "romans-et-resilience",
    excerpt:
      "Quand l'ecriture devient un acte de guerison et de transmission, au-dela des tabous.",
    content:
      "La resilience n'est pas un slogan: c'est un processus.\n\nDans cet article, je raconte comment la fiction peut aider a mettre des mots sur l'indicible.",
    status: "published",
    publishedAt: "2024-08-01T08:30:00.000Z",
    featured: false,
    cover: FALLBACK_MEDIA[0],
    writtenBy: FALLBACK_USERS[0],
    categoryIds: ["cat-article-writing"],
  },
];

export const FALLBACK_REVIEWS: Review[] = [
  {
    id: "review-1",
    romanId: "roman-la-loge-des-silences",
    name: "Marie Leclerc",
    comment:
      "Un roman qui m'a bouleversee du debut a la fin, des personnages tres humains.",
    rating: 5,
    status: "published",
    publishedAt: "2024-11-03T11:00:00.000Z",
  },
  {
    id: "review-2",
    romanId: "roman-la-loge-des-silences",
    name: "Thomas Beaumont",
    comment:
      "Une plume intense, une atmosphere tenace et une heroine memorable.",
    rating: 5,
    status: "published",
    publishedAt: "2024-11-12T11:00:00.000Z",
  },
  {
    id: "review-3",
    romanId: "roman-mon-eternel-combat",
    name: "Sophie Arnaud",
    comment:
      "Un texte sincere qui m'a beaucoup touchee.",
    rating: 4,
    status: "published",
    publishedAt: "2024-11-20T11:00:00.000Z",
  },
];

export function getFallbackPageBySlug(slug: string): Page | null {
  const page = FALLBACK_PAGES.find((item) => item.slug === slug);
  if (!page) {
    return null;
  }

  return {
    ...page,
    sections: FALLBACK_SECTIONS.filter((section) => section.pageId === page.id)
      .sort((a, b) => a.order - b.order),
  };
}

export function getFallbackPages(): Page[] {
  return FALLBACK_PAGES.map((page) => ({
    ...page,
    sections: FALLBACK_SECTIONS.filter((section) => section.pageId === page.id)
      .sort((a, b) => a.order - b.order),
  }));
}
