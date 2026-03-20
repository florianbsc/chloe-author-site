import type { RecordModel } from "pocketbase";
import { getFileUrl, pb, pbEnabled } from "@/app/src/lib/pb";

export type Author = {
  id: string;
  name: string;
  role?: string;
  quote?: string;
  bio?: string;
  avatar?: string;
  socials?: Array<{ label: string; href: string }>;
};

type AuthorRecord = RecordModel & {
  name?: string;
  role?: string;
  quote?: string;
  bio?: string;
  avatar?: string;
  socials?: Array<{ label: string; href: string }>;
};

const AUTHORS: Author[] = [
  {
    id: "chloe-simart-1",
    name: "Chloé Simart",
    role: "Romancière",
    quote:
      "J'écris pour que le silence ne gagne jamais. Chaque page est une victoire contre l'oubli.",
  },
  {
    id: "chloe-simart-2",
    name: "Chloé Simart",
    role: "Romancière",
    quote:
      "J'écris pour que le silence ne gagne jamais. Chaque page est une victoire contre l'oubli.",
  },
  {
    id: "chloe-simart-3",
    name: "Chloé Simart",
    role: "Romancière",
    quote:
      "J'écris pour que le silence ne gagne jamais. Chaque page est une victoire contre l'oubli.",
  },
];

function mapAuthor(record: AuthorRecord): Author {
  return {
    id: record.id,
    name: record.name ?? "",
    role: record.role,
    quote: record.quote,
    bio: record.bio,
    avatar: getFileUrl(record, record.avatar ?? "") || record.avatar,
    socials: record.socials,
  };
}

export async function getAuthors(): Promise<Author[]> {
  if (!pbEnabled || !pb) {
    return AUTHORS;
  }

  try {
    const records = await pb.collection("authors").getFullList<AuthorRecord>({
      sort: "order",
      filter: 'status = "published"',
    });
    return records.map(mapAuthor);
  } catch {
    try {
      const records = await pb.collection("authors").getFullList<AuthorRecord>({
        sort: "order",
      });
      return records.map(mapAuthor);
    } catch {
      return AUTHORS;
    }
  }
}
