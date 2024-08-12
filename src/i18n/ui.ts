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
    "content.about": "Acerca",
    "content.projects": "Proyectos",
    "content.blog": "Notas",
    "cv.about": "Acerca",
    "cv.summary": "Resumen",
    "cv.experience": "Experiencia",
    "cv.education": "Educación",
    "cv.volunteers": "Voluntariado",
    "cv.references": "Referencias",
    "cv.interests": "Intereses",
    "cv.languages": "Idiomas",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.blog": "Blog",
    "nav.cv": "Resume",
    "content.about": "About Me",
    "content.projects": "Projects",
    "content.blog": "Blog",
    "cv.about": "About Me",
    "cv.summary": "Resume",
    "cv.experience": "Experience",
    "cv.education": "Education",
    "cv.volunteers": "Volunteerships",
    "cv.references": "References",
    "cv.interests": "Interests",
    "cv.languages": "Languages",
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
