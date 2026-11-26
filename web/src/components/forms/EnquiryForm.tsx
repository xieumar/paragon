"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitEnquiry } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { parseEnquiry, type EnquiryFieldName } from "@/lib/forms";
import { Field, controlClass } from "./Field";

export interface EnquiryFormCopy {
  heading?: string;
  submitLabel: string;
  consentLabel: string;
  successTitle: string;
  successMessage: string;
}

const initialState: ActionState<EnquiryFieldName> = { status: "idle" };

/**
 * The enquiry form. Works as a standard form post; with JavaScript it shows
 * errors inline, keeps what was typed, and swaps to a confirmation on success.
 */
export function EnquiryForm({
  services,
  copy,
}: {
  services: string[];
  copy: EnquiryFormCopy;
}) {
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    initialState
  );
  // Time the visitor first touched the form, to spot bots that submit instantly
  // (a bot that never focuses a field sends no time and is rejected).
  const [startedAt, setStartedAt] = useState("");
  const markStarted = () => {
    if (!startedAt) setStartedAt(String(Date.now()));
  };

  // Checked in the browser before sending, with the same rules as the server.
  // An incomplete form is never sent, and what was typed stays in place.
  const [clientErrors, setClientErrors] = useState<Partial<
    Record<EnquiryFieldName, string>
  > | null>(null);
  const validateBeforeSend = (event: React.FormEvent<HTMLFormElement>) => {
    const result = parseEnquiry(new FormData(event.currentTarget));
    if (result.ok) {
      setClientErrors(null);
      return;
    }
    event.preventDefault();
    setClientErrors(result.fieldErrors);
  };

  // After a submit, bring the result into view and move focus to it, so
  // sighted and screen-reader users both land on the confirmation or the first
  // problem instead of being left further down the page.
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";

    if (state.status === "success") {
      resultRef.current?.scrollIntoView({ behavior, block: "center" });
      resultRef.current?.focus({ preventScroll: true });
    } else if (state.status === "error") {
      const firstInvalid = formRef.current?.querySelector<HTMLElement>(
        '[aria-invalid="true"]'
      );
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior, block: "center" });
        firstInvalid.focus({ preventScroll: true });
      } else {
        resultRef.current?.scrollIntoView({ behavior, block: "center" });
      }
    }
  }, [state]);

  useEffect(() => {
    if (!clientErrors) return;
    const firstInvalid = formRef.current?.querySelector<HTMLElement>(
      '[aria-invalid="true"]'
    );
    firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
    firstInvalid?.focus({ preventScroll: true });
  }, [clientErrors]);

  if (state.status === "success") {
    return (
      <div
        ref={resultRef as React.RefObject<HTMLDivElement>}
        role="status"
        tabIndex={-1}
        className="flex scroll-mt-28 flex-col items-start gap-4 rounded-3xl bg-secondary p-8 outline-none sm:p-12"
      >
        <CheckCircle2 aria-hidden className="size-12 text-cta" />
        <h2 className="text-3xl font-bold tracking-tight">
          {copy.successTitle}
        </h2>
        <p className="max-w-md text-lg text-muted-foreground">
          {copy.successMessage}
        </p>
      </div>
    );
  }

  const errors = clientErrors ?? state.fieldErrors ?? {};
  const alertMessage = clientErrors
    ? "Please fill in the highlighted fields before sending."
    : state.status === "error"
      ? state.message
      : undefined;
  const values = state.values ?? {};

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={validateBeforeSend}
      onFocusCapture={markStarted}
      noValidate
      className="space-y-6"
    >
      {copy.heading && (
        <h2 className="text-2xl font-bold tracking-tight">{copy.heading}</h2>
      )}

      {alertMessage && (
        <p
          ref={resultRef as React.RefObject<HTMLParagraphElement>}
          role="alert"
          className="scroll-mt-28 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive"
        >
          {alertMessage}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Full name" required error={errors.name}>
          {(control) => (
            <input
              {...control}
              name="name"
              type="text"
              autoComplete="name"
              defaultValue={values.name}
              className={`${controlClass} h-12`}
            />
          )}
        </Field>
        <Field name="email" label="Email" required error={errors.email}>
          {(control) => (
            <input
              {...control}
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={values.email}
              className={`${controlClass} h-12`}
            />
          )}
        </Field>
        <Field name="company" label="Company" error={errors.company}>
          {(control) => (
            <input
              {...control}
              name="company"
              type="text"
              autoComplete="organization"
              defaultValue={values.company}
              className={`${controlClass} h-12`}
            />
          )}
        </Field>
        <Field name="phone" label="Phone" error={errors.phone}>
          {(control) => (
            <input
              {...control}
              name="phone"
              type="tel"
              autoComplete="tel"
              defaultValue={values.phone}
              className={`${controlClass} h-12`}
            />
          )}
        </Field>
      </div>

      {services.length > 0 && (
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold">
            Service you are interested in
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              optional
            </span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {[...services, "Something else"].map((title) => (
              <label key={title} className="cursor-pointer">
                <input
                  type="radio"
                  name="service"
                  value={title}
                  defaultChecked={values.service === title}
                  className="peer sr-only"
                />
                <span className="inline-flex rounded-full border border-input px-4 py-2 text-sm font-medium transition-colors hover:border-navy peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-cta/30">
                  {title}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <Field name="message" label="Message" required error={errors.message}>
        {(control) => (
          <textarea
            {...control}
            name="message"
            rows={6}
            defaultValue={values.message}
            className={`${controlClass} min-h-40 py-3`}
          />
        )}
      </Field>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="startedAt" value={startedAt} />

      <div className="space-y-2">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={
              errors.consent ? "field-consent-error" : undefined
            }
            className="mt-1 size-5 shrink-0 accent-[var(--cta)]"
          />
          <span className="text-sm text-muted-foreground">
            {copy.consentLabel}
          </span>
        </label>
        {errors.consent && (
          <p
            id="field-consent-error"
            className="text-sm font-medium text-destructive"
          >
            {errors.consent}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="cta"
        size="xl"
        disabled={pending}
        aria-disabled={pending}
      >
        {pending && <Loader2 aria-hidden className="size-4 animate-spin" />}
        {pending ? "Sending…" : copy.submitLabel}
      </Button>
    </form>
  );
}
