import React, {
  Component
} from "react";

import {
  Route,
  Switch,
  //Redirect,
  withRouter
} from "react-router-dom";

import {
  connect
} from "react-redux";

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

    /*
    try {

      const strAuthorization = this.props.authentication.active && this.props.authentication.accounts ? this.props.authentication.accounts[ this.props.authentication.active ].Authorization : null;

      this.props.getUserActions( {

        transactionId: this.state.id,
        authorization: strAuthorization

      } );

    }
    catch ( error ) {

      //

    }
    */

  }

  componentDidUpdate() {

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

    return (

      <React.Fragment>

        <ModalManager />
        <Switch>

          {/*location={ forcedLocation } { pathname: "/home" }
          <Route exact path="/login" name="Login Page" render={ ( props ) => <Login { ...props } /> } />
          <Route exact path="/register" name="Register Page" render={ ( props ) => <Register { ...props } /> } />
          <Route exact path="/404" name="Page 404" render={ ( props ) => <Page404 { ...props } /> } />
          <Route exact path="/500" name="Page 500" render={ ( props ) => <Page500 { ...props } /> } />
          <Redirect from="/" to="/home" />
          */}
          <Route exact path="/login" name="Login Page" render={ ( props ) => <LoginPage { ...props } /> } />
          <Route exact path="/home" name="Home Page" extact render={ ( props ) => <HomePage { ...props } /> } />
          <Route path="/" name="Home Page" extact render={ ( props ) => <HomePage { ...props } /> } />

        </Switch>


        {/*

          usePreviousLocation && <Route exact path="/login" name="Login Modal" render={ ( props ) => <LoginModal { ...props } /> } />

        */}

      </React.Fragment>

    );

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
