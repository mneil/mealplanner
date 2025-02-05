import type { CollectionConfig } from 'payload'

export const Meals: CollectionConfig = {
  slug: 'meals',
  access: {
    read: () => true,
    create: () => true,
  },
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      unique: true,
      required: true,
      index: true,
      // validate: value => Boolean(value) || 'This field is required',
    },
    {
      name: 'ingredients',
      type: 'array',
      fields: [
        {
          name: 'ingredient',
          type: 'relationship',
          required: true,
          relationTo: 'ingredients',
        },
        {
          name: 'amount',
          type: 'number',
          required: true,
        },
      ]
    },
  ],
}
