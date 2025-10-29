import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

const brand = css`green`;

@customElement('add-styles')
export class AddStyles extends LitElement {
  static readonly styles = css`
    span {
      color: ${brand};
    }
  `;
  protected render() {
    return html`<span>I am green!</span>`;
  }
}
