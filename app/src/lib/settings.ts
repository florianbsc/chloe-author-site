import type { RecordModel } from "pocketbase";
import { getFileUrl, pb, pbEnabled } from "@/app/src/lib/pb";

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
  brand_name?: string;
  logo?: string;
  logo_alt?: string;
  header_cta_label?: string;
  header_cta_href?: string;
  footer_newsletter_title?: string;
  footer_newsletter_description?: string;
  footer_newsletter_note?: string;
  copyright?: string;
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
  return {
    brandName: record.brand_name,
    logo: getFileUrl(record, record.logo ?? "") || record.logo,
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
    const record = await pb.collection("site_settings").getFirstListItem<SettingsRecord>("id != ''");
    return { ...FALLBACK_SETTINGS, ...mapSettings(record) };
  } catch {
    return FALLBACK_SETTINGS;
  }
}
