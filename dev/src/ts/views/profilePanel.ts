import { Profile } from "../profile/Profile.js";
import { ServiceProvider } from "../util/ServiceProvider.js";
import { Panel } from "./components/panel.js";
const _logger = ServiceProvider.logService.createNewLogger("profilePanel");
export class ProfilePanel extends HTMLElement
{
    usingProfiles:boolean=true;
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
        
        this.profilePic = document.createElement("img");
        this.id = "profile";
        this.className = "blob";
        this.profilePic.innerHTML='';
        this.profilePic.id = `profilePicture_${ServiceProvider.profileService.activeProfile?.id}`;
        if (ServiceProvider.profileService.activeProfile == ServiceProvider.profileService.defaultProfile)
        {
            this.profilePic = document.createElement("div");
            this.profilePic.id = `profilePicture_${ServiceProvider.profileService.activeProfile?.id}`;
            this.profilePic.innerHTML =  
            `<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 48 48">
                <line x1="24" y1="4" x2="24" y2="44" stroke="#AAAAAA" fill="#AAAAAA" stroke-width="4" stroke-linecap="round"/>
                <line x1="4" y1="24" x2="44" y2="24" stroke="#AAAAAA" fill="#AAAAAA" stroke-width="4" stroke-linecap="round"/>
            </svg>`;

        }
        this.profilePic.className = "profilePicture";
        this.appendChild(this.profilePic);
        ServiceProvider.profileService.registerWhenInitialized(this.setup);
    }

    public setup()
    {
        let profile = ServiceProvider.profileService.activeProfile;
        
        if (!ProfilePanel.singletonInstance.usingProfiles || profile == undefined)
        {
            _logger.info(`user is not using profiles: current profile ${profile?.id}`);
            return;
        }
        _logger.info(`loading user picture: ${profile.profilePicture?.toString()}`);
        (ProfilePanel.singletonInstance.profilePic! as HTMLImageElement).src=profile.profilePicture?.toString() || "";
        const nameLabel = document.createElement("b");
        nameLabel.textContent = profile.nickname ?? profile.name;
        ProfilePanel.singletonInstance.appendChild(nameLabel);
    }

}