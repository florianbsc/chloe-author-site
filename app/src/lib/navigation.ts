import type { RecordModel } from "pocketbase";
import {
  getFileUrl,
  logPbError,
  pb,
  pbEnabled,
  type NavItem,
} from "@/app/src/lib/pb";
import { navConfig } from "@/app/src/config/navigation";

export type SocialItem = {
  label: string;
  href: string;
  icon?: string;
};

export type NavigationData = {
  primary: NavItem[];
  romans: NavItem[];
  footer: NavItem[];
  contact: NavItem[];
  legal: NavItem[];
  social: SocialItem[];
};

type NavigationRecord = RecordModel & {
  name?: string;
  items?: NavigationItemRecord[];
  label?: string;
  href?: string;
  group?: string;
  external?: boolean;
  order?: number;
  icon?: string;
  status?: string;
};

type NavigationItemRecord = {
  label?: string;
  href?: string;
  group?: string;
  external?: boolean;
  order?: number;
  icon?: string;
};

const FALLBACK_NAVIGATION: NavigationData = {
  primary: navConfig.main.map((link) => ({
    label: link.label,
    href: link.href,
  })),
  romans: [
    { href: "/romans", label: "Les secrets de Clara" },
    { href: "/romans", label: "Mon éternel combat" },
  ],
  footer: navConfig.footer.flatMap((group) =>
    group.links.map((link) => ({
      label: link.label,
      href: link.href,
    })),
  ),
  contact: [
    { label: "Email", href: "/contact" },
    { label: "Téléphone", href: "/contact" },
    { label: "Adresse", href: "/contact" },
    { label: "Formulaire", href: "/contact" },
    { label: "Partenaires", href: "/contact" },
  ],
  legal: [
    { label: "Politique de confidentialité", href: "/privacy" },
    { label: "Conditions d'utilisation", href: "/terms" },
    { label: "Paramètres de cookies", href: "/cookies" },
  ],
  social: [
    { label: "Facebook", href: "#", icon: "/icons/footer/facebook.svg" },
    { label: "Instagram", href: "#", icon: "/icons/footer/instagram.svg" },
    { label: "Twitter", href: "#", icon: "/icons/footer/twitter.svg" },
    { label: "LinkedIn", href: "#", icon: "/icons/footer/linkedin.svg" },
    { label: "YouTube", href: "#", icon: "/icons/footer/youtube.svg" },
  ],
};

function groupNavItems(records: NavigationRecord[]): NavigationData {
  const grouped: NavigationData = {
    primary: [],
    romans: [],
    footer: [],
    contact: [],
    legal: [],
    social: [],
  };

  records
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .forEach((record) => {
      const item = {
        label: record.label ?? "",
        href: record.href ?? "#",
        external: record.external,
      } satisfies NavItem;

      switch (record.group) {
        case "primary":
          grouped.primary.push(item);
          break;
        case "romans":
          grouped.romans.push(item);
          break;
        case "footer":
          grouped.footer.push(item);
          break;
        case "contact":
          grouped.contact.push(item);
          break;
        case "legal":
          grouped.legal.push(item);
          break;
        case "social":
          grouped.social.push({
            label: record.label ?? "",
            href: record.href ?? "#",
            icon: getFileUrl(record, record.icon ?? "") || record.icon,
          });
          break;
        default:
          grouped.primary.push(item);
          break;
      }
    });

  return grouped;
}

function normalizeRecords(records: NavigationRecord[]) {
  const flattened: NavigationRecord[] = [];
  for (const record of records) {
    if (Array.isArray(record.items) && record.items.length > 0) {
      flattened.push(
        ...record.items.map((item) => ({
          ...record,
          label: item.label,
          href: item.href,
          group: item.group,
          external: item.external,
          order: item.order,
          icon: item.icon,
        })),
      );
      continue;
    }

    flattened.push(record);
  }
  return flattened;
}

export async function getNavigation(): Promise<NavigationData> {
  if (!pbEnabled || !pb) {
    return FALLBACK_NAVIGATION;
  }

  try {
    const result = await pb.collection("navigation").getList<NavigationRecord>(1, 200, {
      sort: "order",
      filter: 'status = "published"',
      fields: "id,name,items,label,href,group,external,order,icon,status",
    });
    const records = normalizeRecords(result.items);

    if (!records.length) {
      return FALLBACK_NAVIGATION;
    }

    return groupNavItems(records);
  } catch (error) {
    logPbError("getNavigation", error);

    try {
      const result = await pb.collection("navigation").getList<NavigationRecord>(1, 200, {
        sort: "order",
        fields: "id,name,items,label,href,group,external,order,icon,status",
      });
      const records = normalizeRecords(result.items);

      return records.length ? groupNavItems(records) : FALLBACK_NAVIGATION;
    } catch (fallbackError) {
      logPbError("getNavigation:fallback", fallbackError);
      return FALLBACK_NAVIGATION;
    }
  }
}
