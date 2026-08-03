export type ProjectCategory = 'heritage' | 'pitched' | 'flat' | 'terrace';

export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  scope: string;
  category: ProjectCategory;
  image: string;
  tone: string;
}

export const projects: readonly Project[] = [
  {
    id: 'old-town-hall',
    title: 'Staroměstská radnice',
    location: 'Praha 1',
    year: '2008',
    scope: 'Střešní krytiny',
    category: 'heritage',
    image: './assets/reference-old-town.svg',
    tone: 'Historická památka'
  },
  {
    id: 'klementinum',
    title: 'Národní knihovna Klementinum',
    location: 'Praha 1',
    year: '2007',
    scope: 'Krov a střešní krytiny',
    category: 'heritage',
    image: './assets/reference-klementinum.svg',
    tone: 'Historická střecha'
  },
  {
    id: 'imperial',
    title: 'Hotel Imperial',
    location: 'Praha 1',
    year: '2006',
    scope: 'Tesařské konstrukce a krytiny',
    category: 'pitched',
    image: './assets/reference-imperial.svg',
    tone: 'Městský objekt'
  },
  {
    id: 'prague-castle',
    title: 'Pražský hrad',
    location: 'Praha 1',
    year: '1998',
    scope: 'Oprava krovu a výměna krytiny',
    category: 'heritage',
    image: './assets/reference-castle.svg',
    tone: 'Památková obnova'
  },
  {
    id: 'panel-houses',
    title: 'Panelové domy',
    location: 'Praha 14',
    year: '1998',
    scope: 'Ploché střechy',
    category: 'flat',
    image: './assets/reference-flat.svg',
    tone: 'Bytový soubor'
  },
  {
    id: 'residential-terraces',
    title: 'Bytové domy',
    location: 'Praha 6',
    year: '1997',
    scope: 'Terasy a hydroizolační vrstvy',
    category: 'terrace',
    image: './assets/reference-terrace.svg',
    tone: 'Rezidenční objekt'
  }
] as const;

export const services = [
  {
    id: 'pitched',
    number: '01',
    title: 'Šikmé střechy',
    summary: 'Kompletní skladby, rekonstrukce krovů, klempířské prvky a krytiny pro historické i současné objekty.',
    detail: 'Od diagnostiky stávajícího krovu po přesné provedení detailů, odvětrání, oplechování a finální krytinu.'
  },
  {
    id: 'flat',
    number: '02',
    title: 'Ploché střechy',
    summary: 'Funkční hydroizolační systémy pro bytové, administrativní a technické budovy.',
    detail: 'Návrh skladby podle provozu budovy, odvodnění, prostupů, atik a dlouhodobé údržby.'
  },
  {
    id: 'terrace',
    number: '03',
    title: 'Terasy',
    summary: 'Citlivé řešení detailů, spádů, hydroizolace a nášlapných vrstev bez kompromisů.',
    detail: 'Kontrola návazností na fasádu a interiér, bezpečné odvodnění a servisovatelné řešení.'
  }
] as const;
