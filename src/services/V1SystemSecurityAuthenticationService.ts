//import CommonUtilities from "../utils/commonUtilities";
const axios = require( "axios" );

const debug = require( "debug" )( "V1SystemSecurityAuthenticationService" );

class V1SystemSecurityAuthenticationService {

  static async callLogin( backend: any,
                          headers: any,
                          strUsername: string,
                          strPassword: string,
                          logger: any ): Promise<{ input: any, output: any }> {

    const result: any = {

      input: null,
      output: null

    };

    try {

      const body: any = {

        Username: strUsername,
        Password: strPassword

      };

      const options: any = {

        method: "POST",
        headers,
        data: body,

        validateStatus: () => {

          return true;

        }

      };

      let strRequestURI = `${backend.protocol}${backend.host}:${backend.port}${backend.rootPath}`;

      strRequestURI += "/v1/system/security/authentication/login";

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

      result.output.Backend = backend.backend; //Transfer back the backend for this login

      options.body = body;

      result.input = options;

    }
    catch ( error ) {

      const strMark = "1DFC6EF03869";

      const debugMark = debug.extend( strMark );

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );

      error.mark = strMark;

      if ( logger && typeof logger.error === "function" ) {

        logger.error( error );

      }

    }

    return result;

  }

  static async callTokenCheck( backend: any,
                               headers: any,
                               logger: any ): Promise<{ input: any, output: any }> {

    const result: any = {

      input: null,
      output: null

    };

    try {

      const options: any = {

        method: "POST",
        headers,
        data: null,

        validateStatus: () => {

          return true;

        }

      };

      let strRequestURI = `${backend.protocol}${backend.host}:${backend.port}${backend.rootPath}`;

      strRequestURI += "/v1/system/security/authentication/token/check";

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

      result.input = options;

    }
    catch ( error ) {

      const strMark = "DD5EBFB4BDEE";

      const debugMark = debug.extend( strMark );

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );

      error.mark = strMark;

      if ( logger && typeof logger.error === "function" ) {

        logger.error( error );

      }

    }

    return result;

  }

  static async callLogout( backend: any,
                           headers: any,
                           logger: any ): Promise<{ input: any, output: any }> {

    const result: any = {

      input: null,
      output: null

    };

    try {

      const options: any = {

        method: "POST",
        headers,
        data: null, //JSON.stringify( body ),

        validateStatus: () => {

          return true;

        }

      };

      let strRequestURI = `${backend.protocol}${backend.host}:${backend.port}${backend.rootPath}`;

      strRequestURI += "/v1/system/security/authentication/logout";

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

      result.input = options;

    }
    catch ( error ) {

      const strMark = "88DD50269849";

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

export default V1SystemSecurityAuthenticationService;
