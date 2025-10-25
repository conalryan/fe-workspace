const SharedComponent = () => <div>This is a shared component!</div>;

/**
 * Use default export due to
 * The lazy import with import('basicReactHost/SharedComponent') expects the imported module to have a default export
 * React's lazy() function specifically looks for a default export from the dynamic import
 * If we were to export SharedComponent as a named export, adjust the lazy import accordingly
 * ```typescript
 * const TheComponent = lazy(
 *   async () => {
 *     // @ts-expect-error Module federation remote import not recognized by TypeScript
 *     const { SharedComponent } = await import('basicReactHost/SharedComponent');
 *     return { default: SharedComponent };
 *   },
 * );
 *  ```
 */
export default SharedComponent;
