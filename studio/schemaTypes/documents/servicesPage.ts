import {defineField, defineType} from 'sanity'
import {singletonReadOnly} from '../singleton'

/** Singleton: the /services page header and the call to action shown on service pages. */
export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services page',
  type: 'document',
  readOnly: singletonReadOnly('servicesPage'),
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'cta', title: 'Closing call to action'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'header',
      title: 'Page header',
      type: 'object',
      group: 'header',
      description:
        'The individual services are "Service" entries in the sidebar. This is only the heading of the /services page.',
      fields: [
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
          rows: 3,
          validation: (rule) => rule.max(300),
        }),
        defineField({
          name: 'image',
          type: 'imageWithAlt',
          description: 'Optional landscape photo shown beside the heading.',
        }),
      ],
    }),

    defineField({
      name: 'ctaBand',
      title: 'Closing call to action',
      type: 'object',
      group: 'cta',
      description: 'Shown at the bottom of /services and of every individual service page.',
      fields: [
        defineField({name: 'heading', type: 'string', validation: (rule) => rule.max(80)}),
        defineField({
          name: 'text',
          type: 'text',
          rows: 2,
          validation: (rule) => rule.max(200),
        }),
        defineField({name: 'cta', title: 'Button', type: 'cta'}),
      ],
    }),

    defineField({name: 'seo', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Services page'})},
})
