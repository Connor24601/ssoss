import { ServiceProvider } from "../../util/ServiceProvider.js";

const _logger = ServiceProvider.logService.createNewLogger("panel");
export class Panel extends HTMLElement {
    constructor(x:string="10%", y:string="10%",height:string="80%",width:string="80%")
    {
        super();
        try
        {
            this.className="panel";
            this.style.top = y;
            this.style.left = x;
            this.style.width=width;
            this.style.height=height;
        }
        catch (error)
        {
            _logger.warn("Could not create panel:",error);
        }
        
        
    }
}