import type {StructureResolver} from 'sanity/structure'
import {BLOCK_LIST} from './schemaTypes/blocks'

/** Documents that exist exactly once, each with a fixed sidebar entry. */
const SINGLETONS = [
  {type: 'siteSettings', title: 'Site settings'},
  {type: 'homePage', title: 'Home page'},
  {type: 'aboutPage', title: 'About page'},
  {type: 'servicesPage', title: 'Services page'},
  {type: 'contactPage', title: 'Contact page'},
] as const

export const SINGLETON_TYPES = SINGLETONS.map((singleton) => singleton.type)

/** Created by the website, never from the Studio "+" menu. */
export const WEBSITE_CREATED_TYPES = ['enquiry'] as const

/** Listed inside the "Reusable blocks" folder, not at the top level. */
const BLOCK_TYPES = BLOCK_LIST.map((block) => block.type)

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map(({type, title}) =>
        S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      S.listItem()
        .title('Reusable blocks')
        .id('reusable-blocks')
        .child(
          S.list()
            .title('Reusable blocks')
            .items(BLOCK_LIST.map(({type, title}) => S.documentTypeListItem(type).title(title))),
        ),
      S.listItem()
        .title('Enquiries')
        .id('enquiries')
        .child(
          S.list()
            .title('Enquiries')
            .items([
              S.listItem()
                .title('New')
                .id('enquiries-new')
                .child(
                  S.documentList()
                    .title('New enquiries')
                    .schemaType('enquiry')
                    .filter('_type == "enquiry" && status == "new"')
                    .defaultOrdering([{field: 'submittedAt', direction: 'desc'}]),
                ),
              S.listItem()
                .title('All')
                .id('enquiries-all')
                .child(
                  S.documentList()
                    .title('All enquiries')
                    .schemaType('enquiry')
                    .filter('_type == "enquiry"')
                    .defaultOrdering([{field: 'submittedAt', direction: 'desc'}]),
                ),
            ]),
        ),
      S.divider(),
      // Everything else (collections) is listed automatically.
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId() ?? ''
        return (
          !(SINGLETON_TYPES as readonly string[]).includes(id) &&
          !(WEBSITE_CREATED_TYPES as readonly string[]).includes(id) &&
          !(BLOCK_TYPES as readonly string[]).includes(id)
        )
      }),
    ])
