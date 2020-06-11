import mainStore from "../redux/store";

import V1SystemSecurityAuthenticationService from "./V1SystemSecurityAuthenticationService";
import V1SystemUserService from "./V1SystemUserService";
import V1SystemBinaryService from "./V1SystemBinaryService";
import V1BusinessDev001Service from "./V1BusinessDev001Service";

class BackendClient {

  static defaultHeaders = {

    "Content-Type": "application/json",
    "Authorization": "",
    "BinaryDataToken": "",
    "FrontendId": "",
    "TimeZoneId": "",
    "Language": "en_US"

  };

  static getBackendConfig() {

    //console.log( mainStore.getState().backend.active );

    let result = null;

    try {

      result = mainStore.getState().backend.servers[ mainStore.getState().backend.active ];

      result.backend = mainStore.getState().backend.active;

    }
    catch ( error ) {

      console.log( error );

    }

    return result;

  }

  static getHeadersConfig(): any {

    const result = {

      ...BackendClient.defaultHeaders,
      FrontendId: mainStore.getState().frontend.id,
      TimeZoneId: mainStore.getState().frontend.timeZoneId,
      Language: mainStore.getState().frontend.language

    };

    return result;

  }

  static async callLogin( strUsername: string,
                          strPassword: string,
                          logger: any ) {

    let result = null;

    try {

      const backendConfig = BackendClient.getBackendConfig();

      const headersConfig = BackendClient.getHeadersConfig();

      result = await V1SystemSecurityAuthenticationService.callLogin( backendConfig,
                                                                      headersConfig,
                                                                      strUsername,
                                                                      strPassword,
                                                                      logger );

    }
    catch ( error ) {

      result = error;

    }

    return result;

  }

  static async callTokenCheck( strAutorization: string,
                               logger: any ) {

    let result = null;

    try {

      const backendConfig = BackendClient.getBackendConfig();

      const headersConfig = BackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1SystemSecurityAuthenticationService.callTokenCheck( backendConfig,
                                                                           headersConfig,
                                                                           logger );

    }
    catch ( error ) {

      result = error;

    }

    return result;

  }

  static async callLogout( strAutorization: string,
                           logger: any ) {

    let result = null;

    try {

      const backendConfig = BackendClient.getBackendConfig();

      const headersConfig = BackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1SystemSecurityAuthenticationService.callLogout( backendConfig,
                                                                       headersConfig,
                                                                       logger );

    }
    catch ( error ) {

      result = error;

    }

    return result;

  }

  static async callUserActions( strAutorization: string,
                                logger: any ) {

    let result = null;

    try {

      const backendConfig = BackendClient.getBackendConfig();

      const headersConfig = BackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1SystemUserService.callUserActions( backendConfig,
                                                          headersConfig,
                                                          logger );

    }
    catch ( error ) {

      result = error;

    }

    return result;

  }

  static async callCreateBinaryAuth( strAutorization: string,
                                     logger: any ) {

    let result = null;

    try {

      const backendConfig = BackendClient.getBackendConfig();

      const headersConfig = BackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1SystemBinaryService.callCreateAuth( backendConfig,
                                                           headersConfig,
                                                           logger );

      if ( result instanceof Error === false ) {

        if ( result?.output?.body?.Data[ 0 ].Auth ) {

          result = result?.output?.body.Data[ 0 ].Auth;

        }

      }
      else {

        console.log( result );

      }

    }
    catch ( error ) {

      result = error;

    }

    return result;

  }

  static async callUploadFile( strAutorization: string,
                               fileToUpload: any,
                               uploadCallBack: any,
                               logger: any ) {

    let result = null;

    try {

      const backendConfig = BackendClient.getBackendConfig();

      const headersConfig = BackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      const binaryRequest = new FormData();

      binaryRequest.append( "File", fileToUpload ); //fs.createReadStream( strPath ) );
      binaryRequest.append( "UploadTo", "job" );

      const headersMultipart = {

        ...headersConfig,
        "content-type": "multipart/form-data"
        //...binaryRequest.getHeaders()

      };

      delete headersMultipart[ "Content-Type" ];

      result = await V1SystemBinaryService.callUploadBinaryData( backendConfig,
                                                                 headersMultipart,
                                                                 binaryRequest,
                                                                 uploadCallBack,
                                                                 logger ); //This request must be fail

      //console.log( result );
      if ( result instanceof Error === false ) {

        if ( result.output.body.Code === "SUCCESS_BINARY_DATA_UPLOAD" &&
             result.output.body.Data ) {

          result = result.output.body.Data[ 0 ];

        }

      }

      /*
      CommonTest.saveInput( strFileName, result.input );
      result && result.output ? result.output.expected = {
        Code: strCode
      } : null;
      CommonTest.saveOutput( strFileName, result.output );

      if ( result &&
           result.output &&
           result.output.body &&
           result.output.body.Code === strCode ) {

        CommonTest.upload_binary_data[ strUploadBinaryDataKey ] = result.output.body.Data[ 0 ];
        CommonTest.upload_binary_data[ strUploadBinaryDataKey ].FileCheckSum = `md5://${strFileCheckSum}`;
        bResult = true;

      }
      */

    }
    catch ( error ) {

      result = error;
      //CommonTest.consoleLog( "Error", error );

    }

    return result;

  }

  static async callGetEstablishment( strAutorization: string,
                                     logger: any ) {

    let result = null;

    try {

      const backendConfig = BackendClient.getBackendConfig();

      const headersConfig = BackendClient.getHeadersConfig();

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

  static async callStartUpdateTipJob( strAutorization: string,
                                      data: any,
                                      logger: any ) {

    let result = null;

    try {

      const backendConfig = BackendClient.getBackendConfig();

      const headersConfig = BackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1BusinessDev001Service.callStartUpdateTipJob( backendConfig,
                                                                    headersConfig,
                                                                    data,
                                                                    logger );

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

  static async callGetUpdateTipJobStatus( strAutorization: string,
                                          data: any,
                                          logger: any ) {

    let result = null;

    try {

      const backendConfig = BackendClient.getBackendConfig();

      const headersConfig = BackendClient.getHeadersConfig();

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

export default BackendClient;
