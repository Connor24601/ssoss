import { ServiceProvider } from "../util/ServiceProvider.js";
import { BlobMetaData } from '../blob/BlobMetaData.js';
import { BlobId, StorageKeys } from "../resources/constants.js";
import { Profile } from "./Profile.js";
import * as dProfile from "@assets/config/defaultProfile.json" with {type: 'json'};
import { ILogObj, Logger } from "tslog";

//const _logger = ServiceProvider.logService.createNewLogger("ProfileManager");

var _logger:Logger<ILogObj>;

export class ProfileManager
{
    
    collaborativeProfile?:Profile;
    defaultProfile?:Profile;
    activeProfile?:Profile;
    profiles:Map<string,Profile>;

    constructor(logger:Logger<ILogObj>)
    {
        _logger = logger;
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

        if (this.defaultProfile == undefined)
        {
            // read in default profile
            _logger.warn("default profile not found, using stock");
            this.defaultProfile = dProfile.default as unknown as Profile;
        }
        else
        {
            _logger.info(`default profile found: ${this.defaultProfile.id}`);
        }
    }

    
    public get current() : Profile {
        return (this.activeProfile ?? this.defaultProfile)!;
    }
    




}