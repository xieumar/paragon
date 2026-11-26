import type { ReactNode } from "react";
import { cn } from "@/lib";

/** Props to spread onto the control so the label, hint and error are linked. */
export interface ControlProps {
  id: string;
  "aria-invalid": boolean | undefined;
  "aria-describedby": string | undefined;
  "aria-required": boolean | undefined;
}

/** Shared look for text inputs, selects and textareas. */
export const controlClass =
  "w-full rounded-xl border border-input bg-background px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-cta focus-visible:ring-4 focus-visible:ring-cta/15 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/15 disabled:opacity-60";

/** Label + control + error message, wired together for assistive technology. */
export function Field({
  name,
  label,
  error,
  required,
  hint,
  className,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
        {required ? (
          <span aria-hidden className="ml-1 text-cta">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            optional
          </span>
        )}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        "aria-required": required || undefined,
      })}
      {hint && !error && (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
