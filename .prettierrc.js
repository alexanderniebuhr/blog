/** @type {import("prettier").Config} */
export default {
  options: {
    editorconfig: true,
  },
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
