export interface CV {
  basics: Basics;
  work?: Work[] | null;
  volunteer?: Volunteer[] | null;
  education?: Education[] | null;
  certificates?: Certificates[] | null;
  skills?: Skills[] | null;
  languages?: Languages[] | null;
  interests?: Interests[] | null;
  references?: References[] | null;
  projects?: Projects[] | null;
  softSkills?: string[] | null;
}
export interface Basics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: Location;
  profiles?: Profiles[] | null;
}
export interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}
export interface Profiles {
  network: string;
  username: string;
  url: string;
}
export interface Work {
  name: string;
  position: string;
  startDate: string;
  /** Ausente en el empleo actual; CardCV lo pinta entonces como "Presente". */
  endDate?: string | null;
  summary: string;
  highlights?: string[] | null;
  url?: string | null;
  /**
   * Marca el empleo para que salga en el CV impreso. Si ningún empleo la
   * lleva, se imprimen los más recientes según `printLimit`.
   */
  printable?: boolean;
}
export interface Volunteer {
  organization: string;
  position: string;
  startDate: string;
  summary: string;
  highlights?: string[] | null;
  endDate?: string | null;
}
export interface Education {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate?: string | null;
  endDate: string;
}
export interface Certificates {
  name: string;
  url: string;
  issuer: string;
  date: string;
}
export interface Skills {
  name: string;
  level: string;
  keywords?: string[] | null;
}
export interface Languages {
  language: string;
  fluency: string;
}
export interface Interests {
  name: string;
  keywords?: string[] | null;
}
export interface References {
  name: string;
  reference: string;
  company: string;
}
export interface Projects {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights?: string[] | null;
  url: string;
}
