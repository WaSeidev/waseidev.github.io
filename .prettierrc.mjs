// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  // prettier-plugin-tailwindcss debe ir al final: reordena clases y necesita
  // correr después de que los demás plugins hayan formateado el marcado.
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  // En Tailwind 4 la configuración vive en el CSS, no en tailwind.config.
  tailwindStylesheet: "./src/styles/global.css",
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
