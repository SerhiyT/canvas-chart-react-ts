module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': 0,
    'arrow-parens': ['error', 'as-needed'],
    'react/forbid-prop-types': 'off',
    'no-unused-expressions': [
      'error',
      {
        allowTernary: true,
      },
    ],
    'jsx-a11y/control-has-associated-label': 'off',
    'import/no-unresolved': 'off',
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-fragments': 'off',
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'react/state-in-constructor': ['error', 'never'],
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'jsx-a11y/label-has-associated-control': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    'import/extensions': 'off',
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'react/button-has-type': 'off',
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'no-restricted-syntax': 0,
    'no-param-reassign': ['error', { props: false }],
    'prefer-destructuring': ['error', { object: true, array: false }],
  },
};
