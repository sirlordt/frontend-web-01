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

const RootPage = React.lazy( () => import( "./pages/root" ) );

if ( process.env.REACT_APP_DEBUG !== "-" ) {

  localStorage.setItem( "debug", process.env.REACT_APP_DEBUG || '' );

}
else {

  localStorage.removeItem( "debug" );

}

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
