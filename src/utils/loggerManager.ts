
import debug from "debug";
//import Bugsnag from "@bugsnag/js";
//import BugsnagPluginReact from "@bugsnag/plugin-react";
//import * as Sentry from '@sentry/browser';
import Rollbar from "rollbar";

import info from "../info.json";
//import { Integrations } from "@sentry/browser";

export default class LoggerManager {

  static mainLoggerInstance: any = null;

  static ERROR(): number { return 3; }
  static WARN(): number  { return 4; }
  static INFO(): number  { return 5; }
  static DEBUG(): number { return 6; }

  static level: number = LoggerManager.ERROR();
  static strLastMark: string = "";
  static lastDebugMark = null;

  static createMainLogger() {

    if ( process.env.REACT_APP_USE_LOGGER === "1" &&
         process.env.REACT_APP_LOG_TO !== "" ) {

      if ( process.env.REACT_APP_LOG_LEVEL === "debug" ) {

        LoggerManager.level = this.DEBUG();

      }
      else if ( process.env.REACT_APP_LOG_LEVEL === "info" ) {

        LoggerManager.level = this.INFO();

      }
      else if ( process.env.REACT_APP_LOG_LEVEL === "warn" ) {

        LoggerManager.level = this.WARN();

      }
      else {

        LoggerManager.level = this.ERROR();

      }

      /*
      if ( process.env.REACT_APP_LOG_TO.includes( "#bugsnag#" ) ) {

        Bugsnag.start({
          apiKey: process.env.REACT_APP_BUGSNAP_API_KEY,
          plugins: [ new BugsnagPluginReact() ],
          appVersion: info.release
        });

      }

      if ( process.env.REACT_APP_LOG_TO.includes( "#sentry#" ) ) {

        Sentry.init({
          dsn: process.env.REACT_APP_SENTRY_API_KEY,
          integrations: [
            Sentry.Integrations.CaptureConsole({
              levels: ['error']
            })
          ],
          release: info.release,
        });

      }
      */

     if ( process.env.REACT_APP_LOG_TO.includes( "#rollbar#" ) ) {

      let strEnviroment = info.reactScript;

      if ( info.reactScript === "start" ) {

        strEnviroment = "develop:" + process.env.REACT_APP_DEVELOPER_CONTEXT;

      }
      else {

        strEnviroment = strEnviroment + ":" + process.env.REACT_APP_DEVELOPER_CONTEXT;

      }

      this.mainLoggerInstance = new Rollbar({

        accessToken: process.env.REACT_APP_ROLLBAR_API_KEY,
        captureUncaught: true,
        captureUnhandledRejections: true,
        version: info.release,
        captureIp: true,

        payload: {

          environment: strEnviroment,
          context: process.env.REACT_APP_DEVELOPER_CONTEXT,
          client: {
            javascript: {
              source_map_enabled: true,
              code_version: info.release,
            },
          },

        }

      });

    }

    }

  }

