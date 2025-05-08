import { BlobAuth } from '../blob/BlobAuth.js';
import { BlobMetaData } from '../blob/BlobMetaData.js';
import { BlobId, ProfileId } from '../resources/constants.js';

export class Profile {

    static default:Profile;

    name:string;
    nickname:string;
    id:ProfileId;
    collabByDefault:boolean;
    blobs:Map<BlobId,BlobMetaData> = new Map<BlobId,BlobMetaData>();
    blobAuth:Map<BlobId,BlobAuth> = new Map<BlobId,BlobAuth>();

    constructor(name:string, collab:boolean = false, nickname:string = name)
    {
        this.name = name;
        this.nickname = nickname;
        this.collabByDefault = collab;
        this.id = new ProfileId();

    }

    getBlobMetaData(id:BlobId) : BlobMetaData | null
    {
        return this.blobs.get(id) || null;
    }
}


