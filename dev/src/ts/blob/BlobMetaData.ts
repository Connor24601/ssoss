import { BlobId } from "../resources/constants.js";
import { ContentBlob } from "./ContentBlob.js";

export class BlobMetaData
{
	// this is all the info for one blob for one user, NOT counting auth
	// variables
	//Icon? icon
	blobId!:BlobId;
	name?:string;
	isCollaborative?:boolean = false;
	uses:number = 0;
	pinnedPosition?:{col:number, row:number};
	defaultProfileId?:string;
	skipUserPrompt:boolean = false;
	//string? defaultProfileId // which collab user to use
	//bool? skipCollabPrompt // "which user would you like to log in as"
	//Bool? isHidden
}

