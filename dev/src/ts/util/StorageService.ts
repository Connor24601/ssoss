import { StorageLocation } from "../resources/constants.js";
import { ServiceProvider } from "./ServiceProvider.js";
// LogService and StorageService require each other, 
// so don't use the ServiceProvider


export class StorageService
{
    hasStorage:boolean;
    storeLocation:StorageLocation;
    _logger = ServiceProvider.logService.logger;
    webStorage?:Storage;

    constructor(location:StorageLocation=StorageLocation.localStorage)
    {
        this.storeLocation = location;
        switch (location) {
            case StorageLocation.localStorage:
                this.webStorage = localStorage;
                break;
            case StorageLocation.sessionStorage:
                this.webStorage = sessionStorage;
                break;
            default:
                this._logger.error(`unimplemented storage option: ${location}`);
                break;
        }
        this.hasStorage = this.storageAvailable();
        this._logger.debug(`storage created: ${this.storeLocation}: ${this.webStorage}`);
    }
    
    set<type>(name:string, value:type) : boolean
    {
        let isSuccessful:boolean = false;
        try {
            if (!this.hasStorage)
            {
                this._logger.trace(`no ${this.storeLocation} exists, cannot set ${name}`);
                throw ReferenceError(`no ${this.storeLocation}, cannot attempt storing ${name}`);
            }
            let serializedValue = JSON.stringify(value);
            this.webStorage?.setItem(name,serializedValue);
            isSuccessful = true;
            
        } catch (error) {
            this._logger.error(`error storing ${name} in ${this.storeLocation}`, error);
            isSuccessful = false;
        }
        finally {
            return isSuccessful;
        }
    }
    
    get<type>(name:string) : type | null
    {
        let returnObject:type | null = null;
        try {
            if (!this.hasStorage)
            {
                this._logger.trace(`no ${this.storeLocation} exists, cannot get ${name}`);
                throw ReferenceError(`no ${this.storeLocation}, cannot attempt retrieval of ${name}`);
            }
            let raw:string | null = this.webStorage?.getItem(name) || null;
            if (raw == null)
            {
                this._logger.trace(`no value found for ${name} in ${this.storeLocation}, throwing up`);
                throw ReferenceError(`${name} not found in ${this.storeLocation}`);
            }
            returnObject = JSON.parse(raw) as type;
            if (name != "logs")
            {
                this._logger.trace(`successful retrieval of ${name}`);
            }
        } catch (error) {
            this._logger.error(`error getting ${name} from ${this.storeLocation}`, error);
        }
        finally {
            return returnObject;
        }
    }

    verifyStorage() : boolean
    {
        this.hasStorage = this.storageAvailable();
        return this.hasStorage;
    }

    storageAvailable() : boolean {
        try 
        {
            this._logger.trace(`testing ${this.storeLocation} storage`);
            const x = "__storage_test__";
            switch (this.storeLocation) {
                case StorageLocation.localStorage:
                case StorageLocation.sessionStorage:
                    this.webStorage!.setItem(x, x);
                    this.webStorage!.removeItem(x);
                    break;
                default:
                    //TODO: implement file storage
                    throw(Error("Not implemented"));
                    return false;
            }
            
            return true;
        } 
        catch (e)
        {
            this._logger.warn(`failure with ${this.storeLocation} storage:`,e);
            return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                // acknowledge QuotaExceededError only if there's something already stored
                this.webStorage &&
                this.webStorage.length !== 0  || false
            );
        }
      }
      
}