import axios from "axios";

//import CommonUtilities from "../utils/commonUtilities";
import LoggerManager from "../utils/loggerManager";

//const debug = require( "debug" )( "V1BusinessDev001Service" );

class V1BusinessDev001Service {

  static async callGetEstablishment( backend: any,
                                     headers: any,
                                     logger: any ): Promise<{ input: any, output: any } | Error> {

    let result: any = {

      input: null,
      output: null

    };

    try {

      const options: any = {

        method: "GET",
        headers,

        validateStatus: () => {

          return true;

        }

      };

      const strRequestURL = backend.url[ 0 ] + "/v1/business/dev001/odin/establishment";

      const callResult = await axios( strRequestURL,
                                      options );

      result.output = callResult ? {
        status: callResult.status,
        statusText: callResult.statusText,
        body: callResult.data
      } :
        {
          status: null,
          statusText: null,
          body: {
            Code: ""
          }
        };

      //options.body = body;

      result.input = options;

    }
    catch ( error ) {

      LoggerManager.markError( "BD0F35A8BC74", error );

      result = error;

      /*
      const strMark = "A71C4DB721ED";

      const debugMark = debug.extend( strMark );

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );

      error.mark = strMark;

      if ( logger && typeof logger.error === "function" ) {

        logger.error( error );

      }
      */

    }

    return result;

  }

  static async callStartUpdateTipJob( backend: any,
                                      headers: any,
                                      body: any ): Promise<{ input: any, output: any } | Error> {

    let result: any = {

      input: null,
      output: null

    };

    try {

      const options: any = {

        method: "PUT",
        headers,
        data: body,

        validateStatus: () => {

          return true;

        }

      };

      const strRequestURL = backend.url[ 0 ] + "/v1/business/dev001/odin/order/tip";

      const callResult = await axios( strRequestURL,
                                      options );

      result.output = callResult ? {
        status: callResult.status,
        statusText: callResult.statusText,
        body: callResult.data
      } :
        {
          status: null,
          statusText: null,
          body: {
            Code: ""
          }
        };

      //options.body = body;

      result.input = options;

    }
    catch ( error ) {

      LoggerManager.markError( "07CAA3973707", error );

      result = error;

      /*
      const strMark = "A71C4DB721ED";

      const debugMark = debug.extend( strMark );

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );

      error.mark = strMark;

      if ( logger && typeof logger.error === "function" ) {

        logger.error( error );

      }
      */

    }

    return result;

  }


  static async callGetUpdateTipJobStatus( backend: any,
                                          headers: any,
                                          queryParams: any ): Promise<{ input: any, output: any } | Error> {

    let result: any = {

      input: null,
      output: null

    };

    try {

      const options: any = {

        method: "GET",
        headers,

        validateStatus: () => {

          return true;

        }

      };

      const strRequestURL = backend.url[ 0 ] + `/v1/business/dev001/odin/order/tip?Id=${queryParams.Id}&Output=${queryParams.Output}`;

      const callResult = await axios( strRequestURL,
                                      options );

      result.output = callResult ? {
        status: callResult.status,
        statusText: callResult.statusText,
        body: callResult.data
      } :
        {
          status: null,
          statusText: null,
          body: {
            Code: ""
          }
        };

      //options.body = body;

      result.input = options;

    }
    catch ( error ) {

      LoggerManager.markError( "A9B609B9575C", error );

      result = error;

      /*
      const strMark = "6328B772B17E";

      const debugMark = debug.extend( strMark );

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );

      error.mark = strMark;

      if ( logger && typeof logger.error === "function" ) {

        logger.error( error );

      }
      */

    }

    return result;

  }

}

export default V1BusinessDev001Service;
