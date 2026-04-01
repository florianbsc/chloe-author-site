import type { RecordModel } from "pocketbase";
import { eqFilter, getFileUrl, logPbError, pb, pbEnabled } from "@/app/src/lib/pb";

export type PageSection = {
  id: string;
  type: string;
  order?: number;
  data: Record<string, unknown>;
};

export type PageData = {
  id: string;
  slug: string;
  title?: string;
  seoTitle?: string;
  seoDescription?: string;
  sections: PageSection[];
};

type PageRecord = RecordModel & {
  slug?: string;
  title?: string;
  seo_title?: string;
  seo_description?: string;
  sections?: PageSection[];
  content?: PageSection[];
  expand?: {
    sections?: PageSectionRecord[];
  };
};

type PageSectionRecord = RecordModel & {
  type?: string;
  data?: Record<string, unknown>;
  content?: Record<string, unknown>;
  order?: number;
  image?: string;
  items?: string[];
  expand?: {
    image?: MediaRecord;
    items?: SectionItemRecord[];
  };
};

type MediaRecord = RecordModel & {
  file?: string;
};

type RelatedTestimonialRecord = RecordModel & {
  name?: string;
  role?: string;
  quote?: string;
  avatar?: string;
  location?: string;
  title?: string;
  subtitle?: string;
};

type RelatedAuthorRecord = RecordModel & {
  name?: string;
  role?: string;
  quote?: string;
  avatar?: string;
  socials?: Array<{ label: string; href: string }>;
};

type SectionItemRecord = RecordModel & {
  kind?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  quote?: string;
  value?: string;
  label?: string;
  icon?: string;
  image?: string;
  cta_label?: string;
  cta_href?: string;
  payload?: Record<string, unknown>;
  order?: number;
  expand?: {
    image?: MediaRecord;
    testimonial?: RelatedTestimonialRecord;
    author?: RelatedAuthorRecord;
  };
};

const HOME_PAGE: PageData = {
  id: "home",
  slug: "home",
  title: "Accueil",
  sections: [
    {
      id: "home-hero",
      type: "home-hero",
      data: {
        title: "Chloé Simart",
        subtitle:
          "Une auteure pas comme les autres. Auteure de romans qui touchent l'âme.",
        primaryCta: { label: "Découvrir", href: "/about" },
        secondaryCta: { label: "Lire", href: "/romans" },
      },
    },
    {
      id: "home-romans",
      type: "home-romans",
      data: {
        eyebrow: "Romans",
        title: "Mes romans",
        subtitle: "Disponibles sur Amazon",
        primaryCta: { label: "Voir", href: "/romans" },
        secondaryCta: { label: "Tous", href: "/romans" },
      },
    },
    {
      id: "home-author",
      type: "home-author",
      data: {
        eyebrow: "Auteure",
        title: "Une handi-auteure",
        description:
          "Chloé Simart écrit des histoires où le handicap n'est pas un obstacle mais une part authentique de l'existence. Elle brise les tabous en donnant voix à ceux qu'on oublie souvent.",
        primaryCta: { label: "Découvrir", href: "/about" },
        secondaryCta: { label: "Plus", href: "/about" },
      },
    },
    {
      id: "home-highlights",
      type: "home-highlights",
      data: {
        primaryCta: { label: "Lire", href: "/romans" },
        secondaryCta: { label: "Suite", href: "/romans" },
        primaryFeatures: [
          {
            title: "Sortie octobre",
            description: "Le 29 octobre arrive enfin le moment de la révélation.",
            icon: "PartyPopper",
          },
          {
            title: "La Loge des Silences",
            description:
              "Un thriller où chaque silence cache une vérité qui attend d'être découverte.",
            icon: "House",
          },
          {
            title: "Extrait exclusif",
            description:
              "Parce que survivre n'était que le début de cette histoire qui change tout.",
            icon: "Triangle",
          },
          {
            title: "En savoir plus",
            description: "Découvrez le roman complet et plongez dans ses mystères.",
            icon: "Search",
          },
        ],
        secondaryFeatures: [
          {
            title: "Short heading here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            icon: "Box",
          },
          {
            title: "Short heading here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in peros.",
            icon: "Box",
          },
        ],
      },
    },
    {
      id: "home-quote",
      type: "home-quote",
      data: {
        title: "Parce que survivre n'était que le début",
        subtitle:
          "« Parce que survivre n'était que le début... » — Mon éternel combat",
      },
    },
    {
      id: "home-newsletter",
      type: "home-newsletter",
      data: {
        titleLines: ["Restez informé", "Des nouvelles"],
        description:
          "Recevez les actualités et les dates de sortie de mes prochains romans.",
        form: {
          buttonLabel: "S'abonner",
          placeholder: "Votre email",
          note: "En vous abonnant, vous acceptez notre politique de confidentialité.",
        },
      },
    },
  ],
};

