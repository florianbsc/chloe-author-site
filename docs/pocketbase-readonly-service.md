# Service PocketBase read-only

Ce projet centralise les lectures PocketBase dans un seul module:

- `app/src/lib/pocketbaseService.ts`

## Architecture

Le client PocketBase reste initialise dans:

- `app/src/lib/pb.ts`

Le service read-only fournit:

- `getArticles(params?)`
- `getArticle(idOrSlug)`
- `getRomans(params?)`
- `getRoman(idOrSlug)`
- `checkPocketBaseConnection()`

Les anciens modules restent comme wrappers de compatibilite:

- `app/src/lib/articles.ts`
- `app/src/lib/romans.ts`

## Parametres supportes (list/search)

`getArticles` et `getRomans` acceptent les options PocketBase suivantes:

- `page`
- `perPage`
- `sort`
- `filter`
- `expand`
- `fields`
- `skipTotal`

Retour standard:

```ts
{
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}
```

## Exemples d'utilisation

### Lister les articles (pagination + tri)

```ts
import { getArticles } from "@/app/src/lib/pocketbaseService";

const { items, page, totalPages } = await getArticles({
  page: 1,
  perPage: 10,
  sort: "-published_at",
});
```

### Filtrer les romans publies avec recherche

```ts
import { getRomans } from "@/app/src/lib/pocketbaseService";

const result = await getRomans({
  page: 1,
  perPage: 12,
  filter: 'status = "published" && title ~ "combat"',
  sort: "bestseller_rank,-published_at",
});
```

### Recuperer un article ou roman par ID ou slug

```ts
import { getArticle, getRoman } from "@/app/src/lib/pocketbaseService";

const article = await getArticle("la-loge-des-silences");
const roman = await getRoman("rec_abcd1234");
```

## Gestion d'erreurs

- Toutes les fonctions utilisent `try/catch`.
- En cas d'erreur:
  - listes => resultat vide coherent (`items: []`, totaux a `0`)
  - record unique => `null`
- Les erreurs sont loggees via `logPbError(...)`.
- Aucune donnee metier n'est hardcodee dans le service.

## Eviter les appels API dupliques

Le service inclut une deduplication in-flight:

- meme fonction + memes parametres => meme `Promise` partagee
- utile quand plusieurs Server Components demandent la meme data simultanement

## Validation pas a pas

1. Verifier la connexion PocketBase:

```ts
import { checkPocketBaseConnection } from "@/app/src/lib/pocketbaseService";

const health = await checkPocketBaseConnection();
console.log(health.ok, health.message);
```

2. Tester chaque fonction individuellement:

- `getArticles({ page: 1, perPage: 5 })`
- `getArticle("<slug-ou-id>")`
- `getRomans({ page: 1, perPage: 5 })`
- `getRoman("<slug-ou-id>")`

3. Verifier les correspondances en base:

- comparer les `slug`, `title`, `published_at`, `status`
- verifier les expansions (`cover`, `author`, `tags`, `category`)
- verifier les filtres (`status = "published"`)

4. Valider dans l'app:

- pages `/articles`, `/articles/[slug]`, `/romans`, `/romans/[slug]`
- verifier l'etat vide si PocketBase est indisponible
