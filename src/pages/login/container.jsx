import React, {
  Component
} from "react";

import {
  withRouter
} from "react-router-dom";

import {
  connect
} from "react-redux";

import {
  FacebookProvider,
  Login,
} from 'react-facebook';

//import { IntagramLogin } from 'react-instagram-login';

import GoogleLogin from 'react-google-login';

//import InstagramLogin from 'react-instagram-login';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CLabel,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInvalidFeedback,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CTooltip
} from "@coreui/react";

import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";

import {
  Trans,
  withTranslation
} from "react-i18next";

import PropTypes from "prop-types";

import {
  login,
  loginGoogle,
  loginFacebook,
  loginInstagram,
  showModal
} from "../../redux/actions";

import SystemUtils from "../../utils/systemUtils";

import logo from "../../assets/img/brand/coreui-pro-base.svg";
import LoggerManager from "../../utils/loggerManager";

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

class LoginPage extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4(),

      fieldUsernameInvalid: false,
      fieldUsernameValue: "",
      fieldUsernameMessage: "",

      fieldPasswordInvalid: false,
      fieldPasswordValue: "",
      fieldPasswordMessage: "",
      fieldPasswordShowContent: false,

      buttonLoginDisabled: false

    };

    this.inputUsername = React.createRef();
    this.inputPassword = React.createRef();

  }

  componentDidMount() {

    setTimeout( () => {

      this.inputUsername.current.focus();

    }, 100 );

  }

  shouldComponentUpdate( nextProps ) {

    //componentDidUpdate( prevProps ) {

    /*
    LoggerManager.mark( "1D135A36F0A3" );
    LoggerManager.debug( "E3FDC2CF0417", "id =>", this.state.id );
    LoggerManager.debug( "5776C1FE7A50","props =>", this.props );
    LoggerManager.debug( "7BB590B0EE98", "prevProps =>", prevProps );
    */

    if ( this.props.authentication.results[ this.state.id ]?.mark !== nextProps.authentication.results[ this.state.id ]?.mark ) {

      const t = this.props.t; //Translate functions injected by withTranslation function

      const strCode = nextProps.authentication.results[ this.state.id ].data.Code;
      const strMessage = nextProps.authentication.results[ this.state.id ].data.Message;

      if ( strCode === "NO_RESPONSE_FROM_SERVER" ) {

        this.props.showModal( {

          modalId: this.state.id,
          modalCode: "NOTIFICATION_MODAL",
          modalTitle: t( "No response from server" ),
          modalMessage: t( strMessage ),
          modalCallback: this.onClickButtonCloseModalCallback

        } );

      }
      else if ( strCode === "SUCCESS_LOGIN" ) {

        this.props.history.replace( {

          pathname: "/home"

        } );

      }
      else {

        this.props.showModal( {

          modalId: this.state.id,
          modalCode: "NOTIFICATION_MODAL",
          modalTitle: t( "Error" ),
          modalMessage: t( strMessage ),
          modalCallback: this.onClickButtonCloseModalCallback

        } );

      }

    }

    return true;

  }

  onChange = ( event ) => {

    this.setState( {

      [ "field" + event.target.name + "Value" ]: event.target.value

    } );

    if ( event.target.name === "Username" ) {

      this.setState( () => ( {

        fieldUsernameInvalid: false,
        fieldUsernameMessage: ""

      } ) );

    }
    else if ( event.target.name === "Password" ) {

      this.setState( () => ( {

        fieldPasswordInvalid: false,
        fieldPasswordMessage: ""

      } ) );

    }

  };

  onClickButtonForgotPassword = ( event ) => {

    event && event.preventDefault();

  }

  onClickButtonShowPassword = () => {

    this.setState( ( prevState ) => ( {

      fieldPasswordShowContent: !prevState.fieldPasswordShowContent

    } ) );

    this.inputPassword.current.focus();

  }

  onClickButtonLogin = ( event ) => {

    event && event.preventDefault();

    const t = this.props.t; //Translate functions injected by withTranslation function

    const bFieldUsernameInvalid = ( !this.state.fieldUsernameValue || this.state.fieldUsernameValue.trim() === "" );
    const bFieldPasswordInvalid = ( !this.state.fieldPasswordValue || this.state.fieldPasswordValue.trim() === "" );

    if ( bFieldUsernameInvalid ||
         bFieldPasswordInvalid ) {

      this.setState( {

        fieldUsernameInvalid: bFieldUsernameInvalid,
        fieldUsernameMessage: bFieldUsernameInvalid ? t( "The Username field is required" ) : "",
        fieldPasswordInvalid: bFieldPasswordInvalid,
        fieldPasswordMessage: bFieldPasswordInvalid ? t( "The Password field is required" ) : ""

      } );

    }
    else {

      this.setState( {

        fieldUsernameInvalid: false,
        fieldUsernameMessage: "",
        fieldPasswordInvalid: false,
        fieldPasswordMessage: "",
        buttonLoginDisabled: true

      } );

      this.props.login( {

        transactionId: this.state.id,
        username: this.state.fieldUsernameValue,
        password: this.state.fieldPasswordValue

      } );

    }

  }

  onClickButtonCloseModalCallback = ( event ) => {

    event && event.preventDefault();

    this.setState( {

      buttonLoginDisabled: false

    } );

  }

  onClickButtonDontHaveAccountYet = ( event ) => {

    event && event.preventDefault();

    this.props.history.replace( {

      pathname: "/signup"

    } );

  }

  responseSuccessGoogle = async ( response ) => {

    LoggerManager.markLog( "CD73E33A9E73", "Google Success => ", response );

    this.props.loginGoogle( {

      transactionId: this.state.id,

      loginData: {

        Token: response.tokenId

      }

    } );

  }

  responseFailureGoogle = async ( response ) => {

    LoggerManager.markLog( "EF466C1A1178", "Google Failure => ", response );

  }

  responseSuccessFacebook = async ( response ) => {

    LoggerManager.markLog( "ECF3F9A9A972", "Facebook Success => ", response );

    this.props.loginFacebook( {

      transactionId: this.state.id,

      loginData: {

        UserId: response.tokenDetail.userID,
        Token: response.tokenDetail.accessToken,

      }

    } );

  }

  responseFailureFacebook = async ( response ) => {

    LoggerManager.markLog( "173F4AB03525", "Facebook Failure => ", response );

  }

  responseSuccessInstagram = async ( response ) => {

    LoggerManager.markLog( "D31A00A0A4A4", "Instagram Success => ", response );

    this.props.loginInstagram( {

      transactionId: this.state.id,

      loginData: {

        Token: response.token

      }

    } );

  }

  responseFailureInstagram = async ( response ) => {

    LoggerManager.markLog( "DFB3FBB97D69", "Instagram Failure => ", response );

  }

  /*
  onClickButtonGoogle = ( event ) => {

    event && event.preventDefault();

  }
  */

  onClickButtonAccounts = ( event ) => {

    event && event.preventDefault();

    this.props.showModal( {

      modalId: this.state.id,
      modalCode: "CHANGE_ACCOUNT_MODAL"

    } );

  }

  onClickButtonServer = ( event ) => {

    event && event.preventDefault();

    this.props.showModal( {

      modalId: this.state.id,
      modalCode: "CHANGE_BACKEND_SERVER_MODAL"

    } );

  }

  onClickButtonGotoHome = ( event ) => {

    event && event.preventDefault();

    this.props.history.replace( {

      pathname: "/home"

    } );

  }

  onClickButtonLanguages = ( event ) => {

    event && event.preventDefault();

    this.props.showModal( {

      modalId: this.state.id,
      modalCode: "CHANGE_LANGUAGE_MODAL"

    } );

  }

  render() {

    // dark theme
    /*
    const classes = classNames(
      "c-app c-default-layout flex-row align-items-start pt-3 fade-in",
      this.props.frontend.themeDark ? "c-dark-theme fade-in" : false
      //this.state.themeDark ? "c-dark-theme" : false
    );
    */

    //LoggerManager.markLog( "DCDC2F3D9460", process.env.REACT_APP_REACT_SCRIPT );

    const t = this.props.t; //Translate functions injected by withTranslation function

    return (

      <React.Fragment>

        <CContainer className="pt-3 fade-in">

          <CRow className="justify-content-center">

            <CCol md="5">

              <CCardGroup>

                <CCard className="p-4">

                  <CCardBody className="p-0">

                    <CForm>

                      <CFormGroup className="mb-0 d-flex justify-content-center">

                        <img src={ logo } height="100" alt="Logo" />

                      </CFormGroup>

                      <CFormGroup className="mb-0">

                        <h1>

                          <Trans i18nKey="Login" />

                        </h1>

                        <p className="text-muted">

                          <Trans i18nKey="Sign In to your account" />

                        </p>

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <CRow className="m-0">

                          <CLabel className="margin-bottom-0-2-rem" htmlFor="Username">

                            <Trans i18nKey="Username" /> *

                          </CLabel>

                        </CRow>

                        <CInputGroup>

                          <CInputGroupPrepend>

                            <CInputGroupText>

                              <FontAwesomeIcon icon="user" />

                            </CInputGroupText>

                          </CInputGroupPrepend>

                          <CInput
                            invalid={ this.state.fieldUsernameInvalid }
                            className="box-shadow-none"
                            type="text"
                            id="Username"
                            name="Username"
                            placeholder={ t( "Username" ) }
                            autoComplete="username"
                            onChange={ this.onChange }
                            innerRef={ this.inputUsername } />

                        </CInputGroup>

                        {

                          this.state.fieldUsernameMessage ?
                          (
                            <CInvalidFeedback style={ {
                              display: "block"
                            } }>

                              { this.state.fieldUsernameMessage ? this.state.fieldUsernameMessage : "" }

                            </CInvalidFeedback>
                          )
                          :
                          (
                            null
                          )

                        }

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <CRow className="m-0">

                          <CCol xs="4" className="pl-0 pr-0">

                            <CLabel
                              className="margin-bottom-0-2-rem"
                              htmlFor="password">

                              <Trans i18nKey="Password" /> *

                            </CLabel>

                          </CCol>

                          <CCol xs="8" className="pl-2 pr-0 text-right">

                            <CButton
                              id="buttonForgotPassword"
                              color="link"
                              className="p-0 box-shadow-none margin-bottom-0-2-rem"
                              onClick={ this.onClickButtonForgotPassword }>

                              <Trans i18nKey="Forgot your password?" />

                            </CButton>

                          </CCol>

                        </CRow>

                        <CInputGroup>

                          <CInputGroupPrepend>

                            <CInputGroupText>

                              <FontAwesomeIcon icon="lock" />

                            </CInputGroupText>

                          </CInputGroupPrepend>

                          <CInput
                            invalid={ this.state.fieldPasswordInvalid }
                            className="box-shadow-none field-password"
                            type={ this.state.fieldPasswordShowContent ? "text" : "password" }
                            id="Password"
                            name="Password"
                            placeholder={ t( "Password" ) }
                            autoComplete="current-password"
                            onChange={ this.onChange }
                            innerRef={ this.inputPassword } />

                          <CButton
                            id="buttonShowPassword"
                            color="link"
                            className="position-absolute btn-show-password simple-color-gray"
                            onClick={ this.onClickButtonShowPassword }
                          >

                            <FontAwesomeIcon icon={ this.state.fieldPasswordShowContent ? "eye-slash" : "eye" } />

                          </CButton>

                        </CInputGroup>

                       {

                         this.state.fieldPasswordMessage ?

                         (
                            <CInvalidFeedback style={ {
                              display: "block"
                            } }>

                              { this.state.fieldPasswordMessage ? this.state.fieldPasswordMessage : "" }

                            </CInvalidFeedback>
                         )
                         :
                         (
                           null
                         )

                       }

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <CButton
                          id="buttonLogin"
                          disabled={ this.state.buttonLoginDisabled }
                          className="w-100 box-shadow-none"
                          color="primary"
                          onClick={ this.onClickButtonLogin }>

                          <FontAwesomeIcon icon="sign-in-alt" />

                          <span className="px-2 m-0">

                            <Trans i18nKey="Login" />

                          </span>

                        </CButton>

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <CButton
                          id="buttonDontHaveAccountYet"
                          className="w-100 box-shadow-none simple-color-gray simple-border-color-gray"
                          onClick={ this.onClickButtonDontHaveAccountYet }>
                          <FontAwesomeIcon icon="user-plus" />
                          <span className="px-2 m-0">

                            <Trans i18nKey="Don&apos;t have account yet?" />

                          </span>
                        </CButton>

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <p className="text-muted text-center m-0">

                          <Trans i18nKey="Or login with" />

                        </p>

                      </CFormGroup>

                      <CFormGroup className="mb-4 d-flex justify-content-center">

                        <FacebookProvider
                          appId={ process.env.REACT_APP_FACEBOOK_APP_ID }>

                          <Login
                            scope="email"
                            onCompleted={ this.responseSuccessFacebook }
                            onError={ this.responseFailureFacebook }
                          >

                            {({ loading, handleClick, error, data }) => (

                              <CTooltip content="Facebook">

                                <CButton
                                  className="btn-facebook box-shadow-none btn-brand mr-3"
                                  onClick={ handleClick }
                                  disabled={ loading }
                                >

                                  <FontAwesomeIcon icon={ [ "fab", "facebook" ] } />

                                </CButton>

                              </CTooltip>

                            )}

                          </Login>

                        </FacebookProvider>

                        {/*
                        <CTooltip content="Instagram">

                          <div className=" mr-3">

                            <InstagramLogin
                              clientId={ process.env.REACT_APP_INSTAGRAM_CLIENT_ID }
                              onSuccess={ this.responseSuccessInstagram }
                              onFailure={ this.responseFailureInstagram }
                              cssClass="btn btn-instagram box-shadow-none btn-brand intagram-button"
                              buttonText=""
                            >

                              <FontAwesomeIcon icon={ [ "fab", "instagram" ] } />

                            </InstagramLogin>

                          </div>

                        </CTooltip>
                        */}

                        <GoogleLogin
                          clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID }
                          render={ renderProps => (

                            <CTooltip content="Google">

                              <CButton
                                className="btn-youtube box-shadow-none btn-brand"
                                onClick={ renderProps.onClick }
                                disabled={ renderProps.disabled }
                                alt="Google"
                                //onClick={ this.onClickButtonGoogle }>
                              >

                                <FontAwesomeIcon icon={ [ "fab", "google" ] } />

                              </CButton>

                            </CTooltip>

                          )}
                          onSuccess={ this.responseSuccessGoogle }
                          onFailure={ this.responseFailureGoogle }
                          responseType='code,token'
                        />

                      </CFormGroup>

                      <CFormGroup className="mb-2 d-flex justify-content-center">

                        <CButton
                          id="buttonAccounts"
                          className="mr-3 box-shadow-none simple-color-gray simple-border-color-gray"
                          style={ {
                            width: "4rem"
                          } }
                          onClick={ this.onClickButtonAccounts }>

                          <FontAwesomeIcon icon="user" />

                        </CButton>

                        <CButton
                          id="buttonServer"
                          className="mr-3 box-shadow-none simple-color-gray simple-border-color-gray"
                          style={ {
                            width: "4rem"
                          } }
                          onClick={ this.onClickButtonServer }>

                          <FontAwesomeIcon icon="server" />

                        </CButton>

                        <CButton
                          id="buttonGotoHome"
                          className="mr-3 box-shadow-none simple-color-gray simple-border-color-gray"
                          style={ {
                            width: "4rem"
                          } }
                          onClick={ this.onClickButtonGotoHome }>

                          <FontAwesomeIcon icon="home" />

                        </CButton>

                        <CButton
                          id="buttonLanguages"
                          className="box-shadow-none simple-color-gray simple-border-color-gray"
                          style={ {
                            width: "4rem"
                          } }
                          onClick={ this.onClickButtonLanguages }>

                          <FontAwesomeIcon icon="language" />

                        </CButton>

                      </CFormGroup>

                      <CFormGroup className="m-0">

                        <p className="text-muted text-center m-0 mt-4">

                          <Trans i18nKey="&copy; 2020 company." />

                        </p>

                      </CFormGroup>

                    </CForm>

                  </CCardBody>

                </CCard>

              </CCardGroup>

            </CCol>

          </CRow>

        </CContainer>

      </React.Fragment>

    );

  }

}

LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;

const mapDispatchToProps = {
  login,
  loginGoogle,
  loginFacebook,
  loginInstagram,
  showModal
};

const mapStateToProps = ( state ) => {

  return {

    authentication: state.authentication,
    frontend: state.frontend

  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( LoginPage );

export default withRouter( withTranslation()( connectedComponent ) );
