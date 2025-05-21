import { ServiceProvider } from "../util/ServiceProvider.js";
import { BlobMetaData } from '../blob/BlobMetaData.js';
import { BlobId } from "../resources/constants.js";
import { Profile } from "./Profile.js";




export class ProfileManager
{
    _logger = ServiceProvider.logService.createNewLogger("ProfileManager");
    collaborativeProfile!:Profile;
    
    constructor() {
        this._logger.silly("profile manager initialized");
    }

    loadFromStorage() {
        //localStorage.getItem("profiles");
    }

    getActiveProfile() {

    }




}