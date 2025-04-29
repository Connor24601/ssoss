import { ILogObj, ILogObjMeta, Logger } from "tslog";
import * as fs from 'fs';

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
    
    async initializeLogger() {
        if (!import.meta.env.SSR) {
            this.logger.warn("running in server mode");
            this.logger = new Logger({
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