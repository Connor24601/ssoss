window.customElements.define(
    'test-element',
    class extends HTMLElement {
      constructor() {
        super();
        const root = this.attachShadow({ mode: 'open' });
        root.innerHTML = `<input type="text"/>`;
      }
    })