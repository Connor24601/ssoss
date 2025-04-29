import { ServiceProvider } from "./ServiceProvider.js";
// LogService and StorageService require each other, 
// so don't use the ServiceProvider


export class StorageService
{
    hasStorage:boolean;
    storeLocation:string;
    _logger = ServiceProvider.logService.logger;

    constructor(location:string="localStorage")
    {
        this.storeLocation = location;
        this.hasStorage = this.storageAvailable(this.storeLocation);
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
            localStorage.setItem(name,serializedValue);
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
            let raw:string | null = localStorage.getItem(name);
            if (raw == null)
            {
                this._logger.trace(`no value found for ${name} in ${this.storeLocation}, throwing up`);
                throw ReferenceError(`${name} not found in ${this.storeLocation}`);
            }
            returnObject = JSON.parse(raw) as type;
            this._logger.trace(`successful retrieval of ${name}`);
        } catch (error) {
            this._logger.error(`error getting ${name} from ${this.storeLocation}`, error);
        }
        finally {
            return returnObject;
        }
    }

    retryStorage()
    {
        this.hasStorage = this.storageAvailable(this.storeLocation);
    }

    storageAvailable(type:string) {
        try 
        {
            this._logger.trace(`testing ${type} storage`);
            const x = "__storage_test__";
            localStorage.setItem(x, x);
            localStorage.removeItem(x);
            return true;
        } 
        catch (e)
        {
            this._logger.warn(`failure with ${type} storage:`,e);
            return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                // acknowledge QuotaExceededError only if there's something already stored
                localStorage &&
                localStorage.length !== 0
            );
        }
      }
      
}