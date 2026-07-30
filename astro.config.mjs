// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// Solo la copia de preview en GitHub Pages se sirve desde un subdirectorio.
const base = process.env.PUBLIC_BASE || "/";

// https://astro.build/config
export default defineConfig({
  site: "https://waseidev.net",
  base,

  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      // Ambos idiomas llevan prefijo (/en/, /es/), como hasta ahora.
      prefixDefaultLocale: true,
    },
  },

  // Las rutas en español tenían el slug traducido. Al unificarlos para poder
  // escribir cada página una sola vez, estas redirecciones evitan que los
  // enlaces antiguos den 404.
  redirects: {
    "/es/acerca": "/es/about",
    "/es/curriculum": "/es/cv",
    "/es/proyectos": "/es/projects",
  },

  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-US", es: "es-ES" },
      },
    }),
    icon(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  // Raleway venía por @import desde fonts.googleapis.com, que bloquea el
  // renderizado y expone la IP del visitante a Google. El proveedor de Astro
  // la descarga en build y la sirve desde el propio dominio.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Raleway",
      cssVariable: "--font-raleway",
      weights: [400, 600, 800],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
    },
  ],
});
