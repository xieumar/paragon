import {defineField, defineType} from 'sanity'

/**
 * A message sent through the website's enquiry form. Created by the website
 * (never by hand), so the submitted values are read-only; editors only update
 * the status as they work through them.
 */
export const enquiry = defineType({
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'status',
      type: 'string',
      description: 'Update this as you handle the enquiry. Publish to save.',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Read', value: 'read'},
          {title: 'Replied', value: 'replied'},
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
    defineField({name: 'name', type: 'string', readOnly: true}),
    defineField({name: 'email', type: 'string', readOnly: true}),
    defineField({name: 'company', type: 'string', readOnly: true}),
    defineField({name: 'phone', type: 'string', readOnly: true}),
    defineField({
      name: 'service',
      title: 'Service of interest',
      type: 'string',
      readOnly: true,
    }),
    defineField({name: 'message', type: 'text', rows: 6, readOnly: true}),
    defineField({name: 'consent', type: 'boolean', readOnly: true}),
    defineField({name: 'submittedAt', type: 'datetime', readOnly: true}),
    defineField({
      name: 'sourceUrl',
      title: 'Page it was sent from',
      type: 'string',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'name', email: 'email', status: 'status', service: 'service'},
    prepare: ({title, email, status, service}) => ({
      title: title || email || 'Enquiry',
      subtitle: [status ? String(status).toUpperCase() : null, service, email]
        .filter(Boolean)
        .join(' · '),
    }),
  },
})
