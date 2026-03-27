"use server";

import { eqFilter, logPbError, pb, pbEnabled } from "@/app/src/lib/pb";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function subscribeNewsletterAction(formData: FormData) {
  const honeyPot = String(formData.get("company") ?? "").trim();
  if (honeyPot) {
    return;
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email || !isValidEmail(email)) {
    return;
  }

  if (!pbEnabled || !pb) {
    return;
  }

  try {
    const existing = await pb.collection("newsletter_subscribers").getList(1, 1, {
      filter: eqFilter("email", email),
      fields: "id,email,status",
    });

    if (existing.items.length > 0) {
      return;
    }

    await pb.collection("newsletter_subscribers").create({
      email,
      status: "active",
    });
  } catch (error) {
    const message = String((error as { message?: string })?.message ?? "");
    if (message.toLowerCase().includes("unique")) {
      return;
    }
    logPbError("subscribeNewsletterAction", error, { email });
  }
}
