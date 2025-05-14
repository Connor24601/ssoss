import { ILogObj, ILogObjMeta, Logger } from "tslog";
import * as fs from 'fs';
import { ServiceProvider } from "./ServiceProvider.js";
import { Constants, StorageLocation } from "../resources/constants.js";
import { StorageService } from "./StorageService.js";
import { setInterval } from "timers/promises";

let rfs: Promise<typeof import("rotating-file-stream")>
if (import.meta.env.SSR)
{
    rfs = import("rotating-file-stream");
}
else
{
    console.log('running without rfs');
}

export enum LogLevel {
    SILLY="SILLY",
    TRACE="TRACE",
    DEBUG="DEBUG",
    INFO="INFO",
    WARN="WARN",
    ERROR="ERROR",
    FATAL="FATAL"
}

// singleton class
export class LogService
{
    minLogLevel:LogLevel = LogLevel.INFO;
    logger:Logger<ILogObj> = new Logger();
    storage?:StorageService;
    batchLogs?:any[];
    callback?:number;
    startupCache?:ILogObj[];
    logSpamCount:number = 0;

    get minLogLevelNum() : number {
        let numLevel=0;
        switch (this.minLogLevel) {
            case LogLevel.FATAL:
                numLevel++;
            case LogLevel.ERROR:
                numLevel++;
            case LogLevel.WARN:
                numLevel++;
            case LogLevel.INFO:
                numLevel++;
            case LogLevel.DEBUG:
                numLevel++;
            case LogLevel.TRACE:
                numLevel++;
            case LogLevel.SILLY:
            default:
                break;
        }
        return numLevel;
    }

    changeLogLevel(newLevel:LogLevel)
    {
        this.minLogLevel = newLevel;
        this.logger.settings.minLevel = this.minLogLevelNum;
        // we always want to report log level changes, so it has to be highest level
        this.logger.log(this.minLogLevelNum,newLevel, `log level changed to ${newLevel}`);
    }

    constructor()
    {
        // needs a call because it's async
        this.initializeLogger();
        this.logger.silly("logger constructed");
    }

    basicJSON(log:any) : any
    {
        let json = log as any;
        json.dateTime = log._meta.date;
        json.logLevel = log._meta.logLevelId;
        json.name = log._meta.name;
        delete json._meta;
        return json;
    }

    attachStorage(location:StorageLocation=StorageLocation.sessionStorage) : boolean {
        if (this.storage)
        {
            this.logger.warn(`storage ${this.storage} already exists, failing to attach`);
            return false;
        }
        this.logger.trace(`starting attempt for attaching transporter to ${location}`);
        this.storage = ServiceProvider.storage(location);
        if (!ServiceProvider.storage(location).verifyStorage())
        {
            this.logger.warn(`could not verify storage for ${location}`)
            return false;
        }
        this.logger.trace(`storage found: ${location}`);
        this.storage!.set("logs",[]);
        this.batchLogs = [];
        //console.log("concat startupCache:",this.startupCache);
        if (this.startupCache && this.startupCache?.length > 1)
        {
            let metaLog = {} as any;
            let meta = this.startupCache[0]._meta as any;
            metaLog.dateTime = meta.date;
            metaLog.logLevel = meta.logLevelId;
            metaLog.name = "meta";
            metaLog[0] = JSON.stringify(meta);
            
            this.batchLogs!.push(metaLog);
            this.batchLogs!.push(...this.startupCache!.map((log)=>this.basicJSON(log)));
        }
        //this.batchLogs!.push(...this.startupCache ?? []);
        //console.log("concat startupCache:",this.batchLogs);
        this.startupCache = undefined;
        this.logger.info(`removing transport ${this.logger.settings.attachedTransports.pop()}`);
        this.logger.attachTransport((log)=>this.batchLogs?.push(this.basicJSON(log))
        );
        if (this.callback)
        {
            this.logger.warn("found pre-existing callback!");
            window.clearInterval(this.callback!);
        }
        this.callback = window.setInterval(this.batchStorageTimer,Constants.LOG_STORAGE_TIME * 1000);
        return true;
    }

    async batchStorageTimer() : Promise<void>
    {
        if (ServiceProvider.logService.batchLogs!.length > 1000)
        {
            ServiceProvider.logService.logger.fatal("problem un-batching logs to storage!");
            window.clearInterval(ServiceProvider.logService.callback!);
            ServiceProvider.logService.batchLogs = undefined;
            return;
        }
        if (ServiceProvider.logService.batchLogs!.length > 0)
        {
            console.log(`preparing to append ${ServiceProvider.logService.batchLogs!.length} logs`);
            let logList = ServiceProvider.logService.storage!.get<ILogObj[]>("logs");
            logList!.push(...ServiceProvider.logService.batchLogs!);
            ServiceProvider.logService.batchLogs! = [];
            ServiceProvider.logService.storage!.set<ILogObj[]>("logs",logList!);
            console.log(`${logList!.length} logs stored`);
            this.logSpamCount = 0;
        }
        else {
            if (this.logSpamCount == 3)
            {
                console.trace("no log updates; stopping message spam");
            }
            else if (this.logSpamCount < 3)
            {
                console.trace("no logs to append");
            }
            this.logSpamCount++;
        }
        return;
    }
    
    async initializeLogger() {
        if (!import.meta.env.SSR) {
            this.logger.warn("running in server mode");
            this.logger = new Logger({
                name: "LogService",
                minLevel: this.minLogLevelNum,
                type: "pretty",
                hideLogPositionForProduction: true,

                overwrite: {
                    

                  transportFormatted: (logMetaMarkup, logArgs, logErrors) => 
                    {
                        // Send different log levels to appropriate console methods
                        // Extract log level from the markup
                        const logLevel = logMetaMarkup.trim().split("\t")[1]
                        .replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,'')
                        .toUpperCase();
                        switch (logLevel) {
                        case "FATAL":
                        case "ERROR":
                            console.error(logMetaMarkup, ...logArgs, ...logErrors);
                            break;
                        case "WARN":
                            console.error(logMetaMarkup, ...logArgs, ...logErrors);
                            break;
                        case "DEBUG":
                            console.log(logMetaMarkup, ...logArgs, ...logErrors);
                            break;
                        case "TRACE":
                        case "SILLY":
                            console.trace(logMetaMarkup, ...logArgs, ...logErrors);
                            break;
                        case "INFO":
                            console.info(logMetaMarkup, ...logArgs, ...logErrors);
                            break;
                        default:
                            console.error(`unknown log type: ${logLevel} which is ${"INFO" == logLevel.toUpperCase()} :${logLevel == "INFO"}:`);
                            break;
                        }
                    }
                }
              });
              this.startupCache = [];
              this.logger.attachTransport((log:ILogObj)=>this.startupCache?.push(log));
              console.info(`styling logs: ${window.chrome != null}`)
              this.logger.settings.stylePrettyLogs = window.chrome != null;
            return;
        }
        const stream = (await rfs).createStream("logFile.log", {
            size: "10M", // rotate every 10 MegaBytes written
            interval: "1d", // rotate daily
            compress: "gzip", // compress rotated files
          });
        this.logger.attachTransport((logObj) => {
            stream.write(JSON.stringify(logObj) + "\n");
        });
        this.logger.debug("Log service initialized");
    }
    
    
};