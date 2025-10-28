import { html, LitElement, ReactiveController, ReactiveControllerHost } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * Reactive Controllers
 * A reactive controller is an object that can hook into a component's reactive update cycle. 
 * Controllers can bundle state and behavior related to a feature, making it reusable across multiple component definitions.
 * 
 * Use controllers to implement features that require their own state and access to the component's lifecycle, such as:
 * - Handling global events like mouse events
 * - Managing asynchronous tasks like fetching data over the network
 * - Running animations
 * 
 * Reactive controllers are similar in many ways to class mixins. 
 * The main difference is that they have their own identity and don't add to the component's prototype, 
 * which helps contain their APIs and lets you use multiple controller instances per host component
 * 
 * The component associated with a controller instance is called the host component.
 * The controller instance registers itself to receive lifecycle callbacks from the host component, 
 * and triggers a host update when the controller has new data to render.
 * 
 * A controller will typically expose some functionality to be used in the host's render() method. 
 * For example, many controllers will have some state, like a current value:
 * ```ts
 *  render() {
 *    return html`
 *      <div>Current time: ${this.clock.value}</div>
 *    `;
 *  }
 * ```
 * 
 * Writing a controller
 * A reactive controller is an object associated with a host component,
 * which implements one or more host lifecycle callbacks or interacts with its host
 * 
 * Lifecycle
 * The reactive controller lifecycle is a subset of the reactive update cycle. 
 * LitElement calls into any installed controllers during its lifecycle callbacks. 
 * These callbacks are optional.
 * - hostConnected()
 *   - Called after creating renderRoot, so a `shadowRoot` is available.
 *   - Useful for setting up event listeners, observers, etc.
 * - hostUpdate()
 *   - Called before the host `update` and `render` methods.
 *   - Useful for reading the DOM before it is updated (e.g. animations).
 * - hostUpdated()
 *   - Called after updates, before the host's `updated()` method.
 *   - Useful for reading DOM after it's modified (e.g. animations).
 * - hostDisconnected()
 *   - Useful for cleaning up things added in `hostConnected()`, such as event listeners and observers.
 * 
 * Minimum API exposed on a controller host:
 * - addController(controller: ReactiveController)
 * - removeController(controller: ReactiveController)
 * - requestUpdate()
 * - updateComplete: Promise<boolean>
 * 
 * You can also create controllers that are specific to HTMLElement, ReactiveElement, 
 * LitElement and require more of those APIs; or even controllers that are tied to a specific element class or other interface.
 * LitElement and ReactiveElement are controller hosts, but hosts can also be other objects like base classes 
 * from other web components libraries, components from frameworks, or other controllers.
 */
export class ClockController implements ReactiveController {
  host: ReactiveControllerHost;

  value = new Date();
  timeout: number;
  private _timerID?: number;

  constructor(host: ReactiveControllerHost, timeout = 1000) {
    // A controller registers itself with its host component by calling host.addController(this).
    (this.host = host).addController(this);
    this.timeout = timeout;
  }

  hostConnected() {
    // Start a timer when the host is connected
    this._timerID = setInterval(() => {
      this.value = new Date();
      // Update the host with new value
      this.host.requestUpdate();
    }, this.timeout);
  }

  hostDisconnected() {
    // Clear the timer when the host is disconnected
    clearInterval(this._timerID);
    this._timerID = undefined;
  }
}

/**
 * Using a controller
 * 
 */
@customElement('uses-clock-controller')
export class UsesClockController extends LitElement {
  /**
   * Each controller has its own creation API, but typically you will create an instance and store it with the component:
   * Create the controller and store it.
   */
  private clock = new ClockController(this, 100);

  // Use the controller in render()
  render() {
    const formattedTime = timeFormat.format(this.clock.value);
    return html`Current time: ${formattedTime}`;
  }
}

const timeFormat = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric', minute: 'numeric', second: 'numeric',
});