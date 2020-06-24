import mainStore from "../redux/store";

import V1SystemSecurityAuthenticationService from "./v1SystemSecurityAuthenticationService";
import V1SystemUserService from "./v1SystemUserService";
import V1SystemBinaryService from "./v1SystemBinaryService";
import LoggerManager from "../utils/loggerManager";

class SystemBackendClient {

  static defaultHeaders = {

    "Content-Type": "application/json",
    "Authorization": "",
    "BinaryDataToken": "",
    "FrontendId": "",
    "TimeZoneId": "",
    "Language": "en_US"

  };

  static getBackendConfig(): any {

    //LoggerManager.markLog( "D47C71F7B017",  mainStore.getState().backend.active );

    let result = null;

    try {

      result = mainStore.getState().backend.servers[ mainStore.getState().backend.active ];

      //result.backend = mainStore.getState().backend.active;

    }
    catch ( error ) {

      LoggerManager.markError( "B1D99B04B796",  error );

    }

    return result;

  }

  static getHeadersConfig(): any {

    const result = {

      ...SystemBackendClient.defaultHeaders,
      FrontendId: mainStore.getState().frontend.id,
      TimeZoneId: mainStore.getState().frontend.timeZoneId,
      Language: mainStore.getState().frontend.language

    };

    return result;

  }

  static async callLogin( strUsername: string,
                          strPassword: string ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      result = await V1SystemSecurityAuthenticationService.callLogin( backendConfig,
                                                                      headersConfig,
                                                                      strUsername,
                                                                      strPassword );

    }
    catch ( error ) {

      LoggerManager.markError( "44E5E97C2AA6", error );

      result = error;

    }

    return result;

  }

  static async callLoginGoogle( loginData: any ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      result = await V1SystemSecurityAuthenticationService.callLoginGoogle( backendConfig,
                                                                            headersConfig,
                                                                            loginData );

    }
    catch ( error ) {

      LoggerManager.markError( "69826B7C5217", error );

      result = error;

    }

    return result;

  }

  static async callLoginFacebook( loginData: string ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      result = await V1SystemSecurityAuthenticationService.callLoginFacebook( backendConfig,
                                                                              headersConfig,
                                                                              loginData );

    }
    catch ( error ) {

      LoggerManager.markError( "5A29E0EC2A65", error );

      result = error;

    }

    return result;

  }

  static async callLoginInstagram( loginData: any ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      result = await V1SystemSecurityAuthenticationService.callLoginInstagram( backendConfig,
                                                                               headersConfig,
                                                                               loginData );

    }
    catch ( error ) {

      LoggerManager.markError( "3889D844CBAF", error );

      result = error;

    }

    return result;

  }

  static async callTokenCheck( strAutorization: string ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1SystemSecurityAuthenticationService.callTokenCheck( backendConfig,
                                                                           headersConfig );

    }
    catch ( error ) {

      LoggerManager.markError( "C5732519B4DF", error );

      result = error;

    }

    return result;

  }

  static async callLogout( strAutorization: string ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1SystemSecurityAuthenticationService.callLogout( backendConfig,
                                                                       headersConfig );

    }
    catch ( error ) {

      LoggerManager.markError( "607C2C4821E0", error );

      result = error;

    }

    return result;

  }

  static async callUserActions( strAutorization: string ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1SystemUserService.callUserActions( backendConfig,
                                                          headersConfig );

    }
    catch ( error ) {

      LoggerManager.markError( "6BAF6DA5B6F1", error );

      result = error;

    }

    return result;

  }

  static async callCreateBinaryAuth( strAutorization: string ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await V1SystemBinaryService.callCreateAuth( backendConfig,
                                                           headersConfig );

      if ( !result.error ) {

        if ( result?.output?.body?.Data[ 0 ].Auth ) {

          result = result?.output?.body.Data[ 0 ].Auth;

        }

      }
      else {

        LoggerManager.markLog( "247E6AAEB1C7",  result.error );

      }

    }
    catch ( error ) {

      LoggerManager.markError( "6A7885B1C15A", error );

      result = error;

    }

    return result;

  }

  static async callUploadFile( strAutorization: string,
                               fileToUpload: any,
                               uploadCallBack: any ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      const binaryRequest = new FormData();

      binaryRequest.append( "File", fileToUpload ); //fs.createReadStream( strPath ) );
      binaryRequest.append( "UploadTo", "job" );

      const headersMultipart = {

        ...headersConfig,
        "Content-Type": "multipart/form-data"
        //...binaryRequest.getHeaders()

      };

      //delete headersMultipart[ "Content-Type" ];

      result = await V1SystemBinaryService.callUploadBinaryData( backendConfig,
                                                                 headersMultipart,
                                                                 binaryRequest,
                                                                 uploadCallBack ); //This request must be fail

      //LoggerManager.markLog( "767DC6F5D5A5", result );
      if ( !result.error ) {

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

      LoggerManager.markError( "A44ED3F68824", error );

      result = error;

    }

    return result;

  }

  static async callUserSignup( signupData: any ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      result = await V1SystemUserService.callUserSignup( backendConfig,
                                                         headersConfig,
                                                         signupData );

    }
    catch ( error ) {

      LoggerManager.markError( "DB82C0D8F403", error );

      result = error;

    }

    return result;

  }

  static async callUserSignupActivate( signupData: any ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      result = await V1SystemUserService.callUserSignupActivate( backendConfig,
                                                                 headersConfig,
                                                                 signupData );

    }
    catch ( error ) {

      LoggerManager.markError( "E710B4E4506E", error );

      result = error;

    }

    return result;

  }

  static async callUserSignupGoogle( signupData: any ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      result = await V1SystemUserService.callUserSignupGoogle( backendConfig,
                                                               headersConfig,
                                                               signupData );

    }
    catch ( error ) {

      LoggerManager.markError( "B2FCDC0A7908", error );

      result = error;

    }

    return result;

  }

  static async callUserSignupFacebook( signupData: any ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      result = await V1SystemUserService.callUserSignupFacebook( backendConfig,
                                                                 headersConfig,
                                                                 signupData );

    }
    catch ( error ) {

      LoggerManager.markError( "D14CB06EE79F", error );

      result = error;

    }

    return result;

  }

  static async callUserSignupInstagram( signupData: any ): Promise<any> {

    let result = null;

    try {

      const backendConfig = SystemBackendClient.getBackendConfig();

      const headersConfig = SystemBackendClient.getHeadersConfig();

      result = await V1SystemUserService.callUserSignupInstagram( backendConfig,
                                                                  headersConfig,
                                                                  signupData );

    }
    catch ( error ) {

      LoggerManager.markError( "6E90D4C266E1", error );

      result = error;

    }

    return result;

  }

}

export default SystemBackendClient;
