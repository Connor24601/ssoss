import { ProfileId } from "../resources/constants.js";
import {Keyboard} from "./keyboard.js";
import { ServiceProvider } from "../util/ServiceProvider.js";
const _logger = ServiceProvider.logService.createNewLogger("input");

class InputSettings 
{

  static default:InputSettings = new InputSettings(ProfileId.default);

  testMode:boolean = false;
  autoDetect:boolean = true;
  profileId:ProfileId;

  keyboard?:Keyboard;

  constructor(userId:ProfileId)
  {
    this.profileId = userId;
  }

}


export class InputHandler
{
  inputPanel! : HTMLElement;
  keyboard?: Keyboard;
  settings?: InputSettings;
  inputBlockToggle!: HTMLInputElement;


  constructor() {
      _logger.trace("creating input panel");
      const radius:number = 10;
      this.inputPanel = document.getElementById("inputContainer")!;
      this.inputBlockToggle = document.getElementById("inputToggle")! as HTMLInputElement;
      _logger.silly("inputPanel initialized");
      this.getKeyboard();
  }
  async getKeyboard()
  {
    _logger.trace("creating keyboard");
    const requestURL = '../../assets/config/keyConfig.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const keyFile = await response.json();
    _logger.silly("received JSON");
    let keyboard = new Keyboard(keyFile);
    //keyboard  = await createKeyboard();
    window.addEventListener('keydown', event => {
      if (this.inputBlockToggle!.checked)
      {
        event.preventDefault();
        keyboard.keyboardSVG.focus();
        _logger.silly("preventing default");
      }
    });
    window.addEventListener("blur", event => {
      _logger.trace("focusOut");
      keyboard.keyboardSVG.focus();
      keyboard.resetKeys();
    });
    window.addEventListener("focus", event => {
      _logger.trace("focusReturned");
      keyboard.keyboardSVG.focus();
      keyboard.resetKeys();
    });
    this.inputPanel!.appendChild(keyboard.keyboardSVG);
    keyboard.keyboardSVG.focus();
    
  }
}