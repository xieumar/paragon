import {defineField, defineType} from 'sanity'

/** Reusable closing call to action (heading, text and button). */
export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'Call to action',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name (for editors only)',
      type: 'string',
      description: 'Only shown in the Studio, e.g. "Start a project". Not shown on the website.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'text',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(200),
    }),
    defineField({name: 'cta', title: 'Button', type: 'cta'}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'heading'},
  },
})
