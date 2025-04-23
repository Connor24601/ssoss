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

	constructor(id:string)
    {
        this.id = id;
    }
}