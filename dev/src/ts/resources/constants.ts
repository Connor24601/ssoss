import { v4 as uuid } from 'uuid';

export class Constants
{
	static  LOG_STORAGE_TIME = 30; // time in seconds to store batches of logs in web mode

    static rgba(r:number,g:number,b:number,a:number) : string
    {
        
        return '';
    }
}

export enum BlobSource
{
    default = "DEFAULT", // default blobs; not mutable
    custom = "CUSTOM", // blobs that the user has made
    web = "WEB", // blobs whose definitions are stored online
    imported = "IMPORTED" // blobs downloaded from online
}

export enum BlobType
{
    web="WEB",
    internal="INTERNAL",
    script="SCRIPT",
    local="LOCAL",
    unknown="UNKNOWN"
}

export enum StorageLocation {
    
    localStorage = "localStorage",
    sessionStorage = "sessionStorage",
    fileStorage = "fileStorage"
}

export class BlobId
{
    id!:string;
    commonId?:string;

	constructor(commonId?:string)
    {
        this.commonId = commonId;
        this.id = uuid();
    }
}


export class ProfileId
{
    
    id!:string;
    static default:ProfileId;

	constructor()
    {
        this.id = uuid();
    }

    static instanceateDefault()
    {
        ProfileId.default = new ProfileId();
        ProfileId.default.id = "default";
    }
}
