import { BlobElement } from "./blobElement.js";
import * as settings from "../../assets/icon/settings.svg";
import { ServiceProvider } from "../util/ServiceProvider.js";
import { LogLevel } from "../util/LogService.js";

const _logger = ServiceProvider.logService.logger;

export class HomeScreen extends HTMLElement {
  static testNum:number = 5;
  constructor()
  {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `<svg src="../../assets/icon/settings.svg"/>`;
    var test = new BlobElement("spotify");
    root.appendChild(test.get());
     

  }

  static getIcons()
  {
    
    
  }

  static fuckWithLogger(logLevel:string) : boolean
  {
    const level:LogLevel = logLevel as LogLevel;
    ServiceProvider.logService.changeLogLevel(level);
    return true;
  }
  static logTest()
  {
    _logger.fatal("fatal message");
    _logger.error("error message");
    _logger.warn("warn message");
    _logger.debug("debug message");
    _logger.info("info message");
    _logger.trace("trace message");
  }
}