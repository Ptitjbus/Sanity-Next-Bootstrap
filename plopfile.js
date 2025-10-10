module.exports = (plop) => {
    // Helper pour vérifier l'égalité
    plop.setHelper('eq', (a, b, opts) => {
        if (a === b) {
            return opts.fn(this)
        }
        return opts.inverse(this)
    })

    plop.setGenerator('component', {
        description: 'Créer un nouveau composant React pour le page builder',

        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Nom du composant (ex: InfoSection, Hero, Features):',
                validate: (value) => {
                    if (!value) return 'Le nom du composant est requis'
                    if (!/^[A-Z]/.test(value))
                        return 'Le nom doit commencer par une majuscule'
                    return true
                },
            },
            {
                type: 'input',
                name: 'schemaType',
                message:
                    'Nom du type Sanity (ex: infoSection, hero, features):',
                default: (answers) => {
                    // Convertit PascalCase en camelCase
                    return (
                        answers.name.charAt(0).toLowerCase() +
                        answers.name.slice(1)
                    )
                },
            },
            {
                type: 'confirm',
                name: 'registerInBlockRenderer',
                message: 'Enregistrer automatiquement dans BlockRenderer?',
                default: true,
            },
            {
                type: 'confirm',
                name: 'createSanitySchema',
                message: 'Créer le schéma Sanity correspondant?',
                default: true,
            },
        ],

        actions: (data) => {
            const actions = []

            // 1. Créer le composant React
            actions.push({
                type: 'add',
                path: 'frontend/app/components/{{pascalCase name}}.tsx',
                templateFile:
                    'packages/config/plop-templates/block-component.tsx.hbs',
            })

            // 2. Créer le schéma Sanity si demandé
            if (data.createSanitySchema) {
                // 2a. Créer le fichier de schéma
                actions.push({
                    type: 'add',
                    path: 'studio/src/schemaTypes/objects/{{camelCase name}}.ts',
                    templateFile:
                        'packages/config/plop-templates/sanity-schema.ts.hbs',
                })

                // 2b. Ajouter l'import dans index.ts
                actions.push({
                    type: 'modify',
                    path: 'studio/src/schemaTypes/index.ts',
                    pattern:
                        /(import { infoSection } from '\.\/objects\/infoSection')/gi,
                    template:
                        "$1\nimport { {{camelCase name}} } from './objects/{{camelCase name}}'",
                })

                // 2c. Ajouter le schéma dans l'export schemaTypes
                actions.push({
                    type: 'modify',
                    path: 'studio/src/schemaTypes/index.ts',
                    pattern: /(infoSection,)/gi,
                    template: '$1\n    {{camelCase name}},',
                })
            }

            // 3. Ajouter l'import dans BlockRenderer si demandé
            if (data.registerInBlockRenderer) {
                actions.push({
                    type: 'modify',
                    path: 'frontend/app/components/BlockRenderer.tsx',
                    pattern:
                        /(import Info from '@\/app\/components\/InfoSection')/gi,
                    template:
                        "$1\nimport {{pascalCase name}} from '@/app/components/{{pascalCase name}}'",
                })

                // 4. Ajouter le composant à l'objet Blocks
                actions.push({
                    type: 'modify',
                    path: 'frontend/app/components/BlockRenderer.tsx',
                    pattern: /(const Blocks: BlocksType = {)/gi,
                    template:
                        '$1\n    {{camelCase schemaType}}: {{pascalCase name}},',
                })
            }

            return actions
        },
    })
}
