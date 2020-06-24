import {
  cloneDeep
} from "lodash";

import {
  _ERROR_IN_REDUCER,
  _DELETE_RESULT,
  //_INIT_LOCAL_STATE,
  //_SAVE_LOCAL_STATE,
  _LOGIN_SUCCESS,
  _LOGIN_FAILED,
  _TOKEN_CHECK_SUCCESS,
  _TOKEN_CHECK_FAILED,
  _LOGOUT_SUCCESS,
  _RESET_ACTIVE_USER,
  _LOGOUT_FAILED,
  _CHANGE_ACCOUNT,
  _USER_SIGNUP_GOOGLE_SUCCESS,
  _USER_SIGNUP_GOOGLE_FAILED,
  _USER_SIGNUP_FACEBOOK_SUCCESS,
  _USER_SIGNUP_FACEBOOK_FAILED,
  _USER_SIGNUP_INSTAGRAM_SUCCESS,
  _USER_SIGNUP_INSTAGRAM_FAILED,
} from "../../constants";
import SystemUtils from "../../../utils/systemUtils";

import initialState from "../initialState";

/*
  {
    ActiveUserName: "john",
    AccountsDetails: {
      "john": {
        AuthotizationToken: "token1",
        Avatar: "",
        UserName: "user01",
        FirstName: "John Jose",
        LastName: "Connor Rodriguez"
      },
      "sara": {
        AuthotizationToken: "token2",
        Avatar: "",
        Username: "sara",
        Firstname: "Sara Maria",
        Lastname: "Connor Fermin"
      }
    }
  }
*/

function reducer( state = initialState.authentication, action: any ) {

  let result = null;

  switch ( action.type ) {

    /*
    case _INIT_LOCAL_STATE: {

      try {

        const jsonAccountsInfo = JSON.parse( localStorage.getItem( "_ACCOUNTS_INFO" ) );

        result = {

          activeUsername: jsonAccountsInfo.activeUsername || "",
          accountDetails: jsonAccountsInfo.accountDetails || {},
          errorDetails: {}

        };

      }
      catch ( error ) {

        LoggerManager.markError( "181235CDD950", error );
        result = state;

      }

      result = state;

      break;

    }

    case _SAVE_LOCAL_STATE: {

      try {

        localStorage.setItem( "_ACCOUNTS_INFO", JSON.stringify( state ) );

      }
      catch ( error ) {

        LoggerManager.markLog( "35F6A3E88341", error );
        result = state;

      }

      result = state;

      break;

    }
    */

    case _DELETE_RESULT: {

      try {

        result = cloneDeep( state );

        if ( result.results &&
             result.results[ action.payload.transactionId ] ) {

          delete result.results[ action.payload.transactionId ];

        }

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: _ERROR_IN_REDUCER,
          responseMark: SystemUtils.getUUIDv4(),
          data: error

        };

      }

      break;

    }
    case _CHANGE_ACCOUNT: {

      try {

        result = cloneDeep( state );

        if ( result.accounts &&
             action.payload.active &&
             result.accounts[ action.payload.active ] ) {

          result.active = action.payload.active;
          result.lastCheck = "";

          const AccountsData = {

            active: result.active,
            accounts: result.accounts

          };

          localStorage.setItem( "_ACCOUNTS_DATA", JSON.stringify( AccountsData ) );

        }

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error

        };

      }

      break;

    }

    case _LOGIN_SUCCESS: {

      try {

        result = cloneDeep( state );

        let accounts = result.accounts;

        if ( !accounts ) {

          accounts = {};// Init the object in case of null

        }

        const strUsername = action.payload.response.Data[ 0 ].sysUser.Name;

        accounts[ strUsername ] = action.payload.response.Data[ 0 ]; //Set new field and data or overwrite the old data
        accounts[ strUsername ].Backend = action.payload.response.Backend;

        result.active = strUsername;
        result.lastCheck = "";
        result.accounts = accounts;

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: action.payload.response

        };

        const AccountsData = {

          active: result.active,
          accounts: result.accounts

        };

        localStorage.setItem( "_ACCOUNTS_DATA", JSON.stringify( AccountsData ) );

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error

        };

      }

      break;

    }

    case _USER_SIGNUP_GOOGLE_SUCCESS:
    case _USER_SIGNUP_GOOGLE_FAILED:
    case _USER_SIGNUP_FACEBOOK_SUCCESS:
    case _USER_SIGNUP_FACEBOOK_FAILED:
    case _USER_SIGNUP_INSTAGRAM_SUCCESS:
    case _USER_SIGNUP_INSTAGRAM_FAILED: {

      try {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: action.payload.response

        };

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error

        };

      }

      break;

    }

    case _LOGIN_FAILED: {

      try {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: action.payload.response

        };

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error

        };

      }

      break;

    }

    case _RESET_ACTIVE_USER:
    case _LOGOUT_SUCCESS: {

      try {

        result = cloneDeep( state );

        let accounts = result.accounts;

        if ( !accounts ) {

          accounts = {};// Init the object in case of null

        }

        if ( accounts[ action.payload.username ] ) {

          accounts[ action.payload.username ].Authotization = null; //Reset the autorization token

        }

        result.active = "";
        result.lastCheck = "";
        result.accounts = accounts;

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: action.payload.response || {}

        };

        const AccountsData = {

          active: result.active,
          accounts: result.accounts

        };

        localStorage.setItem( "_ACCOUNTS_DATA", JSON.stringify( AccountsData ) );

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error

        };

      }

      break;

    }

    case _LOGOUT_FAILED: {

      try {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: action.payload.response

        };

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error

        };

      }

      break;

    }

    case _TOKEN_CHECK_SUCCESS: {

      try {

        result = cloneDeep( state );

        result.lastCheck = SystemUtils.getCurrentDateAndTime();

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: action.payload.response

        };

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error

        };

      }

      break;

    }

    case _TOKEN_CHECK_FAILED: {

      try {

        result = cloneDeep( state );

        //result.lastCheck = "";

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: action.payload.response

        };

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {

          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error

        };

      }

      break;

    }

    default: {

      result = state;

    }

  }

  return result;

}

export default reducer;
