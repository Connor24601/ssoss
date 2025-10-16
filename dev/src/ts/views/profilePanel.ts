import { Constants, ProfileId, StorageKeys, StorageLocation } from "../resources/constants.js";
import { Profile } from "../profile/Profile.js";
import { ServiceProvider } from "../util/ServiceProvider.js";
import { Panel } from "./components/panel.js";
import { ProfileWrapper } from "./profileWrapper.js";
const _logger = ServiceProvider.logService.createNewLogger("profilePanel");
export class ProfilePanel extends HTMLElement
{
    _usingProfiles:boolean=true;

    panel?:Panel;
    profilePic?:HTMLElement;
    
    constructor(profileId:ProfileId)
    {
        super();
        this.className = "profile";
        this.id = `${profileId.id}`;
        const profile:Profile = ServiceProvider.profileService.byId(profileId) ?? ServiceProvider.profileService.defaultProfile;
        this.profilePic = document.createElement("img");
        this.id = `profile_${profile.id}`;
        this.profilePic.innerHTML='';
        this.profilePic.id = `profilePicture_${profile.id}`;
        if (profile == ServiceProvider.profileService.defaultProfile)
        {
            this.profilePic = document.createElement("div");
            this.profilePic.innerHTML =  
            `<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 48 48">
                <line x1="24" y1="4" x2="24" y2="44" stroke="#AAAAAA" fill="#AAAAAA" stroke-width="4" stroke-linecap="round"/>
                <line x1="4" y1="24" x2="44" y2="24" stroke="#AAAAAA" fill="#AAAAAA" stroke-width="4" stroke-linecap="round"/>
            </svg>`;

        }
        this.profilePic.className = "profilePicture";
        this.appendChild(this.profilePic);
        
        this.onkeyup = (event)=>{
            if ((Constants.yesKeyCodes.has(event.code.toLowerCase())))
            {
                this.activate();
            }
        };
        this.addEventListener("auxclick", this.onAux);
        this.addEventListener("contextmenu",this.onAux);
        this.addEventListener("dblclick",this.onAux);
        this.addEventListener("submit",this.onActivate);
        this.addEventListener("click",this.onActivate);
        this.addEventListener("tap",this.onActivate);
        
        (this.profilePic! as HTMLImageElement).src=profile.profilePicture?.toString() || "";
        const nameLabel = document.createElement("b");
        nameLabel.textContent = profile.nickname ?? profile.name;
        this.appendChild(nameLabel);
    }

    activate() : void
    {
       _logger.info(`${this.id} clicked`);
       ProfileWrapper.singleton.activate(this);
    }

    onActivate(this:HTMLElement, ev:Event) : void
    {
        (this as ProfilePanel).activate();
    }
    
    onAux(this:HTMLElement, ev:Event) : void
	{
		ev.preventDefault();
    }
}
