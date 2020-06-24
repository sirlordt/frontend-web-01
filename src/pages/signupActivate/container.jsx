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
  signupActivate,
  showModal
} from "../../redux/actions";

import SystemUtils from "../../utils/systemUtils";

import logo from "../../assets/img/brand/coreui-pro-base.svg";

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

class SignupActivatePage extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4(),

      fieldActivationCodeInvalid: false,
      fieldActivationCodeMessage: "",
      fieldActivationCodeValue: "",

      buttonActivateAccountDisabled: false

    };

    this.inputActivationCode = React.createRef();

  }

  componentDidMount() {

    setTimeout( () => {

      this.inputActivationCode.current.focus();

    }, 100 );

  }

  shouldComponentUpdate( nextProps ) {

    //componentDidUpdate( prevProps ) {

    /*
    LoggerManager.mark( "6D85696DB1C7" );
    LoggerManager.debug( "id =>", this.state.id );
    LoggerManager.debug( "props =>", this.props );
    LoggerManager.debug( "prevProps =>", prevProps );
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
      else if ( strCode === "SUCCESS_SUCCESS_USER_SIGNUP" ) {

        //request the activation code
        /*
        this.props.history.replace( {

          pathname: "/home/signup/activate"

        } );
        */

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

    if ( event.target.name === "ActivationCode" ) {

      this.setState( () => ( {

        fieldActivationCodeInvalid: false,
        fieldActivationCodeMessage: ""

      } ) );

    }

  };

  onClickButtonActivateAccount = ( event ) => {

    event && event.preventDefault();

    /*
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
    */

  }

  onClickButtonCloseModalCallback = ( event ) => {

    event && event.preventDefault();

    this.setState( {

      buttonActivationCodeDisabled: false

    } );

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

                          <Trans i18nKey="Signup Activation" />

                        </h1>

                        <p className="text-muted">

                          <Trans i18nKey="Activate your new account" />

                        </p>

                      </CFormGroup>

                      <CFormGroup className="mb-2">

                        <CLabel className="margin-bottom-0-2-rem" htmlFor="EMail">

                          <Trans i18nKey="Activation code" /> *

                        </CLabel>

                        <CInputGroup>

                          <CInputGroupPrepend>

                            <CInputGroupText>

                              <FontAwesomeIcon icon="code" />

                            </CInputGroupText>

                          </CInputGroupPrepend>

                          <CInput
                            invalid={ this.state.fieldActivationCodeInvalid }
                            className="box-shadow-none"
                            type="text"
                            id="ActivationCode"
                            name="ActivationCode"
                            placeholder={ t( "Activation code" ) }
                            onChange={ this.onChange }
                            innerRef={ this.inputActivationCode } />

                        </CInputGroup>

                        {

                          this.state.fieldEMailMessage ?
                          (
                            <CInvalidFeedback style={ {
                              display: "block",
                              height: "1.5em"
                            } }>

                              { this.state.fieldActivationCodeMessage ? this.state.fieldActivationCodeMessage : "" }

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
                          id="buttonActivateAccount"
                          disabled={ this.state.buttonActivateAccountDisabled }
                          className="w-100 box-shadow-none"
                          color="primary"
                          onClick={ this.onClickButtonActivateAccount }>

                          <FontAwesomeIcon icon="user-plus" />

                          <span className="px-2 m-0">

                            <Trans i18nKey="Activate account" />

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

SignupActivatePage.propTypes = propTypes;
SignupActivatePage.defaultProps = defaultProps;

const mapDispatchToProps = {
  signupActivate,
  showModal
};

const mapStateToProps = ( state ) => {

  return {

    authentication: state.authentication,
    frontend: state.frontend

  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( SignupActivatePage );

export default withRouter( withTranslation()( connectedComponent ) );
