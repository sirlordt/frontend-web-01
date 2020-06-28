import React, {
  Component
} from "react";

import {
  Route,
  Switch,
  //Redirect,
  withRouter
} from "react-router-dom";

/*
import {
  TransitionGroup,
  SwitchTransition,
  CSSTransition
} from "react-transition-group";
*/

import {
  connect
} from "react-redux";

import classNames from "classnames";

import PropTypes from "prop-types";

/*
import {
  getUserActions
} from "../../redux/actions";
*/

import SystemUtils from "../../utils/systemUtils";

import ModalManager from "../../modals/manager";

// Containers
const HomePage = React.lazy( () => import( "../home" ) );
const LoginPage = React.lazy( () => import( "../login" ) );
const SignupPage = React.lazy( () => import( "../signup" ) );
const SignupActivatePage = React.lazy( () => import( "../signupActivate" ) );

/*
const modalPages = [

  "/login"

];

const defaultLocation = {

  pathname: "/home"

};
*/

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

class RootPage extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4()

    };

  }

  componentDidMount() {

    if ( this.props.frontend.themeDark ) {

      document.body.classList.add( "c-dark-theme" );

    }
    else {

      document.body.classList.remove( "c-dark-theme" );

    }

  }

  componentDidUpdate() {

    if ( this.props.frontend.themeDark ) {

      document.body.classList.add( "c-dark-theme" );

    }
    else {

      document.body.classList.remove( "c-dark-theme" );

    }

    /*
    const {
      location
    } = this.props;

    if ( this.shouldUpdatePreviousLocation() ) {

      this.previousLocation = location;

    }
    */

  }

  /*
  shouldUpdatePreviousLocation = () => {

    const {
      location
    } = this.props;

    if ( !location ) return false;

    return !modalPages.includes( location.pathname );

  }

  shouldUsePreviousLocation = () => {

    const {
      location
    } = this.props;

    if ( !location ) return false;

    return modalPages.includes( location.pathname );

  }
  */

  render() {

    /*
    const {
      location
    } = this.props;
    */

    /*
    const usePreviousLocation = this.shouldUsePreviousLocation();

    let forcedLocation;

    if ( usePreviousLocation ) {

      forcedLocation = this.previousLocation || defaultLocation;

    }
    else {

      forcedLocation = location;

    }
    */

    //LoggerManager.mark( "68D30B472F5D" );
    //LoggerManager.debug( this.props.location.pathname );
    //LoggerManager.debug( this.props );
    /*
      <Route
        render={({ location }) => {

          return (

          );

        }}
      />

          */
    const classes = classNames( "c-app c-default-layout",
      this.props.frontend.themeDark ? "c-dark-theme" : false
    );

    return (

      <div className={ classes }>

        <ModalManager/>

        {/*}
        <SwitchTransition mode="out-in">

          <CSSTransition
            timeout={500}
            classNames="fade-transition"
            key={this.props.location.pathname}
          > location={this.props.location}
         */}

            <Switch >
              <Route exact path="/login" name="Login Page" render={ ( props ) => <LoginPage { ...props } /> } />
              <Route exact path="/signup" name="Signup Page" render={ ( props ) => <SignupPage { ...props } /> } />
              <Route exact path="/signup/activate" name="Signup Activation Page" render={ ( props ) => <SignupActivatePage { ...props } /> } />
              <Route exact path="/home" name="Home Page" extact render={ ( props ) => <HomePage { ...props } /> } />
              <Route path="/" name="Home Page" extact render={ ( props ) => <HomePage { ...props } /> } />
            </Switch>

          {/*

          </CSSTransition>

        </SwitchTransition>
          */}

      </div>

    );

    /*
    return (

      <React.Fragment>

        <ModalManager />

        <TransitionGroup>

          <SwitchTransition mode="in-out">

            <CSSTransition
              key={ this.props.location.pathname === "/login" || this.props.location.pathname === "/home" || this.props.location.pathname === "/" }
              classNames="fade-transition"
              timeout={{
                enter: 500,
                exit: 500
              }}
            >

              <Switch>

                <Route exact path="/login" name="Login Page" render={ ( props ) => <LoginPage { ...props } /> } />
                <Route exact path="/home" name="Home Page" extact render={ ( props ) => <HomePage { ...props } /> } />
                <Route path="/" name="Home Page" extact render={ ( props ) => <HomePage { ...props } /> } />

              </Switch>

            </CSSTransition>

          </SwitchTransition>

        </TransitionGroup>

      </React.Fragment>

    );
    */

  }

}

RootPage.propTypes = propTypes;
RootPage.defaultProps = defaultProps;

const mapDispatchToProps = {};

const mapStateToProps = ( state ) => {

  return {

    authentication: state.authentication,
    frontend: state.frontend

  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( RootPage );

export default withRouter( connectedComponent );
