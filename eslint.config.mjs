import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // React and Next.js specific rules
      "react/no-unescaped-entities": "error",
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/jsx-uses-vars": "error",
      "react/no-deprecated": "error",
      "react/no-direct-mutation-state": "error",
      "react/no-find-dom-node": "error",
      "react/no-is-mounted": "error",
      "react/no-render-return-value": "error",
      "react/require-render-return": "error",
      "react/self-closing-comp": "error",

      // Next.js specific rules
      "@next/next/no-img-element": "error",
      "@next/next/no-page-custom-font": "error",
      "@next/next/no-unwanted-polyfillio": "error",

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-const": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": ["error", {
        "prefer": "type-imports",
        "disallowTypeAnnotations": false
      }],

      // General code quality rules
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",

      // Import/export rules
      "import/order": ["error", {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }],

      // Accessibility rules
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Additional TypeScript-only rules
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-inferrable-types": "error",
    },
  },
  {
    files: ["app/**/*.{ts,tsx}"],
    rules: {
      // App router specific rules
      "import/no-default-export": "off", // Allow default exports in app router
    },
  },
  {
    files: ["components/**/*.{ts,tsx}"],
    rules: {
      // Component specific rules
      "react/display-name": "error",
      "react/prop-types": "off", // Using TypeScript for prop validation
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "next-env.d.ts",
      "*.config.{js,ts,mjs}",
      "tailwind.config.*",
      "postcss.config.*",
      ".eslintrc.*",
      "yarn.lock",
      "package-lock.json",
      "pnpm-lock.yaml",
    ],
  },
];

export default eslintConfig;
