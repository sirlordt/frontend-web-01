import axios from "axios";

//import CommonUtilities from "../utils/commonUtilities";
import LoggerManager from "../utils/loggerManager";

//const debug = require( "debug" )( "V1SystemSecurityAuthenticationService" );

class V1SystemSecurityAuthenticationService {

  static async callLogin( backend: any,
                          headers: any,
                          strUsername: string,
                          strPassword: string ): Promise<{ input: any, output: any, error: Error }> {

    let result: any = {

      input: null,
      output: null,
      error: null

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

      const strRequestURL = backend.url[ 0 ] + "/v1/system/security/authentication/login";

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

      result.output.Backend = backend.code; //Transfer back the backend for this login

      options.body = body;

      result.input = options;

    }
    catch ( error ) {

      LoggerManager.markError( "E9DEC6366C36", error );

      result.error = error;

      /*
      const strMark = "1DFC6EF03869";

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

  static async callLoginGoogle( backend: any,
                                headers: any,
                                body: any ): Promise<{ input: any, output: any, error: Error }> {

    let result: any = {

      input: null,
      output: null,
      error: null

    };

    try {

      /*
      const body: any = {

        Token: strToken

      };
      */

      const options: any = {

        method: "POST",
        headers,
        data: body,

        validateStatus: () => {

          return true;

        }

      };

      const strRequestURL = backend.url[ 0 ] + "/v1/system/security/authentication/login/google";

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

      result.output.Backend = backend.code; //Transfer back the backend for this login

      options.body = body;

      result.input = options;

    }
    catch ( error ) {

      LoggerManager.markError( "23B7E01BA381", error );

      result.error = error;

      /*
      const strMark = "1DFC6EF03869";

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

  static async callLoginFacebook( backend: any,
                                  headers: any,
                                  body: any ): Promise<{ input: any, output: any, error: Error }> {

    let result: any = {

      input: null,
      output: null,
      error: null

    };

    try {

      /*
      const body: any = {

        Token: strToken

      };
      */

      const options: any = {

        method: "POST",
        headers,
        data: body,

        validateStatus: () => {

          return true;

        }

      };

      const strRequestURL = backend.url[ 0 ] + "/v1/system/security/authentication/login/facebook";

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

      result.output.Backend = backend.code; //Transfer back the backend for this login

      options.body = body;

      result.input = options;

    }
    catch ( error ) {

      LoggerManager.markError( "A09026F1CA3F", error );

      result.error = error;

      /*
      const strMark = "1DFC6EF03869";

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

  static async callLoginInstagram( backend: any,
                                   headers: any,
                                   body: any ): Promise<{ input: any, output: any, error: Error }> {

    let result: any = {

      input: null,
      output: null,
      error: null

    };

    try {

      /*
      const body: any = {

        Token: strToken

      };
      */

      const options: any = {

        method: "POST",
        headers,
        data: body,

        validateStatus: () => {

          return true;

        }

      };

      const strRequestURL = backend.url[ 0 ] + "/v1/system/security/authentication/login/instagram";

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

      result.output.Backend = backend.code; //Transfer back the backend for this login

      options.body = body;

      result.input = options;

    }
    catch ( error ) {

      LoggerManager.markError( "4E27ECDF0979", error );

      result.error = error;

      /*
      const strMark = "1DFC6EF03869";

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

  static async callTokenCheck( backend: any,
                               headers: any ): Promise<{ input: any, output: any, error: Error }> {

    const result: any = {

      input: null,
      output: null,
      error: null

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

      const strRequestURL = backend.url[ 0 ] + "/v1/system/security/authentication/token/check";

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

      result.input = options;

    }
    catch ( error ) {

      LoggerManager.markError( "9CFE42581FB6", error );

      result.error = error;

      /*
      const strMark = "DD5EBFB4BDEE";

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

  static async callLogout( backend: any,
                           headers: any ): Promise<{ input: any, output: any, error: Error }> {

    const result: any = {

      input: null,
      output: null,
      error: null

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

      const strRequestURL = backend.url[ 0 ] + "/v1/system/security/authentication/logout";

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

      result.input = options;

    }
    catch ( error ) {

      LoggerManager.markError( "07EC8794C71A", error );

      result.error = error;

      /*
      const strMark = "88DD50269849";

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

export default V1SystemSecurityAuthenticationService;
