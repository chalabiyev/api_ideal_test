/**
 *  @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  plugins: ['perfectionist', 'unused-imports', '@typescript-eslint', 'prettier'],
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  /**
   * 0 ~ 'off'
   * 1 ~ 'warn'
   * 2 ~ 'error'
   */
  rules: {
    // General rules
    'no-alert': 0,
    camelcase: 0,
    'no-console': 0,
    'no-unused-vars': 0,
    'no-nested-ternary': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-restricted-exports': 0,
    'no-promise-executor-return': 0,
    'import/prefer-default-export': 0,
    'func-names': 0,
    'no-empty-function': 0,
    'no-empty': 0,
    'media-has-caption': 0,
    'prefer-destructuring': [1, { object: true, array: false }],
    'prefer-const': 0,
    'object-shorthand': 0, // Devre dışı bırakıldı
    eqeqeq: 0, // === yerine == kullanımına izin verildi
    'default-case': 0, // switch-case'de default olmaması uyarısı devre dışı
    'prefer-arrow-callback': 0, // Arrow callback zorunlu değil
    radix: 0, // `parseInt` fonksiyonunda radix zorunluluğu kaldırıldı
    'arrow-body-style': 0, // Tek satırlık arrow fonksiyonlar {} ile kullanılabilir
    // Import rules
    'import/order': 0, // Import sırası zorunluluğu devre dışı bırakıldı
    // React rules
    'react/no-children-prop': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-array-index-key': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': 0,
    'react/jsx-no-duplicate-props': [0, { ignoreCase: false }],
    'react/jsx-no-useless-fragment': [0, { allowExpressions: false }],
    'react/no-unstable-nested-components': [0, { allowAsProps: true }],
    'react/destructuring-assignment': 0,
    'react/self-closing-comp': 0, // Self-closing tags zorunlu değil
    'react/jsx-boolean-value': 0, // Boolean değerlerde explicit kullanım gerekmez
    'react/button-has-type': 0, // Button type zorunluluğu kaldırıldı
    // Accessibility (jsx-a11y)
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/label-has-associated-control': 0, // Label'de associated kontrol gereksinimi kaldırıldı
    // React hooks
    'react-hooks/exhaustive-deps': 0, // useEffect bağımlılıkları uyarısı devre dışı
    // TypeScript rules
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/consistent-type-exports': 0,
    '@typescript-eslint/consistent-type-imports': 0,
    '@typescript-eslint/no-unused-vars': [0, { args: 'none' }],
    '@typescript-eslint/no-shadow': 0, // Shadowing için uyarı kaldırıldı
    // Unused imports
    'unused-imports/no-unused-imports': 0,
    'unused-imports/no-unused-vars': [
      0,
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    // Perfectionist
    'perfectionist/sort-exports': [0, { order: 'asc', type: 'line-length' }],
    'perfectionist/sort-named-imports': [0, { order: 'asc', type: 'line-length' }],
    'perfectionist/sort-named-exports': [0, { order: 'asc', type: 'line-length' }],
    'perfectionist/sort-imports': [
      0,
      {
        order: 'asc',
        type: 'line-length',
        'newlines-between': 'always',
        groups: [
          'style',
          'type',
          ['builtin', 'external'],
          'custom-mui',
          'custom-routes',
          'custom-hooks',
          'custom-utils',
          'internal',
          'custom-components',
          'custom-sections',
          'custom-auth',
          'custom-types',
          ['parent', 'sibling', 'index'],
          ['parent-type', 'sibling-type', 'index-type'],
          'object',
          'unknown',
        ],
        'custom-groups': {
          value: {
            ['custom-mui']: '@mui/**',
            ['custom-auth']: 'src/auth/**',
            ['custom-hooks']: 'src/hooks/**',
            ['custom-utils']: 'src/utils/**',
            ['custom-types']: 'src/types/**',
            ['custom-routes']: 'src/routes/**',
            ['custom-sections']: 'src/sections/**',
            ['custom-components']: 'src/components/**',
          },
        },
        'internal-pattern': ['src/**'],
      },
    ],
  },
};
