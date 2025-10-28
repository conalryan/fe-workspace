import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./01-component-composition";
import "./02-mixins";
import "./03-controllers";

@customElement("app-element")
export class AppElement extends LitElement {
  render() {
    return html`
      <main>
        <h1>Composition</h1>

        <h3>Component Composition</h3>
        <component-composition></component-composition>

        <h3>Mixins</h3>
        <uses-logging-mixin></uses-logging-mixin>

        <h3>Reactive Controllers</h3>
        <uses-clock-controller></uses-clock-controller>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-element": AppElement;
  }
}
