import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["components/admin/AdminWorkspaceClient.tsx"],
    rules: {
      // The admin workspace intentionally restores persisted UI state after mount.
      // This is browser-only state and cannot be read during server rendering.
      "react-hooks/set-state-in-effect": "off",
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
  {
    files: ["components/admin/RecruiterSchedulingClient.tsx"],
    rules: {
      // Interview defaults and upcoming filters intentionally depend on the browser's
      // current date, time, and timezone during rendering.
      "react-hooks/purity": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
