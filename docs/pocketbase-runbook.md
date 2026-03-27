# PocketBase Runbook

Ce runbook documente les operations minimales pour exploiter PocketBase en dev et en prod.

## 1. Variables d'environnement

Dans `my-app/.env.local`:

```bash
# URL publique (navigateur)
NEXT_PUBLIC_PB_URL=http://127.0.0.1:8090

# URL serveur (Server Components / Server Actions)
PB_URL=http://127.0.0.1:8090

# Requis pour scripts seed/reset
PB_SUPERUSER_EMAIL=admin@mail.com
PB_SUPERUSER_PASSWORD=adminadmin
```

## 2. Demarrage local

Depuis la racine du projet:

```bash
docker compose -f docker-compose.dev.yml up
```

PocketBase est lance avec:

- `--dir=/pb_data`
- `--migrationsDir=/pb_migrations`
- `--automigrate=true`

## 3. Migrations

Source des migrations:

- `backend/pb_migrations/*.js`

Principe:

- Les migrations sont la source de verite schema.
- Ne pas modifier le schema manuellement en prod sans migration.

Validation manuelle recommandee:

1. Partir d'un `pb_data` vide.
2. Demarrer PocketBase.
3. Verifier que toutes les collections/champs attendus existent.

## 4. Seed de donnees

Depuis `my-app/`:

```bash
npm run pb:seed          # baseline
npm run pb:seed:empty    # scenario vide
npm run pb:seed:stress   # volumetrie
```

Reset:

```bash
npm run pb:reset         # baseline
npm run pb:reset:all     # baseline + empty + stress
```

Contraintes:

- Scripts idempotents (upsert par clefs stables).
- Credentials superuser obligatoires (`PB_SUPERUSER_EMAIL`, `PB_SUPERUSER_PASSWORD`).

## 5. Backup / Restore

### Backup

Backup minimal:

1. Snapshot `backend/pb_data`.
2. Archiver aussi `backend/pb_migrations` (trace schema).

Exemple:

```bash
tar -czf backup-pb-data-$(date +%F).tar.gz backend/pb_data backend/pb_migrations
```

### Restore

1. Arreter les services.
2. Restaurer `backend/pb_data`.
3. Verifier la version PocketBase cible.
4. Redemarrer et verifier les endpoints critiques.

## 6. Securite et exposition

- Collections de contenu exposees en public: uniquement avec `status = "published"` sur `list/view`.
- Collections sensibles (`newsletter_subscribers`, `contact_messages`):
  - `create` possible (workflow formulaire)
  - `list/view/update/delete` reserves admin.
- Journaliser les erreurs PocketBase (operation, collection, cause) sans fallback silencieux.

## 7. Checklist pre-prod

1. `npm ci`
2. `npm run verify`
3. Migrations rejouees from scratch sur environnement propre
4. Seed scenarios executes (`baseline`, `empty`, `stress`)
5. Verification manuelle des parcours:
   - Home
   - Romans listing + detail
   - Articles listing + detail
   - Soumission newsletter (succes + erreur)
