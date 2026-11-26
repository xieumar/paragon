import { z } from "zod";

/** Shared by the browser (hints) and the server action (the real check). */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Please keep your name under 100 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .email("Please enter a valid email address")
    .max(160, "Please use a shorter email address"),
  company: z
    .string()
    .trim()
    .max(120, "Please keep this under 120 characters")
    .optional(),
  phone: z
    .string()
    .trim()
    .max(30, "Please keep this under 30 characters")
    .regex(/^[+\d\s().-]*$/, "Use digits, spaces and + ( ) - only")
    .optional(),
  service: z.string().trim().max(120).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters)")
    .max(2000, "Please keep your message under 2000 characters"),
  consent: z
    .boolean()
    .refine((value) => value, "Please tick the box so we can contact you"),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EnquiryFieldName = Extract<keyof EnquiryInput, string>;

/** Field names the form submits (plus anti-spam fields handled separately). */
export const ENQUIRY_FIELDS: EnquiryFieldName[] = [
  "name",
  "email",
  "company",
  "phone",
  "service",
  "message",
  "consent",
];

export type EnquiryResult =
  | {
      ok: true;
      data: EnquiryInput;
      values: Partial<Record<EnquiryFieldName, string>>;
    }
  | {
      ok: false;
      fieldErrors: Partial<Record<EnquiryFieldName, string>>;
      values: Partial<Record<EnquiryFieldName, string>>;
    };

/**
 * Reads and validates the enquiry fields from submitted form data. Used by the
 * browser (instant feedback) and the server action (the real check), so both
 * always apply exactly the same rules.
 */
export function parseEnquiry(formData: FormData): EnquiryResult {
  const values: Partial<Record<EnquiryFieldName, string>> = {};
  for (const field of ENQUIRY_FIELDS) {
    if (field !== "consent") values[field] = String(formData.get(field) ?? "");
  }

  const parsed = enquirySchema.safeParse({
    ...values,
    consent: formData.get("consent") === "on",
  });
  if (parsed.success) return { ok: true, data: parsed.data, values };

  const fieldErrors: Partial<Record<EnquiryFieldName, string>> = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0] as EnquiryFieldName | undefined;
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return { ok: false, fieldErrors, values };
}
