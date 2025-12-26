import { defineArrayMember } from 'sanity'
import { hero } from './hero'
import { callToAction } from './callToAction'
import { infoSection } from './infoSection'
import { features } from './features'

export const pageBuilderBlocks = [
    defineArrayMember({ type: hero.name }),
    defineArrayMember({ type: callToAction.name }),
    defineArrayMember({ type: infoSection.name }),
    defineArrayMember({ type: features.name }),
]

