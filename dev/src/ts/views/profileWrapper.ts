import { ProfilePanel } from "./profilePanel.js";
import { ServiceProvider } from "../util/ServiceProvider.js";
import { Panel } from "./components/panel.js";
import { Constants, ProfileId, StorageKeys, StorageLocation } from "../resources/constants.js";
const _logger = ServiceProvider.logService.createNewLogger("profileWrapper");
export class ProfileWrapper extends HTMLButtonElement
{
    static singleton:ProfileWrapper;
    _usingProfiles:boolean=true;
    active?:ProfilePanel;
    switchable:Set<ProfilePanel> = new Set<ProfilePanel>();
    dropdown?:Panel;
    
        get usingProfiles():boolean {return ProfileWrapper.singleton._usingProfiles;};
        set usingProfiles(val:boolean) {
            //let me = ProfileWrapper.singleton; // this keyword not accessible from callback
            if (!ProfileWrapper.singleton)
            {
                return;
            }
            ProfileWrapper.singleton._usingProfiles = val; // TODO: move to profileManager once streams work
            if (val)
            {
                ProfileWrapper.singleton.style.cssText = "opacity:100%";
            }
            else
            {
                ProfileWrapper.singleton.style.cssText= "opacity:0%";
            }
            ServiceProvider.storage(StorageLocation.localStorage).set<boolean>(StorageKeys.usingProfileService, val);
            _logger.info(ProfileWrapper.singleton.style.cssText);
        }

    constructor() {
        super();
        this.usingProfiles = ServiceProvider.storage(StorageLocation.localStorage).get<boolean>(StorageKeys.usingProfileService) || true;
        if (ProfileWrapper.singleton != undefined)
        {
            _logger.fatal("singleton ProfileWrapper already exists");
            return;
        }
        ProfileWrapper.singleton = this;
        this.active = new ProfilePanel(ServiceProvider.profileService.activeProfile?.id ?? ProfileId.default);
        this.appendChild(this.active);
        this.id = "profile";
    }

    activate(panel?:ProfilePanel) : void
        {
            _logger.info("profileWrapper clicked");
            
            if (this.dropdown == undefined)
            {
                const rect = this.getBoundingClientRect();
            
                _logger.info(`values: ${rect.x} ${rect.y}, ${rect.width}, ${rect.height}, ${rect.bottom}, ${rect.right}`);
                this.dropdown = new Panel(`-${5}px`, `${rect.y + rect.height/2 + 10}px`,`5em`,`${rect.width-35}px`);
                this.dropdown
                this.dropdown.style = "width: 5em; height: 5em;";

            }
            else
            {
                _logger.info("unsetting dropdown");
                this.removeChild(this.dropdown);
                this.dropdown = undefined;
                return;
            }
            this.appendChild(this.dropdown);
        }
    
        onActivate(this:HTMLButtonElement, ev:Event) : void
        {
            (this as ProfileWrapper).activate();
        }
        
        onAux(this:HTMLButtonElement, ev:Event) : void
        {
            ev.preventDefault();
        }

}