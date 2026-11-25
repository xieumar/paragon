import {defineField, defineType} from 'sanity'

/** Search and social sharing metadata, reusable on any page-like document. */
export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO title',
      type: 'string',
      description:
        'Shown in search results. Aim for 50–60 characters. Falls back to the page title.',
      validation: (rule) =>
        rule.max(70).warning('Over 70 characters may be cut off in search results.'),
    }),
    defineField({
      name: 'description',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      description: 'Shown in search results. Aim for 120–160 characters.',
      validation: (rule) =>
        rule.max(200).warning('Over 160 characters may be cut off in search results.'),
    }),
    defineField({
      name: 'image',
      title: 'Social sharing image',
      type: 'imageWithAlt',
      description: 'Shown when the page is shared. Recommended 1200×630.',
    }),
    defineField({
      name: 'noindex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
