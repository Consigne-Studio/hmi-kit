import { escapeHtml, formatValue, parseNumber, parseQuality, type Quality } from '../core/format.js';
import { t } from '../core/i18n.js';
import { baseStyles, define, HmiElement } from './base.js';

// Repères textuels courts plutôt que des pictogrammes : lisibles avec toutes les polices.
const qualityMark = (q: Quality): string => (q === 'good' ? '' : t(`quality.mark.${q}`));

/**
 * Valeur numérique avec unité et qualité de donnée.
 * <hmi-value label="Pression" value="4.2" unit="bar" decimals="1" quality="good"></hmi-value>
 */
export class HmiValue extends HmiElement {
  static observedAttributes = ['value', 'unit', 'decimals', 'quality', 'label'];

  protected render(): void {
    const value = parseNumber(this.getAttribute('value'));
    const decimals = parseNumber(this.getAttribute('decimals')) ?? 1;
    const quality = parseQuality(this.getAttribute('quality'));
    const unit = escapeHtml(this.getAttribute('unit') ?? '');
    const label = escapeHtml(this.getAttribute('label') ?? '');
    const text = formatValue(value, decimals);
    const mark = qualityMark(quality);
    const qLabel = t(`quality.${quality}`);
    const aria = `${label} ${text} ${unit}${quality === 'good' ? '' : `, ${t('quality.aria', { q: qLabel.toLowerCase() })}`}`.trim();

    this.root.innerHTML = `
      <style>${baseStyles}
        .box { display: inline-flex; flex-direction: column; gap: 2px; }
        .row { display: inline-flex; align-items: baseline; gap: 4px; }
        .v { font-size: 1.4em; }
        .u { color: var(--hmi-fg-muted, #57606a); }
        .q { font-size: 0.7em; font-weight: 700; color: var(--hmi-quality, #8250df); border: 1px solid currentColor; border-radius: 2px; padding: 0 3px; }
        .good .q { display: none; }
        .uncertain .v, .stale .v { color: var(--hmi-fg-muted, #57606a); }
        .bad .v { text-decoration: line-through; color: var(--hmi-fg-muted, #57606a); }
      </style>
      <span class="box ${quality}" part="box" role="group" aria-label="${aria}">
        ${label ? `<span class="label" part="label">${label}</span>` : ''}
        <span class="row">
          <span class="v num" part="value">${text}</span>
          <span class="u" part="unit">${unit}</span>
          <span class="q" part="quality" title="${t('quality.title', { q: qLabel })}">${mark}</span>
        </span>
      </span>`;
  }
}

define('hmi-value', HmiValue);
