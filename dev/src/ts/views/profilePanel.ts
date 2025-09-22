import { Profile } from "../profile/Profile.js";
import { ServiceProvider } from "../util/ServiceProvider.js";
import { Panel } from "./components/panel.js";
const _logger = ServiceProvider.logService.createNewLogger("profilePanel");
export class ProfilePanel extends HTMLElement
{
    usingProfiles:boolean=true;
    panel?:Panel;
    profilePic?:HTMLImageElement;

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
        this.profilePic.id = "profilePicture";
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
        ProfilePanel.singletonInstance.profilePic!.src=profile.profilePicture?.toString() || "";
    }

}