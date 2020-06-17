import React from "react";
import {
  HashRouter
} from "react-router-dom";
import {
  Provider
} from "react-redux";

import {
  I18nextProvider
} from "react-i18next";
import i18n from "./config/i18n.config";

import "./utils/icons";

import mainStore from "./redux/store";

import "./App.scss";
import Loading from "./components/loading";
import LoggerManager from "./utils/loggerManager";

const RootPage = React.lazy( () => import( "./pages/root" ) );

if ( process.env.REACT_APP_DEBUG !== "-" ) {

  localStorage.setItem( "debug", process.env.REACT_APP_DEBUG || '' );

}
else {

  localStorage.removeItem( "debug" );

}

//Init the main logger
LoggerManager.createMainLogger();

/*
LoggerManager.mark( "B1E3D2B4D6F1" );
LoggerManager.debug( "Hello this a debug message 1" );
LoggerManager.debug( "Another message 2" );
LoggerManager.debug( "Another message 3" );

LoggerManager.debug( { Message: "My data", Data: "My data", OtherData: "My other data" } );

LoggerManager.mark( "96801D876D99" );
LoggerManager.debug( "Hello this a debug message 4" );
LoggerManager.debug( "Another message 5" );
LoggerManager.debug( "Another message 6" );
*/

function App() {

  return (
    <Provider store={ mainStore }>
      <I18nextProvider i18n={ i18n }>
        <HashRouter>
          <React.Suspense fallback={ <Loading /> }>
            <RootPage />
          </React.Suspense>
        </HashRouter>
      </I18nextProvider>
    </Provider>
  );

}

export default App;
