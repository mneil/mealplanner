import type { CollectionConfig } from 'payload'

export const Ingredients: CollectionConfig = {
  slug: 'ingredients',
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
      required: true,
      validate: (value: any) => {
        const titlecase = value.toLowerCase().replace(/(?:^|\s)[(]?\w/g, (char: string) => char.toUpperCase());
        return titlecase === value || 'Name Must Be Titlecase';
      }
    },
    {
      name: 'staple',
      type: 'checkbox',
      defaultValue: false,
    }
  ],
}
