/* eslint-disable perfectionist/sort-classes */
import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('all-lifecycle-hooks')
export class AllLifecycleHooksElement extends LitElement {

  @property({ type: String })
  message = 'Hello World';

  @state()
  private inputValue = '';

  constructor() {
    super();
    console.info(`Info: 1. constructor called for`, this.localName);
  }

  connectedCallback() {
    super.connectedCallback();
    console.info(`Info: 2. connectedCallback called for`, this.localName);
  }

  attributeChangedCallback(name: string, oldValue: null | string, newValue: null | string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    console.info(`Info: attributeChangedCallback called for`, this.localName);
  }

  shouldUpdate(changedProperties: PropertyValues) {
    console.info(`Info: 3. shouldUpdate called for`, this.localName);
    return super.shouldUpdate(changedProperties);
  }

  willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);
    console.info(`Info: 4. willUpdate called for`, this.localName);
  }

  render() {
    console.info(`Info: 5. render called for`, this.localName);
    return html`
      <div>
        <p>All lifecycle hooks element</p>
        <p>Current message: ${this.message}</p>
        <input 
          type="text" 
          .value=${this.inputValue}
          @input=${this.onInputChange}
          placeholder="Enter new message"
        />
        <button @click=${this.onUpdateMessage}>Update Message</button>
      </div>
    `;
  }

  update(changedProperties: PropertyValues) {
    super.update(changedProperties);
    console.info(`Info: 6. update called for`, this.localName);
  }

  getUpdateComplete(): Promise<boolean> {
    console.info(`Info: getUpdateComplete called for`, this.localName);
    return super.getUpdateComplete();
  }

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    console.info(`Info: 7. firstUpdated called for`, this.localName);
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    console.info(`Info: 8. updated called for`, this.localName);
  }

  adoptedCallback() {
    console.info(`Info: adoptedCallback called for`, this.localName);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.info(`Info: disconnectedCallback called for`, this.localName);
  }

  private onInputChange(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.inputValue = target.value;
  }

  private onUpdateMessage() {
    if (this.inputValue.trim()) {
      this.message = this.inputValue.trim();
      this.inputValue = '';
      
      // Emit custom change event with the new message
      const changeEvent = new CustomEvent('message-change', {
        bubbles: true,
        composed: true,
        detail: { message: this.message }
      });
      this.dispatchEvent(changeEvent);
    }
  }
}
