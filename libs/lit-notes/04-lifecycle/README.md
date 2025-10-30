# Lifecycle

## Standard custom element lifecycle

Lit components are standard custom elements and inherit the custom element lifecycle methods. 
In addition Lit introduces a reactive update cycle that renders changes to DOM when reactive properties change.
For information about the custom element lifecycle, see [Using the lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks) on MDN.

Custom element lifecycle callbacks include:
- `connectedCallback()`: called each time the element is added to the document. The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
- `disconnectedCallback()`: called each time the element is removed from the document.
- `adoptedCallback()`: called each time the element is moved to a new document.
- `attributeChangedCallback()`: called when attributes are changed, added, removed, or replaced. See [Responding to attribute changes](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes) for more details about this callback.

```js
// Create a class for the element
class MyCustomElement extends HTMLElement {
  static observedAttributes = ["color", "size"];

  constructor() {
    // Always call super first in constructor
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    super.adoptedCallback();
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback();
    console.log(`Attribute ${name} has changed.`);
  }
}

customElements.define("my-custom-element", MyCustomElement);
```

If you need to customize any of the standard custom element lifecycle methods, make sure to call the `super` implementation (such as `super.connectedCallback()`) so the standard Lit functionality is maintained.

1. constructor
```typescript
/**
 * Perform one time initialization tasks that must be done before the first update.
 */
constructor() {
  super();
  console.info('Info: constructor called for ', this.localName);
}
```

2. connectedCallback
```typescript
/**
 * Setup tasks that should only occur when the element is connected to the document.
 * - e.g. adding event listeners to nodes external to the element, like a keydown event handler added to the window.
 */
connectedCallback() {
  super.connectedCallback();
  console.info('Info: connectedCallback called for', this.localName);
  window.addEventListener('keydown', this._handleKeydown);
}
```

3. disconnectedCallback
```typescript
/**
 * Remove event listeners added to nodes external to the element, i.e. anything in `connectedCallback`
 */
disconnectedCallback() {
  super.disconnectedCallback();
  console.info(`Info: disconnectedCallback called for`, this.localName);
  window.removeEventListener('keydown', this._handleKeydown);
}
```

4. attributeChangedCallback
```typescript
/**
  * You rarely need to implement this callback.
  */
attributeChangedCallback(name: string, oldValue: string, newValue: string) {
  console.info(`Info: attributeChangedCallback for`, this.localName, name, oldValue, newValue);
}
```

5. adoptedCallback
```typescript
/**
 * This is rarely used to move elements between documents.
 * Use cases include working with iframes or moving elements between shadow roots.
 */
adoptedCallback() {
  console.info('AdoptedCallbackElement::adoptedCallback');
}
```

## Lit element lifecycle

shouldUpdate
```typescript
/**
 * Called automatically by Lit before the component updates
 * You can override it (as shown below) to add custom logic for controlling when updates should occur
 */
shouldUpdate(changedProperties: PropertyValueMap<this>): boolean {
  console.info(`Info: shouldUpdate called for`, this.localName, changedProperties);
  return true;
}
```

update
```typescript
/**
 * Called to update the component's DOM.
 * Generally, you should not need to implement this method.
 */
update(changedProperties: PropertyValues<this>) {
  super.update(changedProperties);
  console.info(`Info: update called for`, this.localName, changedProperties);
}
```

```typescript
/**
 * Called before update() to compute values needed during the update.
 * Implement willUpdate() to compute property values that depend on other properties
 * and are used in the rest of the update process.
 */
willUpdate(changedProperties: PropertyValues<this>) {
  console.info(`Info: willUpdate called for`, this.localName, changedProperties);
}
```

firstUpdated
```typescript
/**
 * Called after the component's DOM has been updated the first time, immediately before `updated()` is called.
 * Implement to perform one-time work after the component's DOM has been created.
 * e.g. focusing a particular rendered element or adding a `ResizeObserver` or `IntersectionObserver` to an element.
 */
firstUpdated(_changedProperties: PropertyValues): void {
  console.info('[CompletingUpdateElement] firstUpdated', _changedProperties);
  const input = this.shadowRoot?.getElementById('complete-update');
  if (input) {
    input.focus();
  }
}
```

updated
```typescript
/**
 * Called whenever the component’s update finishes and the element's DOM has been updated and rendered.
 * Implement to perform tasks that use element DOM after an update.
 * e.g. code that performs animation may need to measure the element DOM.
 */
updated(_changedProperties: PropertyValues): void {
  console.info('[CompletingUpdateElement] updated', _changedProperties);
  if (_changedProperties.has('collapsed')) {
    // this._measureDOM();
  }
}
```

## Reactive update cycle
In addition to the standard custom element lifecycle, Lit components also implement a reactive update cycle.

The reactive update cycle is triggered when a reactive property changes or when the `requestUpdate()` method is explicitly called. Lit performs updates asynchronously so property changes are batched

Updates happen at microtask timing, which means they occur before the browser paints the next frame to the screen. See [Jake Archibald's article](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) on microtasks for more information about browser timing.

At a high level, the reactive update cycle is:
1. An update is scheduled when one or more properties change or when `requestUpdate()` is called.
2. The update is performed prior to the next frame being painted.
    1. Reflecting attributes are set.
    2. The component’s render method is called to update its internal DOM.
3. The update is completed and the `updateComplete` promise is resolved.

Lifecycle Methods Implemented:
1. `constructor()` - Element creation
2. `connectedCallback()` - Element added to DOM
3. `attributeChangedCallback()` - Attribute changes (can happen anytime)
4. `shouldUpdate()` - Decide if update should proceed
5. `willUpdate()` - Before update starts
6. `render()` - Template rendering
7. `update()` - Perform the update
8. `getUpdateComplete()` - Promise for completion
9. `firstUpdated()` - After first update
10. `updated()` - After each update
11. `adoptedCallback()` - Element moved to new document (rare)
12. `disconnectedCallback()` - Element removed from DOM