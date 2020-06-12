import {
  _GET_USER_ACTIONS_SUCCESS,
  _GET_USER_ACTIONS_FAILED
} from "../constants";
import backendClient from "../../services/systemBackendClient";

function getUserActions( payload: any ): any {

  return async ( dispatch: any ) => {

    const result = await backendClient.callUserActions( payload.authorization,
                                                        payload.logger );

    if ( result instanceof Error ) {

      dispatch(
        {
          type: _GET_USER_ACTIONS_FAILED,
          payload: {
            response: {
              StatusCode: 400,
              Code: "INTERNAL_FRONTEND_ERROR",
              Message: "An internal web frontend error has occurred",
              Errors: [
                {
                  StatusCode: 400,
                  Code: "INTERNAL_FRONTEND_ERROR",
                  Message: "An internal web frontend error has occurred",
                  Error: result
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
           result.output.body.Code === "SUCCESS_GET_ACTIONS" ) {

        dispatch(
          {
            type: _GET_USER_ACTIONS_SUCCESS,
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
            type: _GET_USER_ACTIONS_FAILED,
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
          type: _GET_USER_ACTIONS_FAILED,
          payload: {
            response: {
              StatusCode: 500,
              Code: "NO_RESPONSE_FROM_SERVER",
              Message: "No response from server. Please check your network connection",
              Errors: [
                {
                  StatusCode: 500,
                  Code: "NO_RESPONSE_FROM_SERVER",
                  Message: "No response from server. Please check your network connection",
                  Error: null
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

export default getUserActions;
