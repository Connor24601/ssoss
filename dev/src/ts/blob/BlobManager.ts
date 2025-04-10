import { ContentBlob } from "./ContentBlob.js";

class BlobManager
{
	//Dict<String blobId, Blob> blobs;

	static testBlob:ContentBlob = new ContentBlob(); //todo: figure out how args work
	static defaultBlobs:Map<string,ContentBlob> = new Map<string,ContentBlob>([[
		"test",BlobManager.testBlob
	
	
	]]);
	
	
	customTestBlob:ContentBlob = new ContentBlob();
	customBlobs!:Map<string,ContentBlob>;


	BlobManager(customBlobs:Map<string,ContentBlob>)
	{
		
		this.customBlobs = new Map<string,ContentBlob>();
		this.customBlobs.set('customTest',this.customTestBlob);
		return;
	}
	
	// methods
	// addBlob()
	// importBlob(string)
	// removeBlob(blobId)

	// editBlob(blobId) // cannot edit defaults, warn for imports?
	// removeAllBlobs(optional BlobType) // does not remove defaults no matter what

}

