import {
  createStore,
  applyMiddleware,
  compose
} from "redux";
import thunkMiddleware from "redux-thunk";

import detectBrowserLanguage from "detect-browser-language";

import i18n, {
  i18nFallbackLanguages
} from "../../config/i18n.config";

import rootReducer from "../reducers";
import CommonUtilities from "../../utils/commonUtilities";

import initialState from "../reducers/initialState";
//import LoggerManager from "../../utils/loggerManager";

declare var window: any;

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//********************
const initialStateAccountsData = CommonUtilities.parseJSON( localStorage.getItem( "_ACCOUNTS_DATA" ) as any, null );

if ( initialStateAccountsData ) {

  initialState.authentication.active = initialStateAccountsData.active;
  initialState.authentication.accounts = initialStateAccountsData.accounts;

}

//********************
const initialStateFrontendData = CommonUtilities.parseJSON( localStorage.getItem( "_FRONTEND_DATA" ) as any, null ) || {};

let strUseThisLanguage: string = detectBrowserLanguage().replace( "-", "_" );

strUseThisLanguage = i18nFallbackLanguages[ strUseThisLanguage ]; //

if ( initialStateFrontendData.language ) {

  strUseThisLanguage = initialStateFrontendData.language.replace( "-", "_" );

}

initialState.frontend.language = strUseThisLanguage || "en_US";

initialState.frontend.themeDark = initialStateFrontendData.themeDark || initialState.frontend.themeDark;

if ( initialState.frontend.isLeftSidebarOpen !== undefined ) {

  initialState.frontend.isLeftSidebarOpen = initialStateFrontendData.isLeftSidebarOpen;

}

if ( initialStateFrontendData.isLeftSidebarMinimized !== undefined ) {

  initialState.frontend.isLeftSidebarMinimized = initialStateFrontendData.isLeftSidebarMinimized;

}
initialState.frontend.sidebarMobile = initialStateFrontendData.sidebarMobile || initialState.frontend.sidebarMobile;
initialState.frontend.sidebarDisplay = initialStateFrontendData.sidebarDisplay || initialState.frontend.sidebarDisplay;
initialState.frontend.isRightSidebarOpen = initialStateFrontendData.isRightSidebarOpen || initialState.frontend.isRightSidebarOpen;

i18n.changeLanguage( initialState.frontend.language );

//********************
const initialStateBackendData = CommonUtilities.parseJSON( localStorage.getItem( "_BACKEND_DATA" ) as any, null ) || {};

if ( initialStateBackendData ) {

  if ( initialStateBackendData.active &&
       initialState.backend.servers[ initialStateBackendData.active ] ) {

    initialState.backend.active = initialStateBackendData.active;

  }

}

//LoggerManager.markInfo( "C7F4E0E7418F", initialState.backend.active );

//********************
const mainStore = createStore(
  rootReducer,
  initialState,
  storeEnhancers( applyMiddleware( thunkMiddleware ) ) //forbiddenWordsMiddleware,
);

//console.log( mainStore.getState() );

export default mainStore;
