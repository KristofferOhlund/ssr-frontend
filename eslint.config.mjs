import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import globals from "globals";

export default defineConfig([

  // -------- JavaScript --------
  // Recommended rules for JS
  eslint.configs.recommended,

  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Add extra rules, or do overrides here;
      indent: ["error", 2],
    },
  },

  // -------- TypeScript --------
  // Recommended config: https://typescript-eslint.io/rules/?=recommended
  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Extra rules:
    },
  },

  // -------- Vue --------
  // Recommended settings for vue: https://eslint.vuejs.org/rules/#priority-a-essential-error-prevention
  ...pluginVue.configs['flat/recommended'],

  {
    files: ["**/*.vue"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // We can add some extra rules here.
    },
  },
]);
