import {defineArrayMember, defineField, defineType} from 'sanity'

/** Singleton: everything on the home page. */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'services', title: 'Services'},
    {name: 'credibility', title: 'Stats & clients'},
    {name: 'testimonial', title: 'Testimonial'},
    {name: 'cta', title: 'Closing call to action'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Hero slides',
      type: 'array',
      group: 'hero',
      description: 'The large banner at the top. Add 1 to 3 slides; with more than one it rotates.',
      validation: (rule) => rule.required().min(1).max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'heroSlide',
          fields: [
            defineField({
              name: 'layout',
              type: 'string',
              description:
                'Overlay: full-width photo with centred text. Split: text on the left, photo on the right.',
              options: {
                list: [
                  {title: 'Overlay (centred over photo)', value: 'overlay'},
                  {title: 'Split (text left, photo right)', value: 'split'},
                ],
                layout: 'radio',
              },
              initialValue: 'overlay',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'eyebrow',
              type: 'string',
              description: 'Small label above the headline.',
              validation: (rule) => rule.max(40),
            }),
            defineField({
              name: 'headline',
              type: 'string',
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: 'subcopy',
              title: 'Supporting text',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.max(200),
            }),
            defineField({name: 'cta', title: 'Button', type: 'cta'}),
            defineField({
              name: 'image',
              type: 'imageWithAlt',
              description: 'Large photo. Landscape, at least 1600px wide.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'badge',
              type: 'string',
              description:
                'Optional short badge on the photo (overlay layout), e.g. "Trusted quality".',
              validation: (rule) => rule.max(24),
            }),
          ],
          preview: {
            select: {title: 'headline', subtitle: 'layout', media: 'image'},
          },
        }),
      ],
    }),

    defineField({
      name: 'servicesEyebrow',
      title: 'Services: small label',
      type: 'string',
      group: 'services',
    }),
    defineField({
      name: 'servicesHeading',
      title: 'Services: heading',
      type: 'string',
      group: 'services',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'servicesIntro',
      title: 'Services: intro text',
      type: 'text',
      rows: 3,
      group: 'services',
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'featuredServices',
      title: 'Featured services',
      type: 'array',
      group: 'services',
      description: 'Choose up to 6 services to show, in this order.',
      validation: (rule) => rule.max(6),
      of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})],
    }),

    defineField({
      name: 'stats',
      type: 'array',
      group: 'credibility',
      description: 'Up to 4 headline numbers, e.g. "15+" and "Years of experience".',
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
    defineField({
      name: 'clientLogos',
      title: 'Client logos',
      type: 'array',
      group: 'credibility',
      description: 'Up to 8 logos. Use alt text with the client name.',
      validation: (rule) => rule.max(8),
      of: [defineArrayMember({type: 'imageWithAlt'})],
    }),

    defineField({
      name: 'featuredTestimonial',
      title: 'Featured testimonial',
      type: 'reference',
      group: 'testimonial',
      to: [{type: 'testimonial'}],
    }),

    defineField({
      name: 'ctaBand',
      title: 'Closing call to action',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({
          name: 'heading',
          type: 'string',
          validation: (rule) => rule.max(80),
        }),
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
  preview: {prepare: () => ({title: 'Home page'})},
})
