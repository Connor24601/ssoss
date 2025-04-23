import { BlobElement } from "./blobElement.js";




window.customElements.define(
    'test-element',
    class HomeScreen extends HTMLElement {
      constructor()
      {
        super();
        const root = this.attachShadow({ mode: 'open' });
        //root.innerHTML = `<input type="text"/>`;
         var test = new BlobElement("spotify");
         root.appendChild(test.get());
      }
    });