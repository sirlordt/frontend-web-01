//import mainStore from "../redux/store";

import SystemBackendClient from './systemBackendClient'
import V1BusinessDev001Service from "./v1BusinessDev001Service";
import LoggerManager from "../utils/loggerManager";

class BusinessBackendClient {

  static async callGetEstablishment( strAutorization: string ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1BusinessDev001Service.callGetEstablishment( backendConfig,
                                                                   headersConfig );

      if ( !result.error ) {

        if ( result.output.body.Code === "SUCCESS_GET_ESTABLISHMENTS_LIST" &&
             result.output.body.Data ) {

          result = result.output.body.Data;

        }

      }

    }
    catch ( error ) {

      LoggerManager.markError( "78EA6B080CAD", error );

      result = error;

    }

    return result;

  }

  static async callStartUpdateTipUberJob( strAutorization: string,
                                          data: any ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1BusinessDev001Service.callStartUpdateTipJob( backendConfig,
                                                                    headersConfig,
                                                                    data );

      //LoggerManager.markLog( "45F2701D2D1F", result );

      if ( !result.error ) {

        if ( result.output.body.Code === "SUCCESS_JOB_CREATION" &&
             result.output.body.Data ) {

          result = result.output.body.Data[ 0 ].Id;

        }

      }

    }
    catch ( error ) {

      LoggerManager.markError( "F7B430D94152", error );

      result = error;

    }

    return result;

  }

  static async callGetUpdateTipUberJobStatus( strAutorization: string,
                                              data: any,
                                              logger: any ) {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1BusinessDev001Service.callGetUpdateTipJobStatus( backendConfig,
                                                                        headersConfig,
                                                                        data );

      if ( !result.error ) {

        if ( result.output.body.Code === "SUCCESS_GET_JOB_OUTPUT" &&
             result.output.body.Data ) {

          result = result.output.body.Data[ 0 ];

        }

      }

    }
    catch ( error ) {

      LoggerManager.markError( "90E8A0FC184B", error );

      result = error;

    }

    return result;

  }

}

export default BusinessBackendClient;
