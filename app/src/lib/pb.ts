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

export function escapePbFilterValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}

export function eqFilter(field: string, value: string) {
  return `${field} = "${escapePbFilterValue(value)}"`;
}

export function andFilters(filters: Array<string | undefined | null>) {
  return filters.filter(Boolean).join(" && ");
}

export function logPbError(
  operation: string,
  error: unknown,
  context?: Record<string, unknown>,
) {
  const err = error as { message?: string; status?: number; response?: unknown };
  // Structured logging to avoid silent fallback behavior.
  console.error("[pocketbase]", {
    operation,
    message: err?.message ?? "Unknown error",
    status: err?.status,
    response: err?.response,
    context,
  });
}

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
};
