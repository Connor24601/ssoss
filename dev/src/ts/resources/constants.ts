import { v4 as uuid } from 'uuid';

class Constants
{
	
}

export enum BlobType
{
    default = "DEFAULT",
    custom = "CUSTOM",
    web = "WEB",
    imported = "IMPORTED"
}

export class BlobId
{
    id!:string;

	constructor()
    {
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
