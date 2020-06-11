import {
  cloneDeep
} from "lodash";

/*
import detectBrowserLanguage from "detect-browser-language";
import i18n, {
  i18nFallbackLanguages
} from "../../../config/i18n.config";
*/

import {
  //_INIT_FRONTEND_STATE,
  //_SAVE_FRONTEND_STATE,
  _ERROR_IN_REDUCER,
  _DELETE_RESULT,
  _TOGGLE_DARK,
  _TOGGLE_LEFT_SIDERBAR,
  _TOGGLE_LEFT_SIDERBAR_MOBILE,
  _MINIMIZE_LEFT_SIDERBAR,
  _CLOSE_LEFT_SIDERBAR,
  _TOGGLE_RIGHT_SIDERBAR,
  _SHOW_MODAL,
  _CLOSE_MODAL,
  _CLEAR_MODAL,
  _CHANGE_LANGUAGE,
  _GET_USER_ACTIONS_SUCCESS,
  _GET_USER_ACTIONS_FAILED
} from "../../constants";
import SystemUtils from "../../../utils/systemUtils";

import initialState from "../initialState";
//import CommonUtilities from "../../../utils/commonUtilities";

function reducer( state = initialState.frontend, action: any ): any {

  let result: any = null;

  //console.log( "Action => ", action.id );

  switch ( action.type ) {

    /*
    case _INIT_FRONTEND_STATE: {

      try {

        const jsonFrontendInfo = CommonUtilities.parseJSON( localStorage.getItem( "_FRONTEND_DATA" ) as any, null ) || {};

        let strUseThisLanguage = detectBrowserLanguage().replace( "-", "_" );

        strUseThisLanguage = i18nFallbackLanguages[ strUseThisLanguage ]; //strUseThisLanguage.replace( "419", "ES" );

        if ( jsonFrontendInfo.language ) {

          strUseThisLanguage = jsonFrontendInfo.language.replace( "-", "_" );

        }

        result = cloneDeep( initialState.frontend );

        result.language = strUseThisLanguage || "en_US";

        result.themeDark = jsonFrontendInfo.themeDark || initialState.frontend.themeDark;
        result.isLeftSidebarOpen = jsonFrontendInfo.isLeftSidebarOpen || initialState.frontend.isLeftSidebarOpen;
        result.isLeftSidebarMinimized = jsonFrontendInfo.isLeftSidebarMinimized || initialState.frontend.isLeftSidebarMinimized;
        result.sidebarMobile = jsonFrontendInfo.sidebarMobile || initialState.frontend.sidebarMobile;
        result.sidebarDisplay = jsonFrontendInfo.sidebarDisplay || initialState.frontend.sidebarDisplay;
        result.isRightSidebarOpen = jsonFrontendInfo.isRightSidebarOpen || initialState.frontend.isRightSidebarOpen;

        i18n.changeLanguage( result.language );

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

      //result = state;

      break;

    }

    case _SAVE_FRONTEND_STATE: {

      try {

        result = cloneDeep( state );

        delete state.id;

        localStorage.setItem( "_FRONTEND_DATA", JSON.stringify( state ) );

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

      //result = state;

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

    case _TOGGLE_DARK: {

      try {

        result = cloneDeep( state );

        result.themeDark = !result.themeDark;

        delete result.id; //not save the id

        localStorage.setItem( "_FRONTEND_DATA", JSON.stringify( result ) );

        result.id = state.id;

        result.results[ action.payload.transactionId ] = {

          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: "success"

        };

        /*
        result = {

          ...state, // keep the old state data, spread operator
          themeDark: !state.themeDark //action.payload.themeDark

        };
        */

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

    case _CHANGE_LANGUAGE: {

      try {

        result = cloneDeep( state );

        result.language = action.payload.language;

        delete result.id; //not save the id

        localStorage.setItem( "_FRONTEND_DATA", JSON.stringify( result ) );

        result.id = state.id;

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

    case _TOGGLE_LEFT_SIDERBAR: {

      try {

        result = cloneDeep( state );

        const leftSidebarOpened = result.isLeftSidebarOpen === true || result.isLeftSidebarOpen === "responsive";

        result.isLeftSidebarOpen = leftSidebarOpened ? false : "responsive";

        result.results[ action.payload.transactionId ] = {

          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: "success"

        };

        /*
        result = {

          ...state, // keep the old state data, spread operator
          isLeftSidebarOpen: leftSidebarOpened ? false : "responsive"

        };
        */

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

    case _TOGGLE_LEFT_SIDERBAR_MOBILE: {

      try {

        result = cloneDeep( state );

        const leftSidebarClosed = result.isLeftSidebarOpen === "responsive" || result.isLeftSidebarOpen === false;

        result.isLeftSidebarOpen = leftSidebarClosed ? true : "responsive";

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

    case _MINIMIZE_LEFT_SIDERBAR: {

      try {

        result = cloneDeep( state );

        result.isLeftSidebarMinimized = !result.isLeftSidebarMinimized;

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

    case _CLOSE_LEFT_SIDERBAR: {

      try {

        result = cloneDeep( state );

        result.isLeftSidebarOpen = "responsive";

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

    case _TOGGLE_RIGHT_SIDERBAR: {

      try {

        result = cloneDeep( state );

        result.isRightSidebarOpen = !result.isRightSidebarOpen;

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
    case _SHOW_MODAL: {

      try {

        result = cloneDeep( state );

        if ( !result.modalStack ) {

          result.modalStack = new Map();

        }

        const modalInfo = {
          showMe: true,
          id: action.payload.modalId,
          code: action.payload.modalCode,
          title: action.payload.modalTitle,
          message: action.payload.modalMessage,
          content: action.payload.modalContent,
          buttons: action.payload.modalButtons,
          buttonsHandlers: action.payload.modalButtonsHandlers,
          callback: action.payload.modalCallback,
          tag: action.payload.modalTag
        };

        result.modalStack.set( action.payload.modalId, modalInfo );

        /*
        result.modalId = action.payload.modalId;
        result.modalCode = action.payload.modalCode;
        result.modalTitle = action.payload.modalTitle;
        result.modalMessage = action.payload.modalMessage;
        result.modalButtons = action.payload.modalButtons;
        result.modalContent = action.payload.modalContent;
        */

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

    case _CLOSE_MODAL: {

      try {

        result = cloneDeep( state );

        if ( action.payload.transactionId ) {

          const modalInfo = result.modalStack.get( action.payload.transactionId ); //.showMe = false;

          modalInfo.showMe = false;

        }

        if ( action.payload.clearModalCode ) {

          result.modalStack.forEach( ( modalInfo: any ) => {

            if ( action.payload.clearModalCode === modalInfo.code ) {

              modalInfo.showMe = false;

            }

          } );

        }

        /*
        result.modalId = "";
        result.modalCode = "";
        result.modalTitle = "";
        result.modalMessage = "";
        result.modalButtons = null;
        result.modalContent = null;
        */

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

    case _CLEAR_MODAL: {

      try {

        result = cloneDeep( state );

        if ( action.payload.transactionId ) {

          result.modalStack.delete( action.payload.transactionId );

        }

        if ( action.payload.clearModalCode ) {

          result.modalStack.forEach( ( modalInfo: any ) => {

            if ( action.payload.clearModalCode === modalInfo.code ) {

              result.modalStack.delete( modalInfo.id );

            }

          } );

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

    case _GET_USER_ACTIONS_SUCCESS: {

      try {

        result = cloneDeep( state );

        if ( !result.userActions ) {

          result.userActions = {};

        }

        result.userActions = action.payload.response.Data[ 0 ];

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

    case _GET_USER_ACTIONS_FAILED: {

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

    default: {

      result = state;

    }

  }

  return result;

}

export default reducer;
