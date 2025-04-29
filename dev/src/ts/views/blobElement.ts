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
		this.element.innerHTML = "<img src=\"https://raw.githubusercontent.com/EliverLara/candy-icons/87a639d77c4ba47b467c5a45110cc099d4d9fbd1/apps/scalable/spotify-client.svg\"/>";
		console.log(this.element);	
	}

	get() : HTMLElement
	{
		return this.element;
	}

}