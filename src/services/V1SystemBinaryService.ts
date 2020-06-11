//import CommonUtilities from "../utils/commonUtilities";
const axios = require( "axios" );

const debug = require( "debug" )( "V1SystemBinaryService" );

class V1SystemBinaryService {

  static async callCreateAuth( backend: any,
                               headers: any,
                               logger: any ): Promise<{ input: any, output: any }> {

    const result: any = {

      input: null,
      output: null

    };

    try {

      const options: any = {

        method: "POST",
        body: null,
        headers

      };

      let strRequestPath = `${backend.protocol}${backend.host}:${backend.port}${backend.rootPath}`;

      strRequestPath += "/v1/system/binary/auth";

      const callResult = await axios( strRequestPath,
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

      result.input = options;

    }
    catch ( error ) {

      const strMark = "1316C841F830";

      const debugMark = debug.extend( strMark );

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );

      error.mark = strMark;

      if ( logger && typeof logger.error === "function" ) {

        logger.error( error );

      }

    }

    return result;

  }

  static async callUploadBinaryData( backend: any,
                                     headers: any,
                                     body: any,
                                     uploadCallback: any,
                                     logger: any ): Promise<{ input: any, output: any }> {

    const result: any = {

      input: null,
      output: null

    };

    try {

      const options: any = {

        method: "POST",
        //body,
        headers,

        onUploadProgress: ( progressEvent: any ) => {

          uploadCallback && uploadCallback( progressEvent );

        }

      };

      let strRequestPath = `${backend.protocol}${backend.host}:${backend.port}${backend.rootPath}`;

      strRequestPath += "/v1/system/binary";

      const callResult = await axios.post( strRequestPath,
                                           body,
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

      options.body = body;

      result.input = options;

    }
    catch ( error ) {

      const strMark = "7534D72B3364";

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

export default V1SystemBinaryService;
