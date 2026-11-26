/**
 * Singleton documents (site settings, home page, about page) must exist under
 * one fixed ID, because the sidebar entry opens exactly that ID. A copy under
 * any other ID (e.g. made from an old browser tab) would be edited by mistake
 * while the site keeps showing the other one. This makes every wrong-ID copy
 * read-only so it can't happen silently.
 *
 * If the Studio shows a singleton as read-only, run `pnpm singletons:fix`.
 */
export const singletonReadOnly =
  (fixedId: string) =>
  ({document}: {document?: {_id?: string}}) =>
    Boolean(document?._id) && document!._id!.replace(/^drafts\./, '') !== fixedId
