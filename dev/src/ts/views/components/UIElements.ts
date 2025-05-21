import { Constants } from "../../resources/constants.js";
import { ServiceProvider } from "../../util/ServiceProvider.js";

const _logger = ServiceProvider.logService.createNewLogger("UI");
// cannot extend HTMLInputElement
// https://stackoverflow.com/a/75768431
export class Toggle extends HTMLElement {
    selected:boolean;
    background:HTMLElement;
    slider:HTMLElement;
    input:HTMLInputElement;
    
    constructor(selected?:boolean, callback?:(this: GlobalEventHandlers, ev: Event) => any)
    {
        super();
        this.input = document.createElement(`input`);
        this.input.type = "checkbox";
        this.input.className = "btnToggle";
        
        this.selected = selected ?? false;
        this.input.defaultChecked = this.selected;
        this.background = document.createElement(`span`);
        this.className = "sliderBack";
        this.slider = document.createElement(`span`);
        this.slider.className = "slider";
        this.slider.tabIndex=0;
        this.appendChild(this.input);
        this.appendChild(this.slider);

        this.className = `toggle`;
        if (callback != undefined)
        {
            this.slider.onkeyup = (event)=>{
                if ((Constants.yesKeyCodes.has(event.code.toLowerCase())))
                {
                    _logger.trace(`toggling ${this.id} from key ${event.code}`);
                    this.toggle();
                }
                
            };
            this.onclick = callback;
            this.oninput = callback;
            this.ontoggle = callback;
            //_logger.info(`callback created: ${this.ontoggle}`);
        }
        
        
    }

    toggle(set?:boolean)
    {
        this.selected = set ?? !this.selected;
        this.input.checked = this.selected;
    }

}