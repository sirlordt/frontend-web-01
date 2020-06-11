
const debug = require( "debug" )( "CommonUtilities" );

class CommonUtilities {

  static parseJSON( strJSONToParse: string, logger: any ): any {

    let result = {}; //Safe empty object

    try {

      result = JSON.parse( strJSONToParse );

    }
    catch ( error ) {

      const strMark = "D72A94FD3E4B";

      const debugMark = debug.extend( strMark );

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );

      error.mark = strMark;

      if ( logger && typeof logger.error === "function" ) {

        logger.error( error );

      }

    }

    return result;

  }

  static getCurrentTimeZoneId(): any {

    const strResult = Intl && Intl.DateTimeFormat().resolvedOptions().timeZone;

    return strResult;

  }

}

export default CommonUtilities;
