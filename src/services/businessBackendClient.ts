//import mainStore from "../redux/store";

import SystemBackendClient from './systemBackendClient'
import LoggerManager from "../utils/loggerManager";

import V1BusinessDev001Service from "./v1BusinessDev001Service";

class BusinessBackendClient {

  static async callGetEstablishmentList( strAutorization: string,
                                         params: any ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1BusinessDev001Service.callGetEstablishmentList( backendConfig,
                                                                       headersConfig,
                                                                       params );

      if ( !result.error ) {

        if ( result.output.body.Code === "SUCCESS_GET_ESTABLISHMENT_LIST" &&
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

  static async callGetDriverList( strAutorization: string,
                                  params: any ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1BusinessDev001Service.callGetDriverList( backendConfig,
                                                                headersConfig,
                                                                params );

      if ( !result.error ) {

        if ( result.output.body.Code === "SUCCESS_GET_DRIVER_LIST" &&
             result.output.body.Data ) {

          result = result.output.body.Data;

        }

      }

    }
    catch ( error ) {

      LoggerManager.markError( "06CEA039F14E", error );

      result = error;

    }

    return result;

  }

  static async callStartOrderTipUberUpdateJob( strAutorization: string,
                                               data: any ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1BusinessDev001Service.callStartOrderTipUberUpdateJob( backendConfig,
                                                                             headersConfig,
                                                                             data );

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

  static async callGetOrderTipUberUpdateJobStatus( strAutorization: string,
                                                   data: any ) {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1BusinessDev001Service.callGetOrderTipUberUpdateJobStatus( backendConfig,
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

  static async callStartBulkOrderCreateJob( strAutorization: string,
                                            data: any ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1BusinessDev001Service.callStartBulkOrderCreateJob( backendConfig,
                                                                          headersConfig,
                                                                          data );

      if ( !result.error ) {

        if ( result.output.body.Code === "SUCCESS_JOB_CREATION" &&
             result.output.body.Data ) {

          result = result.output.body.Data[ 0 ].Id;

        }

      }

    }
    catch ( error ) {

      LoggerManager.markError( "34DA694641DB", error );

      result = error;

    }

    return result;

  }

  static async callGetBulkOrderCreateJobStatus( strAutorization: string,
                                                data: any ) {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1BusinessDev001Service.callGetBulkOrderCreateJobStatus( backendConfig,
                                                                              headersConfig,
                                                                              data );

      if ( !result.error ) {

        if ( result.output.body.Code === "SUCCESS_GET_JOB_OUTPUT" &&
             result.output.body.Data) {

          if ( data.Kind === "status"  ) {

            result = result.output.body.Data[ 0 ];

          }
          else {

            result = result.output.body.Data;

          }

        }

      }

    }
    catch ( error ) {

      LoggerManager.markError( "43AD2DD5AB8E", error );

      result = error;

    }

    return result;

  }
}

export default BusinessBackendClient;
