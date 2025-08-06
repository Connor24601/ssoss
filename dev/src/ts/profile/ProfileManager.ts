import { ServiceProvider } from "../util/ServiceProvider.js";
import { BlobMetaData } from '../blob/BlobMetaData.js';
import { BlobId, StorageKeys } from "../resources/constants.js";
import { Profile } from "./Profile.js";


const _logger = ServiceProvider.logService.createNewLogger("ProfileManager");



export class ProfileManager
{
    
    collaborativeProfile?:Profile;
    defaultProfile?:Profile;
    activeProfile?:Profile;
    profiles:Map<string,Profile>;

    constructor() {

        _logger.silly("profile manager initializing");
        try {
            this.loadFromStorage();
        }
        catch (error)
        {
            _logger.error("Profile manager could not initialize: ", error);
        }
        
        this.profiles ??= new Map<string,Profile>();
    }

    loadFromStorage() {
        _logger.trace("ProfileManager starting storage check");
        this.defaultProfile = ServiceProvider.storage().get<Profile>(StorageKeys.defaultProfile);
        this.activeProfile = ServiceProvider.storage().get<Profile>(StorageKeys.lastProfile) ?? this.defaultProfile;
        this.profiles = ServiceProvider.storage().get<Map<string,Profile>>(StorageKeys.profiles) ?? new Map<string,Profile>();
    }

    
    public get Current() : Profile {
        return (this.activeProfile ?? this.defaultProfile)!;
    }
    




}