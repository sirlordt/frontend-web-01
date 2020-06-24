import axios from "axios";

//import CommonUtilities from "../utils/commonUtilities";
import LoggerManager from "../utils/loggerManager";

//const debug = require( "debug" )( "V1SystemUserService" );

class V1SystemUserService {

  static async callUserActions( backend: any,
                                headers: any ): Promise<{ input: any, output: any, error: Error }> {

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

      const strRequestURL = backend.url[ 0 ] + "/v1/system/user/actions";

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

      LoggerManager.markError( "CA9F7D9EAAE4", error );

      result.error = error;

    }

    return result;

  }

  static async callUserSignup( backend: any,
                               headers: any,
                               body: any ): Promise<{ input: any, output: any, error: Error }> {

    let result: any = {

      input: null,
      output: null,
      error: null

    };

    try {

      const options: any = {

        method: "POST",
        headers,
        data: body,

        validateStatus: () => {

          return true;

        }

      };

      const strRequestURL = backend.url[ 0 ] + "/v1/system/user/signup";

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

      LoggerManager.markError( "1D27F5242612", error );

      result.error = error;

    }

    return result;

  }

  static async callUserSignupActivate( backend: any,
                                       headers: any,
                                       body: any ): Promise<{ input: any, output: any, error: Error }> {

    let result: any = {

      input: null,
      output: null,
      error: null

    };

    try {

      const options: any = {

        method: "POST",
        headers,
        data: body,

        validateStatus: () => {

          return true;

        }

      };

      const strRequestURL = backend.url[ 0 ] + "/v1/system/user/signup/activate";

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

      LoggerManager.markError( "4E9A4750D026", error );

      result.error = error;

    }

    return result;

  }

  static async callUserSignupGoogle( backend: any,
                                     headers: any,
                                     body: any ): Promise<{ input: any, output: any, error: Error }> {

    let result: any = {

      input: null,
      output: null,
      error: null

    };

    try {

      const options: any = {

        method: "POST",
        headers,
        data: body,

        validateStatus: () => {

          return true;

        }

      };

      const strRequestURL = backend.url[ 0 ] + "/v1/system/user/signup/google";

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

      LoggerManager.markError( "EE2A0E08B52D", error );

      result.error = error;

    }

    return result;

  }

  static async callUserSignupFacebook( backend: any,
                                       headers: any,
                                       body: any ): Promise<{ input: any, output: any, error: Error }> {

    let result: any = {

      input: null,
      output: null,
      error: null

    };

    try {

      const options: any = {

        method: "POST",
        headers,
        data: body,

        validateStatus: () => {

          return true;

        }

      };

      const strRequestURL = backend.url[ 0 ] + "/v1/system/user/signup/facebook";

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

      LoggerManager.markError( "63038842E764", error );

      result.error = error;

    }

    return result;

  }

  static async callUserSignupInstagram( backend: any,
                                        headers: any,
                                        body: any ): Promise<{ input: any, output: any, error: Error }> {

    let result: any = {

      input: null,
      output: null,
      error: null

    };

    try {

      const options: any = {

        method: "POST",
        headers,
        data: body,

        validateStatus: () => {

          return true;

        }

      };

      const strRequestURL = backend.url[ 0 ] + "/v1/system/user/signup/instagram";

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

      LoggerManager.markError( "D4F5C2735854", error );

      result.error = error;

    }

    return result;

  }

}

export default V1SystemUserService;
