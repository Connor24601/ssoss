import { BackgroundSVG } from "./resources/background.js";
import { StorageLocation } from "./resources/constants.js";
import { LogLevel } from "./util/LogService.js";
import { ServiceProvider } from "./util/ServiceProvider.js";
import { BlobElement } from "./views/blobElement.js";
import { HomeScreen } from "./views/home.js";
import { InputHandler } from "./views/input.js";
import { Panel } from "./views/components/panel.js";
import { Search } from "./views/search.js";
import { Settings } from "./views/settings.js";
import { Toggle } from "./views/components/UIElements.js";

const _logger = ServiceProvider.logService.createNewLogger("Load");

try {

    // https://stackoverflow.com/questions/21147149/flash-of-unstyled-content-fouc-in-firefox-only-is-ff-slow-renderer
    if(window.console && console.trace) {
        console.log("rewriting trace");
        var oldTrace = console.trace;
        console.trace = function(msg,args,errors) {
            if (errors)
            {
                console.groupCollapsed(msg,args,errors);
                oldTrace(msg,args,errors);
            }
            else
            {
                console.groupCollapsed(msg,args);
                oldTrace(msg,args);
            }
            
            console.groupEnd();
        }
    }
    if (import.meta.env.DEV)
    {
        ServiceProvider.logService.changeLogLevel(LogLevel.TRACE);
        
    }
    else
    {
        _logger.info("running in prod");
    }
    
    try {
        _logger.info(`attempting attach:${ServiceProvider.logService.attachStorage(StorageLocation.sessionStorage)}`);
    } catch (error) {
        _logger.error(`could not store logs: `, error);
    }

    try {
        window.customElements.define('blob-element', BlobElement);
        _logger.debug("blob defined");
        window.customElements.define('home-screen', HomeScreen);
        window.customElements.define('panel-popup', Panel);
        window.customElements.define('search-bar', Search);
        window.customElements.define('settings-page', Settings, {extends: "dialog"});
        window.customElements.define('input-toggle', Toggle);
        
    } catch (error) {
        _logger.fatal(`couldn't define custom elements: ${error}`, error);
    }
    try {
        ServiceProvider.profileService.loadFromStorage();
        //ServiceProvider.profileService.
    } catch (error) {
        _logger.fatal(`failure to initialize: ${error}`, error);
    }
    
    
    document.addEventListener('DOMContentLoaded', (_event) => {
        _logger.debug("document loaded");
        const inputHandler = new InputHandler();
        document.getElementById("main")?.appendChild(new HomeScreen());
        if (import.meta.env.DEV)
        {
            let debugCss = document.createElement("link");
            debugCss.href = "./css/debug.css";
            debugCss.rel = "stylesheet";

            debugCss.type = "text/css";
            
            var head  = document.getElementsByTagName('head')[0];
            head.appendChild(debugCss);
        }

    });


    window.addEventListener("beforeunload", (_event)=> {
        _logger.info("app unloading");
    });

    window.addEventListener("load", (_event)=> {
        _logger.info("app loading");
    });

    window.addEventListener("beforeinstallprompt", (_event)=> {
        
    });

    window.addEventListener("pagehide", (_event)=> {
        _logger.info("pagehide");
    });
    window.addEventListener("pageshow", (_event)=> {
        _logger.info("pageshow");
    });
    window.addEventListener("gamepadconnected", (_event)=> {
        
    });
    window.addEventListener("gamepaddisconnected", (_event)=> {
        
    });

    _logger.silly("successfully created DOM listener");
} catch (error) {
    _logger!.fatal(`Error defining main load DOM listener`, error);
}