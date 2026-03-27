import PocketBase from "pocketbase";

const PB_URL = process.env.PB_URL || "http://127.0.0.1:8090";
const PB_SUPERUSER_EMAIL = process.env.PB_SUPERUSER_EMAIL;
const PB_SUPERUSER_PASSWORD = process.env.PB_SUPERUSER_PASSWORD;
const VALID_SCENARIOS = new Set(["baseline", "empty", "stress"]);

if (!PB_SUPERUSER_EMAIL || !PB_SUPERUSER_PASSWORD) {
  console.error(
    [
      "Missing PocketBase superuser credentials.",
      "Set PB_SUPERUSER_EMAIL and PB_SUPERUSER_PASSWORD before running the seed.",
      "",
      "Example:",
      'PB_SUPERUSER_EMAIL="admin@example.com" PB_SUPERUSER_PASSWORD="your-password" npm run pb:seed',
    ].join("\n"),
  );
  process.exit(1);
}

function getScenario() {
  const arg = process.argv.find((item) => item.startsWith("--scenario="));
  const scenario = arg ? arg.replace("--scenario=", "") : "baseline";
  if (!VALID_SCENARIOS.has(scenario)) {
    console.error(`Invalid scenario "${scenario}". Use baseline, empty or stress.`);
    process.exit(1);
  }
  return scenario;
}

function escapeFilterValue(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}

function eq(field, value) {
  return `${field} = "${escapeFilterValue(value)}"`;
}

function and(...parts) {
  return parts.filter(Boolean).join(" && ");
}

const pb = new PocketBase(PB_URL);
const fieldCache = new Map();

async function authenticate() {
  await pb
    .collection("_superusers")
    .authWithPassword(PB_SUPERUSER_EMAIL, PB_SUPERUSER_PASSWORD);
}

async function collectionExists(name) {
  try {
    await pb.collections.getOne(name);
    return true;
  } catch (error) {
    if (error?.status === 404) {
      return false;
    }
    throw error;
  }
}

async function getCollectionFields(collectionName) {
  if (fieldCache.has(collectionName)) {
    return fieldCache.get(collectionName);
  }

  const collection = await pb.collections.getOne(collectionName);
  const fields = new Set((collection?.fields || []).map((field) => field.name));
  fieldCache.set(collectionName, fields);
  return fields;
}

async function sanitizeData(collectionName, data) {
  const fields = await getCollectionFields(collectionName);
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => fields.has(key)),
  );
}

async function upsertRecord(collectionName, uniqueFilter, data) {
  const payload = await sanitizeData(collectionName, data);
  const list = await pb.collection(collectionName).getList(1, 1, {
    filter: uniqueFilter,
  });

  if (list.items.length > 0) {
    const updated = await pb.collection(collectionName).update(list.items[0].id, payload);
    return { id: updated.id, action: "updated" };
  }

  const created = await pb.collection(collectionName).create(payload);
  return { id: created.id, action: "created" };
}

async function ensureCollections(names) {
  for (const name of names) {
    if (!(await collectionExists(name))) {
      throw new Error(`Collection "${name}" not found. Run migrations first.`);
    }
  }
}

function scenarioPrefix(scenario) {
  return `seed-${scenario}`;
}

async function seedTags(prefix) {
  const tags = ["thriller", "romance", "resilience", "actualite", "handicap"];
  const ids = [];

  for (const [index, tag] of tags.entries()) {
    const name = `${prefix}-${tag}`;
    const result = await upsertRecord("tags", eq("name", name), {
      name,
      slug: `${prefix}-${tag}-${index + 1}`,
    });
    ids.push(result.id);
  }

  return ids;
}

async function seedCategories(prefix) {
  const article = await upsertRecord("categories", eq("slug", `${prefix}-article`), {
    name: `Catégorie article ${prefix}`,
    slug: `${prefix}-article`,
    type: "article",
  });

  const roman = await upsertRecord("categories", eq("slug", `${prefix}-roman`), {
    name: `Catégorie roman ${prefix}`,
    slug: `${prefix}-roman`,
    type: "roman",
  });

  return {
    articleId: article.id,
    romanId: roman.id,
  };
}

async function seedAuthor(prefix) {
  const result = await upsertRecord("authors", eq("slug", `${prefix}-auteur`), {
    name: `Auteure ${prefix}`,
    slug: `${prefix}-auteur`,
    role: "Romancière",
    quote: "Chaque histoire est un test de robustesse produit.",
    bio: "Profil seed pour valider les pages auteurs.",
    socials: [
      { label: "Site", href: "https://example.com" },
      { label: "Instagram", href: "https://instagram.com" },
    ],
    status: "published",
    order: 1,
  });

  return result.id;
}

