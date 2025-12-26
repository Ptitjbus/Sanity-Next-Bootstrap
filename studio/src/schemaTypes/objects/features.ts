import { defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'

export const features = defineType({
    name: 'features',
    title: 'Features',
    type: 'object',
    icon: BlockElementIcon,
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'subheading',
            title: 'Subheading',
            type: 'string',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'blockContent',
        }),
    ],
    preview: {
        select: {
            title: 'heading',
            subtitle: 'subheading',
        },
        prepare({ title }) {
            return {
                title: title || 'Untitled Features',
                subtitle: 'Features',
            }
        },
    },
})

