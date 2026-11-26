import {defineArrayMember, defineField, defineType} from 'sanity'
import {countItems, plural, selectItems} from './previewCount'

/** Reusable FAQ. Create it once, then pick it on any page. */
export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ set',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name (for editors only)',
      type: 'string',
      description: 'Only shown in the Studio, e.g. "General FAQ". Not shown on the website.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Small label',
      type: 'string',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'intro',
      title: 'Intro text',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      validation: (rule) => rule.max(12),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              validation: (rule) => rule.required().max(160),
            }),
            defineField({
              name: 'answer',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required().max(800),
            }),
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'name', ...selectItems('items')},
    prepare: (selection) => ({
      title: selection.title as string,
      subtitle: plural(countItems(selection), 'question'),
    }),
  },
})
