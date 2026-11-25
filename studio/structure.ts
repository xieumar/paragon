import type {StructureResolver} from 'sanity/structure'

/** Document types that exist exactly once and are edited from a fixed sidebar entry. */
export const SINGLETON_TYPES = ['siteSettings'] as const

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      // Everything else (collections) is listed automatically.
      ...S.documentTypeListItems().filter(
        (item) => !(SINGLETON_TYPES as readonly string[]).includes(item.getId() ?? ''),
      ),
    ])
