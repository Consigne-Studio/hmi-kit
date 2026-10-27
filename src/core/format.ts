import { intlLocale } from './i18n.js';

/** Qualité d'une donnée temps réel. */
export type Quality = 'good' | 'uncertain' | 'bad' | 'stale';

const QUALITIES: readonly Quality[] = ['good', 'uncertain', 'bad', 'stale'];

export const QUALITY_LABELS: Record<Quality, string> = {
  good: 'Bonne',
  uncertain: 'Incertaine',
  bad: 'Mauvaise',
  stale: 'Figée',
};

/** Lit une qualité depuis un attribut. Toute valeur inconnue vaut « good ». */
export function parseQuality(raw: string | null | undefined): Quality {
  return QUALITIES.includes(raw as Quality) ? (raw as Quality) : 'good';
}

/** Lit un nombre depuis un attribut. Renvoie undefined si absent ou invalide. */
export function parseNumber(raw: string | null | undefined): number | undefined {
  if (raw === null || raw === undefined || raw.trim() === '') return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

/** Formate une valeur avec un nombre fixe de décimales. « --- » si absente. */
export function formatValue(value: number | undefined, decimals = 1, locale = intlLocale()): string {
  if (value === undefined || !Number.isFinite(value)) return '---';
  const d = Math.min(Math.max(Math.trunc(decimals), 0), 6);
  return new Intl.NumberFormat(locale, { minimumFractionDigits: d, maximumFractionDigits: d }).format(value);
}

/** Position d'une valeur dans [min, max], en pourcentage borné à [0, 100]. */
export function toPercent(value: number, min: number, max: number): number {
  if (!Number.isFinite(value) || !(max > min)) return 0;
  const p = ((value - min) / (max - min)) * 100;
  return Math.min(Math.max(p, 0), 100);
}

/** Échappe une chaîne avant insertion dans un gabarit HTML. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
