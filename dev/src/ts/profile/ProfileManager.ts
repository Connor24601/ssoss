import { LogService } from "../util/LogService.js";

const _logger = LogService.logger;

export class ProfileManager
{
    constructor() {

    }

    loadFromStorage() {
        localStorage.getItem("profiles");
    }

}