async function seedSiteSettings(prefix) {
  await upsertRecord("site_settings", eq("site_name", `Site ${prefix}`), {
    site_name: `Site ${prefix}`,
    brand_name: `Brand ${prefix}`,
    logo_alt: `Logo ${prefix}`,
    header_cta_label: "Contactez-moi",
    header_cta_href: "/contact",
    footer_newsletter_title: "Restez informé",
    footer_newsletter_description: "Recevez les dernières nouvelles.",
    footer_newsletter_note: "Vous pouvez vous désinscrire à tout moment.",
    copyright: `© ${new Date().getFullYear()} ${prefix}`,
    status: "published",
    order: 1,
  });
}

async function seedNavigation(prefix) {
  const entries = [
    { name: `${prefix}-nav-home`, label: "Accueil", href: "/", group: "primary", order: 1 },
    { name: `${prefix}-nav-about`, label: "À propos", href: "/about", group: "primary", order: 2 },
    { name: `${prefix}-nav-news`, label: "Actualités", href: "/actualites", group: "primary", order: 3 },
    { name: `${prefix}-nav-romans`, label: "Romans", href: "/romans", group: "primary", order: 4 },
    { name: `${prefix}-footer-contact`, label: "Contact", href: "/contact", group: "footer", order: 10 },
    { name: `${prefix}-legal-privacy`, label: "Politique de confidentialité", href: "/privacy", group: "legal", order: 20 },
    { name: `${prefix}-social-instagram`, label: "Instagram", href: "https://instagram.com", group: "social", order: 30, external: true },
  ];

  for (const entry of entries) {
    await upsertRecord("navigation", eq("name", entry.name), {
      ...entry,
      status: "published",
    });
  }
}

async function seedRomans(prefix, scenario, romanCategoryId, tagIds) {
  const romans = [
    {
      slug: "les-secrets-de-clara",
      title: "Les secrets de Clara",
      summary: "Seed: thriller psychologique.",
      short_description: "Une intrigue dense et émotionnelle.",
      details: { genre: "Thriller", pages: 320, year: 2026, isbn: "SEED-ISBN-1001" },
      story: ["Chapitre 1", "Chapitre 2"],
      availability_label: "Disponible en ligne",
      availability_url: "https://example.com/romans/clara",
      sales_rank: 2,
      bestseller_rank: 2,
      status: "published",
      category: romanCategoryId,
      tags: tagIds.slice(0, 3),
    },
    {
      slug: "mon-eternel-combat",
      title: "Mon éternel combat",
      summary: "Seed: autobiographie.",
      short_description: "Un récit personnel structuré.",
      details: { genre: "Autobiographie", pages: 280, year: 2025, isbn: "SEED-ISBN-1002" },
      story: ["Partie 1", "Partie 2"],
      availability_label: "Disponible en ligne",
      availability_url: "https://example.com/romans/combat",
      sales_rank: 3,
      bestseller_rank: 3,
      status: "published",
      category: romanCategoryId,
      tags: tagIds.slice(2, 5),
    },
    {
      slug: "la-loge-des-silences",
      title: "La Loge des Silences",
      summary: "Seed: sortie principale.",
      short_description: "Un suspense porté par des personnages forts.",
      details: { genre: "Thriller", pages: 384, year: 2026, isbn: "SEED-ISBN-1003" },
      story: ["Ouverture", "Pivot", "Final"],
      availability_label: "Disponible en ligne",
      availability_url: "https://example.com/romans/loge",
      sales_rank: 1,
      bestseller_rank: 1,
      status: "published",
      category: romanCategoryId,
      tags: tagIds.slice(0, 2),
    },
  ];

  if (scenario === "empty") {
    romans.push({
      slug: `${prefix}-roman-empty`,
      title: `Roman vide ${prefix}`,
      summary: "",
      short_description: "",
      details: { genre: "", pages: 0, year: new Date().getFullYear() },
      story: [],
      availability_label: "",
      availability_url: "",
      sales_rank: 99,
      bestseller_rank: 99,
      status: "published",
      category: romanCategoryId,
      tags: [],
    });
  }

  if (scenario === "stress") {
    for (let i = 1; i <= 25; i += 1) {
      romans.push({
        slug: `${prefix}-roman-stress-${i}`,
        title: `Roman stress ${i}`,
        summary: `Résumé stress ${i} `.repeat(10),
        short_description: `Description ${i}`,
        details: { genre: "Stress", pages: 100 + i, year: 2020 + (i % 6) },
        story: [`Bloc ${i} `.repeat(40)],
        availability_label: "Disponible",
        availability_url: "https://example.com/stress",
        sales_rank: 100 + i,
        bestseller_rank: 100 + i,
        status: "published",
        category: romanCategoryId,
        tags: tagIds,
      });
    }
  }

  const ids = [];
  for (const roman of romans) {
    const result = await upsertRecord("romans", eq("slug", roman.slug), roman);
    ids.push({ id: result.id, slug: roman.slug });
  }

  return ids;
}

