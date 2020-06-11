import {
  cloneDeep
} from "lodash";

import {
  _ERROR_IN_REDUCER,
  _DELETE_RESULT,
  _CHANGE_BACKEND_SERVER
} from "../../constants";

import SystemUtils from "../../../utils/systemUtils";

import initialState from "../initialState";

function reducer( state = initialState.backend, action: any ) {

  let result = null;

  switch ( action.type ) {

    case _CHANGE_BACKEND_SERVER: {

      try {

        result = cloneDeep( state );

        result.active = action.payload.backend; //Change the global state of app

        const ConnectionData = {

          active: result.active

        };

        localStorage.setItem( "_BACKEND_DATA", JSON.stringify( ConnectionData ) );

        result.results[ action.payload.transactionId ] = {

          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: "success"

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

    default: {

      result = state;

    }

  }

  return result;

}

export default reducer;
