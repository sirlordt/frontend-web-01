import axios from "axios";

//import CommonUtilities from "../utils/commonUtilities";
import LoggerManager from "../utils/loggerManager";

//const debug = require( "debug" )( "V1SystemBinaryService" );

//import mainStore from '../redux/store';

class V1SystemBinaryService {

  static async callCreateAuth( backend: any,
                               headers: any ): Promise<{ input: any, output: any } | Error> {

    let result: any = {

      input: null,
      output: null

    };

    try {

      const options: any = {

        method: "POST",
        body: null,
        headers

      };

      //const strRequestURL = backend.url[ 0 ] + mainStore.getState().frontend.userActions[ "v1.system.binary.auth.create" ];

      const strRequestURL = backend.url[ 0 ] + "/v1/system/binary/auth";

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

      LoggerManager.markError( "86AED92A79A1", error );

      result = error;

    }

    return result;

  }

  static async callUploadBinaryData( backend: any,
                                     headers: any,
                                     body: any,
                                     uploadCallback: any ): Promise<{ input: any, output: any, error: Error }> {

   let result: any = {

      input: null,
      output: null,
      error: null

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

      //const strRequestURL = backend.url[ 0 ] + mainStore.getState().frontend.userActions[ "v1.system.binary.upload" ];

      const strRequestURL = backend.url[ 0 ] + "/v1/system/binary";

      const callResult = await axios.post( strRequestURL,
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

      LoggerManager.markError( "4723E6E2E608", error );

      result.error = error;

    }

    return result;

  }


}

export default V1SystemBinaryService;
