import React, {
  Component
} from "react";

import {
  createPortal
} from "react-dom";

import {
  withRouter
} from "react-router-dom";

import ScrollBars from "react-scrollbars-custom";

import KeyboardEventHandler from 'react-keyboard-event-handler';

import {
  connect
} from "react-redux";

import {
  CButton,
  CListGroup,
  CListGroupItem,
  CLabel,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInvalidFeedback,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CCol
} from "@coreui/react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import PropTypes from "prop-types";

import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";

import {
  Trans,
  withTranslation
} from "react-i18next";

import {
  changeAccount,
  login,
  showModal,
  closeModal
} from "../../redux/actions";

import SystemUtils from "../../utils/systemUtils";

import SystemBackendClient from "../../services/systemBackendClient";

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

const modalRoot = document.getElementById( "modal-root" );

class ChangeAccountModal extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4(),
      selectedAccount: this.props.authentication.active,
      selectedAccountIsAuthorized: false,
      fieldPasswordInvalid: false,
      password: "",
      fieldPasswordMessage: "",
      fieldPasswordShowContent: false,
      buttonChangeAccountLabel: "Change account",
      buttonChangeAccountIcon: "user",
      buttonChangeAccountDisabled: true

    };

    // We create an element div for this modal
    this.element = document.createElement( "div" );

    this.selectedItem = null; //React.createRef();
    this.selectedIndex = 0;

    this.itemList = [];

    this.inputPassword = React.createRef();

  }

  // We append the created div to the div#modal
  componentDidMount() {

    modalRoot.appendChild( this.element );

    if ( !this.state.selectedAccount &&
         this.itemList.length > 0 ) {

      this.onSelectAccount( this.itemList[ 0 ] );

    }

    setTimeout( () => {

      if ( this.selectedItem ) {

        this.selectedItem.focus();
        this.selectedItem.scrollIntoView( false );

      }

    }, 100 );

  }

  shouldComponentUpdate( nextProps ) {

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

        this.props.closeModal( {

          transactionId: this.props.modalId

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

  componentDidUpdate( prevProps, prevState ) {

    if ( prevProps.showMe !== this.props.showMe ) {

      if ( this.props.showMe ) {

        this.onSelectAccount( this.props.authentication.active );

      }

    }

    if ( !this.state.selectedAccount &&
         this.itemList.length > 0 ) {

      this.onSelectAccount( this.itemList[ 0 ] );

    }

    if ( prevProps.showMe !== this.props.showMe ||
         prevState.selectedAccount !== this.state.selectedAccount ) {

      setTimeout( () => {

        if ( this.selectedItem ) {

          this.selectedItem.focus();
          //this.selectedItem.scrollIntoView( false );

          //LoggerManager.markLog( "097E943FB36E", this.selectedIndex );

        }

      }, 10 );

    }

  }

  /**
    * We remove the created div when this Modal Component is unmounted
    * Used to clean up the memory to avoid memory leak
    */
  componentWillUnmount() {

    modalRoot.removeChild( this.element );

  }

  onListKeyPressed = ( key, event ) => {

    if ( key === "down" && this.selectedIndex + 1 < this.itemList.length ) {

      this.onSelectAccount( this.itemList[ this.selectedIndex + 1 ] );

    }
    else if ( key === "up" && this.selectedIndex - 1 >= 0 ) {

      this.onSelectAccount( this.itemList[ this.selectedIndex - 1 ] );

    }

  }

  onSelectAccount = async ( account ) => {

    let selectedAccountIsAuthorized = false;
    let buttonChangeAccountLabel = "Change account";
    let buttonChangeAccountIcon = "user";

    const server = account && this.props.backend.servers[ this.props.authentication.accounts[ account ].Backend || this.props.backend.active ];

    if ( account &&
         this.props.authentication.accounts[ account ] &&
         this.props.authentication.accounts[ account ].Authorization &&
         server ) {

      buttonChangeAccountLabel = "Login";
      buttonChangeAccountIcon = "sign-in-alt";

      const result = await SystemBackendClient.callTokenCheck( this.props.authentication.accounts[ account ].Authorization );

      if ( result instanceof Error === false ) {

        if ( result &&
             result.output &&
             result.output.body ) {

          if ( result.output.body.IsError === false &&
               result.output.body.Code === "SUCCESS_TOKEN_IS_VALID" ) {

            selectedAccountIsAuthorized = true;
            buttonChangeAccountLabel = "Change account";
            buttonChangeAccountIcon = "user";

          }

        }

      }

    }

    this.setState( {

      selectedAccount: account,
      selectedAccountIsAuthorized,
      buttonChangeAccountDisabled: !account,
      buttonChangeAccountLabel,
      buttonChangeAccountIcon,
      fieldPasswordInvalid: false,
      fieldPasswordMessage: ""

    } );

  }

  onChange = ( event ) => {

    this.setState( {

      [ event.target.name ]: event.target.value

    } );

    if ( event.target.name === "password" ) {

      this.setState( () => ( {

        fieldPasswordInvalid: false,
        fieldPasswordMessage: ""

      } ) );

    }

  };

  onClickButtonForgotPassword = ( event ) => {

    event && event.preventDefault();

  }

  onClickButtonShowPassword = ( event ) => {

    event && event.preventDefault();

    this.setState( ( prevState ) => ( {

      fieldPasswordShowContent: !prevState.fieldPasswordShowContent

    } ) );

    this.inputPassword.current.focus();

  }

  onClickButtonCloseModalCallback = ( event ) => {

    event && event.preventDefault();

    this.setState( {

      buttonChangeAccountDisabled: false

    } );

  }

  onClickButtonChangeAccount = ( event ) => {

    event && event.preventDefault();

    if ( this.state.selectedAccountIsAuthorized ) {

      this.props.changeAccount( {

        transactionId: event.modalId,
        active: this.state.selectedAccount

      } );

      this.props.history.replace( {

        pathname: "/empty"

      } );

      this.props.history.replace( {

        pathname: "/home"

      } );

      this.props.closeModal( {

        transactionId: event.modalId

      } );

      if ( event.modalCallback ) {

        event.modalCallback( event );

      }

    }
    else {

      const t = this.props.t; //Translate functions injected by withTranslation function

      const bFieldPasswordInvalid = ( !this.state.password || this.state.password.trim() === "" );

      if ( bFieldPasswordInvalid ) {

        this.setState( {

          fieldPasswordInvalid: bFieldPasswordInvalid,
          fieldPasswordMessage: bFieldPasswordInvalid ? t( "Password field is required" ) : ""

        } );

      }
      else {

        this.setState( {

          fieldPasswordInvalid: false,
          fieldPasswordMessage: "",
          buttonChangeAccountDisabled: true

        } );

        this.props.login( {

          transactionId: this.state.id,
          username: this.state.selectedAccount,
          password: this.state.password

        } );

      }

    }

  }

  onClickButtonCancel = ( event ) => {

    event && event.preventDefault();

    this.props.closeModal( {

      transactionId: event.modalId

    } );

    if ( event.modalCallback ) {

      event.modalCallback( event );

    }

  }

  render() {

    const accountNames = Object.keys( this.props.authentication.accounts );

    this.itemList = [];

    const t = this.props.t; //Translate functions injected by withTranslation function

    return createPortal( (

      <Modal
        //size="md"
        isOpen={ this.props.showMe }
        className={ this.props.frontend.themeDark ? "no-c-app c-app c-dark-theme rounded" : "no-c-app c-app rounded" }
        toggle={ ( event ) => {

          event.modalId = this.props.modalId;
          event.modalCallback = this.props.modalCallback;
          event.modalTag = this.props.modalTag;

          this.onClickButtonCancel( event );

        } }
      >

        <ModalHeader
          toggle={ ( event ) => {

            event.modalId = this.props.modalId;
            event.modalCallback = this.props.modalCallback;
            event.modalTag = this.props.modalTag;

            this.onClickButtonCancel( event );

          } }
        >

          <Trans i18nKey="Change Account" />

        </ModalHeader>

        <ModalBody className={ this.state.selectedAccount &&
                               this.state.selectedAccountIsAuthorized === false ? "pb-0" : "" }>

          <div className="custom-border-list">

            <ScrollBars
              style={ {
                height: 200
              } }
              trackYProps={ {
                className: "scrollbars-track-vertical-custom"
              } }>


              <KeyboardEventHandler
                handleKeys={ [ 'up', 'down' ] }
                onKeyEvent={ this.onListKeyPressed } >

                <CListGroup className="">

                  {

                    accountNames.map( ( strAccountName, intIndex ) => {

                      const accountInfo = this.props.authentication.accounts[ strAccountName ];

                      if ( this.props.backend.servers[ accountInfo.Backend ] ) {

                        return (

                          <CListGroupItem
                            href="#"
                            className="border-0 custom-border-bottom-item cursor-pointer outline-0"
                            key={ strAccountName }
                            action
                            active={ this.state.selectedAccount === strAccountName }
                            onClick={ () => this.onSelectAccount( strAccountName ) }
                            innerRef={ ( element ) => {

                              if ( ( intIndex === 0 && !this.state.selectedAccount ) ||
                                     this.state.selectedAccount === strAccountName ) {

                                this.selectedItem = element;
                                this.selectedIndex = intIndex;

                              }

                            } }
                          >

                            {

                              this.itemList.push( strAccountName ) ? null: null

                            }

                            <div className="d-flex align-items-center">

                              {

                                accountInfo.sysUser.Avatar ?
                                  (
                                    <img
                                      alt={ accountInfo.sysUser.Name }
                                      className="d-inline-block rounded-circle"
                                      style={ {
                                        width: "40px", height: "40px"
                                      } }
                                      src={ `${process.env.PUBLIC_URL}${accountInfo.sysUser.Avatar}` }
                                    />
                                  ) :
                                  (

                                    <FontAwesomeIcon icon="user" size="2x" />

                                  )

                              }

                              {

                                accountInfo.sysUser.sysPerson &&
                                accountInfo.sysUser.sysPerson.FirstName ?
                                  (

                                    <React.Fragment>

                                      <div className="d-flex flex-column align-items-begin">

                                        <h4 className="d-inline-block ml-2 font-weight-bold mb-0">

                                          { `${accountInfo.sysUser.sysPerson.FirstName} ${accountInfo.sysUser.sysPerson.LastName}` }

                                        </h4>

                                        <h6 className="d-inline-block ml-2 mb-0">

                                          { `${accountInfo.sysUser.Name}` }

                                        </h6>

                                        <h6 className="d-inline-block ml-2 mb-0">

                                          { `${accountInfo.Backend}` }

                                        </h6>

                                      </div>

                                    </React.Fragment>

                                  ) :
                                  (

                                    <React.Fragment>

                                      <div className="d-flex flex-column align-items-begin">

                                        <h4 className="d-inline-block ml-2 font-weight-bold mb-0">

                                          { `${accountInfo.sysUser.Name}` }

                                        </h4>

                                        <h6 className="d-inline-block ml-2 mb-0">

                                          { `${accountInfo.Backend}` }

                                        </h6>

                                      </div>

                                    </React.Fragment>

                                  )


                              }

                            </div>

                          </CListGroupItem>

                        );

                      }
                      else {

                        return null;

                      }

                    } )

                  }

                </CListGroup>

              </KeyboardEventHandler>

            </ScrollBars>

          </div>

          {

            this.state.selectedAccount &&
            this.state.selectedAccountIsAuthorized === false ?
              (

                <CForm>

                  <CFormGroup className="my-2">

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

                </CForm>

              ) :
              (
                null
              )

          }

        </ModalBody>

        <ModalFooter>

          <CButton
            disabled={ this.state.buttonChangeAccountDisabled }
            className="ml-2 box-shadow-none"
            color="primary"
            onClick={ ( event ) => {

              event.modalId = this.props.modalId;
              event.modalCallback = this.props.modalCallback;
              event.modalTag = this.props.modalTag;

              this.onClickButtonChangeAccount( event );

            } }
          >

            <FontAwesomeIcon icon={ this.state.buttonChangeAccountIcon } />

            <span className="ml-2">

              <Trans i18nKey={ this.state.buttonChangeAccountLabel } />

            </span>

          </CButton>

          <CButton
            className="ml-2 box-shadow-none"
            color="secondary"
            onClick={ ( event ) => {

              event.modalId = this.props.modalId;
              event.modalCallback = this.props.modalCallback;
              event.modalTag = this.props.modalTag;

              this.onClickButtonCancel( event );

            } }
          >

            <FontAwesomeIcon icon="times" />

            <span className="ml-2">

              <Trans i18nKey="Cancel" />

            </span>

          </CButton>

        </ModalFooter>

      </Modal>

    ), this.element );

  }

}

ChangeAccountModal.propTypes = propTypes;
ChangeAccountModal.defaultProps = defaultProps;

const mapDispatchToProps = {
  changeAccount,
  login,
  showModal,
  closeModal
};

const mapStateToProps = ( state ) => {

  return {

    authentication: state.authentication,
    frontend: state.frontend,
    backend: state.backend

  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( ChangeAccountModal );

export default withRouter( withTranslation()( connectedComponent ) );
