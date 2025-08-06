import { v4 as uuid } from 'uuid';

export class Constants
{
	static LOG_STORAGE_TIME = 30; // time in seconds to store batches of logs in web mode
    static yesKeyCodes=new Set<string>(["submit","space","enter","yes","activate","return"]);

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

export enum StorageKeys {
    defaultProfile = "defaultProfile",
    collabProfile = "collabProfile",
    lastProfile = "leftoverProfile",
    profiles = "profiles"
}

// preferences are any settings that do not affect profile/blob behavior
// but do change look/feel
export class Preferences {
    background?:Background;
    

    constructor()
    {

    }
}

export class Color {
    /*hue?:string;
    saturation?:*/
    hex?:string;
    constructor(hex:string)
    {
        this.hex = hex;
    }
}

export enum BackgroundType {
    solid = "solidColor",
    gradient = "gradient",
    animated = "animated",
    image = "image"
}

export class Background {

    type:BackgroundType;
    color1?:Color;
    color2?:Color;
    image?:URL;

    constructor()
    {
        this.type = BackgroundType.gradient;
        this.color1 = new Color("#060611");
        this.color2 = new Color("#200606");
        this.image = new URL("https://firefox-settings-attachments.cdn.mozilla.net/main-workspace/newtab-wallpapers-v2/bd424c86-6366-4f2b-b8dc-74d21439c1fb.avif");
    }
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
