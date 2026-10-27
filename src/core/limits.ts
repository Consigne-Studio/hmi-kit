/** État d'une mesure par rapport à ses seuils d'alarme. */
export type LimitState = 'normal' | 'low' | 'high' | 'lowlow' | 'highhigh';

/** Seuils d'alarme. Tous optionnels : un seuil absent n'est jamais franchi. */
export interface Limits {
  ll?: number;
  l?: number;
  h?: number;
  hh?: number;
}

/**
 * Évalue une valeur par rapport à ses seuils.
 * Les seuils « très haut » / « très bas » priment sur « haut » / « bas ».
 * Une valeur non finie (NaN, Infinity) est considérée comme normale :
 * c'est la qualité de la donnée qui signale le problème, pas l'alarme.
 */
export function evaluateLimits(value: number, limits: Limits): LimitState {
  if (!Number.isFinite(value)) return 'normal';
  if (limits.hh !== undefined && value >= limits.hh) return 'highhigh';
  if (limits.ll !== undefined && value <= limits.ll) return 'lowlow';
  if (limits.h !== undefined && value >= limits.h) return 'high';
  if (limits.l !== undefined && value <= limits.l) return 'low';
  return 'normal';
}

/** Gravité de l'état : 0 normal, 1 alerte, 2 alarme. */
export function severity(state: LimitState): 0 | 1 | 2 {
  if (state === 'highhigh' || state === 'lowlow') return 2;
  if (state === 'high' || state === 'low') return 1;
  return 0;
}
