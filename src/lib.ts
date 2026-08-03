import type { Project, ProjectCategory } from './data.js';

export function filterProjects(items: readonly Project[], category: ProjectCategory | 'all'): Project[] {
  return category === 'all' ? [...items] : items.filter(item => item.category === category);
}

export interface QuoteData {
  buildingType: string;
  roofType: string;
  area: number;
  problem: string;
  district: string;
  timeframe: string;
  name: string;
  phone: string;
  email: string;
}

export function validateQuote(data: Partial<QuoteData>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.buildingType) errors.buildingType = 'Vyberte typ objektu.';
  if (!data.roofType) errors.roofType = 'Vyberte typ střechy.';
  if (!Number.isFinite(data.area) || Number(data.area) <= 0) errors.area = 'Uveďte orientační plochu.';
  if (!data.problem || data.problem.trim().length < 10) errors.problem = 'Popište stav nebo požadavek podrobněji.';
  if (!data.name) errors.name = 'Uveďte jméno.';
  if (!data.phone || data.phone.replace(/\D/g, '').length < 9) errors.phone = 'Uveďte platný telefon.';
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) errors.email = 'Uveďte platný e-mail.';
  return errors;
}
