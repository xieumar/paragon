import type {StructureResolver} from 'sanity/structure'

/** Documents that exist exactly once, each with a fixed sidebar entry. */
const SINGLETONS = [
  {type: 'siteSettings', title: 'Site settings'},
  {type: 'homePage', title: 'Home page'},
] as const

export const SINGLETON_TYPES = SINGLETONS.map((singleton) => singleton.type)

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map(({type, title}) =>
        S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      // Everything else (collections) is listed automatically.
      ...S.documentTypeListItems().filter(
        (item) => !(SINGLETON_TYPES as readonly string[]).includes(item.getId() ?? ''),
      ),
    ])
