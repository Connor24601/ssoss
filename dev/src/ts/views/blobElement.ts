import content from "../../assets/icon/settings.svg";

export class BlobElement
{
	element!: HTMLElement;
	id! : string;
	//get : () => HTMLElement;



	constructor (id: string)
	{
		//console.log("I am a blob: ");
		this.id = id;
		this.element = document.createElement("blob");
		this.element.setAttribute("id", id);
		let iconUrl!:string;
		switch (id) {
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
				break;
		}
		this.element.innerHTML = `<img src=\"${iconUrl}\"/>`;
		if (id=="settings")
		{
			this.element.innerHTML = ``;
		}
	}

	get() : HTMLElement
	{
		return this.element;
	}

}