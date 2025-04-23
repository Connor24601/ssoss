import { BlobId } from "../resources/constants.js";
import { ContentBlob } from "./ContentBlob.js";

class BlobManager
{
	//Dict<String blobId, Blob> blobs;

	//static testBlob:ContentBlob = new ContentBlob(); //todo: figure out how args work
	static defaultBlobs:Map<BlobId,ContentBlob> = new Map<BlobId,ContentBlob>();
	
	
	//customTestBlob:ContentBlob = new ContentBlob();
	customBlobs:Map<BlobId,ContentBlob> =  new Map<BlobId,ContentBlob>();;


	BlobManager()
	{
		
		return;
	}
	
	// methods
	// addBlob()
	// importBlob(string)
	// removeBlob(blobId)

	// editBlob(blobId) // cannot edit defaults, warn for imports?
	// removeAllBlobs(optional BlobType) // does not remove defaults no matter what

}

