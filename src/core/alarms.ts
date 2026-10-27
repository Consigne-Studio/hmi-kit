import { intlLocale } from './i18n.js';

/** Priorité d'alarme : 1 = la plus urgente, 4 = la moins urgente. */
export type AlarmPriority = 1 | 2 | 3 | 4;

export interface Alarm {
  id: string;
  priority: AlarmPriority;
  message: string;
  /** Date d'apparition : Date, timestamp en ms ou chaîne ISO. */
  timestamp: Date | number | string;
  acknowledged?: boolean;
  /** false = l'alarme est revenue à la normale mais n'a pas encore disparu de la liste. */
  active?: boolean;
  /** Repère de l'équipement (ex. « P-101 »). */
  tag?: string;
}

export function toTime(t: Alarm['timestamp']): number {
  const ms = t instanceof Date ? t.getTime() : typeof t === 'number' ? t : Date.parse(t);
  return Number.isFinite(ms) ? ms : 0;
}

/**
 * Tri d'affichage : non acquittées d'abord, puis par priorité,
 * puis de la plus récente à la plus ancienne. Ne modifie pas le tableau reçu.
 */
export function sortAlarms(alarms: readonly Alarm[]): Alarm[] {
  return [...alarms].sort((a, b) => {
    const ack = Number(!!a.acknowledged) - Number(!!b.acknowledged);
    if (ack !== 0) return ack;
    if (a.priority !== b.priority) return a.priority - b.priority;
    return toTime(b.timestamp) - toTime(a.timestamp);
  });
}

export function formatAlarmTime(t: Alarm['timestamp'], locale = intlLocale()): string {
  const ms = toTime(t);
  if (ms === 0) return '--:--:--';
  return new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(ms);
}
