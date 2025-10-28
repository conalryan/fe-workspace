import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * 1. Export a class that extends LitElement.
 *
 * 2. Regitster a custom element with the browser:
 *    a) Use the @customElement decorator (shorthand for customElements.define(...).
 *    b) Call define() directly `customElements.define('define-component', DefineComponent);`
 */
@customElement('define-component')
export class DefineComponent extends LitElement {
  @property({type: Number})
  aNumber = 5;

  header = 'Define a component';

  render() {
    return html`
      <main>
        <h1>${this.header}</h1>
      </main>
    `;
  }
}

/**
 * We recommend adding an HTMLElementTagNameMap entry for all elements authored in TypeScript,
 * and ensuring you publish your .d.ts typings in your npm package.
 * This enables TypeScript to properly type-check your custom elements.
 *
 * const myElement = document.createElement('define-component');
 * myElement.aNumber = 10;
 */
declare global {
  interface HTMLElementTagNameMap {
    "define-component": DefineComponent;
  }
}