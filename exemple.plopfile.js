module.exports = (plop) => {
    plop.setHelper('eq', (a, b, opts) => {
        if (a === b) {
            return opts.fn(this)
        }
        return opts.inverse(this)
    })

    plop.setHelper('append', (from, text) => {
        return from + text
    })

    plop.setGenerator('module', {
        description: 'Create a new module',

        prompts: [
            {
                type: 'list',
                name: 'type',
                message: 'What is your module type?',
                choices: ['component', 'block', 'page'],
            },
            {
                type: 'input',
                name: 'name',
                message: 'What is your module name?',
            },
        ],

        actions: [
            {
                type: 'add',
                path: 'frontend/app/{{type}}s/{{kebabCase name}}.tsx',
                templateFile: 'packages/config/plop-templates/{{type}}.tsx.hbs',
                skip: (data) => {
                    if (data.type !== 'page') return 'Skip (not a page)'
                },
            },
            {
                type: 'add',
                path: 'frontend/app/{{type}}s/{{camelCase name}}/{{pascalCase name}}.tsx',
                templateFile: 'packages/config/plop-templates/{{type}}.tsx.hbs',
                skip: (data) => {
                    if (data.type === 'page') return 'Skip page'
                },
            },
            // {
            // 	type: 'add',
            // 	path: 'packages/ui/{{type}}s/{{camelCase name}}/{{pascalCase name}}.stories.tsx',
            // 	templateFile: 'packages/config/plop-templates/stories.tsx.hbs',
            // 	skip: (data) => {
            // 		if (data.type === 'page') return 'Skip stories addition'
            // 	},
            // },
            // {
            // 	type: 'append',
            // 	path: 'packages/ui/blocks/index.ts',
            // 	template: 'export * from \'./{{camelCase name}}/{{pascalCase name}}\'',
            // 	skip: (data) => {
            // 		if (data.type !== 'block') return 'Skip registration'
            // 	},
            // },
            {
                type: 'modify',
                path: 'packages/ui/blocks/blocks/Blocks.tsx',
                pattern: /(import {Fragment} from \'react\')/gi,
                template:
                    "$1\r\nimport { {{pascalCase name}} } from '../{{camelCase name}}/{{pascalCase name}}'",
                skip: (data) => {
                    if (data.type !== 'block') return 'Skip registration'
                },
            },
            {
                type: 'modify',
                path: 'packages/ui/blocks/blocks/Blocks.tsx',
                pattern: /(const components = {)/gi,
                template: '$1\r\n\t{{camelCase name}}: {{pascalCase name}},',
                // template: '$1\r\n\t{{camelCase name}}: dynamic(() => import(\'../{{camelCase name}}/{{pascalCase name}}\').then((mod) => mod.{{pascalCase name}})),',
                skip: (data) => {
                    if (data.type !== 'block') return 'Skip registration'
                },
            },
            {
                type: 'append',
                path: 'packages/ui/components/index.ts',
                template:
                    "export * from './{{camelCase name}}/{{pascalCase name}}'",
                skip: (data) => {
                    if (data.type !== 'component') return 'Skip registration'
                },
            },
        ],
    })
}
