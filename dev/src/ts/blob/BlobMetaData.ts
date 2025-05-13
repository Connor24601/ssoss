import { BlobId } from "../resources/constants.js";
import { ContentBlob } from "./ContentBlob.js";

export class BlobMetaData
{
	// this is all the info for one blob for one user, NOT counting auth
	// variables
	//CustomIcon? icon
	blobId!:BlobId;
	name?:string;
	isCollaborative?:boolean = false;
	uses:number = 0;
	pinnedPosition?:{col:number, row:number};
	defaultProfileId?:string;
	skipUserPrompt:boolean = false;
	
	//bool? skipCollabPrompt // ignores : which user would you like to log in as prompt
	//Bool? isHidden
}

