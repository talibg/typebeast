import { fileURLToPath } from 'url'
import path from 'path'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import nPlugin from 'eslint-plugin-n'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import sonarjs from 'eslint-plugin-sonarjs'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import importx from 'eslint-plugin-import-x'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default [
    {
        ignores: ['dist', 'node_modules', '**/*.json', 'docs', 'prisma', '.env', '.gitignore']
    },
    js.configs.recommended,
    sonarjs.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        settings: {
            'import-x/resolver-next': [
                createTypeScriptImportResolver({
                    typescript: {
                        alwaysTryTypes: true,
                        project: path.join(__dirname, 'tsconfig.json')
                    },
                    node: {
                        extensions: ['.js', '.jsx', '.ts', '.tsx']
                    }
                })
            ]
        }
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: 'module',
                project: path.join(__dirname, 'tsconfig.json'),
                tsconfigRootDir: __dirname
            }
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            importx: importx,
            n: nPlugin,
            prettier: prettierPlugin
        },
        rules: {
            ...tsPlugin.configs['recommended-type-checked'].rules,
            ...nPlugin.configs.recommended.rules,
            'prettier/prettier': 'warn',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true
                }
            ],
            'no-console': 'warn',
            'n/no-unsupported-features/node-builtins': 'off',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/return-await': 'error',
            'importx/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object', 'type'],
                    pathGroups: [
                        {
                            pattern: './**/**\\.css',
                            group: 'type',
                            position: 'after'
                        }
                    ],
                    pathGroupsExcludedImportTypes: ['builtin'],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true
                    },
                    'newlines-between': 'never',
                    warnOnUnassignedImports: true
                }
            ]
        }
    },
    {
        files: ['**/*.test.ts', '**/*.spec.ts'],
        rules: {
            'n/no-unpublished-import': 'off',
            'no-console': 'off',
            'no-undef': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/require-assertions': 'off',
            'sonarjs/assertions-in-tests': 'off'
        }
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.json'],
        plugins: {
            prettier: prettierPlugin
        },
        rules: {
            'prettier/prettier': 'warn'
        },
        ...prettierConfig
    }
]
