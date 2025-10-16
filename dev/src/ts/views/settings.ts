import { ServiceProvider } from "../util/ServiceProvider.js";
import { Toggle } from "./components/UIElements.js";
import { ProfilePanel } from "./profilePanel.js";
import { ProfileWrapper } from "./profileWrapper.js";
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
                ProfileWrapper.singleton.usingProfiles = (this as Toggle).selected;
                _logger.info(`value ${(this as Toggle).selected}, profile now ${ ProfileWrapper.singleton.usingProfiles}`)
            };
            let testSlider = new Toggle(ProfileWrapper.singleton.usingProfiles, callback);
            let row = document.createElement("row");
            let text = document.createElement("b");
            let button = document.createElement("button");
            text.textContent = "Use Profiles";
            row.appendChild(testSlider);
            row.append(text);
            button.title = "logs";
            button.textContent = "Download Logs";
            button.onclick = this.downloadLogs;
            this.appendChild(row);
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