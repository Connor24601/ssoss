import { ServiceProvider } from "../util/ServiceProvider.js";
import { BlobMetaData } from '../blob/BlobMetaData.js';
import { BlobId, StorageKeys } from "../resources/constants.js";
import { Profile } from "./Profile.js";
import * as dProfile from "@assets/config/defaultProfile.json" with {type: 'json'};
import { ILogObj, Logger } from "tslog";
//import plus from "../../assets/icon/plus.svg" with {type: 'svg'};

//const _logger = ServiceProvider.logService.createNewLogger("ProfileManager");

var _logger:Logger<ILogObj>;

export class ProfileManager
{
    
    collaborativeProfile?:Profile;
    defaultProfile?:Profile;
    activeProfile?:Profile;
    profiles:Map<string,Profile>;

    initializationQueue?:Set<Function> = new Set<Function>();
    

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

    public registerWhenInitialized(callback:Function)
    {
        if (this.initializationQueue != null)
        {
            this.initializationQueue.add(callback);
            return;
        }
        callback();
    }

    loadFromStorage() {
        _logger.trace("ProfileManager starting storage check");
        this.defaultProfile = ServiceProvider.storage().get<Profile>(StorageKeys.defaultProfile);
        this.profiles = ServiceProvider.storage().get<Map<string,Profile>>(StorageKeys.profiles) ?? new Map<string,Profile>();

        if (this.defaultProfile == undefined)
        {
            // read in default profile
            _logger.warn(`default profile not found, using stock: ${dProfile.default.name}`);
            this.defaultProfile = dProfile.default as unknown as Profile;
            //const iconStr = plus as unknown as String;
            //_logger.info(`data: ${iconStr}`);
            //this.defaultProfile.profilePicture = iconStr;
        }
        else
        {
            _logger.info(`default profile found: ${this.defaultProfile.id}`);
        }
        this.activeProfile = ServiceProvider.storage().get<Profile>(StorageKeys.lastProfile) ?? this.defaultProfile;
        _logger.info(`using profile ${this.activeProfile!.name}`);
        this.initializationQueue!.forEach((callback:Function) => callback());
        this.initializationQueue = undefined;
    }

    
    public get current() : Profile {
        return (this.activeProfile ?? this.defaultProfile)!;
    }
    

}