  static log( intLevel: number, strMark: string, dataToLog: any ) {

    if ( intLevel <= LoggerManager.level &&
         process.env.REACT_APP_LOG_TO ) {

      if ( process.env.REACT_APP_LOG_TO.includes( "#console#" ) ) {

        if ( intLevel === this.ERROR() ) {

          let debugMark = null;

          if ( this.strLastMark === strMark &&
               this.lastDebugMark ) {

            debugMark = this.lastDebugMark;

          }
          else {

            debugMark = debug( strMark );
            this.lastDebugMark = debugMark;
            this.strLastMark = strMark;

          }

          if ( dataToLog instanceof Error ) {

            debugMark( "Error message: [%s]", dataToLog.message ? dataToLog.message : "No error message available" );
            debugMark( "%O", dataToLog );

          }
          else if ( dataToLog instanceof Object ) {

            debugMark( "%O", dataToLog );

          }
          else {

            debugMark( dataToLog );

          }

        }
        else if ( intLevel === this.WARN() ) {

          let debugMark = null;

          if ( this.strLastMark === strMark &&
               this.lastDebugMark ) {

            debugMark = this.lastDebugMark;

          }
          else {

            debugMark = debug( strMark );
            this.lastDebugMark = debugMark;

          }

          if ( dataToLog instanceof Object ) {

            debugMark( "%O", dataToLog );

          }
          else {

            debugMark( dataToLog );

          }

        }
        else if ( intLevel === this.INFO() ) {

          let debugMark = null;

          if ( this.strLastMark === strMark &&
               this.lastDebugMark ) {

            debugMark = this.lastDebugMark;

          }
          else {

            debugMark = debug( strMark );
            this.lastDebugMark = debugMark;

          }

          if ( dataToLog instanceof Object ) {

            debugMark( "%O", dataToLog );

          }
          else {

            debugMark( dataToLog );

          }

        }
        else if ( intLevel === this.DEBUG() ) {

          let debugMark = null;

          if ( this.strLastMark === strMark &&
              this.lastDebugMark ) {

            debugMark = this.lastDebugMark;

          }
          else {

            debugMark = debug( strMark );
            this.lastDebugMark = debugMark;

          }

          if ( dataToLog instanceof Object ) {

            debugMark( "%O", dataToLog );

          }
          else {

            debugMark( dataToLog );

          }

        }

      }

      /*
      if ( process.env.REACT_APP_LOG_TO.includes( "#bugsnag#" ) ) {

        / *
        if ( dataToLog instanceof Error ||
             dataToLog instanceof Object ) {

          ( dataToLog as any ).Mark = strMark; //Inject the mark to error object

        }
        * /

        if ( dataToLog instanceof Error ) {

          Bugsnag.addMetadata( "mark", { "value": strMark } );
          Bugsnag.notify( dataToLog )
          Bugsnag.clearMetadata( "mark" );

        }
        else if ( dataToLog instanceof Object ) {

          dataToLog.Mark = strMark; //Inject the mark to error object
          Bugsnag.leaveBreadcrumb( dataToLog );

        }
        else { //if ( dataToLog instanceof String ) {

          Bugsnag.leaveBreadcrumb( strMark + ":" + dataToLog );

        }

      }

      if ( process.env.REACT_APP_LOG_TO.includes( "#sentry#" ) ) {

        if ( dataToLog instanceof Error ) {

          Sentry.captureException( dataToLog, { contexts: { "mark": strMark } } );

        }
        else if ( dataToLog instanceof Object ) {

          dataToLog.Mark = strMark; //Inject the mark to error object
          Sentry.captureEvent( dataToLog );

        }
        else { //if ( dataToLog instanceof String ) {

          Sentry.captureMessage( dataToLog );
          //Bugsnag.leaveBreadcrumb( contextsstrMark + ":" + dataToLog );

        }

      }
      */

      if ( process.env.REACT_APP_LOG_TO.includes( "#rollbar#" ) ) {

        if ( intLevel === this.ERROR() ) {

          if ( typeof dataToLog === 'string' ) {

            this.mainLoggerInstance.error( strMark + ":" + dataToLog );

          }
          else {

            dataToLog.Mark = strMark; //Inject the mark to error object
            this.mainLoggerInstance.error( dataToLog );

          }

        }
        else if ( intLevel === this.WARN() ) {

          if ( typeof dataToLog === 'string' ) {

            this.mainLoggerInstance.warning( strMark + ":" + dataToLog );

          }
          else {

            //dataToLog.Mark = strMark; //Inject the mark to error object
            this.mainLoggerInstance.warning( strMark + ":" + JSON.stringify( dataToLog ) );

          }

        }
        else if ( intLevel === this.INFO() ) {

          if ( typeof dataToLog === 'string' ) {

            this.mainLoggerInstance.info( strMark + ":" + dataToLog );

          }
          else {

            //dataToLog.Mark = strMark; //Inject the mark to error object
            this.mainLoggerInstance.info( strMark + ":" + JSON.stringify( dataToLog ) );

          }

        }
        else if ( intLevel === this.DEBUG() ) {

          if ( typeof dataToLog === 'string' ) {

            this.mainLoggerInstance.debug( strMark + ":" + dataToLog );

          }
          else {

            //dataToLog.Mark = strMark; //Inject the mark to error object
            this.mainLoggerInstance.debug( strMark + ":" + JSON.stringify( dataToLog ) );

          }

        }

      }

    }

  }

  static mark( strMark: string ) {

    this.lastDebugMark = debug( strMark );
    this.strLastMark = strMark;

  }

  static error( dataToLog: any ) {

    this.markError( this.strLastMark, dataToLog );

  }

  static warn( dataToLog: any ) {

    this.markWarn( this.strLastMark, dataToLog );

  }

  static info( dataToLog: any ) {

    this.markInfo( this.strLastMark, dataToLog );

  }

  static debug( dataToLog: any ) {

    this.markDebug( this.strLastMark, dataToLog );

  }

  static markError( strMark: string, dataToLog: any ) {

    LoggerManager.log( LoggerManager.ERROR(), strMark, dataToLog );

  }

  static markWarn( strMark: string, dataToLog: any ) {

    LoggerManager.log( LoggerManager.WARN(), strMark, dataToLog );

  }

  static markInfo( strMark: string, dataToLog: any ) {

    LoggerManager.log( LoggerManager.INFO(), strMark, dataToLog );

  }

  static markDebug( strMark: string, dataToLog: any ) {

    LoggerManager.log( LoggerManager.DEBUG(), strMark, dataToLog );

  }

}
