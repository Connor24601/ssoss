import { Constants } from "../resources/constants.js";
import { Profile } from "../profile/Profile.js";
import { ServiceProvider } from "../util/ServiceProvider.js";
import { Panel } from "./components/panel.js";
const _logger = ServiceProvider.logService.createNewLogger("profilePanel");
export class ProfilePanel extends HTMLElement
{
    _usingProfiles:boolean=true;
    get usingProfiles():boolean {return this._usingProfiles;};
    set usingProfiles(val:boolean) {
        let me = ProfilePanel.singletonInstance; // this keyword not accessible from callback
        me._usingProfiles = val;
        if (val)
        {
            me.style.cssText = "opacity:100%";
        }
        else
        {
            me.style.cssText= "opacity:0%";
        }

        _logger.info(me.style.cssText);
    }
    panel?:Panel;
    profilePic?:HTMLElement;

    static singletonInstance:ProfilePanel;
    
    constructor()
    {
        if (ProfilePanel.singletonInstance != undefined)
        {
            _logger.error("Profile panel already initialized");
            return;
        }
        super();
        ProfilePanel.singletonInstance = this;
        ServiceProvider.profileService.registerWhenInitialized(this.setup);
    }

    activate() : void
    {
        this.showPopover();
        const rect = this.getBoundingClientRect();
        
        _logger.error(`values: ${rect.x} ${rect.y}, ${rect.width}, ${rect.height}, ${rect.bottom}, ${rect.right}`);
        const dropdown = new Panel("0", `0`,`3em`,`5em`);
        dropdown.setAttribute("position", "relative");
        dropdown.setAttribute("z-level", "-1");

        this.appendChild(dropdown);
    }

    onActivate(this:HTMLElement, ev:Event) : void
    {
        (this as ProfilePanel).activate();
    }
    
    onAux(this:HTMLElement, ev:Event) : void
	{
		ev.preventDefault();
    }


    public setup() // called after profile service initializes
    {
        _logger.info(`setting up profile system`);
        let me = ProfilePanel.singletonInstance; // this keyword not accessible from callback
        let profile = ServiceProvider.profileService.activeProfile ?? ServiceProvider.profileService.defaultProfile;
        if (!ProfilePanel.singletonInstance.usingProfiles || profile == undefined)
        {
            _logger.info(`user is not using profiles: current profile ${profile?.id}`);
            return;
        }
        me.profilePic = document.createElement("img");
        me.id = "profile";
        me.className = "blob";
        me.profilePic.innerHTML='';
        me.profilePic.id = `profilePicture_${profile.id}`;
        if (profile == ServiceProvider.profileService.defaultProfile)
        {
            me.profilePic = document.createElement("div");
            me.profilePic.innerHTML =  
            `<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 48 48">
                <line x1="24" y1="4" x2="24" y2="44" stroke="#AAAAAA" fill="#AAAAAA" stroke-width="4" stroke-linecap="round"/>
                <line x1="4" y1="24" x2="44" y2="24" stroke="#AAAAAA" fill="#AAAAAA" stroke-width="4" stroke-linecap="round"/>
            </svg>`;

        }
        me.hidden = false;
        me.profilePic.className = "profilePicture";
        me.appendChild(me.profilePic);
        
        me.onkeyup = (event)=>{
            if ((Constants.yesKeyCodes.has(event.code.toLowerCase())))
            {
                me.activate();
            }
        };
        me.addEventListener("auxclick", me.onAux);
        me.addEventListener("contextmenu",me.onAux);
        me.addEventListener("dblclick",me.onAux);
        me.addEventListener("submit",me.onActivate);
        me.addEventListener("click",me.onActivate);
        me.addEventListener("tap",me.onActivate);
        
        (me.profilePic! as HTMLImageElement).src=profile.profilePicture?.toString() || "";
        const nameLabel = document.createElement("b");
        nameLabel.textContent = profile.nickname ?? profile.name;
        ProfilePanel.singletonInstance.appendChild(nameLabel);
    }

}