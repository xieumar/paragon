import {defineArrayMember, defineField, defineType} from 'sanity'

/** A service the company offers. Shown on the home page and /services. */
export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      description: 'Used in the page address: /services/your-slug. Click Generate.',
      options: {source: 'title', maxLength: 80},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'One or two sentences shown on service cards. Max 200 characters.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'image',
      type: 'imageWithAlt',
      group: 'content',
      description: 'Card and page header image.',
    }),
    defineField({
      name: 'overview',
      type: 'portableText',
      group: 'content',
      description: 'The full description shown on the service page.',
    }),
    defineField({
      name: 'capabilities',
      title: 'Key capabilities',
      type: 'array',
      group: 'content',
      description: 'Short bullet points of what is included.',
      of: [defineArrayMember({type: 'string', validation: (rule) => rule.max(100)})],
      validation: (rule) => rule.max(10),
    }),
    defineField({
      name: 'processSteps',
      title: 'Process steps',
      type: 'array',
      group: 'content',
      description: 'How the service is delivered, in order.',
      validation: (rule) => rule.max(8),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'processStep',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required().max(60),
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
    defineField({
      name: 'order',
      type: 'number',
      group: 'content',
      description: 'Lower numbers appear first. Leave empty to sort by title.',
      initialValue: 100,
    }),
    defineField({name: 'seo', type: 'seo', group: 'seo'}),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
  preview: {select: {title: 'title', subtitle: 'summary', media: 'image'}},
})
