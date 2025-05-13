
export class Search extends HTMLElement
{
    input!:HTMLInputElement;
    constructor()
    {
        super();
        this.input = document.createElement("input");
        this.input.id = "search";
        this.input.type="search";
        this.input.placeholder="search";
        //this.input.list?.append("test");
        this.input.alt="search";
        this.appendChild(this.input);
    }



}