//import CommonUtilities from "../utils/commonUtilities";
const axios = require( "axios" );

const debug = require( "debug" )( "V1SystemUserService" );

class V1SystemUserService {

  static async callUserActions( backend: any,
                                headers: any,
                                logger: any ): Promise<{ input: any, output: any }> {

    const result: any = {

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

      let strRequestURI = `${backend.protocol}${backend.host}:${backend.port}${backend.rootPath}`;

      strRequestURI += "/v1/system/user/actions";

      const callResult = await axios( strRequestURI,
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

      const strMark = "52BFB9ADD895";

      const debugMark = debug.extend( strMark );

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );

      error.mark = strMark;

      if ( logger && typeof logger.error === "function" ) {

        logger.error( error );

      }

    }

    return result;

  }

}

export default V1SystemUserService;
