import React, {
  Component, Suspense
} from "react";

import {
  withRouter
} from "react-router-dom";

import {
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import {
  TransitionGroup,
  SwitchTransition,
  CSSTransition
} from "react-transition-group";

import Loading from "../../components/loading";

// routes config
import {
  routes,
  //_DEFAULT_ROUTE
} from "../../routes";

class container extends Component {

  render() {

    //        <CContainer fluid>
    // </CContainer> className="c-main"

    /*
    console.log( this.props.location );

    return (

      <main className="fixed-max-height">

        <TransitionGroup>

          <SwitchTransition mode="out-in">

            <CSSTransition
              key={ this.props.location.pathname }
              classNames="fade"
              timeout={{
                enter: 500,
                exit: 500
              }}
            >

              <Switch location={ this.props.location }>
                <Route key="/home/update/tips/uber" path="/home/update/tips/uber" children={ <div>Home update tips uber</div> } />
                <Route key="/home/test01" path="/home/test01" children={ <div>Test 01</div> } />
                <Route key="/home/test02" path="/home/test02" children={ <div>Test 02</div> } />
              </Switch>

            </CSSTransition>

          </SwitchTransition>

        </TransitionGroup>

      </main>

    );
    */

    return (

      <main className="fixed-max-height">

        <Suspense fallback={ <Loading /> }>

          <TransitionGroup>

            <SwitchTransition mode="out-in">

              <CSSTransition
                key={ this.props.location.pathname }
                classNames="fade-transition"
                timeout={{
                  enter: 500,
                  exit: 500
                }}
              >

                <Switch location={ this.props.location }>

                  {

                    routes.map( ( route, idx ) => {

                      return route.component ?
                      (
                        <Route
                          key={ idx }
                          path={ route.path }
                          exact={ route.exact }
                          name={ route.name }
                          render={ ( props ) => (
                            <route.component { ...props } />
                          ) }
                        />
                      )
                      :
                      ( null );

                    } )

                  }

                  <Redirect to="/"/>

                  {/*
                  <Redirect from="/" to={ _DEFAULT_ROUTE } />
                  */}

                </Switch>

              </CSSTransition>

            </SwitchTransition>

          </TransitionGroup>

        </Suspense>

      </main>

    );

  }

}

export default withRouter( container );