async function seedReviews(prefix, romanIds) {
  const targetRomanId = romanIds[0]?.id;
  if (!targetRomanId) {
    return;
  }

  await upsertRecord("reviews", and(eq("roman", targetRomanId), eq("name", `${prefix}-lecteur-1`)), {
    roman: targetRomanId,
    name: `${prefix}-lecteur-1`,
    role: "Lecteur",
    comment: "Avis seed validé pour test d'affichage.",
    rating: 5,
    status: "approved",
    published_at: new Date().toISOString(),
  });

  await upsertRecord("reviews", and(eq("roman", targetRomanId), eq("name", `${prefix}-lecteur-2`)), {
    roman: targetRomanId,
    name: `${prefix}-lecteur-2`,
    role: "Lectrice",
    comment: "Avis en attente de modération.",
    rating: 4,
    status: "pending",
    published_at: new Date().toISOString(),
  });
}

async function seedArticles(prefix, scenario, articleCategoryId, tagIds, authorId) {
  const articles = [
    {
      slug: "la-loge-des-silences",
      title: "La Loge des Silences sort enfin au monde",
      excerpt: "Seed article principal.",
      content: "Contenu éditorial de test pour valider la page article.",
      conclusion: ["Conclusion 1", "Conclusion 2"],
      read_time: "4 min",
      seo_title: "Seed SEO title",
      seo_description: "Seed SEO description",
      status: "published",
      published_at: new Date().toISOString(),
      author: authorId,
      category: articleCategoryId,
      tags: tagIds.slice(0, 2),
    },
    {
      slug: "ecrire-le-handicap",
      title: "Écrire le handicap autrement",
      excerpt: "Seed article secondaire.",
      content: "Contenu secondaire.",
      read_time: "6 min",
      status: "published",
      published_at: new Date(Date.now() - 86400000).toISOString(),
      author: authorId,
      category: articleCategoryId,
      tags: tagIds.slice(1, 3),
    },
  ];

  if (scenario === "empty") {
    articles.push({
      slug: `${prefix}-article-empty`,
      title: `Article vide ${prefix}`,
      excerpt: "",
      content: "",
      read_time: "1 min",
      status: "published",
      published_at: new Date().toISOString(),
      author: authorId,
      category: articleCategoryId,
      tags: [],
    });
  }

  if (scenario === "stress") {
    for (let i = 1; i <= 30; i += 1) {
      articles.push({
        slug: `${prefix}-article-stress-${i}`,
        title: `Article stress ${i}`,
        excerpt: `Excerpt stress ${i}`,
        content: `Bloc stress ${i} `.repeat(200),
        read_time: `${5 + (i % 10)} min`,
        status: "published",
        published_at: new Date(Date.now() - i * 3600000).toISOString(),
        author: authorId,
        category: articleCategoryId,
        tags: tagIds,
      });
    }
  }

  for (const article of articles) {
    await upsertRecord("articles", eq("slug", article.slug), article);
  }
}

async function seedTestimonials(prefix, scenario) {
  const entries = [
    { quote: `Avis ${prefix} about`, name: `${prefix}-about`, role: "Lecteur", context: "about" },
    { quote: `Avis ${prefix} romans`, name: `${prefix}-romans`, role: "Lectrice", context: "romans" },
    { quote: `Avis ${prefix} articles`, name: `${prefix}-articles`, role: "Critique", context: "articles" },
  ];

  if (scenario === "stress") {
    for (let i = 1; i <= 20; i += 1) {
      entries.push({
        quote: `Avis stress ${prefix} ${i} `.repeat(8),
        name: `${prefix}-stress-${i}`,
        role: "Lecteur stress",
        context: i % 2 === 0 ? "articles" : "romans",
      });
    }
  }

  for (const [index, entry] of entries.entries()) {
    await upsertRecord("testimonials", eq("name", entry.name), {
      ...entry,
      status: "published",
      order: index + 1,
    });
  }
}

