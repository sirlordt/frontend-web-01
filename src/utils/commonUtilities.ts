
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

  static checkActionAllowed( actions: object,
                             actionsToCheck: string[],
                             strCheckMode: string = "weak" ): boolean {

    let bResult = false;

    try {

      const intActionsCount = Object.keys( actions ).length;

      if ( strCheckMode.includes( "weak" ) &&
           intActionsCount === 0 ) {

        bResult = true;

      }
      else if ( strCheckMode.includes( "and" )  &&
                intActionsCount > 0 ) {

        let bCheckResult = true;

        for ( let intIndex = 0; intIndex < actionsToCheck.length; intIndex++ ) {

          if ( !actions[ actionsToCheck[ intIndex ] ] ) {

            bCheckResult = false;
            break;

          }

        }

        bResult = bCheckResult;

      }
      else if ( strCheckMode.includes( "or" )  &&
                intActionsCount > 0 ) {

        let bCheckResult = false;

        for ( let intIndex = 0; intIndex < actionsToCheck.length; intIndex++ ) {

          if ( !actions[ actionsToCheck[ intIndex ] ] ) {

            bCheckResult = true;
            break;

          }

        }

        bResult = bCheckResult;

      }

    }
    catch ( error ) {

      bResult = false;
      //

    }

    return bResult;

  }

}

export default CommonUtilities;