const ABOUT_PAGE: PageData = {
  id: "about",
  slug: "about",
  title: "À propos",
  sections: [
    {
      id: "about-hero",
      type: "about-hero",
      data: {
        eyebrow: "Auteure",
        title: "À propos de moi",
        description:
          "Je suis une auteure française qui écrit des histoires où le handicap n'est pas une limite mais une réalité vivante. Mes romans mettent en lumière des personnages authentiques, des âmes qui se battent et qui aiment, loin des clichés.",
        primaryCta: { label: "Découvrir", href: "/about" },
        secondaryCta: { label: "Contact", href: "/contact" },
      },
    },
    {
      id: "about-features",
      type: "about-features",
      data: {
        items: [
          {
            title: "Mon parcours",
            description:
              "J'ai commencé à écrire sans savoir que mes histoires changeraient des vies. Le handicap m'a enseigné la résilience, et l'écriture m'a donné une voix.",
            icon: "Clock",
          },
          {
            title: "L'écriture inclusive",
            description:
              "Je refuse les stéréotypes. Mes personnages vivent, aiment, souffrent avec authenticité, loin des regards pitoyables.",
            icon: "User",
          },
          {
            title: "Une vision différente",
            description:
              "La romance existe pour tous. Elle n'a pas de limite, pas de forme préétablie, juste des coeurs qui se trouvent.",
            icon: "FileText",
          },
          {
            title: "Pourquoi j'écris",
            description:
              "Parce que chaque histoire compte. Parce que le silence tue plus que les mots ne guérissent.",
            icon: "EyeOff",
          },
          {
            title: "Short heading here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
            icon: "Box",
          },
          {
            title: "Short heading here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in leros.",
            icon: "Box",
          },
        ],
      },
    },
    {
      id: "about-stats",
      type: "about-stats",
      data: {
        eyebrow: "Chiffres",
        title: "Une trajectoire qui parle d'elle-même",
        description:
          "Chaque nombre représente une lectrice, un lecteur qui a trouvé quelque chose de vrai dans mes mots.",
        cta: { label: "Découvrir", href: "/romans" },
        stats: [
          { value: "4", label: "Romans publiés" },
          { value: "15 000", label: "Lectrices et lecteurs touchés" },
          { value: "8", label: "Années d'écriture" },
          { value: "3", label: "Prix littéraires" },
          { value: "50%", label: "De lecteurs qui recommandent mes livres" },
        ],
      },
    },
    {
      id: "about-values",
      type: "about-values",
      data: {
        eyebrow: "Valeurs",
        title: "Ce qui guide mon écriture",
        description:
          "Chaque roman que j'écris porte en lui une conviction profonde. Je crois que les histoires vraies changent les lecteurs.",
        items: [
          {
            title: "Engagement pour la diversité",
            description:
              "Les personnages en situation de handicap méritent des histoires qui les honorent.",
          },
          {
            title: "Histoires authentiques",
            description:
              "Pas de clichés, pas de pitié, juste la beauté brute de la vie réelle.",
          },
          {
            title: "Communauté bienveillante",
            description:
              "Mes lecteurs forment une famille où chacun se sent compris et entendu.",
          },
        ],
        cta: { label: "Explorer", href: "/articles" },
      },
    },
    {
      id: "about-authors",
      type: "about-authors",
      data: {
        eyebrow: "Auteure",
        title: "Chloé Simart",
        description:
          "Écrivaine française passionnée par les histoires qui dérangent et qui guérissent. Depuis huit ans, je transforme mes expériences en romans.",
        cta: { label: "Lire plus", href: "/about" },
      },
    },
    {
      id: "about-reviews",
      type: "about-reviews",
      data: {
        title: "Lecteurs parlent",
        subtitle: "Leurs mots me portent",
      },
    },
    {
      id: "about-cta",
      type: "about-cta",
      data: {
        title: "Prêt à découvrir mes histoires ?",
        description:
          "Quatre romans vous attendent, chacun porteur d'une vérité différente. Venez les rencontrer sur Amazon.",
        primaryCta: { label: "Lire", href: "/romans" },
        secondaryCta: { label: "Contact", href: "/contact" },
      },
    },
  ],
};

