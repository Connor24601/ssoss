import { BlobElement } from "./blobElement.js";


import { ServiceProvider } from "../util/ServiceProvider.js";
import { LogLevel } from "../util/LogService.js";
import { BlobId, BlobSource } from "../resources/constants.js";
import { ContentBlob, ControlBlob, WebBlob } from "../blob/ContentBlob.js";
import { Search } from "./search.js";
import { BackgroundSVG } from "../resources/background.js";
import { Panel } from "./components/panel.js";

const _logger = ServiceProvider.logService.createNewLogger("home");

export class HomeScreen extends HTMLElement {


  blobGrid:ContentBlob[][] = [];
  
  constructor()
  {
    super();
    var container = document.createElement("div");
    container.className="container";
    try {
      let background = new BackgroundSVG();
      //this.appendChild(background.background);
      _logger.info("successful adding svg background");
    } catch (error) {
      _logger.error("failure adding background:", error);
    }
    
    window.onresize = (event)=>{
      //this.clientWidth
    }

    ServiceProvider.blobService.addBlob(new 
      WebBlob(new URL("/","https://www.youtube.com"),new BlobId("youtube"),"YouTube",BlobSource.default));

      ServiceProvider.blobService.addBlob(new 
        WebBlob(new URL("/","https://www.spotify.com"),new BlobId("spotify"),"Spotify",BlobSource.default));
        
      ServiceProvider.blobService.addBlob(new 
        ContentBlob(new BlobId("steam"),"Steam",BlobSource.default));
    
      ServiceProvider.blobService.addBlob(new 
        ControlBlob(new BlobId("settings"),"Settings",BlobSource.default));
    var spotify = new BlobElement(ServiceProvider.blobService.getBlobByCommonId("spotify")!);
    
    var youtube = new BlobElement(ServiceProvider.blobService.getBlobByCommonId("youtube")!);
    var steam = new BlobElement(ServiceProvider.blobService.getBlobByCommonId("steam")!);
    container.appendChild(spotify);
    container.appendChild(youtube);
    container.appendChild(steam);
    
    var settings = new BlobElement(ServiceProvider.blobService.getBlobByCommonId("settings")!);
    container.appendChild(settings);
    
    //this.appendChild(new Search());
    //this.appendChild(new Panel());
    this.appendChild(container);
  }
  setUpListeners() : void
  {
    this.addEventListener('keydown', event => {
      
      if (event.key.toLowerCase()=="enter")
      {
        // launch selected blob
      }
      else if (event.key.toLowerCase()=="escape")
      {
        // unfocus selected blob
      }
      else if (event.key.toLowerCase()=="space")
      {
        // inspect blob
      }
      else if (event.key.toLowerCase().startsWith("arrow"))
      {
        // TODO: navigate grid via arrows
      }
      
    });
  }

  calculateBlobDistribution() : void
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