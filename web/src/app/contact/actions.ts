"use server";

import { headers } from "next/headers";
import { parseEnquiry, type EnquiryFieldName } from "@/lib/forms";
import { getClientIp, getWriteClient, rateLimit } from "@/lib/server";

type State = ActionState<EnquiryFieldName>;

/** A real person needs at least this long to fill in the form. */
const MIN_FILL_MS = 3000;

const GENERIC_ERROR =
  "Sorry, something went wrong and your message was not sent. Please try again, or contact us directly.";

/**
 * Stores an enquiry as a Sanity document. Checks, in order: honeypot,
 * validation, fill time, rate limit. Validation comes before the timing check
 * so real people always see what is missing; bots get a normal-looking success.
 */
export async function submitEnquiry(
  _previous: State,
  formData: FormData
): Promise<State> {
  const text = (name: string) => String(formData.get(name) ?? "");

  // 1. Honeypot: a hidden field only bots fill in. Pretend it worked.
  if (text("website")) return { status: "success" };

  // 2. Validate first, so a person always gets real error messages.
  const result = parseEnquiry(formData);
  if (!result.ok) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: result.fieldErrors,
      values: result.values,
    };
  }
  const { values } = result;
  const parsed = { data: result.data };

  // 3. A complete form sent faster than a person could type it is a bot.
  const startedAt = Number(text("startedAt"));
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "success" };
  }

  const requestHeaders = await headers();
  const ip = getClientIp(requestHeaders);
  if (!rateLimit(`enquiry:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return {
      status: "error",
      message:
        "You have sent several messages in a short time. Please wait a few minutes and try again.",
      values,
    };
  }

  // 4. Store.
  const client = getWriteClient();
  if (!client) {
    console.error("SANITY_API_WRITE_TOKEN is not set; enquiry not stored.");
    return {
      status: "error",
      message:
        process.env.NODE_ENV === "production"
          ? GENERIC_ERROR
          : "Developer note: SANITY_API_WRITE_TOKEN is missing from web/.env.local, so the enquiry could not be stored. Add it and restart the dev server.",
      values,
    };
  }

  try {
    const { name, email, company, phone, service, message } = parsed.data;
    await client.create({
      _type: "enquiry",
      status: "new",
      name,
      email,
      company: company || undefined,
      phone: phone || undefined,
      service: service || undefined,
      message,
      consent: true,
      submittedAt: new Date().toISOString(),
      sourceUrl: requestHeaders.get("referer") ?? undefined,
    });
  } catch (error) {
    console.error("Failed to store enquiry in Sanity:", error);
    return { status: "error", message: GENERIC_ERROR, values };
  }

  return { status: "success" };
}
