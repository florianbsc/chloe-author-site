import PocketBase from "pocketbase";

const PB_URL = process.env.PB_URL || "http://127.0.0.1:8090";
const PB_SUPERUSER_EMAIL = process.env.PB_SUPERUSER_EMAIL;
const PB_SUPERUSER_PASSWORD = process.env.PB_SUPERUSER_PASSWORD;
const VALID_SCENARIOS = new Set(["baseline", "empty", "stress", "all"]);

if (!PB_SUPERUSER_EMAIL || !PB_SUPERUSER_PASSWORD) {
  console.error(
    [
      "Missing PocketBase superuser credentials.",
      "Set PB_SUPERUSER_EMAIL and PB_SUPERUSER_PASSWORD before running reset.",
      "",
      "Example:",
      'PB_SUPERUSER_EMAIL="admin@example.com" PB_SUPERUSER_PASSWORD="your-password" npm run pb:reset',
    ].join("\n"),
  );
  process.exit(1);
}

function getScenario() {
  const arg = process.argv.find((item) => item.startsWith("--scenario="));
  const scenario = arg ? arg.replace("--scenario=", "") : "baseline";
  if (!VALID_SCENARIOS.has(scenario)) {
    console.error(`Invalid scenario "${scenario}". Use baseline, empty, stress or all.`);
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

function like(field, value) {
  return `${field} ~ "${escapeFilterValue(value)}"`;
}

function and(...parts) {
  return parts.filter(Boolean).join(" && ");
}

function scenarioPrefix(scenario) {
  return `seed-${scenario}`;
}

const pb = new PocketBase(PB_URL);

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

async function deleteByFilter(collectionName, filter) {
  const list = await pb.collection(collectionName).getList(1, 500, { filter });
  for (const item of list.items) {
    await pb.collection(collectionName).delete(item.id);
  }
  return list.items.length;
}

async function safeDelete(collectionName, filter) {
  if (!(await collectionExists(collectionName))) {
    return 0;
  }
  return deleteByFilter(collectionName, filter);
}

async function resetScenario(scenario) {
  const prefix = scenarioPrefix(scenario);
  let deleted = 0;

  deleted += await safeDelete("tags", like("name", prefix));
  deleted += await safeDelete("categories", like("slug", prefix));
  deleted += await safeDelete("authors", like("slug", prefix));
  deleted += await safeDelete("navigation", like("name", prefix));
  deleted += await safeDelete("site_settings", like("site_name", `Site ${prefix}`));
  deleted += await safeDelete("sections", like("name", prefix));
  deleted += await safeDelete("newsletter_subscribers", like("email", prefix));
  deleted += await safeDelete("contact_messages", like("subject", prefix));
  deleted += await safeDelete("reviews", like("name", prefix));
  deleted += await safeDelete("testimonials", like("name", prefix));

  if (scenario === "baseline") {
    deleted += await safeDelete(
      "romans",
      and(
        'summary ~ "Seed:"',
        `${eq("slug", "les-secrets-de-clara")} || ${eq("slug", "mon-eternel-combat")} || ${eq("slug", "la-loge-des-silences")}`,
      ),
    );
    deleted += await safeDelete(
      "articles",
      and(
        'excerpt ~ "Seed article"',
        `${eq("slug", "la-loge-des-silences")} || ${eq("slug", "ecrire-le-handicap")}`,
      ),
    );
    deleted += await safeDelete(
      "pages",
      and(
        'title ~ "Seed "',
        `${eq("slug", "home")} || ${eq("slug", "about")} || ${eq("slug", "actualites")} || ${eq("slug", "romans")} || ${eq("slug", "articles")}`,
      ),
    );
  } else {
    deleted += await safeDelete("romans", like("slug", prefix));
    deleted += await safeDelete("articles", like("slug", prefix));
    deleted += await safeDelete("pages", like("title", prefix));
  }

  return deleted;
}

async function main() {
  const scenario = getScenario();
  await authenticate();

  if (scenario === "all") {
    const scenarios = ["baseline", "empty", "stress"];
    let total = 0;
    for (const item of scenarios) {
      total += await resetScenario(item);
    }
    console.log(`Reset completed for all scenarios. Records deleted: ${total}`);
    return;
  }

  const deleted = await resetScenario(scenario);
  console.log(`Reset completed for scenario "${scenario}". Records deleted: ${deleted}`);
}

main().catch((error) => {
  const message = error?.message || String(error);
  console.error(`Reset failed: ${message}`);
  process.exit(1);
});
