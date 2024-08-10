export const languages = {
  es: "Español",
  en: "English",
};

export const defaultLang = "en";
export const showDefaultLang = true;

export const ui = {
  es: {
    "nav.home": "Inicio",
    "nav.about": "Acerca",
    "nav.blog": "Notas",
    "nav.cv": "Curriculum",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.blog": "Blog",
    "nav.cv": "Resume",
  },
} as const;

export const routes = {
  es: {
    "/": "/",
    blog: "notas",
    about: "acerca",
    cv: "curriculum",
  },
};
