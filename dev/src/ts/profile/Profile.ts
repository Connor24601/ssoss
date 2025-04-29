import { BlobMetaData } from '../blob/BlobMetaData.js';
import { BlobId, ProfileId } from '../resources/constants.js';

export class Profile {

    static default:Profile;

    name:string;
    nickname?:string;
    id:ProfileId;
    collab:boolean;
    blobs:Map<BlobId,BlobMetaData> = new Map<BlobId,BlobMetaData>();

    constructor(name:string, collab:boolean)
    {
        this.name = name;
        this.collab = collab;
        this.id = new ProfileId();

    }
}


