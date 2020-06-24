/* eslint-disable no-useless-escape */
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

import {
  GoogleLogin
} from 'react-google-login';


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
  CTooltip,
  CSelect
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
  signup,
  signupGoogle,
  signupFacebook,
  signupInstagram,
  showModal
} from "../../redux/actions";

import SystemUtils from "../../utils/systemUtils";

import logo from "../../assets/img/brand/coreui-pro-base.svg";
import SystemUtilities from "../../utils/systemUtilities";
import LoggerManager from "../../utils/loggerManager";

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

class SignupPage extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4(),

      fieldKindInvalid: false,
      fieldKindMessage: "",
      fieldKindValue: "Administrative_Asistant",

      fieldEMailInvalid: false,
      fieldEMailMessage: "",
      fieldEMailValue: "",

      fieldFirstNameInvalid: false,
      fieldFirstNameMessage: "",
      fieldFirstNameValue: "",

      fieldLastNameInvalid: false,
      fieldLastNameMessage: "",
      fieldLastNameValue: "",

      fieldPhoneInvalid: false,
      fieldPhoneMessage: "",
      fieldPhoneValue: "",

      fieldPasswordInvalid: false,
      fieldPasswordMessage: "",
      fieldPasswordValue: "",
      fieldPasswordShowContent: false,

      fieldConfirmPasswordInvalid: false,
      fieldConfirmPasswordMessage: "",
      fieldConfirmPasswordValue: "",
      fieldConfirmPasswordShowContent: false,

      buttonSignupDisabled: false

    };

    this.inputEMail = React.createRef();
    this.inputPassword = React.createRef();
    this.inputConfirmPassword = React.createRef();

  }

  componentDidMount() {

    setTimeout( () => {

      this.inputEMail.current.focus();

    }, 100 );

  }

  shouldComponentUpdate( nextProps ) {

    //componentDidUpdate( prevProps ) {

    /*
    LoggerManager.mark( "B3D9BBE277F3" );
    LoggerManager.debug( "id =>", this.state.id );
    LoggerManager.debug( "props =>", this.props );
    LoggerManager.debug( "prevProps =>", prevProps );
    */

    if ( this.props.authentication.results[ this.state.id ]?.mark !== nextProps.authentication.results[ this.state.id ]?.mark ) {

      const t = this.props.t; //Translate functions injected by withTranslation function

      const strActionType = nextProps.authentication.results[ this.state.id ].actionType;
      const strCode = nextProps.authentication.results[ this.state.id ].data.Code;
      const strMessage = nextProps.authentication.results[ this.state.id ].data.Message;

      LoggerManager.mark( "970538B02AE5" );
      LoggerManager.log( "shouldComponentUpdate.ActionType => " + strActionType );
      LoggerManager.log( "shouldComponentUpdate.Code => " + strCode );

      if ( strCode === "NO_RESPONSE_FROM_SERVER" ) {

        this.props.showModal( {

          modalId: this.state.id,
          modalCode: "NOTIFICATION_MODAL",
          modalTitle: t( "No response from server" ),
          modalMessage: t( strMessage ),
          modalCallback: this.onClickButtonCloseModalCallback

        } );

      }
      else if ( strCode === "SUCCESS_SUCCESS_USER_SIGNUP" ) {

        //request the activation code
        this.props.history.replace( {

          pathname: "/signup/activate"

        } );

      }
      else if ( strActionType === "USER_SIGNUP_GOOGLE_SUCCESS" &&
                strCode === "SUCCESS_USER_ACTIVATION" ) {

        this.props.showModal( {

          modalId: this.state.id,
          modalCode: "NOTIFICATION_MODAL",
          modalTitle: t( "Success user creation" ),
          modalMessage: t( "Success user creation. Using your google user account" ),
          modalCallback: ( event ) => { this.onClickButtonCloseModalCallback( event, { actionType: strActionType, code: strCode } ); }

        } );

      }
      else if ( strActionType === "USER_SIGNUP_FACEBOOK_SUCCESS" &&
                strCode === "SUCCESS_USER_ACTIVATION" ) {

        this.props.showModal( {

          modalId: this.state.id,
          modalCode: "NOTIFICATION_MODAL",
          modalTitle: t( "Success user creation" ),
          modalMessage: t( "Success user creation. Using your facebook user account" ),
          modalCallback: ( event ) => { this.onClickButtonCloseModalCallback( event, { actionType: strActionType, code: strCode } ); }

        } );

      }
      else if ( strActionType === "USER_SIGNUP_INSTAGRAM_SUCCESS" &&
                strCode === "SUCCESS_USER_ACTIVATION" ) {

        this.props.showModal( {

          modalId: this.state.id,
          modalCode: "NOTIFICATION_MODAL",
          modalTitle: t( "Success user creation" ),
          modalMessage: t( "Success user creation. Using your instagram user account" ),
          modalCallback: ( event ) => { this.onClickButtonCloseModalCallback( event, { actionType: strActionType, code: strCode } ); }

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

    if ( event.target.name === "Kind" ) {

      this.setState( () => ( {

        fieldKindInvalid: false,
        fieldKindMessage: ""

      } ) );

    }
    else if ( event.target.name === "Email" ) {

      this.setState( () => ( {

        fieldEMailInvalid: false,
        fieldEMailMessage: ""

      } ) );

    }
    else if ( event.target.name === "FirstName" ) {

      this.setState( () => ( {

        fieldFirstNameInvalid: false,
        fieldFisrtNameMessage: ""

      } ) );

    }
    else if ( event.target.name === "LastName" ) {

      this.setState( () => ( {

        fieldLastNameInvalid: false,
        fieldLastNameMessage: ""

      } ) );

    }
    else if ( event.target.name === "Phone" ) {

      this.setState( () => ( {

        fieldPhoneInvalid: false,
        fieldPhoneMessage: ""

      } ) );

    }
    else if ( event.target.name === "Password" ||
              event.target.name === "ConfirmPassword" ) {

      this.setState( () => ( {

        fieldPasswordInvalid: false,
        fieldPasswordMessage: "",
        fieldConfirmPasswordInvalid: false,
        fieldConfirmPasswordMessage: ""

      } ) );

    }

  };

  onClickButtonShowPassword = () => {

    this.setState( ( prevState ) => ( {

      fieldPasswordShowContent: !prevState.fieldPasswordShowContent

    } ) );

    this.inputPassword.current.focus();

  }

  onClickButtonShowConfirmPassword = () => {

    this.setState( ( prevState ) => ( {

      fieldConfirmPasswordShowContent: !prevState.fieldConfirmPasswordShowContent

    } ) );

    this.inputConfirmPassword.current.focus();

  }

  onClickButtonSendActivationCode = ( event ) => {

    event && event.preventDefault();

    const t = this.props.t; //Translate functions injected by withTranslation function

    const rules = {

      Name: [ 'required', 'min:3', 'regex:/^[a-zA-Z0-9\#\@\.\_\-]+$/g' ],
      EMail: 'required|emailList', //<-- emailList is a custom validator defined in SystemUtilities.createCustomValidatorSync
      Phone: 'present|phoneUSList', //<-- phoneUSList is a custom validator defined in SystemUtilities.createCustomValidatorSync
      FirstName: [ 'required', 'min:2', 'regex:/^[a-zA-Z0-9\#\@\.\_\-\\sñÑáéíóúàèìòùäëïöüÁÉÍÓÚÀÈÌÒÙÄËÏÖÜ]+$/g' ],
      LastName: [ 'required', 'min:1', 'regex:/^[a-zA-Z0-9\#\@\.\_\-\\sñÑáéíóúàèìòùäëïöüÁÉÍÓÚÀÈÌÒÙÄËÏÖÜ]+$/g' ],
      Password: [ 'required' ],

    };

    const signupData = {

      Kind: this.state.fieldKindValue,
      Name: this.state.fieldEMailValue,
      FirstName: this.state.fieldFirstNameValue,
      EMail: this.state.fieldEMailValue,
      Phone: this.state.fieldPhoneValue,
      Password: this.state.fieldPasswordValue,

    };

    const validator = SystemUtilities.createCustomValidatorSync( signupData,
                                                                 rules,
                                                                 null );

    if ( validator.passes() === false ) {

      const bFieldConfirmPasswordInvalid = ( !this.state.fieldConfirmPasswordValue || this.state.fieldConfirmPasswordValue.trim() === "" );

      const errors = validator.errors.all();

      this.setState( {

        fieldKindInvalid: !!errors[ "Kind" ],
        fieldKindMessage: t( errors[ "Kind" ] && errors[ "Kind" ].length >  0 ? errors[ "Kind" ][ 0 ]: "" ),
        fieldEMailInvalid: !!errors[ "EMail" ],
        fieldEMailMessage: t( errors[ "EMail" ] && errors[ "EMail" ].length >  0 ? errors[ "EMail" ][ 0 ].replace( "EMail", "Email" ): "" ),
        fieldPhoneInvalid: !!errors[ "Phone" ],
        fieldPhoneMessage: t( errors[ "Phone" ] && errors[ "Phone" ].length >  0 ? errors[ "Phone" ][ 0 ]: "" ),
        fieldFirstNameInvalid: !!errors[ "FirstName" ],
        fieldFirstNameMessage: t( errors[ "FirstName" ] && errors[ "FirstName" ].length >  0 ? errors[ "FirstName" ][ 0 ].replace( "FirstName", "First name" ): "" ),
        fieldLastNameInvalid: !!errors[ "LastName" ],
        fieldLastNameMessage: t( errors[ "LastName" ] && errors[ "LastName" ].length >  0 ? errors[ "LastName" ][ 0 ].replace( "LastName", "Last name" ): "" ),
        fieldPasswordInvalid: !!errors[ "Password" ],
        fieldPasswordMessage: t( errors[ "Password" ] && errors[ "Password" ].length >  0 ? errors[ "Password" ][ 0 ]: "" ),
        fieldConfirmPasswordInvalid: bFieldConfirmPasswordInvalid,
        fieldConfirmPasswordMessage: bFieldConfirmPasswordInvalid ? t( "The Confirm password field is required" ) : ""

      } );

    }
    else {

      this.setState( {

        fieldKindInvalid: false,
        fieldKindMessage: "",
        fieldEMailInvalid: false,
        fieldEMailMessage: "",
        fieldFirstNameInvalid: false,
        fieldFirstNameMessage: "",
        fieldLastNameInvalid: false,
        fieldLastNameMessage: "",
        fieldPasswordInvalid: false,
        fieldPasswordeMessage: "",
        fieldConfirmPasswordInvalid: false,
        fieldConfirmPasswordMessage: ""

      } );

      this.props.signup( {

        transactionId: this.state.id,
        signupData: signupData

      } );


    }

  }

  onClickButtonIHaveAnActivationCode = ( event ) => {

    event && event.preventDefault();

    //request the activation code
    this.props.history.replace( {

      pathname: "/signup/activate"

    } );

  }

  onClickButtonCloseModalCallback = ( event, additionalData ) => {

    event && event.preventDefault();

    if ( additionalData ) {

      if ( additionalData.code === "SUCCESS_USER_ACTIVATION" ) {

        this.props.history.replace( {

          pathname: "/home"

        } );

      }

    }
    else {

      this.setState( {

        buttonSignupDisabled: false

      } );

    }

  }

  responseSuccessGoogle = async ( response ) => {

    LoggerManager.markLog( "124F78572C9C", { "Google Success": response } );

    this.props.signupGoogle( {

      transactionId: this.state.id,

      signupData: {

        Kind: this.state.fieldKindValue,
        Token: response.tokenId

      }

    } );

  }

  responseFailureGoogle = async ( response ) => {

    LoggerManager.markLog( "2D55FFE29948", { "Google Failure": response } );

  }

  responseSuccessFacebook = async ( response ) => {

    LoggerManager.markLog( "28A5F38D15E9", { "Facebook Success": response } );

    this.props.signupFacebook( {

      transactionId: this.state.id,

      signupData: {

        Kind: this.state.fieldKindValue,
        UserId: response.tokenDetail.userID,
        Token: response.tokenDetail.accessToken,
        //Token: response.tokenDetail.signedRequest

      }

    } );

  }

  responseFailureFacebook = async ( response ) => {

    LoggerManager.markLog( "3AE829F4987E", { "Facebook Failure": response } );

  }

  responseSuccessInstagram = async ( response ) => {

    LoggerManager.markLog( "69EF9D4B63AF", { "Instagram Success": response } );

    this.props.singupInstagram( {

      transactionId: this.state.id,
      signupData: {

        Kind: this.state.fieldKindValue,
        UserId: response.tokenId,
        Token: response.tokenId

      }

    } );

  }

  responseFailureInstagram = async ( response ) => {

    LoggerManager.markLog( "BC83901F6E75", { "Instagram Failure": response } );

  }

  onClickButtonServer = ( event ) => {

    event && event.preventDefault();

    this.props.showModal( {

      modalId: this.state.id,
      modalCode: "CHANGE_BACKEND_SERVER_MODAL"

    } );

  }

  onClickButtonGotoLogin = ( event ) => {

    event && event.preventDefault();

    this.props.history.replace( {

      pathname: "/login"

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

                          <Trans i18nKey="Signup" />

                        </h1>

                        <p className="text-muted">

                          <Trans i18nKey="Create new account" />

                        </p>

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <CLabel className="margin-bottom-0-2-rem" htmlFor="Kind">

                          <Trans i18nKey="Kind" /> *

                        </CLabel>

                        <CInputGroup>

                          <CInputGroupPrepend>

                            <CInputGroupText>

                              <FontAwesomeIcon icon="user" />

                            </CInputGroupText>

                          </CInputGroupPrepend>

                          <CSelect
                            custom
                            invalid={ this.state.fieldKindInvalid }
                            className="box-shadow-none"
                            name="Kind"
                            id="Kind"
                            onChange={ this.onChange }
                            value={ this.state.fieldKindValue }
                          >

                            <option value="Administrative_Asistant">

                              { t( "Administrative Asistant" ) }

                            </option>

                            <option value="Dispatcher">

                              { t( "Dispatcher" ) }

                            </option>

                            <option value="Driver">

                              { t( "Driver" ) }

                            </option>

                            <option value="Establishment">

                              { t( "Establishment" ) }

                            </option>

                            <option value="Final_Customer">

                              { t( "Final Customer" ) }

                            </option>

                          </CSelect>

                          {

                            this.state.fieldKindMessage ? (

                              <CInvalidFeedback className="custom-invalid-feedback">

                                { this.state.fieldKindMessage ? this.state.fieldKindMessage : "" }

                              </CInvalidFeedback>

                            ) : null

                          }

                        </CInputGroup>

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <p className="text-muted text-center m-0">

                          <Trans i18nKey="Fast social signup with" />

                        </p>

                      </CFormGroup>

                      <CFormGroup className="mb-2 d-flex justify-content-center">

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

                          <CButton
                            className="btn-instagram box-shadow-none btn-brand mr-3"
                            onClick={ this.onClickButtonInstagram }
                            alt="Instagram">

                            <FontAwesomeIcon icon={ [ "fab", "instagram" ] } />

                          </CButton>

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
                          //cookiePolicy={'single_host_origin'}
                          //approvalPrompt="force"
                          responseType='code,token'
                        />

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <p className="text-muted text-center m-0">

                          <Trans i18nKey="Or manual signup" />

                        </p>

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <CLabel className="margin-bottom-0-2-rem" htmlFor="EMail">

                          <Trans i18nKey="Email" /> *

                        </CLabel>

                        <CInputGroup>

                          <CInputGroupPrepend>

                            <CInputGroupText className="width-38_25px">

                              <FontAwesomeIcon icon="at" />

                            </CInputGroupText>

                          </CInputGroupPrepend>

                          <CInput
                            invalid={ this.state.fieldEMailInvalid }
                            className="box-shadow-none"
                            type="email"
                            id="EMail"
                            name="EMail"
                            placeholder={ t( "myuser@domain.com" ) }
                            autoComplete="username"
                            onChange={ this.onChange }
                            innerRef={ this.inputEMail } />

                        </CInputGroup>

                        {

                          this.state.fieldEMailMessage ?
                          (
                            <CInvalidFeedback style={ {
                              display: "block"
                            } }>

                              { this.state.fieldEMailMessage ? this.state.fieldEMailMessage : "" }

                            </CInvalidFeedback>
                          )
                          :
                          (
                            null
                          )

                        }

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <CLabel className="margin-bottom-0-2-rem" htmlFor="FirstName">

                          <Trans i18nKey="First name" /> *

                        </CLabel>

                        <CInputGroup>

                          <CInputGroupPrepend>

                            <CInputGroupText className="width-38_25px">

                              <FontAwesomeIcon icon="user" />

                            </CInputGroupText>

                          </CInputGroupPrepend>

                          <CInput
                            invalid={ this.state.fieldFirstNameInvalid }
                            className="box-shadow-none"
                            type="text"
                            id="FirstName"
                            name="FirstName"
                            placeholder={ t( "First name" ) }
                            onChange={ this.onChange }
                            //innerRef={ this.inputEMail }
                          />

                        </CInputGroup>

                        {

                          this.state.fieldFirstNameMessage ?
                          (
                            <CInvalidFeedback style={ {
                              display: "block"
                            } }>

                              { this.state.fieldFirstNameMessage ? this.state.fieldFirstNameMessage : "" }

                            </CInvalidFeedback>
                          )
                          :
                          (
                            null
                          )

                        }

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <CLabel className="margin-bottom-0-2-rem" htmlFor="LastName">

                          <Trans i18nKey="Last name" /> *

                        </CLabel>

                        <CInputGroup>

                          <CInputGroupPrepend>

                            <CInputGroupText className="width-38_25px">

                              <FontAwesomeIcon icon="user" />

                            </CInputGroupText>

                          </CInputGroupPrepend>

                          <CInput
                            invalid={ this.state.fieldLastNameInvalid }
                            className="box-shadow-none"
                            type="text"
                            id="LastName"
                            name="LastName"
                            placeholder={ t( "Last name" ) }
                            onChange={ this.onChange }
                            //innerRef={ this.inputEMail }
                          />

                        </CInputGroup>

                        {

                          this.state.fieldLastNameMessage ?
                          (
                            <CInvalidFeedback style={ {
                              display: "block"
                            } }>

                              { this.state.fieldLastNameMessage ? this.state.fieldLastNameMessage : "" }

                            </CInvalidFeedback>
                          )
                          :
                          (
                            null
                          )

                        }

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <CLabel className="margin-bottom-0-2-rem" htmlFor="Phone">

                          <Trans i18nKey="Phone" />

                        </CLabel>

                        <CInputGroup>

                          <CInputGroupPrepend>

                            <CInputGroupText className="width-38_25px">

                              <FontAwesomeIcon icon="phone" />

                            </CInputGroupText>

                          </CInputGroupPrepend>

                          <CInput
                            invalid={ this.state.fieldPhoneInvalid }
                            className="box-shadow-none"
                            type="phone"
                            id="Phone"
                            name="Phone"
                            placeholder={ t( "1-305-789-9191" ) }
                            onChange={ this.onChange }
                            //innerRef={ this.inputEMail }
                          />

                        </CInputGroup>

                        {

                          this.state.fieldPhoneMessage ?
                          (
                            <CInvalidFeedback style={ {
                              display: "block"
                            } }>

                              { this.state.fieldPhoneMessage ? this.state.fieldPhoneMessage : "" }

                            </CInvalidFeedback>
                          )
                          :
                          (
                            null
                          )

                        }

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <CLabel
                          className="margin-bottom-0-2-rem"
                          htmlFor="Password">

                          <Trans i18nKey="Password" /> *

                        </CLabel>

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

                        <CLabel
                          className="margin-bottom-0-2-rem"
                          htmlFor="ConfirmPassword">

                          <Trans i18nKey="Comfirm password" /> *

                        </CLabel>

                        <CInputGroup>

                          <CInputGroupPrepend>

                            <CInputGroupText>

                              <FontAwesomeIcon icon="lock" />

                            </CInputGroupText>

                          </CInputGroupPrepend>

                          <CInput
                            invalid={ this.state.fieldPasswordInvalid }
                            className="box-shadow-none field-password"
                            type={ this.state.fieldConfirmPasswordShowContent ? "text" : "password" }
                            id="ConfirmPassword"
                            name="ConfirmPassword"
                            placeholder={ t( "Confirm password" ) }
                            autoComplete="current-password"
                            onChange={ this.onChange }
                            innerRef={ this.inputConfirmPassword } />

                          <CButton
                            id="buttonShowPassword"
                            color="link"
                            className="position-absolute btn-show-password simple-color-gray"
                            onClick={ this.onClickButtonShowConfirmPassword }
                          >

                            <FontAwesomeIcon icon={ this.state.fieldConfirmPasswordShowContent ? "eye-slash" : "eye" } />

                          </CButton>

                        </CInputGroup>

                        {

                          this.state.fieldConfirmPasswordMessage ?
                          (
                            <CInvalidFeedback style={ {
                              display: "block"
                            } }>

                              { this.state.fieldConfirmPasswordMessage ? this.state.fieldConfirmPasswordMessage : "" }

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
                          id="buttonSignup"
                          disabled={ this.state.buttonLoginDisabled }
                          className="w-100 box-shadow-none"
                          color="primary"
                          onClick={ this.onClickButtonSendActivationCode }>

                          <FontAwesomeIcon icon="user-plus" />

                          <span className="px-2 m-0">

                            <Trans i18nKey="Send activation code" />

                          </span>

                        </CButton>

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <CButton
                          id="buttonIHaveAnActivationCode"
                          className="w-100 box-shadow-none simple-color-gray simple-border-color-gray"
                          onClick={ this.onClickButtonIHaveAnActivationCode }>
                          <FontAwesomeIcon icon="user-plus" />
                          <span className="px-2 m-0">

                            <Trans i18nKey="I have an activation code" />

                          </span>
                        </CButton>

                      </CFormGroup>

                      <CFormGroup className="mb-2 d-flex justify-content-center">

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
                          onClick={ this.onClickButtonGotoLogin }>

                          <FontAwesomeIcon icon="sign-in-alt" />

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

SignupPage.propTypes = propTypes;
SignupPage.defaultProps = defaultProps;

const mapDispatchToProps = {
  signup,
  signupGoogle,
  signupFacebook,
  signupInstagram,
  showModal
};

const mapStateToProps = ( state ) => {

  return {

    authentication: state.authentication,
    frontend: state.frontend

  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( SignupPage );

export default withRouter( withTranslation()( connectedComponent ) );
