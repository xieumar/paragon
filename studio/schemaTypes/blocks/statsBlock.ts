import {defineArrayMember, defineField, defineType} from 'sanity'
import {countItems, plural, selectItems} from './previewCount'

/** Reusable row of headline numbers (animated when scrolled into view). */
export const statsBlock = defineType({
  name: 'statsBlock',
  title: 'Stats',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name (for editors only)',
      type: 'string',
      description: 'Only shown in the Studio, e.g. "Company stats". Not shown on the website.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Numbers',
      type: 'array',
      description: 'Up to 4, e.g. "15+" and "Happy clients".',
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({
              name: 'value',
              type: 'string',
              validation: (rule) => rule.required().max(10),
            }),
            defineField({
              name: 'label',
              type: 'string',
              validation: (rule) => rule.required().max(40),
            }),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'name', ...selectItems('items')},
    prepare: (selection) => ({
      title: selection.title as string,
      subtitle: plural(countItems(selection), 'number'),
    }),
  },
})
