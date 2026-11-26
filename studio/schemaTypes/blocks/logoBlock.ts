import {defineArrayMember, defineField, defineType} from 'sanity'
import {countItems, plural, selectItems} from './previewCount'

/** Reusable banner of client logos. */
export const logoBlock = defineType({
  name: 'logoBlock',
  title: 'Logo banner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name (for editors only)',
      type: 'string',
      description: 'Only shown in the Studio, e.g. "Clients". Not shown on the website.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logos',
      type: 'array',
      description: 'Up to 12 logos. Use alt text with the client name.',
      validation: (rule) => rule.max(12),
      of: [defineArrayMember({type: 'imageWithAlt'})],
    }),
  ],
  preview: {
    select: {title: 'name', media: 'logos.0', ...selectItems('logos')},
    prepare: (selection) => ({
      title: selection.title as string,
      subtitle: plural(countItems(selection), 'logo'),
      media: selection.media as never,
    }),
  },
})
