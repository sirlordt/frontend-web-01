import React, {
  Component
  //Suspense
} from "react";

import {
  withRouter
} from "react-router-dom";

import {
  connect
} from "react-redux";

import PropTypes from "prop-types";

import {
  CButton,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  //CHeaderNavItem,
  //CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter
  //CLink
} from "@coreui/react";

import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";

import {
  Trans,
  withTranslation
} from "react-i18next";

// routes config
import { routes } from "../../routes";

import logo from "../../assets/img/brand/coreui-pro-base.svg";

import {
  toggleDark,
  toggleLeftSidebar,
  toggleLeftSidebarMobile,
  toggleRightSidebar,
  tokenCheck,
  logout,
  showModal,
  closeModal,
  getUserActions
} from "../../redux/actions";

import SystemUtils from "../../utils/systemUtils";
import CommonUtilities from "../../utils/commonUtilities";

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

class Header extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4()

    };

  }

  shouldComponentUpdate( nextProps ) {

    if ( this.props.authentication.results[ this.state.id ]?.mark !== nextProps.authentication.results[ this.state.id ]?.mark ) {

      const t = this.props.t;

      const strCode = nextProps.authentication.results[ this.state.id ].data.Code;
      const strMessage = nextProps.authentication.results[ this.state.id ].data.Message;

      if ( strCode === "NO_RESPONSE_FROM_SERVER" ) {

        this.props.showModal( {

          modalId: this.state.id,
          modalCode: "NO_RESPONSE_FROM_SERVER_MODAL",
          modalTitle: t( "No response from server" ),
          modalMessage: t( strMessage ),
          modalTag: "forceCheckToken"

        } );

      }
      else if ( strCode === "SUCCESS_LOGOUT" ) {

        this.props.getUserActions( {

          transactionId: this.state.id,
          authorization: null

        } );

        this.props.showModal( {

          modalId: this.state.id,
          modalCode: "NOTIFICATION_MODAL",
          modalTitle: t( "Success Logout" ),
          modalMessage: t( strMessage )

        } );

        this.props.history.replace( {

          pathname: "/home"

        } );

      }
      else { //Other errors

        this.props.showModal( {

          modalId: this.state.id,
          modalCode: "NOTIFICATION_MODAL",
          modalTitle: "Error",
          modalMessage: strMessage

        } );

      }

    }

    return true;

  }

  async componentDidMount() {

    //

  }

  onClickButtonLogout = ( event ) => {

    event && event.preventDefault();

    const t = this.props.t; //Translate functions injected by withTranslation function

    this.props.showModal( {

      modalId: this.state.id,
      modalCode: "LOGOUT_QUESTION_MODAL",
      modalTitle: t( "Logout" ),
      modalMessage: t( "Are you sure do you want logout?" )

    } );

  }

  render() {

    const isAuthenticated = !!( this.props.authentication.active );

    const showButtonLogin = CommonUtilities.checkActionAllowed( this.props.frontend.userActions,
                                                                [ "v1.system.auth.login" ],
                                                                "weak_and" );
    //!!( Object.keys( this.props.frontend.userActions ).length === 0 || this.props.frontend.userActions[ "v1.system.auth.login" ] );
    const showButtonSignup = CommonUtilities.checkActionAllowed( this.props.frontend.userActions,
                                                                 [ "v1.system.user.signup",
                                                                   "v1.system.user.signup.activate" ],
                                                                 "weak_and" );
    //!!( Object.keys( this.props.frontend.userActions ).length === 0 ||
    //                             ( this.props.frontend.userActions[ "v1.system.user.signup" ] &&
    //                               this.props.frontend.userActions[ "v1.system.user.signup.activate" ] ) );

    const t = this.props.t; //Translate functions injected by withTranslation function

    return (

      <React.Fragment>

        {

          isAuthenticated ? (

            <React.Fragment>

              <CToggler
                inHeader
                className="ml-md-3 d-lg-none"
                onClick={ ( event ) => this.props.toggleLeftSidebarMobile( event ) }
              />

              <CToggler
                inHeader
                className="ml-3 d-md-down-none"
                onClick={ ( event ) => this.props.toggleLeftSidebar( event ) }
              />

            </React.Fragment>

          ) : null

        }

        {

          !isAuthenticated ? (

            <React.Fragment>

              <CHeaderBrand className="ml-2" to="/home">

                <img src={ logo } height="48" alt="Logo" />

              </CHeaderBrand>

              <div className="mx-auto" />

            </React.Fragment>

          ) : (

            <CHeaderBrand className="mx-auto d-lg-none" to="/home">

              <img src={ logo } height="48" alt="Logo" />

            </CHeaderBrand>

          )

        }

        <CHeaderNav className="ml-lg-auto mr-2">

          {

            !isAuthenticated ? (

              <React.Fragment>

                {

                  showButtonLogin ? (

                    <CButton
                      className="ml-2 box-shadow-none"
                      color="primary"
                      onClick={ () => {

                        this.props.history.push( "/login" );

                      } }
                    >

                      <FontAwesomeIcon icon="sign-in-alt" />

                      <span className="ml-2 d-sm-down-none">

                        <Trans i18nKey="Login" />

                      </span>

                    </CButton>

                  ) : null

                }

                {

                  showButtonSignup ? (

                    <CButton
                      className="ml-2 box-shadow-none"
                      color="success"
                      onClick={ () => {

                        this.props.history.push( "/signup" );

                      } }
                    >

                      <FontAwesomeIcon icon="user-plus" />

                      <span className="ml-2 d-sm-down-none">

                        <Trans i18nKey="Signup" />

                      </span>

                    </CButton>

                  ) : null

                }

              </React.Fragment>

            ) : (

              <React.Fragment>

                <CButton
                  className="ml-2 box-shadow-none"
                  color="primary"
                  onClick={ this.onClickButtonLogout }
                >

                  <FontAwesomeIcon icon="sign-out-alt" />

                  <span className="ml-2 d-sm-down-none">

                    <Trans i18nKey="Logout" />

                  </span>

                </CButton>

              </React.Fragment>

            )

          }

        </CHeaderNav>

        <CSubheader className="pl-3 justify-content-between*">
          <CBreadcrumbRouter
            className="border-0 c-subheader-nav m-0 px-0 px-md-3"
            routes={ routes }
          />

          <CHeaderNav className="ml-auto mr-2">

            <CToggler
              inHeader
              className="ml-auto"
              onClick={ this.props.toggleDark }
              title={ t( "Toggle Light/Dark Mode" ) }
            >

              <FontAwesomeIcon icon="moon" name="cil-moon" className="c-d-dark-none" alt={ t( "Dark mode" ) } />
              <FontAwesomeIcon icon="sun" name="cil-sun" className="c-d-default-none" alt={ t( "Light mode" ) } />

            </CToggler>

          </CHeaderNav>

        </CSubheader>

      </React.Fragment>

    );

  }

}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const mapDispatchToProps = {
  toggleDark,
  toggleLeftSidebar,
  toggleLeftSidebarMobile,
  toggleRightSidebar,
  tokenCheck,
  logout,
  showModal,
  closeModal,
  getUserActions
};

const mapStateToProps = ( state ) => {

  //LoggerManager.markLog( "6934933AA6D1", "Header State => ", state );

  return {

    authentication: state.authentication,
    frontend: state.frontend

  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( Header );

export default withRouter( withTranslation()( connectedComponent ) );

//export default Header;
