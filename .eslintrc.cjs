module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "src/components/Game.jsx",
    "src/components/background/**",
    "src/components/canvas/Ball.jsx",
    "src/components/canvas/Computers.jsx",
    "src/components/canvas/Cube.jsx",
    "src/components/canvas/Earth.jsx",
    "src/components/canvas/Loader.jsx",
    "src/components/canvas/Stars.jsx",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.3" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ["tailwind.config.js", "postcss.config.js", "vite.config.js"],
      env: { node: true },
    },
    {
      files: ["src/components/canvas/**/*.{js,jsx}"],
      rules: {
        "react/no-unknown-property": "off",
        "react/prop-types": "off",
      },
    },
  ],
};
