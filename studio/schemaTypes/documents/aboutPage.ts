import {defineArrayMember, defineField, defineType} from 'sanity'
import {singletonReadOnly} from '../singleton'

/** Singleton: the About page. Team members are separate documents. */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  readOnly: singletonReadOnly('aboutPage'),
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'story', title: 'Our story'},
    {name: 'values', title: 'Values'},
    {name: 'team', title: 'Team'},
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
          description: 'Landscape photo of the team or office.',
        }),
      ],
    }),

    defineField({
      name: 'story',
      title: 'Our story',
      type: 'object',
      group: 'story',
      description: 'Leave the heading empty to hide this section.',
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
        defineField({name: 'body', type: 'portableText'}),
      ],
    }),

    defineField({
      name: 'values',
      title: 'Values',
      type: 'object',
      group: 'values',
      description: 'Leave the heading empty to hide this section.',
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
          name: 'items',
          type: 'array',
          validation: (rule) => rule.max(6),
          of: [
            defineArrayMember({
              type: 'object',
              name: 'value',
              fields: [
                defineField({
                  name: 'icon',
                  type: 'string',
                  description: 'Pick an icon shown above the title.',
                  options: {
                    layout: 'dropdown',
                    list: [
                      {title: 'Thumbs up', value: 'ThumbsUp'},
                      {title: 'Cursor', value: 'MousePointerClick'},
                      {title: 'Award', value: 'Award'},
                      {title: 'Question / support', value: 'MessageCircleQuestion'},
                      {title: 'Rocket', value: 'Rocket'},
                      {title: 'Shield', value: 'ShieldCheck'},
                      {title: 'Lightbulb', value: 'Lightbulb'},
                      {title: 'People', value: 'Users'},
                      {title: 'Target', value: 'Target'},
                      {title: 'Heart', value: 'Heart'},
                      {title: 'Handshake', value: 'Handshake'},
                      {title: 'Sparkles', value: 'Sparkles'},
                      {title: 'Gem', value: 'Gem'},
                      {title: 'Lightning', value: 'Zap'},
                      {title: 'Globe', value: 'Globe'},
                      {title: 'Clock', value: 'Clock'},
                      {title: 'Palette', value: 'Palette'},
                    ],
                  },
                }),
                defineField({
                  name: 'title',
                  type: 'string',
                  validation: (rule) => rule.required().max(40),
                }),
                defineField({
                  name: 'description',
                  type: 'text',
                  rows: 3,
                  validation: (rule) => rule.required().max(240),
                }),
              ],
              preview: {select: {title: 'title', subtitle: 'description'}},
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'team',
      title: 'Team section',
      type: 'object',
      group: 'team',
      description:
        'Leave the heading empty to hide the section. Add people below (use "Create new" for someone new, with their photo), or leave the list empty to show every Team member.',
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
          name: 'intro',
          title: 'Intro text',
          type: 'text',
          rows: 2,
          validation: (rule) => rule.max(240),
        }),
        defineField({
          name: 'members',
          title: 'Team members',
          type: 'array',
          description:
            'Shown in this order. Each person has a photo, job title, bio and LinkedIn link.',
          of: [defineArrayMember({type: 'reference', to: [{type: 'teamMember'}]})],
          validation: (rule) => rule.max(12),
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
      name: 'ctaBlock',
      title: 'Closing call to action',
      type: 'reference',
      to: [{type: 'ctaBlock'}],
      group: 'cta',
      description: 'Pick the closing call to action. Leave empty to hide it.',
    }),

    defineField({name: 'seo', type: 'seo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'About page'})},
})
