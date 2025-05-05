import { BlobElement } from "./blobElement.js";
import content from "../../assets/icon/settings.svg";


import { ServiceProvider } from "../util/ServiceProvider.js";
import { LogLevel } from "../util/LogService.js";

const _logger = ServiceProvider.logService.logger;

export class HomeScreen extends HTMLElement {
  static testNum:number = 5;
  constructor()
  {
    super();
    const root = this.attachShadow({ mode: 'open' });
    var cssnode = document.createElement('link');

         cssnode.type = 'text/css';
         cssnode.rel = 'stylesheet';
         cssnode.href = './css/blob.css';
    _logger.debug("searching for blob css: ", cssnode);
    root.appendChild(cssnode);
    _logger.info(content);
    //root.innerHTML = `<img src="${content}"/>`;
    var settingsElement = document.createElement('img');
    settingsElement.innerHTML = `<img src="${content}"/>`;
    var container = document.createElement("div");
    container.className="container";
    var spotify = new BlobElement("spotify");
    var youtube = new BlobElement("youtube");
    var steam = new BlobElement("steam");
    container.appendChild(spotify.get());
    container.appendChild(youtube.get());
    container.appendChild(steam.get());
    let temp = spotify.get().cloneNode();
    var settings = new BlobElement("settings");
    container.appendChild(settings.get());
    container.appendChild(temp.cloneNode());
    container.appendChild(temp.cloneNode());
    
    root.appendChild(container);
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