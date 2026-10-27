/** Langues fournies. Le français est la langue par défaut. */
export type Locale = 'fr' | 'en';

const fr = {
  'quality.good': 'Bonne',
  'quality.uncertain': 'Incertaine',
  'quality.bad': 'Mauvaise',
  'quality.stale': 'Figée',
  'quality.mark.uncertain': 'incert.',
  'quality.mark.bad': 'mauv.',
  'quality.mark.stale': 'figée',
  'quality.title': 'Qualité : {q}',
  'quality.aria': 'qualité {q}',
  'limit.normal': 'Normal',
  'limit.low': 'Bas',
  'limit.high': 'Haut',
  'limit.lowlow': 'Très bas',
  'limit.highhigh': 'Très haut',
  'trend.aria': 'Tendance {l}, {n} points',
  'alarm.empty': 'Aucune alarme',
  'alarm.table': 'Alarmes',
  'alarm.ack': 'Acquitter',
  'alarm.ackAria': 'Acquitter {m}',
  'alarm.acked': 'Acquittée',
  'banner.empty': 'Aucune alarme non acquittée',
  'banner.aria': 'Alarme priorité {p} : {m}',
  'banner.open': 'Ouvrir la liste des alarmes',
  'banner.priority': 'Priorité {p}',
  'command.group': 'Commande {l}',
  'command.start': 'Démarrer',
  'command.stop': 'Arrêter',
  'command.confirm': 'Confirmer',
  'command.cancel': 'Annuler',
  'command.askStart': 'Confirmer le démarrage ?',
  'command.askStop': "Confirmer l'arrêt ?",
  'setpoint.apply': 'Appliquer',
  'setpoint.range': 'Plage {a} à {b}',
  'setpoint.nan': 'Valeur numérique attendue',
  'setpoint.min': 'Minimum {v}',
  'setpoint.max': 'Maximum {v}',
  'equipment.running': 'Marche',
  'equipment.stopped': 'Arrêt',
  'equipment.open': 'Ouverte',
  'equipment.closed': 'Fermée',
  'equipment.fault': 'Défaut',
  'equipment.maintenance': 'Maintenance',
  'equipment.unknown': 'Inconnu',
  'comm.online': 'En ligne',
  'comm.degraded': 'Dégradée',
  'comm.offline': 'Hors ligne',
  'age.now': "à l'instant",
  'age.s': 'il y a {n} s',
  'age.min': 'il y a {n} min',
  'age.h': 'il y a {n} h',
  'log.empty': 'Aucun événement',
  'log.table': "Journal d'événements",
  'log.time': 'Heure',
  'log.type': 'Type',
  'log.tag': 'Repère',
  'log.message': 'Message',
  'log.user': 'Opérateur',
  'log.all': 'Tous',
  'log.type.alarm': 'Alarme',
  'log.type.rtn': 'Retour normal',
  'log.type.ack': 'Acquittement',
  'log.type.command': 'Commande',
  'log.type.setpoint': 'Consigne',
  'log.type.system': 'Système',
  'interlock.ok': 'Démarrage autorisé',
  'interlock.blocked': 'Démarrage bloqué',
  'interlock.count': '{n} condition(s) non remplie(s)',
  'interlock.bypassed': 'shunté',
  'interlock.firstOut': '1er défaut',
  'interlock.met': 'remplie',
  'interlock.notMet': 'non remplie',
  'sequence.pending': 'À venir',
  'sequence.active': 'En cours',
  'sequence.done': 'Terminée',
  'sequence.fault': 'Défaut',
  'sequence.skipped': 'Sautée',
  'sequence.held': 'En attente',
  'sequence.progress': 'Étape {i} sur {n}',
  'chart.aria': 'Tendance {l}, {n} courbes',
  'chart.now': 'maintenant',
};

export type MessageKey = keyof typeof fr;

