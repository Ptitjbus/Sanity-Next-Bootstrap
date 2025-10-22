import { defineArrayMember } from 'sanity'
import { hero } from './hero'
import { callToAction } from './callToAction'
import { infoSection } from './infoSection'

export const pageBuilderBlocks = [
    defineArrayMember({ type: hero.name }),
    defineArrayMember({ type: callToAction.name }),
    defineArrayMember({ type: infoSection.name }),
]

