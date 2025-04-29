import { LogLevel } from "./util/LogService.js";
import { ServiceProvider } from "./util/ServiceProvider.js";
import { HomeScreen } from "./views/home.js";
import { InputHandler } from "./views/input.js";

const _logger = ServiceProvider.logService.logger;

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
    ServiceProvider.logService.changeLogLevel(LogLevel.TRACE);
    window.customElements.define('home-screen', HomeScreen);
    
    document.addEventListener('DOMContentLoaded', (_event) => {
        _logger.debug("document loaded");
        const inputHandler = new InputHandler();
    });
    _logger.silly("successfully created DOM listener")
} catch (error) {
    _logger!.fatal(`Error defining main load DOM listener`, error);
}