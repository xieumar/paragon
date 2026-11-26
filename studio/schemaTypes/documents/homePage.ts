import {defineArrayMember, defineField, defineType} from 'sanity'
import {singletonReadOnly} from '../singleton'

/** Singleton: everything on the home page. */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  readOnly: singletonReadOnly('homePage'),
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'about', title: 'About'},
    {name: 'services', title: 'Services'},
    {name: 'credibility', title: 'Stats & clients'},
    {name: 'testimonial', title: 'Testimonial'},
    {name: 'faq', title: 'FAQ'},
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
      name: 'about',
      title: 'About section',
      type: 'object',
      group: 'about',
      description: 'Shown right after the hero. Leave the heading empty to hide the section.',
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
          validation: (rule) => rule.max(100),
        }),
        defineField({
          name: 'body',
          title: 'Text',
          type: 'text',
          rows: 6,
          description: 'Separate paragraphs with a blank line.',
          validation: (rule) => rule.max(900),
        }),
        defineField({
          name: 'highlights',
          type: 'array',
          description: 'Up to 4 short bullet points, e.g. "Senior team on every project".',
          of: [defineArrayMember({type: 'string', validation: (rule) => rule.max(80)})],
          validation: (rule) => rule.max(4),
        }),
        defineField({
          name: 'image',
          type: 'imageWithAlt',
          description: 'Portrait or square works best.',
        }),
        defineField({name: 'cta', title: 'Button', type: 'cta'}),
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
      description: 'Choose up to 6 services to show, in this order. Each service only once.',
      validation: (rule) => rule.max(6).unique(),
      of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})],
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
      name: 'logoBlock',
      title: 'Client logos',
      type: 'reference',
      to: [{type: 'logoBlock'}],
      group: 'credibility',
      description: 'Pick a logo banner to show here. Leave empty to hide it.',
    }),
    defineField({
      name: 'statsBlock',
      title: 'Stats',
      type: 'reference',
      to: [{type: 'statsBlock'}],
      group: 'credibility',
      description: 'Pick a set of headline numbers. Leave empty to hide it.',
    }),
    defineField({
      name: 'testimonialBlock',
      title: 'Testimonials',
      type: 'reference',
      to: [{type: 'testimonialBlock'}],
      group: 'testimonial',
      description: 'Pick a testimonial slider. Leave empty to hide it.',
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
  preview: {prepare: () => ({title: 'Home page'})},
})
