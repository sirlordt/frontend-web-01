//import mainStore from "../redux/store";

import SystemBackendClient from './systemBackendClient'
import V1BusinessDev001Service from "./v1BusinessDev001Service";

class BusinessBackendClient {

  static async callGetEstablishment( strAutorization: string,
                                     logger: any ) {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1BusinessDev001Service.callGetEstablishment( backendConfig,
                                                                   headersConfig,
                                                                   logger );

      if ( result instanceof Error === false ) {

        if ( result.output.body.Code === "SUCCESS_GET_ESTABLISHMENTS_LIST" &&
             result.output.body.Data ) {

          result = result.output.body.Data;

        }

      }

    }
    catch ( error ) {

      result = error;

    }

    return result;

  }

  static async callStartUpdateTipUberJob( strAutorization: string,
                                          data: any,
                                          logger: any ) {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1BusinessDev001Service.callStartUpdateTipJob( backendConfig,
                                                                    headersConfig,
                                                                    data,
                                                                    logger );

      //console.log( result );

      if ( result instanceof Error === false ) {

        if ( result.output.body.Code === "SUCCESS_JOB_CREATION" &&
             result.output.body.Data ) {

          result = result.output.body.Data[ 0 ].Id;

        }

      }

    }
    catch ( error ) {

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
                                                                        data,
                                                                        logger );

      if ( result instanceof Error === false ) {

        if ( result.output.body.Code === "SUCCESS_GET_JOB_OUTPUT" &&
             result.output.body.Data ) {

          result = result.output.body.Data[ 0 ];

        }

      }

    }
    catch ( error ) {

      result = error;

    }

    return result;

  }

}

export default BusinessBackendClient;
