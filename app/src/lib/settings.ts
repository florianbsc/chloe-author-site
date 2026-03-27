import type { RecordModel } from "pocketbase";
import { getFileUrl, logPbError, pb, pbEnabled } from "@/app/src/lib/pb";

export type SiteSettings = {
  brandName?: string;
  logo?: string;
  logoAlt?: string;
  headerCtaLabel?: string;
  headerCtaHref?: string;
  footerNewsletterTitle?: string;
  footerNewsletterDescription?: string;
  footerNewsletterNote?: string;
  copyright?: string;
};

type SettingsRecord = RecordModel & {
  status?: string;
  site_name?: string;
  default_seo_title?: string;
  default_seo_description?: string;
  brand_name?: string;
  logo?: string;
  favicon?: string;
  logo_alt?: string;
  header_cta_label?: string;
  header_cta_href?: string;
  footer_newsletter_title?: string;
  footer_newsletter_description?: string;
  footer_newsletter_note?: string;
  copyright?: string;
  expand?: {
    logo?: RecordModel;
  };
};

const FALLBACK_SETTINGS: SiteSettings = {
  brandName: "Chloé Simart",
  logo: "/brand/logo-wide.svg",
  logoAlt: "Logo Chloé Simart",
  headerCtaLabel: "Contactez-moi",
  headerCtaHref: "/about",
  footerNewsletterTitle: "Recevez les actualités et dates de sortie de mes romans.",
  footerNewsletterDescription: "Recevez les actualités et dates de sortie de mes romans.",
  footerNewsletterNote:
    "En vous abonnant, vous acceptez notre politique de confidentialité et consentez à recevoir nos communications.",
  copyright: "© 2025 Chloé Simart. Tous droits réservés.",
};

function mapSettings(record: SettingsRecord): SiteSettings {
  const logoRecord = record.expand?.logo ?? record;
  const logoFile = record.expand?.logo
    ? (record.expand.logo as RecordModel & { file?: string }).file ?? ""
    : record.logo ?? "";

  return {
    brandName: record.brand_name ?? record.site_name,
    logo: getFileUrl(logoRecord, logoFile) || record.logo,
    logoAlt: record.logo_alt,
    headerCtaLabel: record.header_cta_label,
    headerCtaHref: record.header_cta_href,
    footerNewsletterTitle: record.footer_newsletter_title,
    footerNewsletterDescription: record.footer_newsletter_description,
    footerNewsletterNote: record.footer_newsletter_note,
    copyright: record.copyright,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!pbEnabled || !pb) {
    return FALLBACK_SETTINGS;
  }

  try {
    const result = await pb.collection("site_settings").getList<SettingsRecord>(1, 1, {
      sort: "order",
      filter: 'status = "published"',
      expand: "logo",
      fields: [
        "id",
        "status",
        "site_name",
        "brand_name",
        "logo",
        "logo_alt",
        "header_cta_label",
        "header_cta_href",
        "footer_newsletter_title",
        "footer_newsletter_description",
        "footer_newsletter_note",
        "copyright",
        "expand.logo.file",
      ].join(","),
    });

    const record = result.items[0];
    if (!record) {
      return FALLBACK_SETTINGS;
    }

    return { ...FALLBACK_SETTINGS, ...mapSettings(record) };
  } catch (error) {
    logPbError("getSiteSettings", error);
    return FALLBACK_SETTINGS;
  }
}
