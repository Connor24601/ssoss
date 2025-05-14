
export class Panel extends HTMLElement {
    constructor(x:string="10%", y:string="10%",height:string="80%",width:string="80%")
    {
        super();
        this.className="panel";
        this.style.top = y;
        this.style.left = x;
        this.style.width=width;
        this.style.height=height;
        
    }    
}