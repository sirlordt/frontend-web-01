import {
  _USER_SIGNUP_SUCCESS,
  _USER_SIGNUP_FAILED
} from "../constants";
import systemBackendClient from "../../services/systemBackendClient";

function signup( payload: any ): any {

  return async ( dispatch: any ) => {

    const result = await systemBackendClient.callUserSignup( payload.signupData );

    if ( result instanceof Error ) {

      dispatch(
        {
          type: _USER_SIGNUP_FAILED,
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
           ( result.output.body.Code === "SUCCESS_USER_SIGNUP" ||
             result.output.body.Code === "SUCCESS_USER_SIGNUP_MANUAL_ACTIVATION" ) ) {

        result.output.body.Backend = result.output.Backend;

        dispatch(
          {
            type: _USER_SIGNUP_SUCCESS,
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
            type: _USER_SIGNUP_FAILED,
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
          type: _USER_SIGNUP_FAILED,
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

export default signup;
