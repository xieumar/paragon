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
    {name: 'faq', title: 'FAQ'},
    {name: 'cta', title: 'Closing call to action'},
    {name: 'extra', title: 'More sections'},
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
      name: 'testimonialBlock',
      title: 'Testimonials',
      type: 'reference',
      to: [{type: 'testimonialBlock'}],
      group: 'extra',
      description: 'Pick a testimonial slider. Leave empty to hide it.',
    }),
    defineField({
      name: 'logoBlock',
      title: 'Client logos',
      type: 'reference',
      to: [{type: 'logoBlock'}],
      group: 'extra',
      description: 'Pick a logo banner to show here. Leave empty to hide it.',
    }),
    defineField({
      name: 'faqBlock',
      title: 'FAQ',
      type: 'reference',
      to: [{type: 'faqBlock'}],
      group: 'faq',
      description:
        'Pick a FAQ set to show here. Create or edit sets under "Reusable blocks" in the sidebar. Leave empty to hide this section.',
    }),
    defineField({
      name: 'ctaBlock',
      title: 'Closing call to action',
      type: 'reference',
      to: [{type: 'ctaBlock'}],
      group: 'cta',
      description: 'Pick the closing call to action. Leave empty to hide it.',
    }),

    defineField({name: 'seo', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Services page'})},
})
