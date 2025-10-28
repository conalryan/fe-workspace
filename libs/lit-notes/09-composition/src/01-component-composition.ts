import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * [Component Composition](https://lit.dev/docs/composition/component-composition/)
 * Complex components can be broken down into smaller components.
 * 
 * Good candidates for component composition:
 * - It has its own state.
 * - It has its own template.
 * - It's used in more than one place, either in this component or in multiple components.
 * - It focuses on doing one thing well.
 * - It has a well-defined API.
 * 
 * Reusable controls like buttons, checkboxes, and input fields can make great components. 
 * But more complex UI pieces like drawers and carousels are also great candidates for componentization.
 * 
 * ## Passing data between components
 * When exchanging data with subcomponents, the general rule is to follow the model of the DOM: properties down, events up.
 * - Properties down. Setting properties on a subcomponent is usually preferable to calling methods on the subcomponent. 
 * It's easy to set properties in Lit templates and other declarative template systems.
 * - Events up. In the web platform, firing events is the default method for elements to send information up the tree, 
 * often in response to user interactions. 
 * This lets the host component respond to the event, or transform or re-fire the event for ancestors farther up the tree.
 * 
 * A few implication of this model
 * - A component should be the source of truth for the subcomponents in its shadow DOM. 
 * Subcomponents shouldn't set properties or call methods on their host component.
 * - If a component changes a public property on itself, it should fire an event to notify components higher in the tree. 
 * Generally these changes will be the result of user actions—like pressing a button or selecting a menu item. 
 * Think of the native input element, which fires an event when the user changes the value of the input.
 * 
 * Passing data between sibling components
 * 
 * Solution 1: Mediator pattern
 * - Peer components don't communicate with each other directly.
 * - Parent component acts as third party mediator.
 * 
 * Light DOM Children
 * 
 * In addition to the nodes in your shadow DOM, you can render child nodes provided by the component user, 
 * like the standard <select> element can take a set of <option> elements as children and render them as menu items.
 * 
 * Child nodes are sometimes referred to as "light DOM" to distinguish them from the component's shadow DOM.
 * 
 * The component has control over whether and where the child nodes are rendered, using the <slot> element in its shadow DOM. 
 * And it can receive notifications when child nodes are added and removed by listening for the slotchange event
 */
@customElement('component-composition')
export class ComponentComposition extends LitElement {
  render() {
    return html`
      <div>
        <h2>Component Composition</h2>
        <inner-component></inner-component>
      </div>
    `;
  }
}


@customElement('inner-component')
export class InnerComponent extends LitElement {
  render() {
    return html`<div>Inner Component</div>`;
  }
}
