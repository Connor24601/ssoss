import content from "../../assets/icon/settings.svg";
import { BlobMetaData } from "../blob/BlobMetaData.js";
import { ContentBlob, WebBlob } from '../blob/ContentBlob.js';
import { BlobId, BlobType } from "../resources/constants.js";
import { ServiceProvider } from "../util/ServiceProvider.js";
const _logger = ServiceProvider.logService.logger;

export class BlobElement extends HTMLElement
{
	//get : () => HTMLElement;
	blob!:ContentBlob;
	metaData?:BlobMetaData;
	scale:number=1;


	constructor (blob: ContentBlob)
	{
		super();
		_logger.silly(`instanceation of blob element ${blob.id}`);
		this.blob = blob;
		this.id = this.blob.id.commonId ?? this.blob.defaultName;
		let iconUrl!:string;
		switch (blob.id.commonId) {
			case "spotify":
				iconUrl = "https://raw.githubusercontent.com/EliverLara/candy-icons/87a639d77c4ba47b467c5a45110cc099d4d9fbd1/apps/scalable/spotify-client.svg";
				break;
			case "youtube":
				iconUrl = "https://raw.githubusercontent.com/EliverLara/candy-icons/refs/heads/master/apps/scalable/youtube.svg";
				break;
			case "steam":
				iconUrl = "https://raw.githubusercontent.com/EliverLara/candy-icons/refs/heads/master/apps/scalable/steam.svg";
				break;
			default:
				_logger.debug(`comId: ${blob.id.commonId}`);
				break;
		}
		this.innerHTML = `<img src=\"${iconUrl}\"/>`;
		if (blob.id.commonId=="settings")
		{
			this.innerHTML = `<img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" width="0" height="0" alt="" />`;
		}
		this.addEventListener("auxclick", this.onAux);
		
		this.tabIndex=0;
	}

	setScale(scale:number)
	{
		this.scale = scale;
		this.style.scale = `${this.scale}`;
	}
	inspect() : void
	{
		
	}

	onAux(this:HTMLElement, ev:MouseEvent) : void
	{
		_logger.info("aux");
		
		let blobElement = this as BlobElement;
		blobElement.inspect();

	}

}