const ACTUALITES_PAGE: PageData = {
  id: "actualites",
  slug: "actualites",
  title: "Actualités",
  sections: [
    {
      id: "actualites-hero",
      type: "actualites-hero",
      data: {
        eyebrow: "Actualités",
        title: "Les dernières nouvelles",
        description:
          "Suivez l'évolution de mes projets et découvrez les dates de sortie de mes prochains romans. Chaque histoire porte en elle une part de vérité qui mérite d'être partagée.",
        primaryCta: { label: "Découvrir", href: "/articles" },
        secondaryCta: { label: "Retour", href: "/" },
      },
    },
    {
      id: "actualites-blog",
      type: "actualites-blog",
      data: {
        eyebrow: "Blog",
        title: "Short heading goes here",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        tag: "actualité",
        limit: 4,
      },
    },
    {
      id: "actualites-newsletter",
      type: "actualites-newsletter",
      data: {
        title: "Ne manquez rien\\nRestez informé(e)",
        description:
          "Recevez les actualités et les dates de sortie de mes prochains romans directement dans votre boîte mail.",
        form: {
          buttonLabel: "S'abonner",
          placeholder: "Votre email",
          note:
            "En vous abonnant, vous acceptez nos conditions d'utilisation et politique de confidentialité.",
        },
      },
    },
  ],
};

const ROMANS_PAGE: PageData = {
  id: "romans",
  slug: "romans",
  title: "Romans",
  sections: [
    {
      id: "romans-hero",
      type: "romans-hero",
      data: {
        eyebrow: "Romans",
        title: "Mes romans",
        description:
          "Chaque histoire que j'écris naît d'une conviction simple : les personnages en situation de handicap méritent des récits qui les célèbrent, les questionnent, les transforment. Mes romans traversent des genres variés, du thriller à la romance, de l'autobiographie à la fiction, mais tous partagent cette même profondeur d'âme.",
        primaryCta: { label: "Découvrir", href: "#catalogue" },
        secondaryCta: { label: "Amazon", href: "https://www.amazon.fr" },
      },
    },
    {
      id: "romans-catalogue",
      type: "romans-catalogue",
      data: {
        eyebrow: "Catalogue",
        title: "Tous mes romans en un seul endroit",
        description:
          "Chaque roman que j'écris porte en lui une part de vérité, une exploration de l'âme humaine face aux défis qui la façonnent. Retrouvez ici l'intégralité de mes oeuvres, classées par genre pour vous guider dans votre découverte.",
      },
    },
    {
      id: "romans-essence",
      type: "romans-essence",
      data: {
        eyebrow: "Essence",
        title: "Ce qui rend mes romans",
        subtitle: "différents",
        description:
          "Mes histoires refusent les clichés et les regards apitoyés. Elles célèbrent la complexité, la force et la beauté de ceux qui vivent avec un handicap.",
      },
    },
    {
      id: "romans-reviews",
      type: "romans-reviews",
      data: {
        title: "Ce qu'en disent",
        subtitle: "les lecteurs",
        description: "Des voix qui résonnent avec authenticité",
      },
    },
  ],
};

