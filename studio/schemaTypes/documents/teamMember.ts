import {defineField, defineType} from 'sanity'

/** A person shown on the About page. */
export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Job title',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'photo',
      type: 'imageWithAlt',
      description: 'Portrait, ideally 4:5. The focal point (hotspot) keeps the face in frame.',
    }),
    defineField({
      name: 'bio',
      type: 'text',
      rows: 4,
      description: 'A sentence or two. Max 240 characters.',
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Lower numbers appear first. Leave as 100 to sort by name.',
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'},
        {field: 'name', direction: 'asc'},
      ],
    },
  ],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})
