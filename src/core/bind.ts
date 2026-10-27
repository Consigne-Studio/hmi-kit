import type { Quality } from './format.js';

/** Valeur d'une variable : nombre, texte, ou objet avec qualité (ex. lecture OPC UA). */
export type TagValue = number | string | boolean | { value: number | string | boolean; quality?: Quality };

export interface TagBinder {
  /** Applique un lot de valeurs { repère: valeur } aux éléments liés. Renvoie le nombre d'éléments mis à jour. */
  update(values: Record<string, TagValue>): number;
  /** Marque toutes les valeurs liées comme figées (liaison perdue). */
  markStale(): void;
  /** Repères présents dans la page. */
  readonly tags: string[];
}

/**
 * Relie des données temps réel aux composants par attributs, sans code par écran :
 * `data-tag="LT-01"` met à jour l'attribut `value` ; `data-tag-attr="state"` choisit un autre attribut.
 * Une valeur `{ value, quality }` met aussi à jour `quality`. La source (WebSocket, MQTT, SSE, REST)
 * reste dans votre application : le kit ne se connecte à rien lui-même.
 *
 * const binder = bindTags(document.body);
 * socket.onmessage = (m) => binder.update(JSON.parse(m.data)); // { "LT-01": 58.2, "P-101": "running" }
 */
export function bindTags(root: ParentNode): TagBinder {
  const elements = (): Element[] => Array.from(root.querySelectorAll('[data-tag]'));
  return {
    update(values) {
      let n = 0;
      for (const el of elements()) {
        const tag = el.getAttribute('data-tag') ?? '';
        if (!(tag in values)) continue;
        const raw = values[tag];
        const v = typeof raw === 'object' && raw !== null ? raw.value : raw;
        el.setAttribute(el.getAttribute('data-tag-attr') ?? 'value', String(v));
        if (typeof raw === 'object' && raw !== null && raw.quality) el.setAttribute('quality', raw.quality);
        else if (el.getAttribute('quality') === 'stale') el.removeAttribute('quality');
        n++;
      }
      return n;
    },
    markStale() {
      for (const el of elements()) if ((el.getAttribute('data-tag-attr') ?? 'value') === 'value') el.setAttribute('quality', 'stale');
    },
    get tags() {
      return [...new Set(elements().map((el) => el.getAttribute('data-tag') ?? ''))];
    },
  };
}
