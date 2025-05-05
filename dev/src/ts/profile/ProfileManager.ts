import { ServiceProvider } from "../util/ServiceProvider.js";




export class ProfileManager
{
    _logger = ServiceProvider.logService.logger;
    constructor() {

    }

    loadFromStorage() {
        localStorage.getItem("profiles");
    }

}