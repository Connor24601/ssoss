import { ServiceProvider } from "../util/ServiceProvider.js";

const _logger = ServiceProvider.logService.logger.getSubLogger({name:"BackgroundSVG"});
export class BackgroundSVG
{
    background:SVGElement;
    circle!:SVGCircleElement;
    maxRadius:number = 5;
    
    
    constructor()
    {
        this.background = document.createElementNS('http://www.w3.org/2000/svg','svg');
        this.background.setAttribute("id","background");
        this.setSize();
        this.createDot();
        this.generateDots(300);

    }

    setSize()
    {
        
        let heightWidthRatio = window.innerWidth / window.innerHeight;
        this.background.style.width=`100%`;
        this.background.style.height=`100%`;
    }
    createDot()
    {
        this.circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
        this.circle.setAttribute("r","2px");
        this.circle.setAttribute("fill","#FF6666");
        let anim = document.createElementNS('http://www.w3.org/2000/svg','animate');
        anim.setAttribute('attributeName','cy');
        anim.setAttribute("to","-2px");
        anim.setAttribute("from",`${window.innerHeight + this.maxRadius*2}px`);
        anim.setAttribute("dur","10s");
        anim.setAttribute("repeatCount","indefinite");
        this.circle.appendChild(anim);

    }
    generateDots(count:number)
    {
        let iteration = 0;
        while (iteration < count)
        {
            let circle = this.circle.cloneNode() as SVGCircleElement;
            let anim = this.circle.firstChild?.cloneNode() as SVGAnimateElement;
            circle.setAttribute("cx",`${Math.round(Math.random()*window.innerWidth)}px`);
            circle.setAttribute("cy",`-10px`);
            let opacityAndSize = Math.random();
            circle.setAttribute("r",`${Math.round(opacityAndSize*this.maxRadius)+1}px`);
            let opacity = Math.round(opacityAndSize * 89.4 + 10);
            let g = Math.round(Math.random()*70+29.4);
            let b = Math.round(Math.random()*30+10);
            this.circle.setAttribute("fill",`#FF${g}${b}${opacity}`);
            anim.setAttribute("begin",`${Math.random()*10}s`);
            anim.setAttribute("dur",`${Math.random()*10 + 5}s`);
            let doubleanim = anim.cloneNode() as SVGAnimateElement;
            doubleanim.setAttribute('attributeName','fill');
            doubleanim.setAttribute("from",`#FF${g}${b}${opacity}`);
            doubleanim.setAttribute("to",`#FF${g}${b}00`);
            
            circle.appendChild(anim);
            circle.appendChild(doubleanim);
            this.background.appendChild(circle);
            iteration ++;
        }
    }
}