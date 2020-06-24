import LoggerManager from "./loggerManager";

class CommonUtilities {

  static parseJSON( strJSONToParse: string ): any {

    let result = {}; //Safe empty object

    try {

      result = JSON.parse( strJSONToParse );

    }
    catch ( error ) {

      LoggerManager.markError( "D72A94FD3E4B", error );

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

  public static isValidDateInFormat01( strDate: string ): boolean {

    let bResult = false;

    try {

      const regExp = /^\d{4}-\d{2}-\d{2}$/;

      if ( strDate.match( regExp ) ) {

        const date = new Date( strDate );

        const dateAsNum = date.getTime();

        if ( dateAsNum && isNaN( dateAsNum ) === false ) {

          bResult = date.toISOString().slice( 0,10 ) === strDate;

        }

      }

    }
    catch ( error ) {

      //

    }

    return bResult;

  }

}

export default CommonUtilities;
