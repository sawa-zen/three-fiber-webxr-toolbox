module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@react-three/recommended',
    '@topotal/eslint-config-typescript',
    '@topotal/eslint-config-react',
    'prettier',
  ],
  plugins: [
    "simple-import-sort",
    "import",
    "unused-imports",
    "react-refresh",
    '@react-three'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "comma-dangle": ["error", "always-multiline"],
    "require-atomic-updates": "off",
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    "semi": ["error", "never"],
    "eol-last": ["error", "always"],
    "quotes": ["error", "single"],
    "no-trailing-spaces": "error",
    "quote-props": ["error", "as-needed"],
    "simple-import-sort/imports": ["error", {
      "groups": [
        [
          // Packages. `react` related packages come first.
          "^react",
          "^@?\\w",
          // Internal packages.
          "^~(/.*|$)",
          // Side effect imports.
          "^\\u0000",
          // Parent imports. Put `..` last.
          "^\\.\\.(?!/?$)", "^\\.\\./?$",
          // Other relative imports. Put same-folder imports and `.` last.
          "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"
        ]
      ]
    }],
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/no-default-export": "error",
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "key-spacing": ["error", {
      "beforeColon": false,
      "afterColon": true
    }],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "object-shorthand": ["error", "always"],
    "no-throw-literal": "error",
    "react/no-unknown-property": 0,
  },
}
