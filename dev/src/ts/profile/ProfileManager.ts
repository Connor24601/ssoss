import { ServiceProvider } from "../util/ServiceProvider.js";
import { BlobMetaData } from '../blob/BlobMetaData.js';
import { BlobId, ProfileId, StorageKeys, StorageLocation } from "../resources/constants.js";
import { Profile } from "./Profile.js";
import * as dProfile from "@assets/config/defaultProfile.json" with {type: 'json'};
import { ILogObj, Logger } from "tslog";
//import {Stream} from "ts-stream";
//import plus from "../../assets/icon/plus.svg" with {type: 'svg'};

//const _logger = ServiceProvider.logService.createNewLogger("ProfileManager");

var _logger:Logger<ILogObj>;

export class ProfileManager
{
    
    collaborativeProfile?:Profile;
    defaultProfile!:Profile;
    activeProfile?:Profile;
    //activeProfileStream:Stream<ProfileId> = new Stream<ProfileId>();
    _profiles:Map<string,Profile>;
    //usingProfiles:Stream<boolean> = new Stream<boolean>();
    

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
        
        this._profiles ??= new Map<string,Profile>();
    }

    loadFromStorage() {
        _logger.trace("ProfileManager starting storage check");
        let defaultProfile = ServiceProvider.storage().get<Profile>(StorageKeys.defaultProfile);
        this._profiles = ServiceProvider.storage().get<Map<string,Profile>>(StorageKeys.profiles) ?? new Map<string,Profile>();

        if (defaultProfile == undefined)
        {
            // read in default profile
            _logger.warn(`default profile not found, using stock: ${dProfile.default.name}`);
            defaultProfile = dProfile.default as unknown as Profile;
        }
        else
        {
            _logger.info(`default profile found: ${this.defaultProfile.id}`);
        }
        this.defaultProfile = defaultProfile;
        this.activeProfile = ServiceProvider.storage().get<Profile>(StorageKeys.lastProfile) ?? this.defaultProfile;
        _logger.info(`using profile ${this.activeProfile!.name}`);
    }

    
    public get current() : Profile {
        return (this.activeProfile ?? this.defaultProfile)!;
    }
    
    public byId(id:ProfileId | string) : Profile | undefined
    {
        if (id as string)
        {
            return this._profiles?.get(id as string);
        }
        return this._profiles?.get((id as ProfileId).key); 
    }

}