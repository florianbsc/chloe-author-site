import PocketBase, { type RecordModel } from "pocketbase";

const PB_URL =
  process.env.NEXT_PUBLIC_PB_URL ||
  process.env.PB_URL ||
  "";

export const pb = PB_URL ? new PocketBase(PB_URL) : null;
export const pbEnabled = Boolean(PB_URL);

if (pb) {
  pb.autoCancellation(false);
}

export function getFileUrl(
  record: RecordModel | null | undefined,
  file: string | null | undefined,
  options?: { thumb?: string },
) {
  if (!file) {
    return "";
  }

  if (file.startsWith("http")) {
    return file;
  }

  if (!pb || !record) {
    return file;
  }

  return pb.files.getUrl(record, file, options);
}

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
};
