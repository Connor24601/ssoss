import {BlobElement} from "./blobElement.js";
import {Keyboard} from "./keyboard.js";



document.addEventListener('DOMContentLoaded', (_event) => {
  const radius:number = 10;
  let inputContainer: HTMLElement = document.getElementById("inputContainer")!;
  let inputBlockToggle: HTMLInputElement = document.getElementById("btnToggle")! as HTMLInputElement;
  let blob: BlobElement = new BlobElement("blah");
  let blobTwo: BlobElement = new BlobElement("bleh");
  let keyboard: Keyboard;

  
  

  async function getKeyboard()
  {
    const requestURL = '../../assets/config/keyConfig.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const keyFile = await response.json();
    keyboard = new Keyboard(keyFile);
    //keyboard  = await createKeyboard();
    window.addEventListener('keydown', event => {
      if (inputBlockToggle.checked)
      {
        event.preventDefault();
        keyboard.keyboardSVG.focus();
        
      }
    });
    window.addEventListener("blur", event => {
      console.log("focusOut");
      keyboard.keyboardSVG.focus();
      keyboard.resetKeys();
    });
    window.addEventListener("focus", event => {
      console.log("focyus");
      keyboard.keyboardSVG.focus();
      keyboard.resetKeys();
    });
    inputContainer.appendChild(keyboard.keyboardSVG);
    keyboard.keyboardSVG.focus();
    
  }

  getKeyboard();

});
