import { LogService } from "./LogService.js";
import {StorageService} from "./StorageService.js";
import {ProfileManager} from "../profile/ProfileManager.js";
import {BlobManager} from "../blob/BlobManager.js";
import { StorageLocation } from "../resources/constants.js";

export class ServiceProvider
{
    private static _logService?: LogService;
    private static _storage: Map<StorageLocation, StorageService | null>;
    private static _profileManager?: ProfileManager;
    private static _blobManager?: BlobManager;

    static get logService(): LogService {
        if (!this._logService) {
            this._logService = new LogService();
        }
        return this._logService;
    }

    static storage(location?:StorageLocation): StorageService {
        if (!this._storage) {
            this._storage = new Map<StorageLocation, StorageService | null>();
            for (const location in Object.keys(StorageLocation))
            {
                this._storage.set(location as StorageLocation,null);
            }
        }
        if (!this._storage.get(location || StorageLocation.localStorage))
        {
            this._storage.set(location || StorageLocation.localStorage, new StorageService(location));
        }
        return this._storage.get(location || StorageLocation.localStorage)!;
    }

    static get profileService(): ProfileManager {
        if (!this._profileManager) {
            this._profileManager = new ProfileManager();
        }
        return this._profileManager;
    }

    static get blobService(): BlobManager {
        if (!this._blobManager) {
            this._blobManager = new BlobManager();
        }
        return this._blobManager;
    }
}