const en: Record<MessageKey, string> = {
  'quality.good': 'Good',
  'quality.uncertain': 'Uncertain',
  'quality.bad': 'Bad',
  'quality.stale': 'Stale',
  'quality.mark.uncertain': 'uncert.',
  'quality.mark.bad': 'bad',
  'quality.mark.stale': 'stale',
  'quality.title': 'Quality: {q}',
  'quality.aria': 'quality {q}',
  'limit.normal': 'Normal',
  'limit.low': 'Low',
  'limit.high': 'High',
  'limit.lowlow': 'Low low',
  'limit.highhigh': 'High high',
  'trend.aria': 'Trend {l}, {n} points',
  'alarm.empty': 'No alarms',
  'alarm.table': 'Alarms',
  'alarm.ack': 'Acknowledge',
  'alarm.ackAria': 'Acknowledge {m}',
  'alarm.acked': 'Acknowledged',
  'banner.empty': 'No unacknowledged alarms',
  'banner.aria': 'Priority {p} alarm: {m}',
  'banner.open': 'Open the alarm list',
  'banner.priority': 'Priority {p}',
  'command.group': 'Command {l}',
  'command.start': 'Start',
  'command.stop': 'Stop',
  'command.confirm': 'Confirm',
  'command.cancel': 'Cancel',
  'command.askStart': 'Confirm start?',
  'command.askStop': 'Confirm stop?',
  'setpoint.apply': 'Apply',
  'setpoint.range': 'Range {a} to {b}',
  'setpoint.nan': 'Numeric value expected',
  'setpoint.min': 'Minimum {v}',
  'setpoint.max': 'Maximum {v}',
  'equipment.running': 'Running',
  'equipment.stopped': 'Stopped',
  'equipment.open': 'Open',
  'equipment.closed': 'Closed',
  'equipment.fault': 'Fault',
  'equipment.maintenance': 'Maintenance',
  'equipment.unknown': 'Unknown',
  'comm.online': 'Online',
  'comm.degraded': 'Degraded',
  'comm.offline': 'Offline',
  'age.now': 'just now',
  'age.s': '{n} s ago',
  'age.min': '{n} min ago',
  'age.h': '{n} h ago',
  'log.empty': 'No events',
  'log.table': 'Event log',
  'log.time': 'Time',
  'log.type': 'Type',
  'log.tag': 'Tag',
  'log.message': 'Message',
  'log.user': 'Operator',
  'log.all': 'All',
  'log.type.alarm': 'Alarm',
  'log.type.rtn': 'Return to normal',
  'log.type.ack': 'Acknowledgement',
  'log.type.command': 'Command',
  'log.type.setpoint': 'Setpoint',
  'log.type.system': 'System',
  'interlock.ok': 'Start permitted',
  'interlock.blocked': 'Start blocked',
  'interlock.count': '{n} condition(s) not met',
  'interlock.bypassed': 'bypassed',
  'interlock.firstOut': 'first out',
  'interlock.met': 'met',
  'interlock.notMet': 'not met',
  'sequence.pending': 'Pending',
  'sequence.active': 'Active',
  'sequence.done': 'Done',
  'sequence.fault': 'Fault',
  'sequence.skipped': 'Skipped',
  'sequence.held': 'Held',
  'sequence.progress': 'Step {i} of {n}',
  'chart.aria': 'Trend {l}, {n} series',
  'chart.now': 'now',
};

const DICTS: Record<Locale, Record<MessageKey, string>> = { fr, en };
const INTL: Record<Locale, string> = { fr: 'fr-FR', en: 'en-GB' };

let current: Locale = 'fr';
let overrides: Partial<Record<MessageKey, string>> = {};
const listeners = new Set<() => void>();

/** Langue courante. */
export function getLocale(): Locale {
  return current;
}

/** Locale Intl utilisée pour les nombres et les heures (fr-FR ou en-GB). */
export function intlLocale(): string {
  return INTL[current];
}

/**
 * Change la langue de tous les composants affichés, sans rechargement.
 * `messages` permet de remplacer certains textes (vocabulaire du site, autre langue partielle).
 */
export function setLocale(locale: Locale, messages: Partial<Record<MessageKey, string>> = {}): void {
  current = locale in DICTS ? locale : 'fr';
  overrides = messages;
  listeners.forEach((fn) => fn());
}

/** Texte traduit ; `{nom}` est remplacé par `vars.nom`. */
export function t(key: MessageKey, vars: Record<string, string | number> = {}): string {
  const raw = overrides[key] ?? DICTS[current][key];
  return raw.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''));
}

/** Abonnement interne des composants au changement de langue. */
export function onLocaleChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
