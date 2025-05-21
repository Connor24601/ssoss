import content from "../../assets/icon/settings.svg";
import { BlobMetaData } from "../blob/BlobMetaData.js";
import { ContentBlob, ControlBlob, WebBlob } from '../blob/ContentBlob.js';
import { BlobId, BlobType, Constants } from "../resources/constants.js";
import { ServiceProvider } from "../util/ServiceProvider.js";
import { Panel } from "./components/panel.js";
const _logger = ServiceProvider.logService.createNewLogger("blobElement");

export class PseudoBlob extends HTMLElement {
	containsBlob:boolean=false;
	constructor()
	{
		super();
	}
}

export class BlobElement extends PseudoBlob
{
	override containsBlob:boolean=true;
	blob!:ContentBlob;
	metaData?:BlobMetaData;
	scale:number=1;
	optionsPanel?:Panel;


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
			// empty image
			this.innerHTML = `<img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" width="0" height="0" alt="settings" />`;
		}
		
		this.onkeyup = (event)=>{
						if ((Constants.yesKeyCodes.has(event.code.toLowerCase())))
						{
							this.blob.activate();
						}};
		this.addEventListener("auxclick", this.onAux);
		this.addEventListener("contextmenu",this.onAux);
		this.addEventListener("dblclick",this.onAux);
		this.addEventListener("submit",this.onActivate);
		this.addEventListener("click",this.onActivate);
		this.addEventListener("tap",this.onActivate);
		this.addEventListener("focusout",this.dismiss);
		
		this.tabIndex=0;
	}

	setScale(scale:number)
	{
		this.scale = scale;
		this.style.scale = `${this.scale}`;
	}
	inspect() : void
	{
		if (this.blob.type == BlobType.internal)
		{
			console.info(`Different inspect operation requested for ${this.blob.id.commonId}`);
			(this.blob as ControlBlob).altActivate();
			return;
		}

		this.focus();
		
		let x = `${this.getBoundingClientRect().x + this.getBoundingClientRect().width}px`;
		let y = `${this.getBoundingClientRect().y}px`;
		if (this.optionsPanel == undefined)
		{
			this.optionsPanel = new Panel(x,y,`${this.getBoundingClientRect().height}px`,`${this.getBoundingClientRect().width/2}px`);
			this.appendChild(this.optionsPanel);
		}
		else
		{
			_logger.debug(`panel already opened: ${event?.type}`);
		}
		
	}
	dismiss(this:HTMLElement, ev:Event) : void {
		let blobElement = this as BlobElement;
		if (blobElement.blob.type == BlobType.internal)
		{
			console.info(`Different dismiss requested for ${blobElement.blob.id.commonId}`);
			(blobElement.blob as ControlBlob).dismiss();
			return;
		}
		
		_logger.info(`dismissing panel for blob ${blobElement.blob.defaultName}`);
		if (blobElement.optionsPanel != undefined)
		{
			_logger.info("found and dismissing panel");
			blobElement.optionsPanel.remove();
			blobElement.optionsPanel = undefined;
		}
		else
		{
			_logger.info("panel not found on blob:",blobElement);
		}
		
	}


	onActivate(this:HTMLElement, ev:Event) : void
	{
		let blobElement = this as BlobElement;
		_logger.silly(`blob ${blobElement.blob.defaultName} request activate`);
		blobElement.blob.activate();
	}

	onAux(this:HTMLElement, ev:Event) : void
	{
		ev.preventDefault();
		let blobElement = this as BlobElement;
		if (blobElement.optionsPanel)
		{
			_logger.silly(`blob ${blobElement.blob.defaultName} not duplicating aux click`);
			return;
		}
		_logger.silly(`aux click registered on ${blobElement.blob.defaultName}`);
		blobElement.inspect();

	}

}