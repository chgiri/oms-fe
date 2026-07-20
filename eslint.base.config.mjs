import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: ['type:util'],
            },
            {
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: ['type:util'],
            },
            {
              sourceTag: 'scope:core',
              onlyDependOnLibsWithTags: ['scope:core'],
            },
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:core'],
            },
            {
              sourceTag: 'scope:auth',
              onlyDependOnLibsWithTags: [
                'scope:auth',
                'scope:core',
                'scope:shared',
              ],
            },
            {
              sourceTag: 'scope:customers',
              onlyDependOnLibsWithTags: [
                'scope:customers',
                'scope:core',
                'scope:shared',
              ],
            },
            {
              sourceTag: 'scope:products',
              onlyDependOnLibsWithTags: [
                'scope:products',
                'scope:core',
                'scope:shared',
              ],
            },
            {
              sourceTag: 'scope:inventory',
              onlyDependOnLibsWithTags: [
                'scope:inventory',
                'scope:core',
                'scope:shared',
              ],
            },
            {
              sourceTag: 'scope:orders',
              onlyDependOnLibsWithTags: [
                'scope:orders',
                'scope:core',
                'scope:shared',
              ],
            },
            {
              sourceTag: 'scope:payments',
              onlyDependOnLibsWithTags: [
                'scope:payments',
                'scope:core',
                'scope:shared',
              ],
            },
            {
              sourceTag: 'scope:shipments',
              onlyDependOnLibsWithTags: [
                'scope:shipments',
                'scope:core',
                'scope:shared',
              ],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
