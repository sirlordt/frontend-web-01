import React, {
  Component
} from "react";

import {
  withRouter
} from "react-router-dom";

import {
  connect
} from "react-redux";

import classNames from "classnames";

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
  CRow
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
  showModal
} from "../../redux/actions";

import SystemUtils from "../../utils/systemUtils";

import logo from "../../assets/img/brand/coreui-pro-base.svg";

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
      username: "",
      fieldUsernameMessage: "",
      fieldPasswordInvalid: false,
      password: "",
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
    console.log( "id =>", this.state.id );
    console.log( "props =>", this.props );
    console.log( "prevProps =>", prevProps );
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

      [ event.target.name ]: event.target.value

    } );

    if ( event.target.name === "username" ) {

      this.setState( () => ( {

        fieldUsernameInvalid: false,
        fieldUsernameMessage: ""

      } ) );

    }
    else if ( event.target.name === "password" ) {

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

    const bFieldUsernameInvalid = ( !this.state.username || this.state.username.trim() === "" );
    const bFieldPasswordInvalid = ( !this.state.password || this.state.password.trim() === "" );

    if ( bFieldUsernameInvalid ||
         bFieldPasswordInvalid ) {

      this.setState( {

        fieldUsernameInvalid: bFieldUsernameInvalid,
        fieldUsernameMessage: bFieldUsernameInvalid ? t( "Username field is required" ) : "",
        fieldPasswordInvalid: bFieldPasswordInvalid,
        fieldPasswordMessage: bFieldPasswordInvalid ? t( "Password field is required" ) : ""

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
        username: this.state.username,
        password: this.state.password

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

  }

  onClickButtonFacebook = ( event ) => {

    event && event.preventDefault();

  }

  onClickButtonTwitter = ( event ) => {

    event && event.preventDefault();

  }

  onClickButtonGoogle = ( event ) => {

    event && event.preventDefault();

  }

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
    const classes = classNames(
      "c-app c-default-layout flex-row align-items-start pt-3",
      this.props.frontend.themeDark ? "c-dark-theme" : false
      //this.state.themeDark ? "c-dark-theme" : false
    );

    const t = this.props.t; //Translate functions injected by withTranslation function

    return (

      <div className={ classes }>

        <CContainer>

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

                      <CFormGroup className="mb-0">

                        <CLabel htmlFor="username">

                          <Trans i18nKey="Username" />

                        </CLabel>

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
                            id="username"
                            name="username"
                            placeholder={ t( "Username" ) }
                            autoComplete="username"
                            onChange={ this.onChange }
                            innerRef={ this.inputUsername } />

                        </CInputGroup>

                        <CInvalidFeedback style={ {
                          display: "block",
                          height: "1.5em"
                        } }>

                          { this.state.fieldUsernameMessage ? this.state.fieldUsernameMessage : "" }

                        </CInvalidFeedback>

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <CRow className="m-0">

                          <CCol xs="4" className="pl-0 pr-0">

                            <CLabel
                              className="mb-0"
                              style={ {
                                padding: "0.375rem 0"
                              } }
                              htmlFor="password">

                              <Trans i18nKey="Password" />

                            </CLabel>

                          </CCol>

                          <CCol xs="8" className="pl-2 pr-0 text-right">

                            <CButton
                              id="buttonForgotPassword"
                              color="link"
                              className="px-0 box-shadow-none"
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
                            id="password"
                            name="password"
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

                        <CInvalidFeedback style={ {
                          display: "block",
                          height: "1.5em"
                        } }>

                          { this.state.fieldPasswordMessage ? this.state.fieldPasswordMessage : "" }

                        </CInvalidFeedback>

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

                        <CButton
                          className="btn-facebook box-shadow-none btn-brand mr-3"
                          onClick={ this.onClickButtonFacebook }>

                          <FontAwesomeIcon icon={ [ "fab", "facebook" ] } />

                        </CButton>

                        <CButton
                          className="btn-twitter box-shadow-none btn-brand mr-3"
                          onClick={ this.onClickButtonTwitter }>

                          <FontAwesomeIcon icon={ [ "fab", "twitter" ] } />

                        </CButton>

                        <CButton
                          className="btn-youtube box-shadow-none btn-brand"
                          onClick={ this.onClickButtonGoogle }>

                          <FontAwesomeIcon icon={ [ "fab", "google" ] } />

                        </CButton>

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

      </div>

    );

  }

}

LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;

const mapDispatchToProps = {
  login,
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
