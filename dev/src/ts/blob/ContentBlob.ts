import './BlobManager'
import { BlobId, BlobSource, BlobType } from '../resources/constants.js';
import { ServiceProvider } from '../util/ServiceProvider.js';
import { Settings } from '../views/settings.js';
import { Panel } from '../views/components/panel.js';
const _logger = ServiceProvider.logService.createNewLogger("Blob");

export class ContentBlob
{
	type:BlobType = BlobType.unknown;
	id! : BlobId;
	defaultName!:string;
	blobSource!:BlobSource;
	defaultProfileId?:string // which collab user to use

	constructor(id: BlobId, defaultName:string, blobSource:BlobSource=BlobSource.custom)
	{
		this.id = id;
		//this.redirect = redirect;
		this.defaultName = defaultName;
		
		this.blobSource = blobSource;
		return;
	};


	activate() : void
	{
		_logger.info(`activated blob with no override: ${this.defaultName}`);
	}
	
	//icon?:Icon;
	


	//Dict<profileId, BlobAuth> BlobAuths
	//Set<profileId>? CollaborativeBlobUsers

	// methods
	//bool removeAllBlobAuth()
	//bool addBlobAuth(BlobAuth) // BlobAuth should contain BlobEnum
	//bool removeBlobAuth(profileId)
	//bool addCollaborativeUser(profileId)
	//bool removeCollaborativeUser(profileId)
	//bool removeAllCollaborativeUsers()

}

// not to be confused with BlobSource.web, which is source JSON location
export class WebBlob extends ContentBlob {
	
	type:BlobType = BlobType.web;
	url:URL;

	constructor(url:URL, ...superParam: ConstructorParameters<typeof ContentBlob>)
	{
		super(...superParam);
		this.url=url;
	}
	
	override activate() : void
	{
		window.open(this.url);
	}
}

export class ControlBlob extends ContentBlob {
	override type:BlobType=BlobType.internal;
	// special class for blobs that cannot be removed/have special hard-coded behaviors, like settings/add/etc
	constructor( ...superParam: ConstructorParameters<typeof ContentBlob>)
	{
		super(...superParam);
	}
	altActivate() : void
	{
		_logger.info(`Transport?:`,_logger.settings.attachedTransports,ServiceProvider.logService.logger.settings.attachedTransports);
		
		//occurs on right-click of special blob
	}
	dismiss() : void
	{

	}
	override activate() : void
	{
		_logger.debug(`blob ${this.id.commonId} activate received`);
		switch (this.id.commonId)
		{
			case "settings":
				
				document.getElementById("popover")!.appendChild(new Settings());
				document.getElementById("popover")!.showPopover();
				break;
			default:
				_logger.error(`internal blob with no activate: ${this.id.id}`,this);
				break;
		}
		_logger.debug(`blob ${this.id.commonId} activated`);
	}
}