import type { Lang } from "@/i18n/utils";
import en from "./setup.en.json";
import es from "./setup.es.json";

export interface SetupItem {
  name: string;
  description: string;
}

export interface SetupSection {
  id: string;
  title: string;
  /** Párrafo introductorio; si está vacío no se pinta. */
  description: string;
  items: SetupItem[];
}

export interface Setup {
  sections: SetupSection[];
}

/**
 * Contenido de la página "Mi Setup", un JSON por idioma como el CV.
 *
 * Las secciones sin items no se renderizan, así que se puede dejar una a
 * medias en el JSON sin que aparezca vacía en la web. La sección
 * `workstation` está así a propósito: hay que rellenarla con datos reales.
 */
export const setupByLang: Record<Lang, Setup> = { en, es };
