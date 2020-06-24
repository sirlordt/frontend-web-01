import {
  _USER_ACTIVATE_SUCCESS,
  _USER_ACTIVATE_FAILED
} from "../constants";
import systemBackendClient from "../../services/systemBackendClient";

function signupActivate( payload: any ): any {

  return async ( dispatch: any ) => {

    const result = await systemBackendClient.callUserSignupActivate( payload.signupData );

    if ( result instanceof Error ) {

      dispatch(
        {
          type: _USER_ACTIVATE_FAILED,
          payload: {
            response: {
              StatusCode: 400,
              Code: "INTERNAL_FRONTEND_ERROR",
              Message: "An internal web frontend error has occurred",
              Errors: [
                {
                  StatusCode: 400,
                  Code: "INTERNAL_FRONTEND_ERROR",
                  Message: "An internal web frontend error has occurred"
                }
              ],
              Warning: []
            },
            callback: payload.callback,
            transactionId: payload.transactionId
          }
        }
      );

    }
    else if ( result &&
              result.output &&
              result.output.body ) {

      if ( result.output.body.IsError === false &&
           result.output.body.Code === "SUCCESS_USER_ACTIVATION" ) {

        result.output.body.Backend = result.output.Backend;

        dispatch(
          {
            type: _USER_ACTIVATE_SUCCESS,
            payload: {
              response: result.output.body,
              callback: payload.callback,
              transactionId: payload.transactionId
            }
          }
        );

      }
      else {

        dispatch(
          {
            type: _USER_ACTIVATE_FAILED,
            payload: {
              response: result.output.body,
              callback: payload.callback,
              transactionId: payload.transactionId
            }
          }
        );

      }

    }
    else {

      dispatch(
        {
          type: _USER_ACTIVATE_FAILED,
          payload: {
            response: {
              StatusCode: 500,
              Code: "NO_RESPONSE_FROM_SERVER",
              Message: "No response from server. Please check your network connection",
              Errors: [
                {
                  StatusCode: 500,
                  Code: "NO_RESPONSE_FROM_SERVER",
                  Message: "No response from server. Please check your network connection"
                }
              ],
              Warning: []
            },
            callback: payload.callback,
            transactionId: payload.transactionId
          }
        }
      );

    }

  };

}

export default signupActivate;
