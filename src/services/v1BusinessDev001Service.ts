import axios from "axios";

//import CommonUtilities from "../utils/commonUtilities";
import LoggerManager from "../utils/loggerManager";

import mainStore from '../redux/store';

//const debug = require( "debug" )( "V1BusinessDev001Service" );

class V1BusinessDev001Service {

  static async callGetEstablishmentList( backend: any,
                                         headers: any,
                                         params: any ): Promise<{ input: any, output: any, error: Error }> {

    let result: any = {

      input: null,
      output: null,
      error: null

    };

    try {

      const options: any = {

        method: "GET",
        headers,
        params: params,

        /*
        validateStatus: () => {

          return true;

        }
        */

      };

      //LoggerManager.markLog( "0B06990B0362", mainStore.getState().frontend.userActions );

      const strRequestURL = backend.url[ 0 ] + mainStore.getState().frontend.userActions[ "v1.business.dev001.odinv1.establishment" ];

      //const strRequestURL = backend.url[ 0 ] + "/v1/business/dev001/odinv1/establishment";

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

      result.error = error;

    }

    return result;

  }


  static async callGetDriverList( backend: any,
                                  headers: any,
                                  params: any ): Promise<{ input: any, output: any, error: Error }> {

    let result: any = {

      input: null,
      output: null,
      error: null

    };

    try {

      const options: any = {

        method: "GET",
        headers,
        params: params,

        /*
        validateStatus: () => {

          return true;

        }
        */

      };

      const strRequestURL = backend.url[ 0 ] + mainStore.getState().frontend.userActions[ "v1.business.dev001.odinv1.driver" ];

      //const strRequestURL = backend.url[ 0 ] + "/v1/business/dev001/odinv1/driver";

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

      LoggerManager.markError( "B77717B26D9A", error );

      result.error = error;

    }

    return result;

  }

  static async callStartOrderTipUberUpdateJob( backend: any,
                                               headers: any,
                                               body: any ): Promise<{ input: any, output: any, error: Error }> {

    let result: any = {

      input: null,
      output: null,
      error: null

    };

    try {

      const options: any = {

        method: "PUT",
        headers,
        data: body,

        /*
        validateStatus: () => {

          return true;

        }
        */

      };

      const strRequestURL = backend.url[ 0 ] + mainStore.getState().frontend.userActions[ "v1.business.dev001.odinv1.order.tip.uber.job" ];

      //const strRequestURL = backend.url[ 0 ] + "/v1/business/dev001/odinv1/order/tip/uber";

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

      result.error = error;

    }

    return result;

  }

  static async callGetOrderTipUberUpdateJobStatus( backend: any,
                                                   headers: any,
                                                   queryParams: any ): Promise<{ input: any, output: any, error: Error }> {

    let result: any = {

      input: null,
      output: null,
      error: null

    };

    try {

      const options: any = {

        method: "GET",
        headers,

        /*
        validateStatus: () => {

          return true;

        }
        */

      };

      const strRequestURL = backend.url[ 0 ] + mainStore.getState().frontend.userActions[ "v1.business.dev001.odinv1.order.tip.uber.status" ] + `?Id=${queryParams.Id}&Kind=${queryParams.Kind}`;

      //const strRequestURL = backend.url[ 0 ] + `/v1/business/dev001/odinv1/order/tip/uber?Id=${queryParams.Id}&Kind=${queryParams.Kind}`;

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

      result.error = error;

    }

    return result;

  }

  static async callStartBulkOrderCreateJob( backend: any,
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

        /*
        validateStatus: () => {

          return true;

        }
        */

      };

      const strRequestURL = backend.url[ 0 ] + mainStore.getState().frontend.userActions[ "v1.business.dev001.odinv1.order.bulk.job" ];

      //const strRequestURL = backend.url[ 0 ] + "/v1/business/dev001/odinv1/order/bulk";

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

      LoggerManager.markError( "878B0580BBFB", error );

      result.error = error;

    }

    return result;

  }

  static async callGetBulkOrderCreateJobStatus( backend: any,
                                                headers: any,
                                                queryParams: any ): Promise<{ input: any, output: any, error: Error }> {

    let result: any = {

      input: null,
      output: null,
      error: null

    };

    try {

      const options: any = {

        method: "GET",
        headers,

        /*
        validateStatus: () => {

          return true;

        }
        */

      };

      const strRequestURL = backend.url[ 0 ] + mainStore.getState().frontend.userActions[ "v1.business.dev001.odinv1.order.bulk.status" ] + `?Id=${queryParams.Id}&Kind=${queryParams.Kind}`;

      //const strRequestURL = backend.url[ 0 ] + `/v1/business/dev001/odinv1/order/bulk?Id=${queryParams.Id}&Kind=${queryParams.Kind}`;

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

      LoggerManager.markError( "42F23BACFC60", error );

      result.error = error;

    }

    return result;

  }

}

export default V1BusinessDev001Service;
