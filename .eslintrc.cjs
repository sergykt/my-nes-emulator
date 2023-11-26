module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    "standard-with-typescript",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: [".eslintrc.cjs", "vite.config.ts"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json"
  },
  plugins: [
    "react-refresh",
    "react",
    "react-hooks",
    "functional",
    "jsx-a11y"
  ],
  rules: {
    "react/display-name": "off",
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true },
    ],
    "@typescript-eslint/member-delimiter-style": ["error", {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
    }],
    "@typescript-eslint/triple-slash-reference": "off",
    "semi": "off",
    "@typescript-eslint/semi": "off",
    "react/react-in-jsx-scope": "off",
    "functional/no-conditional-statements": "off",
    "functional/no-expression-statements": "off",
    "functional/immutable-data": "off",
    "functional/functional-parameters": "off",
    "functional/no-try-statements": "off",
    "functional/no-throw-statements": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/function-component-definition": [2, { "namedComponents": "arrow-function" }]
  },
}
