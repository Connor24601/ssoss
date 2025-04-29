import { LogService } from "./LogService.js";
import {StorageService} from "./StorageService.js";
import {ProfileManager} from "../profile/ProfileManager.js";
import {BlobManager} from "../blob/BlobManager.js";

export class ServiceProvider
{
    private static _logService?: LogService;
    private static _storageService?: StorageService;
    private static _profileManager?: ProfileManager;
    private static _blobManager?: BlobManager;

    static get logService(): LogService {
        if (!this._logService) {
            this._logService = new LogService();
        }
        return this._logService;
    }

    static get storageService(): StorageService {
        if (!this._storageService) {
            this._storageService = new StorageService();
        }
        return this._storageService;
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