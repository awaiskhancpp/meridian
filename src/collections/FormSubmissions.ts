import type { CollectionConfig } from 'payload'

/**
 * FormSubmissions
 *
 * Stores every contact form submission from the frontend.
 * Fields mirror the Contact section form exactly:
 * name, phone, email, service, message + metadata (submittedAt, status).
 *
 * Access:
 * - Create: public (no auth) — the API route uses the local Payload API
 *   with { overrideAccess: true } so no user session is needed.
 * - Read/Update/Delete: admin only.
 */
export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Form Submission',
    plural: 'Form Submissions',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'service', 'status', 'submittedAt'],
    description: 'Contact form submissions from the website.',
  },
  access: {
    create: () => true,   // public — submissions come from the site
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'service',
      type: 'select',
      label: 'Service of Interest',
      options: [
        { label: 'Kitchen Remodeling',    value: 'kitchen-remodeling' },
        { label: 'Bathroom Remodeling',   value: 'bathroom-remodeling' },
        { label: 'Whole-Home Remodeling', value: 'whole-home-remodeling' },
        { label: 'Home Additions',        value: 'home-additions' },
        { label: 'Custom Cabinetry',      value: 'custom-cabinetry' },
        { label: 'Flooring',              value: 'flooring' },
        { label: 'Design Consultation',   value: 'design-consultation' },
        { label: 'Project Planning',      value: 'project-planning' },
        { label: 'Other',                 value: 'other' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'new',
      options: [
        { label: 'New',         value: 'new' },
        { label: 'In Review',   value: 'in-review' },
        { label: 'Contacted',   value: 'contacted' },
        { label: 'Closed',      value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      label: 'Submitted At',
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      label: 'IP Address',
      admin: {
        position: 'sidebar',
        description: 'Captured server-side for spam tracking.',
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}