async function seedSectionsAndPages(prefix, scenario) {
  const sectionDefs = [
    {
      name: `${prefix}-home-hero`,
      type: "home-hero",
      order: 1,
      content: {
        title: "Chloé Simart",
        subtitle: `Contenu seed ${scenario}`,
        primaryCta: { label: "Découvrir", href: "/about" },
        secondaryCta: { label: "Romans", href: "/romans" },
      },
    },
    {
      name: `${prefix}-home-romans`,
      type: "home-romans",
      order: 2,
      content: {
        eyebrow: "Romans",
        title: "Mes romans",
        subtitle: "Disponibles en ligne",
      },
    },
    {
      name: `${prefix}-about-hero`,
      type: "about-hero",
      order: 1,
      content: {
        eyebrow: "Auteure",
        title: "À propos",
        description: "Page about seed.",
      },
    },
    {
      name: `${prefix}-actualites-hero`,
      type: "actualites-hero",
      order: 1,
      content: {
        eyebrow: "Actualités",
        title: "Dernières nouvelles",
        description: "Page actualités seed.",
      },
    },
    {
      name: `${prefix}-romans-hero`,
      type: "romans-hero",
      order: 1,
      content: {
        eyebrow: "Romans",
        title: "Catalogue",
        description: "Page romans seed.",
      },
    },
    {
      name: `${prefix}-articles-hero`,
      type: "articles-hero",
      order: 1,
      content: {
        title: "Articles récents",
      },
    },
  ];

  const sectionsByType = {};
  for (const section of sectionDefs) {
    const result = await upsertRecord("sections", eq("name", section.name), {
      ...section,
      status: "published",
    });
    sectionsByType[section.type] = result.id;
  }

  const pages = [
    { slug: "home", title: `Seed Home ${scenario}`, sections: [sectionsByType["home-hero"], sectionsByType["home-romans"]] },
    { slug: "about", title: `Seed About ${scenario}`, sections: [sectionsByType["about-hero"]] },
    { slug: "actualites", title: `Seed Actualités ${scenario}`, sections: [sectionsByType["actualites-hero"]] },
    { slug: "romans", title: `Seed Romans ${scenario}`, sections: [sectionsByType["romans-hero"]] },
    { slug: "articles", title: `Seed Articles ${scenario}`, sections: [sectionsByType["articles-hero"]] },
  ];

  for (const page of pages) {
    await upsertRecord("pages", eq("slug", page.slug), {
      title: page.title,
      slug: page.slug,
      status: "published",
      sections: page.sections.filter(Boolean),
      seo_title: `${page.title} SEO`,
      seo_description: `Description SEO ${page.slug}`,
      published_at: new Date().toISOString(),
    });
  }
}

async function seedSubscribersAndMessages(prefix) {
  await upsertRecord("newsletter_subscribers", eq("email", `${prefix}@newsletter.test`), {
    email: `${prefix}@newsletter.test`,
    status: "active",
  });

  await upsertRecord("contact_messages", eq("subject", `Sujet ${prefix}`), {
    name: `Contact ${prefix}`,
    email: `${prefix}@contact.test`,
    subject: `Sujet ${prefix}`,
    message: "Message seed pour test de la collection contact_messages.",
    status: "pending",
  });
}

async function main() {
  const scenario = getScenario();
  const prefix = scenarioPrefix(scenario);

  await authenticate();
  await ensureCollections([
    "tags",
    "categories",
    "authors",
    "site_settings",
    "navigation",
    "romans",
    "articles",
    "reviews",
    "sections",
    "pages",
    "newsletter_subscribers",
    "contact_messages",
  ]);

  const hasTestimonials = await collectionExists("testimonials");

  const tagIds = await seedTags(prefix);
  const categories = await seedCategories(prefix);
  const authorId = await seedAuthor(prefix);
  await seedSiteSettings(prefix);
  await seedNavigation(prefix);

  const romanIds = await seedRomans(prefix, scenario, categories.romanId, tagIds);
  await seedReviews(prefix, romanIds);
  await seedArticles(prefix, scenario, categories.articleId, tagIds, authorId);
  await seedSectionsAndPages(prefix, scenario);
  await seedSubscribersAndMessages(prefix);

  if (hasTestimonials) {
    await seedTestimonials(prefix, scenario);
  } else {
    console.log('testimonials skipped: collection "testimonials" not found');
  }

  console.log(`Seed completed for scenario: ${scenario}`);
}

main().catch((error) => {
  const message = error?.message || String(error);
  console.error(`Seed failed: ${message}`);
  process.exit(1);
});
