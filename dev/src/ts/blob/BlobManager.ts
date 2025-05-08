import { BlobId, BlobSource, StorageLocation } from "../resources/constants.js";
import { ServiceProvider } from "../util/ServiceProvider.js";
import { StorageService } from "../util/StorageService.js";
import { ContentBlob } from "./ContentBlob.js";

export class BlobManager
{
	_logger = ServiceProvider.logService.logger;
	activeBlobs:Map<BlobId,ContentBlob> =  new Map<BlobId,ContentBlob>();
	
	blobStorage:Map<BlobSource,StorageLocation> =  new Map<BlobSource,StorageLocation>();

	blobsToStore:Set<BlobId> = new Set<BlobId>();

	constructor()
	{
		
		return;
	}

	getBlob(id:BlobId) : ContentBlob | null
	{
		let gotBlob = this.activeBlobs.get(id) || null;
		//gotBlob = BlobManager.defaultBlobs.get(id) || null;
		return gotBlob;
	}

	async addBlob(blob:ContentBlob) : Promise<boolean>
	{
		this.blobsToStore.add(blob.id);
		this.activeBlobs.set(blob.id,blob);
		this._logger.info(`Blob added: ${blob.id.commonId ?? blob.defaultName}`);
		
		return true;
	}

	getBlobByCommonId(commonId:string) : ContentBlob | null
	{
		// TODO: check non-active blobs?
		let rblob = null;
		this.activeBlobs.forEach((value:ContentBlob, key:BlobId) => {
			if (key.commonId == commonId)
			{
				rblob = value;
				return;
			}
		});
		if (rblob)
		{
			return rblob;
		}
		this._logger.warn(`could not find blob ${commonId}`);
		return null;
	}
	
	

	// methods
	// addBlob()
	// importBlob(string)
	// removeBlob(blobId)

	// editBlob(blobId) // cannot edit defaults, warn for imports?
	// removeAllBlobs(optional BlobType) // does not remove defaults no matter what

}

