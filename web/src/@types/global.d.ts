// Ambient declarations: no top-level import/export, so everything here is global.

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_SANITY_PROJECT_ID: string;
    readonly NEXT_PUBLIC_SANITY_DATASET: string;
    readonly NEXT_PUBLIC_SITE_URL?: string;
    /** Server-only. Needed for draft content / Visual Editing. */
    readonly SANITY_API_READ_TOKEN?: string;
    /** Server-only. Needed to store enquiries (PR 4). */
    readonly SANITY_API_WRITE_TOKEN?: string;
  }
}
