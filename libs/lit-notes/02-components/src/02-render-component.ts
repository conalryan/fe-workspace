// eslint-disable-next-line max-classes-per-file
import { html, LitElement, noChange, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('render-component')
export class RenderComponent extends LitElement {
  header = 'Render a component';

  /**
   * Define a render method that will return a lit template.
   * Templates can include expressions, which are placeholders for dynamic content.
   *
   * Write your template in HTML inside a JavaScript tagged template literal using Lit's html tag function.
   *
   * render() method can return anything that Lit can render as the child of an HTML element:
   * - Primitive values like string, number, or boolean.
   * - TemplateResult objects created by the html function.
   * - DOM Nodes.
   * - The sentinel values nothing and noChange.
   * - Arrays or iterables of any of the supported types.
   *
   * Performance considerations:
   * - Avoid changing the component's state.
   * - Avoid producing any side effects.
   * - Use only the component's properties as input.
   * - Return the same result when given the same property values.
   * - Keep the template deterministic.
   *
   * Render cycle
   * - First render when the component is added to the DOM on a page.
   * - Additional render when any change to the component's reactive properties.
   * - Lit batches updates to maximize performance and efficiency (setting multiple properties triggers only one update,
   *   performed asynchronously at microtask timing).
   * - During an update, only the parts of the DOM that change are re-rendered.
   * - Lit parses the template and creates static HTML once,
   *   and then only updates changed values in expressions after that, making updates very efficient.
   *
   * Shadow DOM
   * - Shadow DOM lets an element create its own, isolated DOM tree that's separate from the main document tree.
   * - A core feature of the web components specifications that enables interoperability, style encapsulation, and other benefits.
   * - Lit uses shadow DOM to encapsulate the DOM a component renders.
   */
  render() {
    return html`
      <main>
        <h1>${this.header}</h1>

        <h3>Render can return primitive values</h3>
        <render-primitve></render-primitve>

        <h3>Render can return DOM nodes</h3>
        <render-dom-node></render-dom-node>

        <h3>Render can return noChange</h3>
        <render-no-change></render-no-change>

        <h3>Render can return nothing</h3>
        <render-nothing></render-nothing>

        <h3>Render can return arrays of any of the supported types</h3>
        <render-array></render-array>

        <h3>Composing templates</h3>
        <render-composing-templates></render-composing-templates>
      </main>
    `;
  }
}

@customElement('render-primitve')
export class RenderPrimitve extends LitElement {
  /**
   * Render can return primitive values like string, number, or boolean.
   */
  render() {
    return 22;
  }
}

@customElement('render-dom-node')
export class RenderDOMNode extends LitElement {
  private _el = document.createElement('h1');
  /**
   * Render can return DOM nodes
   */
  render() {
    this._el.innerHTML = 'Render can return DOM nodes';
    return this._el;
  }
}

@customElement('render-no-change')
export class RenderNoChange extends LitElement {
  /**
   * Render can return the sentinel values nothing and noChange.
   * cr. What is the use case of this?
   * A:
   * 1. Conditional Rendering with Performance Optimization
   * When you want to conditionally prevent updates to avoid unnecessary DOM manipulations:
   * ```typescript
   * render() {
   *    // Only update if data has actually changed
   *    if (this.shouldUpdate && this.hasNewData) {
   *      return html`<div>${this.data}</div>`;
   *    }
   *    return noChange; // Keep the previous rendered content
   * }
   * ```
   * 2. In Template Expressions
   * More commonly used within template expressions to conditionally update specific parts:
   * ```typescript
   * render() {
   *   return html`
   *     <div>
   *       <h1>${this.title}</h1>
   *       <p>${this.isLoading ? 'Loading...' : noChange}</p>
   *       <!-- The paragraph content won't change if not loading -->
   *     </div>
   *   `;
   * }
   * ```
   * 3. Custom Directives
   * When creating custom directives that need to maintain previous state:
   * ```typescript
   * class MyDirective extends Directive {
   *   render(value: any) {
   *     if (this.shouldSkipUpdate(value)) {
   *       return noChange;
   *     }
   *     return value;
   *   }
   * }
   * ```
   * 4. Performance in Lists
   * When rendering lists where some items shouldn't update:
   * ```typescript
   * render() {
   *   return html`
   *     <ul>
   *       ${this.items.map(item =>
   *         item.isDirty
   *           ? html`<li>${item.name}</li>`
   *           : noChange
   *       )}
   *     </ul>
   *   `;
   * }
   * ```
   * Key Differences from nothing:
   * - noChange: Keeps the previous rendered content unchanged
   * - nothing: Removes/clears the content (renders as empty)
   *
   * In your current component, returning noChange from the entire render method means
   * the component will maintain whatever was previously rendered, which might not be very
   * useful since there's no previous content. It's more commonly used within template
   * expressions for granular control over updates.
   */
  render() {
    return noChange;
  }
}

@customElement('render-nothing')
export class RenderNothing extends LitElement {
  /**
   * Render can return the sentinel values nothing and noChange.
   * * cr. What is the use case of this?
   * A:
   * 1. Conditional Rendering - Hide Content
   * When you want to conditionally show or hide entire sections:
   * ```typescript
   * render() {
   *   if (!this.isVisible) {
   *     return nothing; // Renders empty, effectively hiding the component
   *   }
   *   return html`<div>Visible content</div>`;
   * }
   * ```
   * 2. In Template Expressions
   * More commonly used within template expressions to conditionally render parts:
   * ```typescript
   * render() {
   *   return html`
   *     <div>
   *       <h1>${this.title}</h1>
   *       ${this.showDescription ? html`<p>${this.description}</p>` : nothing}
   *       ${this.isLoggedIn ? html`<button>Logout</button>` : nothing}
   *     </div>
   *   `;
   * }
   * ```
   * 3. Lists with Conditional Items
   * When rendering lists where some items should be omitted:
   * ```typescript
   * render() {
   *   return html`
   *     <ul>
   *       ${this.items.map(item =>
   *         item.isVisible
   *           ? html`<li>${item.name}</li>`
   *           : nothing
   *       )}
   *     </ul>
   *   `;
   * }
   * ```
   * 4. Loading States
   * When you want to show nothing while loading data:
   * ```typescript
   * render() {
   *   if (this.isLoading) {
   *     return nothing; // Show nothing while loading
   *   }
   *
   *   if (this.hasError) {
   *     return html`<div class="error">Error occurred</div>`;
   *   }
   *
   *   return html`<div>${this.data}</div>`;
   * }
   * ```
   * 5. Dynamic Slots or Placeholders
   * ```typescript
   * render() {
   *   return html`
   *     <div>
   *       <header>Always visible</header>
   *       ${this.renderMiddleSection()}
   *       <footer>Always visible</footer>
   *     </div>
   *   `;
   * }
   *
   * renderMiddleSection() {
   *   if (!this.hasMiddleContent) {
   *     return nothing; // No middle section at all
   *   }
   *   return html`<main>${this.middleContent}</main>`;
   * }
   * ```
   * Key Differences:
   * - nothing: Renders empty content (removes/hides DOM nodes)
   * - noChange: Keeps the previous rendered content unchanged
   * - Empty string '': Actually renders an empty text node (takes up space in DOM)
   */
  render() {
    return nothing;
  }
}

// More practical example using nothing
@customElement('conditional-content')
export class ConditionalContent extends LitElement {
  @property({ type: Boolean }) show = false;

  render() {
    return this.show ? html`<p>Content is visible!</p>` : nothing; // Completely hidden when show is false
  }
}

@customElement('render-array')
export class RenderArray extends LitElement {
  /**
   * Render can return arrays of any of the supported types.
   */
  render() {
    return ['hello', 4, true];
  }
}

/**
 * Composing templates
 *
 * You can also compose templates by importing other elements and using them in your template:
 * e.g.
 * ```js
 * import './my-header.js';
 * import './my-article.js';
 * import './my-footer.js';
 * ...
 * render() {
 *   return html`
 *     <my-header></my-header>
 *     <my-article></my-article>
 *     <my-footer></my-footer>
 *   `;
 * }
 * ```
 */
@customElement('render-composing-templates')
class RenderComposingTemplates extends LitElement {
  /**
   * cr. What not just use @state instead?
   * A:
   * @property({ attribute: false }) vs @state:
   *
   * @property({ attribute: false }):
   * - Public API: Intended to be set from outside the component
   * - External Input: Parent components or JavaScript code should set this
   * - Part of Component Interface: Documented as part of how to use the component
   *
   * @state:
   * - Internal State: Private to the component, not meant to be set externally
   * - Component's Own Data: Managed internally by the component itself
   * - Implementation Detail: Not part of the public API
   *
   * Decision Guide:
   * Use @property({ attribute: false }) when:
   * - Data comes from parent components
   * - It's part of the component's public API
   * - External code should be able to set it
   * - It's configuration or input data
   *
   * Use @state when:
   * - Data is managed internally
   * - It's derived from user interactions
   * - It's temporary UI state
   * - External code shouldn't touch it
   *
   * In this example, article is meant to be passed in from outside:
   * ```html
   * <render-composing-templates></render-composing-templates>
   * <script>
   * const component = document.querySelector('render-composing-templates');
   * component.article = { text: 'Custom text', title: 'Dynamic Title' };
   * </script>
   * ```
   */
  @property({ attribute: false })
  article = {
    text: 'Some witty text.',
    title: 'My Nifty Article',
  };

  articleTemplate() {
    return html`<article>${this.article.text}</article>`;
  }

  footerTemplate() {
    return html`<footer>Your footer here.</footer>`;
  }

  headerTemplate() {
    return html`<header>${this.article.title}</header>`;
  }

  render() {
    return html` ${this.headerTemplate()} ${this.articleTemplate()} ${this.footerTemplate()} `;
  }
}
