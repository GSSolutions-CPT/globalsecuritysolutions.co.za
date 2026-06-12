import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/no-unescaped-entities": "off",
      "react-hooks/purity": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "prefer-const": "off",
      "react-refresh/only-export-components": "off",
      "@next/next/no-img-element": "warn",
    }
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    "node_modules/**",
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "dump-html.js",
    "lazy_load.js",
    "sanitize_colors.js",
    "tmp_generate_seo.js",
    "vertical_spacing.js",
  ]),
]);

export default eslintConfig;

