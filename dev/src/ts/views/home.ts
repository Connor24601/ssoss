import { BlobElement } from "./blobElement.js";
import content from "../../assets/icon/settings.svg";


import { ServiceProvider } from "../util/ServiceProvider.js";
import { LogLevel } from "../util/LogService.js";
import { BlobId, BlobSource } from "../resources/constants.js";
import { ContentBlob, WebBlob } from "../blob/ContentBlob.js";

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
    
    

    ServiceProvider.blobService.addBlob(new 
      WebBlob(new URL("/","https://www.youtube.com"),new BlobId("youtube"),"YouTube",BlobSource.default));

      ServiceProvider.blobService.addBlob(new 
        WebBlob(new URL("/","https://www.spotify.com"),new BlobId("spotify"),"Spotify",BlobSource.default));
        
      ServiceProvider.blobService.addBlob(new 
        ContentBlob(new BlobId("steam"),"Steam",BlobSource.default));
    
      ServiceProvider.blobService.addBlob(new 
        ContentBlob(new BlobId("settings"),"Settings",BlobSource.default));
    var spotify = new BlobElement(ServiceProvider.blobService.getBlobByCommonId("spotify")!);
    
    var youtube = new BlobElement(ServiceProvider.blobService.getBlobByCommonId("youtube")!);
    var steam = new BlobElement(ServiceProvider.blobService.getBlobByCommonId("steam")!);
    container.appendChild(spotify);
    container.appendChild(youtube);
    container.appendChild(steam);
    
    var settings = new BlobElement(ServiceProvider.blobService.getBlobByCommonId("settings")!);
    container.appendChild(settings);
    
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