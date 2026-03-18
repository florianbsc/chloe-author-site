export type Roman = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  summary: string;
  cover: string;
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

export async function getRomans(): Promise<Roman[]> {
  return ROMANS;
}

export async function getRomanBySlug(slug: string): Promise<Roman | null> {
  return ROMANS.find((roman) => roman.slug === slug) ?? null;
}

export async function getRomanSlugs(): Promise<string[]> {
  return ROMANS.map((roman) => roman.slug);
}
