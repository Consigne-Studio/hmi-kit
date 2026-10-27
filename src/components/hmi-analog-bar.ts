import { escapeHtml, formatValue, parseNumber, toPercent } from '../core/format.js';
import { evaluateLimits, severity, type Limits, type LimitState } from '../core/limits.js';
import { t } from '../core/i18n.js';
import { baseStyles, define, HmiElement } from './base.js';

/**
 * Indicateur analogique « haute performance » : barre neutre, plage normale grisée,
 * repères de seuils, et couleur uniquement lorsqu'un seuil est franchi.
 * <hmi-analog-bar label="Niveau cuve" value="62" min="0" max="100" l="20" h="80" ll="10" hh="90" unit="%"></hmi-analog-bar>
 */
export class HmiAnalogBar extends HmiElement {
  static observedAttributes = ['value', 'min', 'max', 'll', 'l', 'h', 'hh', 'unit', 'decimals', 'label'];

  /** État courant par rapport aux seuils (lecture seule). */
  get state(): LimitState {
    return evaluateLimits(parseNumber(this.getAttribute('value')) ?? NaN, this.limits());
  }

  private limits(): Limits {
    return {
      ll: parseNumber(this.getAttribute('ll')),
      l: parseNumber(this.getAttribute('l')),
      h: parseNumber(this.getAttribute('h')),
      hh: parseNumber(this.getAttribute('hh')),
    };
  }

  protected render(): void {
    const value = parseNumber(this.getAttribute('value'));
    const min = parseNumber(this.getAttribute('min')) ?? 0;
    const max = parseNumber(this.getAttribute('max')) ?? 100;
    const decimals = parseNumber(this.getAttribute('decimals')) ?? 1;
    const unit = escapeHtml(this.getAttribute('unit') ?? '');
    const label = escapeHtml(this.getAttribute('label') ?? '');
    const lim = this.limits();
    const state = this.state;
    const sev = severity(state);
    const pos = value === undefined ? null : toPercent(value, min, max);
    const lo = toPercent(lim.l ?? min, min, max);
    const hi = toPercent(lim.h ?? max, min, max);
    const ticks = (['ll', 'l', 'h', 'hh'] as const)
      .flatMap((k) => {
        const v = lim[k];
        return v === undefined ? [] : [`<span class="tick ${k}" style="left:${toPercent(v, min, max)}%" title="${k.toUpperCase()} ${formatValue(v, decimals)}"></span>`];
      })
      .join('');

    this.setAttribute('data-state', state);
    this.root.innerHTML = `
      <style>${baseStyles}
        :host { display: block; min-width: 160px; }
        .head { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
        .track { position: relative; height: 14px; margin: 4px 0 2px; background: var(--hmi-track, #d0d7de); border-radius: 2px; }
        .normal { position: absolute; top: 0; bottom: 0; background: var(--hmi-track-normal, #afb8c1); }
        .tick { position: absolute; top: -3px; bottom: -3px; width: 2px; margin-left: -1px; background: var(--hmi-fg-muted, #57606a); }
        .tick.ll, .tick.hh { background: var(--hmi-fg, #1f2328); }
        .ptr { position: absolute; top: -4px; bottom: -4px; width: 6px; margin-left: -3px; background: var(--hmi-fg, #1f2328); border-radius: 1px; }
        .sev1 .ptr { background: var(--hmi-alarm-2, #d4a72c); outline: 2px solid var(--hmi-fg, #1f2328); }
        .sev2 .ptr { background: var(--hmi-alarm-1, #cf222e); outline: 2px solid var(--hmi-fg, #1f2328); }
        .scale { display: flex; justify-content: space-between; color: var(--hmi-fg-muted, #57606a); font-size: 0.75em; }
        .st { font-size: 0.8em; font-weight: 600; padding: 0 4px; border-radius: 2px; }
        .sev1 .st { background: var(--hmi-alarm-2, #d4a72c); color: #000; box-shadow: inset 0 0 0 1px var(--hmi-alarm-2-edge, rgba(0,0,0,.6)); }
        .sev2 .st { background: var(--hmi-alarm-1, #cf222e); color: #fff; }
      </style>
      <div class="wrap sev${sev}" part="wrap" role="meter"
        aria-label="${label}" aria-valuemin="${min}" aria-valuemax="${max}"
        ${value === undefined ? '' : `aria-valuenow="${value}"`}
        aria-valuetext="${formatValue(value, decimals)} ${unit} ${t(`limit.${state}`)}">
        <div class="head">
          <span class="label" part="label">${label}</span>
          <span><span class="num" part="value">${formatValue(value, decimals)}</span> <span class="label">${unit}</span>
          ${sev ? `<span class="st" part="state">${t(`limit.${state}`)}</span>` : ''}</span>
        </div>
        <div class="track" part="track">
          <span class="normal" style="left:${lo}%;width:${Math.max(hi - lo, 0)}%"></span>
          ${ticks}
          ${pos === null ? '' : `<span class="ptr" part="pointer" style="left:${pos}%"></span>`}
        </div>
        <div class="scale num"><span>${formatValue(min, 0)}</span><span>${formatValue(max, 0)}</span></div>
      </div>`;
  }
}

define('hmi-analog-bar', HmiAnalogBar);
