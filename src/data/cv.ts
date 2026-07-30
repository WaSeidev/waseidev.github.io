import type { CV } from "@/types/cv";
import type { Lang } from "@/i18n/utils";
import en from "./cv.en.json";
import es from "./cv.es.json";

/** El CV de cada idioma, para que las páginas elijan por `lang` sin duplicarse. */
export const cvByLang: Record<Lang, CV> = { en, es };
