# Home / About dynamiques avec PocketBase

Ce document decrit la structure recommandee pour gerer 100% du contenu des pages `home` et `about` via PocketBase, sans hardcoding.

## 1) Modele de donnees

Collections impliquees:

- `pages` (deja presente): page logique (`slug`, SEO, publication)
- `sections` (deja presente, etendue): sections ordonnees d'une page
- `section_items` (nouvelle): elements repetes d'une section (icones, stats, testimonials, cards)
- `testimonials` (etendue): champs additionnels `avatar`, `title`, `subtitle`, `location`
- `authors` (deja presente): profils auteurs
- `media` (deja presente): assets image

Relations:

- `pages.sections[] -> sections`
- `sections.items[] -> section_items`
- `sections.image -> media`
- `section_items.image -> media`
- `section_items.testimonial -> testimonials`
- `section_items.author -> authors`

## 2) Mapping des sections (structure cible)

### Accueil

1. `home-hero`
  - `data`: `title`, `subtitle`, `primaryCta`, `secondaryCta`, `image`
2. `home-romans`
  - `data`: `eyebrow`, `title`, `subtitle`, `primaryCta`, `secondaryCta`
  - `items`: 4 items `kind=icon|feature` (`title`, `description`, `icon`)
3. `home-author`
  - `data`: `eyebrow`, `title`, `description`, `primaryCta`, `secondaryCta`
4. `home-highlights`
  - `data`: `primaryCta`, `secondaryCta`
  - `items`: 6 items `kind=feature` (`title`, `description`, `icon`)
5. `home-quote`
  - `data`: `title`, `subtitle`
6. `home-newsletter`
  - `data`: `titleLines`, `description`, `form.buttonLabel`, `form.placeholder`, `form.note`

### A propos

1. `about-hero`
  - `data`: `eyebrow`, `title`, `description`, `primaryCta`, `secondaryCta`
2. `about-features`
  - `items`: 6 items `kind=feature` (`title`, `description`, `icon`)
3. `about-stats`
  - `data`: `eyebrow`, `title`, `description`, `cta`
  - `items`: n items `kind=stat` (`value`, `label`)
4. `about-values`
  - `data`: `eyebrow`, `title`, `description`, `cta`
  - `items`: 3 items `kind=image_card` (`title`, `description`, `image`)
5. `about-reviews`
  - `data`: `title`, `subtitle`
  - `items`: 3 items `kind=testimonial` (direct fields ou relation `testimonial`)
6. `about-authors`
  - `data`: `eyebrow`, `title`, `description`, `cta`
  - `items`: 1..n items `kind=author` (direct fields ou relation `author`)
7. `about-cta`
  - `data`: `title`, `description`, `primaryCta`, `secondaryCta`

## 3) Migrations

Migration ajoutee:

- `backend/pb_migrations/1774900000_dynamic_home_about_sections.js`

Elle:

- cree `section_items`
- etend `sections` avec `data`, `image`, `items`
- etend `testimonials` avec `avatar`, `title`, `subtitle`, `location`

## 4) SDK / lecture dynamique

Dans le front, la lecture passe par:

- `app/src/lib/pages.ts`
  - `getPageBySlug(slug)`
  - `getPage(slug)` (alias)
  - `getSections(slug)` (alias)

Le fetch utilise:

- `getFirstListItem(...)`
- `expand` multi-niveaux (`sections`, `sections.items`, `sections.items.testimonial`, etc.)
- `fields` limites pour reduire la charge

`mapSection(...)` transforme les relations en `section.data` directement exploitable.

## 5) Front-end / rendering

- `SectionRenderer` lit en priorite `section.data.items` pour:
  - `home-highlights`
  - `about-stats`
  - `about-authors`
  - `about-reviews`
- fallback conserve vers les anciens contextes pour compatibilite.

Gestion d'etat:

- `app/loading.tsx` et `app/about/loading.tsx` pour loading
- `app/page.tsx` et `app/about/page.tsx` gerent:
  - etat erreur (page absente/non publiee)
  - etat vide (aucune section publiee)

## 6) Bonnes pratiques

- Eviter le hardcoding de contenu metier dans les composants
- Garder les sections comme configuration de layout, et `section_items` pour les listes repetables
- Utiliser `kind` + `payload` sur `section_items` pour evoluer sans changer le schema a chaque besoin
- Limiter les `fields` et utiliser `expand` uniquement sur les relations necessaires
- Conserver des slugs stables (`home`, `about`) et un ordre explicite des sections/items
