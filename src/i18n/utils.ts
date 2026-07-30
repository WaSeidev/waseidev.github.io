import { getRelativeLocaleUrl } from "astro:i18n";
import en from "./en.json";
import esJson from "./es.json";

export const defaultLang = "en" as const;

export const languages = {
  en: "English",
  es: "Español",
} as const;

export type Lang = keyof typeof languages;
export type UIKey = keyof typeof en;

// Tipar es.json contra en.json hace que una clave faltante sea un error de
// compilación, que es lo que `astro check` detecta en CI.
const es: Record<UIKey, string> = esJson;

const ui: Record<Lang, Record<UIKey, string>> = { en, es };

function isLang(value: string | undefined): value is Lang {
  return value !== undefined && value in languages;
}

/** Ruta sin el prefijo `base`, que en la copia de GitHub Pages no es "/". */
function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return base && pathname.startsWith(base)
    ? pathname.slice(base.length)
    : pathname;
}

export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = stripBase(url.pathname).split("/");
  return isLang(maybeLang) ? maybeLang : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Ruta lógica sin `base` ni prefijo de idioma, p. ej. "blog/mi-post". */
export function getPathWithoutLocale(url: URL): string {
  const segments = stripBase(url.pathname).split("/").filter(Boolean);
  if (isLang(segments[0])) segments.shift();
  return segments.join("/");
}

/** La misma página en el otro idioma, conservando la ruta actual. */
export function getLocalizedUrl(url: URL, lang: Lang): string {
  return getRelativeLocaleUrl(lang, getPathWithoutLocale(url));
}

/**
 * Rutas que genera cada página bajo `src/pages/[lang]/`. Con
 * `prefixDefaultLocale: true` los dos idiomas llevan prefijo, así que un solo
 * archivo produce `/en/about` y `/es/about`.
 */
export function getLocalePaths() {
  return (Object.keys(languages) as Lang[]).map((lang) => ({
    params: { lang },
    props: { lang },
  }));
}
