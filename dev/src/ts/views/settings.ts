import { ServiceProvider } from "../util/ServiceProvider.js";
import { Toggle } from "./components/UIElements.js";
const _logger = ServiceProvider.logService.createNewLogger("Settings");

export class Settings extends HTMLDialogElement
{
    constructor()
    {
        _logger.debug("settings prompted");
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
            _logger.silly("settings completed");
            function callback(this: any, ev: Event) {
                (this as Toggle).toggle();
                _logger.info(`changed state: ${ev}`);
            };
            let testSlider = new Toggle(false, callback);
            let button = document.createElement("button");
            button.title = "logs";
            button.textContent = "Download Logs"
            button.onclick = this.downloadLogs;
            this.appendChild(testSlider);
            this.appendChild(button);
            
        }
        catch (error) {
            _logger.error(`Could not make settings:`,error);
        }
        
        
    }

    downloadLogs() : void
    {
        _logger.info("Log Download requested");
       let logFile = new File([ServiceProvider.logService.rawLogDump()], "logs.json",{type:"application/json"});
        let url = URL.createObjectURL(logFile);
        let a = document.createElement("a");
        a.href = url;
        a.setAttribute("download","logs.json");
        a.click();
    }
}