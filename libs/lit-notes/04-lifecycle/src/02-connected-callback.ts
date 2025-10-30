import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('connected-callback-element')
export class ConnectedCallbackElement extends LitElement {
  _handleKeydown = (e: KeyboardEvent) => {
    console.info('Key pressed:', e.key);
  };

  /**
   * connectedCallback()
   * - Setup tasks that should only occur when the element is connected to the document.
   * - Most commonly adding event listeners to nodes external to the element, like a keydown event handler added to the window.
   * - Typically, anything done in connectedCallback() should be undone when the element is disconnected for example, removing event listeners on window to prevent memory leaks.
   */
  connectedCallback() {
    super.connectedCallback();
    console.info('ConnectedCallbackElement::connectedCallback');
    // WARN: The listener is added to the window object, so it will be triggered for all key presses in the browser.
    window.addEventListener('keydown', this._handleKeydown);
  }

  render() {
    return html`<div>ConnectedCallbackElement</div>`;
  }
}
