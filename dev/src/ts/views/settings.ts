import { ServiceProvider } from "../util/ServiceProvider.js";
import { Toggle } from "./components/UIElements.js";
const _logger = ServiceProvider.logService.createNewLogger("Settings");

export class Settings extends HTMLDialogElement
{
    constructor()
    {
        _logger.info("settings prompted");
        super();
        try {
            this.className="panel";
            this.style.top = "10%";
            this.style.left = "10%";
            this.style.right="10%";
            this.style.bottom="10%";
            this.style.width="80%";
            this.style.height="80%";
            this.id = "settingsPage";
            _logger.info("settings completed");
            function callback(this: any, ev: Event) {
                (this as Toggle).toggle();
                _logger.info(`changed state: ${ev}`);
            };
            let testSlider = new Toggle(false, callback);
            _logger.info("toggle created");
            this.appendChild(testSlider);
            
        }
        catch (error) {
            _logger.error(`Could not make settings:`,error);
        }
        
        
    }
}