// Ambient declarations: no top-level import/export, so everything here is global.

/** Props for components that only wrap children. */
interface WithChildren {
  children: import("react").ReactNode;
}

/** A navigational link, internal (`href` starting with `/`) or external. */
interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

/** A call-to-action rendered as a button link. */
interface Cta {
  label: string;
  href: string;
  external?: boolean;
}

/** Shape of a Sanity slug field after projection (`slug.current`). */
type Slug = string;
