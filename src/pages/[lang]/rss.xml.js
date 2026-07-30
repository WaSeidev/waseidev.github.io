import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getRelativeLocaleUrl } from "astro:i18n";
import { getLocalePaths } from "@/i18n/utils";
import { cvByLang } from "@/data/cv";

export const getStaticPaths = getLocalePaths;

export async function GET(context) {
  const { lang } = context.props;

  const posts = (
    await getCollection(
      "blog",
      (post) => post.data.lang === lang && !post.data.draft,
    )
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: `${cvByLang[lang].basics.name} | Blog`,
    description: cvByLang[lang].basics.label,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: getRelativeLocaleUrl(lang, `blog/${post.id}`),
    })),
    customData: `<language>${lang === "es" ? "es-ES" : "en-US"}</language>`,
  });
}
