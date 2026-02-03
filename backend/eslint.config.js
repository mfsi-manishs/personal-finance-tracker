import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.ts"],
    ignores: ["node_modules", "dist"], // replaces .eslintignore
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
