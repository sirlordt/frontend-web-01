//import XXHash from 'xxhashjs';
//import  from "moment-timezone";
import {
  v4 as uuidv4
} from "uuid";

//import moment from "moment-timezone/builds/moment-timezone-with-data";
import moment from "moment-timezone";
//import moment from "moment";
import CommonUtilities from "./commonUtilities";

//const debug = require( "debug" )( "SystemUtilities" );

class SystemUtils {

  static getUUIDv4(): string {

    return uuidv4();

  }

  static getCurrentDateAndTime(): any {

    let result = null;

    try {

      result = moment().tz( CommonUtilities.getCurrentTimeZoneId() );

    }
    catch ( error ) {

      //

    }

    return result;

  }

  static getCurrentDateAndTimeFrom( at: any ): any {

    let result = null;

    try {

      if ( at ) {

        if ( moment( at ).isValid() ) {

          result = moment( at ).tz( CommonUtilities.getCurrentTimeZoneId() );

        }

      }

    }
    catch ( error ) {

      //

    }

    return result;

  }

  static isDateAndTimeBefore( strDateTime: string ): boolean {

    let bResult = false;

    try {

      bResult = strDateTime ? moment().tz( CommonUtilities.getCurrentTimeZoneId() ).isBefore( strDateTime ) : false;

    }
    catch ( error ) {

      //

    }

    return bResult;

  }

  static isDateAndTimeBeforeAt( strAt: string, strDateTime: string ): boolean {

    let bResult = false;

    try {

      bResult = strDateTime ? moment( strAt ).tz( CommonUtilities.getCurrentTimeZoneId() ).isBefore( strDateTime ) : false;

    }
    catch ( error ) {

      //

    }

    return bResult;

  }

  static isDateAndTimeAfter( strDateTime: string ): boolean {

    let bResult = false;

    try {

      bResult = strDateTime ? moment().tz( CommonUtilities.getCurrentTimeZoneId() ).isAfter( strDateTime ) : false;

    }
    catch ( error ) {

      //

    }

    return bResult;

  }

  static isDateAndTimeAfterAt( strAt: string, strDateTime: string ): boolean {

    let bResult = false;

    try {

      bResult = strDateTime ? moment( strAt ).tz( CommonUtilities.getCurrentTimeZoneId() ).isAfter( strDateTime ) : false;

    }
    catch ( error ) {

      //

    }

    return bResult;

  }

  static getCurrentDateAndTimeDecMinutes( intMinutes: number ): any {

    let result = null;

    try {

      result = moment().tz( CommonUtilities.getCurrentTimeZoneId() ).subtract( intMinutes, "minutes" );
      //result = moment().dec( intMinutes, "minutes" );

    }
    catch ( error ) {

      console.log( error );

    }

    return result;

  }

  static getCurrentDateAndTimeIncMinutes( intMinutes: number ): any {

    let result = null;

    try {

      result = moment().tz( CommonUtilities.getCurrentTimeZoneId() ).add( intMinutes, "minutes" );

    }
    catch ( error ) {

      //

    }

    return result;

  }

  static tokenCheckIsNeeded( authentication: any ): number {

    let intResult = 1; //Default check the status

    if ( authentication.active ) {

      if ( authentication.accounts &&
           authentication.accounts[ authentication.active ] ) {

        if ( authentication.accounts[ authentication.active ].Authorization ) {

          if ( authentication.lastCheck ) {

            const currentDateTimeMinusXMinutes = SystemUtils.getCurrentDateAndTimeDecMinutes( 1 );

            if ( SystemUtils.isDateAndTimeBeforeAt( currentDateTimeMinusXMinutes, authentication.lastCheck ) ) {

              intResult = 2; //No need to check the status

            }

          }

        }
        else {

          intResult = -1; //Invalid status maybe modified to hand using the console in the browser

        }

      }
      else {

        intResult = -1; //Invalid status maybe modified to hand using the console in the browser

      }

    }
    else {

      intResult = 0; //No check the token

    }

    return intResult;

  }

}

export default SystemUtils;
