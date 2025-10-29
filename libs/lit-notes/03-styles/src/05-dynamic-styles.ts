import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('dynamic-styles')
export class DynamicStyles extends LitElement {
  static readonly styles = css`
    .someclass {
      border: 1px solid red;
      padding: 4px;
    }
    .anotherclass {
      background-color: navy;
    }
  `;

  @property() classes = { anotherclass: true, someclass: true };

  @property() styles = { color: 'lightgreen', fontFamily: 'Roboto' };

  protected render() {
    return html`
      <div
        class=${classMap(this.classes)}
        style=${styleMap(this.styles)}>
        Some content
      </div>
    `;
  }
}
