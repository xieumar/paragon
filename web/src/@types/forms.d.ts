// Ambient declarations: no top-level import/export, so everything here is global.

/** Result returned by a Server Action driving a form. */
interface ActionState<TFieldNames extends string = string> {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<TFieldNames, string>>;
  /** Submitted values, returned so the form keeps what the visitor typed. */
  values?: Partial<Record<TFieldNames, string>>;
}

/** Values collected by the enquiry form (implemented in PR 4). */
interface EnquiryFormValues {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
  consent: boolean;
}
