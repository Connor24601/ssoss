import { ServiceProvider } from "../util/ServiceProvider.js";
import { BlobMetaData } from '../blob/BlobMetaData.js';
import { BlobId, StorageKeys } from "../resources/constants.js";
import { Profile } from "./Profile.js";
import * as dProfile from "@assets/config/defaultProfile.json" with {type: 'json'};
import { ILogObj, Logger } from "tslog";
import * as plus from "../../assets/icon/plus.svg" with {type: 'svg'};

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
            // Committed 1621988 Records, 1461 Empty Records, stream position 56032129 out of 56032129
            // Committing 1621988 Data Records, 3540 Resources, 69993 Static Resources, last modified 1758291635, in 28613 ms

            // 12:02:37

            // Sending request to /vectortiles/v1/database/DMS_OneLine4/1758291635?fullSyncOffset=0&fullSyncLimit=20971520
            //Sending GET to /vectortiles/v1/database/DMS_OneLine4/1758291635 with 
            // {accept: application/octet-stream, accept-charset: utf-8, accept-encoding: gzip, deflate, br, 
            // date: Sat, 20 Sep 2025 17:02:37 GMT, user-agent: AspenTech OSI Compass 3.1.3.1 | Windows 11 Enterprise build 26100 | 
            // pkamal, cookie: osiSessionID=d83dbd60-0cd0-4202-b88c-48633b657690}

            // Committing 97443 DataType.map Tiles in 2714 ms, read took 22 ms

            
            
            _logger.info(`data: ${plus.default as string}`);
            //this.defaultProfile.profilePicture = url;
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