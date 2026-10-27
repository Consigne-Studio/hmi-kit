/**
 * Classe de base des composants.
 * Le repli sur une classe vide permet d'importer la librairie côté serveur
 * (Next.js, Angular SSR) sans erreur : les éléments ne sont simplement pas définis.
 */
import { onLocaleChange } from '../core/i18n.js';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- repli SSR volontairement vide
const SafeHTMLElement = (typeof HTMLElement !== 'undefined' ? HTMLElement : class {}) as typeof HTMLElement;

export abstract class HmiElement extends SafeHTMLElement {
  protected readonly root: ShadowRoot;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  private unsubscribe: (() => void) | undefined;

  connectedCallback(): void {
    // Un changement de langue (setLocale) redessine les composants affichés.
    this.unsubscribe ??= onLocaleChange(() => this.render());
    this.render();
  }

  disconnectedCallback(): void {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }

  attributeChangedCallback(): void {
    if (this.isConnected) this.render();
  }

  protected abstract render(): void;
}

/** Définit un élément personnalisé une seule fois, et seulement dans un navigateur. */
export function define(tag: string, ctor: CustomElementConstructor): void {
  if (typeof customElements !== 'undefined' && !customElements.get(tag)) {
    customElements.define(tag, ctor);
  }
}

/** Styles communs, injectés dans chaque shadow root. Les couleurs viennent de tokens.css. */
export const baseStyles = `
  :host {
    font-family: var(--hmi-font, system-ui, sans-serif);
    color: var(--hmi-fg, #1f2328);
    font-size: var(--hmi-font-size, 14px);
  }
  .label { color: var(--hmi-fg-muted, #57606a); font-size: 0.85em; }
  .num { font-variant-numeric: tabular-nums; font-family: var(--hmi-font-mono, ui-monospace, monospace); }
`;
