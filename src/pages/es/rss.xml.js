import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/consts";
import { useTranslatedPath } from "@/i18n/utils";
const lang = "es"; // <- El idioma está quemado, hay que encontrar una función ya que Astro.url no funciona aquí
const translatePath = useTranslatedPath(lang);

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts
      .filter((post) => post.data.lang === lang)
      .map((post) => ({
        ...post.data,
        link: `${translatePath("/blog")}/${post.slug}/`,
      })),
  });
}
