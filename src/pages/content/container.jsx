/* eslint-disable react/no-array-index-key */
import React, {
  Component, Suspense
} from "react";
import {
  Redirect, Route, Switch
} from "react-router-dom";
//import {
//  CContainer
//} from "@coreui/react";
import Loading from "../../components/loading";

// routes config
import { routes, _DEFAULT_ROUTE } from "../../routes";

class container extends Component {

  render() {

    //        <CContainer fluid>
    // </CContainer> className="c-main"
    return (

      <main className="fixed-max-height">
        <Suspense fallback={ <Loading /> }>
          <Switch>
            {routes.map( ( route, idx ) => {

              return route.component ? (
                <Route
                  key={ idx }
                  path={ route.path }
                  exact={ route.exact }
                  name={ route.name }
                  render={ ( props ) => (
                    <route.component { ...props } />
                  ) } />
              ) : ( null );

            } )}
            <Redirect from="/" to={ _DEFAULT_ROUTE } />
          </Switch>
        </Suspense>
      </main>

    );

  }

}

export default container;
