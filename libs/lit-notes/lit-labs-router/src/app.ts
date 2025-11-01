import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-element')
export class AppElement extends LitElement {
  static readonly styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }
  `;

  render() {
    return html`
      <div class="app-container">
        <h1>Lit Labs Router Demo</h1>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-element': AppElement;
  }
}
