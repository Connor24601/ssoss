import { BlobAuth } from '../blob/BlobAuth.js';
import { BlobMetaData } from '../blob/BlobMetaData.js';
import { BlobId, ProfileId, Preferences } from '../resources/constants.js';

export class Profile {

    name:string;
    nickname:string;
    id:ProfileId;
    collabByDefault:boolean;
    URLPicture?:URL;
    localPicture?:ImageData;
    rawPicture?:String;
    prefs:Preferences;
    blobs:Map<BlobId,BlobMetaData> = new Map<BlobId,BlobMetaData>();
    blobAuth:Map<BlobId,BlobAuth> = new Map<BlobId,BlobAuth>();

    constructor(name:string, collab:boolean = false, nickname:string = name, prefs:Preferences = {})
    {
        this.name = name;
        this.nickname = nickname;
        this.collabByDefault = collab;
        this.id = new ProfileId();
        this.prefs = prefs;

    }

    set profilePicture(value:URL | ImageData | String | undefined)
    {
        switch(typeof value){
            case typeof URL:
                this.URLPicture=value as URL;
                break;
            case typeof ImageData:
                this.localPicture=value as ImageData;
                break;
            case typeof String:
                this.rawPicture = value as String;
            default:
                return;
        }
        
    }
    get profilePicture(){
        return this.localPicture || this.rawPicture || this.URLPicture;
    }

    getBlobMetaData(id:BlobId) : BlobMetaData | null
    {
        return this.blobs.get(id) || null;
    }
}