const ARTICLES_PAGE: PageData = {
  id: "articles",
  slug: "articles",
  title: "Articles",
  sections: [
    {
      id: "articles-hero",
      type: "articles-hero",
      data: {
        title: "La Loge des Silences sort enfin au monde",
      },
    },
  ],
};

const STATIC_PAGES: Record<string, PageData> = {
  home: HOME_PAGE,
  about: ABOUT_PAGE,
  actualites: ACTUALITES_PAGE,
  romans: ROMANS_PAGE,
  articles: ARTICLES_PAGE,
};

const DYNAMIC_ONLY_PAGE_SLUGS = new Set(["home", "about"]);

function mapSectionItem(record: SectionItemRecord): Record<string, unknown> {
  const testimonial = record.expand?.testimonial;
  const author = record.expand?.author;
  const imageRecord = record.expand?.image;
  const imageFile = imageRecord?.file ?? record.image ?? "";
  const image = getFileUrl(imageRecord ?? null, imageFile) || record.image || undefined;

  const avatarRecord = testimonial;
  const avatarFile = testimonial?.avatar ?? "";
  const avatar =
    getFileUrl(avatarRecord ?? null, avatarFile) ||
    testimonial?.avatar ||
    author?.avatar ||
    undefined;

  return {
    id: record.id,
    kind: record.kind ?? "custom",
    order: record.order ?? 0,
    title: record.title ?? testimonial?.title ?? author?.name ?? "",
    subtitle: record.subtitle ?? testimonial?.subtitle ?? author?.role ?? "",
    description: record.description ?? author?.quote ?? "",
    quote: record.quote ?? testimonial?.quote ?? "",
    value: record.value ?? "",
    label: record.label ?? "",
    icon: record.icon ?? "",
    image,
    avatar,
    name: testimonial?.name ?? author?.name ?? "",
    role: testimonial?.role ?? author?.role ?? "",
    location: testimonial?.location ?? "",
    socials: author?.socials ?? [],
    cta:
      record.cta_label && record.cta_href
        ? { label: record.cta_label, href: record.cta_href }
        : undefined,
    payload: record.payload ?? {},
  };
}

function normalizeSectionData(
  type: string,
  source: Record<string, unknown>,
  items: Record<string, unknown>[],
) {
  const data: Record<string, unknown> = { ...source };
  if (items.length === 0) {
    return data;
  }

  if (!Array.isArray(data.items)) {
    data.items = items;
  }

  if (type === "about-stats" && !Array.isArray(data.stats)) {
    data.stats = items.map((item) => ({
      value: (item.value as string) || (item.title as string) || "",
      label: (item.label as string) || (item.description as string) || "",
    }));
  }

  if (type === "home-highlights") {
    if (!Array.isArray(data.primaryFeatures)) {
      data.primaryFeatures = items.slice(0, 4).map((item) => ({
        title: item.title as string,
        description: item.description as string,
        icon: item.icon as string,
      }));
    }
    if (!Array.isArray(data.secondaryFeatures)) {
      data.secondaryFeatures = items.slice(4).map((item) => ({
        title: item.title as string,
        description: item.description as string,
        icon: item.icon as string,
      }));
    }
  }

  return data;
}

