import type { APIRoute } from "astro";

// La copia de preview en GitHub Pages se publica con PUBLIC_NOINDEX=true para
// que no compita en buscadores con waseidev.net, que es producción.
const noindex = import.meta.env.PUBLIC_NOINDEX === "true";

export const GET: APIRoute = ({ site }) => {
  const body = noindex
    ? "User-agent: *\nDisallow: /"
    : [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${new URL("sitemap-index.xml", site).href}`,
      ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