function mapSection(record: PageSectionRecord): PageSection {
  const sectionType = record.type ?? "";
  const imageRecord = record.expand?.image;
  const imageFile = imageRecord?.file ?? record.image ?? "";
  const image = getFileUrl(imageRecord ?? null, imageFile) || record.image || undefined;
  const items = (record.expand?.items ?? [])
    .map(mapSectionItem)
    .sort((a, b) => ((a.order as number) ?? 0) - ((b.order as number) ?? 0));
  const sourceData = (record.data ?? record.content ?? {}) as Record<string, unknown>;
  const data = normalizeSectionData(sectionType, sourceData, items);

  if (image && !data.image) {
    data.image = image;
  }

  return {
    id: record.id,
    type: sectionType,
    order: record.order,
    data,
  };
}

function mapPage(record: PageRecord): PageData {
  const expandedSections = record.expand?.sections?.map(mapSection) ?? [];
  const inlineSections = Array.isArray(record.sections) ? record.sections : [];
  const contentSections = Array.isArray(record.content) ? record.content : [];
  const sections = [...expandedSections, ...inlineSections, ...contentSections]
    .filter((section) => section && section.type)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return {
    id: record.id,
    slug: record.slug ?? record.id,
    title: record.title,
    seoTitle: record.seo_title,
    seoDescription: record.seo_description,
    sections,
  };
}

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  if (!pbEnabled || !pb) {
    return DYNAMIC_ONLY_PAGE_SLUGS.has(slug) ? null : (STATIC_PAGES[slug] ?? null);
  }

  try {
    const record = await pb
      .collection("pages")
      .getFirstListItem<PageRecord>(eqFilter("slug", slug), {
        expand: [
          "sections",
          "sections.image",
          "sections.items",
          "sections.items.image",
          "sections.items.testimonial",
          "sections.items.author",
        ].join(","),
        fields: [
          "id",
          "slug",
          "title",
          "seo_title",
          "seo_description",
          "sections",
          "content",
          "expand.sections.id",
          "expand.sections.type",
          "expand.sections.order",
          "expand.sections.data",
          "expand.sections.content",
          "expand.sections.image",
          "expand.sections.expand.image.file",
          "expand.sections.items",
          "expand.sections.expand.items.id",
          "expand.sections.expand.items.kind",
          "expand.sections.expand.items.title",
          "expand.sections.expand.items.subtitle",
          "expand.sections.expand.items.description",
          "expand.sections.expand.items.quote",
          "expand.sections.expand.items.value",
          "expand.sections.expand.items.label",
          "expand.sections.expand.items.icon",
          "expand.sections.expand.items.image",
          "expand.sections.expand.items.order",
          "expand.sections.expand.items.cta_label",
          "expand.sections.expand.items.cta_href",
          "expand.sections.expand.items.payload",
          "expand.sections.expand.items.expand.image.file",
          "expand.sections.expand.items.expand.testimonial.name",
          "expand.sections.expand.items.expand.testimonial.role",
          "expand.sections.expand.items.expand.testimonial.quote",
          "expand.sections.expand.items.expand.testimonial.avatar",
          "expand.sections.expand.items.expand.testimonial.location",
          "expand.sections.expand.items.expand.testimonial.title",
          "expand.sections.expand.items.expand.testimonial.subtitle",
          "expand.sections.expand.items.expand.author.name",
          "expand.sections.expand.items.expand.author.role",
          "expand.sections.expand.items.expand.author.quote",
          "expand.sections.expand.items.expand.author.avatar",
          "expand.sections.expand.items.expand.author.socials",
        ].join(","),
      });
    return mapPage(record);
  } catch (error) {
    logPbError("getPageBySlug", error, { slug });
    return DYNAMIC_ONLY_PAGE_SLUGS.has(slug) ? null : (STATIC_PAGES[slug] ?? null);
  }
}

export async function getPageSections(slug: string): Promise<PageSection[]> {
  const page = await getPageBySlug(slug);
  return page?.sections ?? [];
}

export async function getPage(slug: string): Promise<PageData | null> {
  return getPageBySlug(slug);
}

export async function getSections(slug: string): Promise<PageSection[]> {
  return getPageSections(slug);
}
