/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-did-update-set-state */
import React, {
  Component
} from "react";
import ReactDOM from "react-dom";
import {
  connect
} from "react-redux";
import {
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormGroup,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupAppend,
  CInvalidFeedback,
  CInputGroupText,
  CInput,
  CButton
} from "@coreui/react";
/*
import {
  CIcon
} from "@coreui/icons-react";
*/
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import {
  login
} from "../../redux/actions";
import SystemUtils from "../../utils/systemUtils";

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

class LoginModal extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4(),
      showModal: true,
      fieldUsernameIsValid: true,
      username: "",
      fieldPasswordIsValid: true,
      password: "",
      isError: false,
      message: "",
      buttonLoginDisabled: false,
      buttonCancelDisabled: false

    };

    this.inputUsername = React.createRef();

  }


  componentDidMount() {

    //LoggerManager.markLog( "43496B0574CC", "componentDidMount => ", this.inputUsername );

    setTimeout( () => {

      this.inputUsername.current.focus();

    }, 100 );

  }

  onChange = ( event ) => {

    this.setState( {

      [ event.target.name ]: event.target.value

    } );

  };

  closeModalWithTransition = ( intDelay ) => {

    setTimeout( () => {

      this.setState( {

        showModal: false

      } );

      setTimeout( () => {

        if ( this.props.history.action !== "POP" ) {

          this.props.history.goBack();

        }
        else {

          this.props.history.push( "/home" );

        }

      }, 300 );

    }, intDelay );

  }

  onCloseModal = ( event ) => {

    event && event.preventDefault();

    this.closeModalWithTransition( 1 );

  };

  onClickButtonLogin = ( event ) => {

    event && event.preventDefault();

    const bFieldUsernameIsValid = !!( this.state.username && this.state.username.trim() !== "" );
    const bFieldPasswordIsValid = !!( this.state.password && this.state.password.trim() !== "" );

    //LoggerManager.markLog( "FFB5BBDAC9BF", bFieldUsernameIsValid );

    if ( bFieldUsernameIsValid &&
         bFieldPasswordIsValid ) {

      this.setState( {

        fieldUsernameIsValid: true,
        fieldPasswordIsValid: true,
        buttonLoginDisabled: true,
        buttonCancelDisabled: true

      } );

      /*
      setTimeout( () => {

        this.inputUsername.current.focus();

      }, 100 );
      */

      this.props.login( {

        transactionId: this.state.id,
        username: this.state.username,
        password: this.state.password
        //Callback: this.handleReducerNotification

      } );

    }
    else {

      this.setState( {

        fieldUsernameIsValid: bFieldUsernameIsValid,
        fieldPasswordIsValid: bFieldPasswordIsValid

      } );

    }

  };

  onClickButtonCancel = ( event ) => {

    event && event.preventDefault();

    this.closeModalWithTransition( 1 );

  };

  render() {

    //LoggerManager.mark( "C2411110ECB6" );
    //LoggerManager.debug( "Username is valid => ", this.state.fieldUsernameIsValid );
    //LoggerManager.debug( "Password is valid => ", this.state.fieldPasswordIsValid );

    let result = null;

    result = (

      <div>

        <CModal
          show={ this.state.showModal }
          onClose={ this.onCloseModal }
          closeOnBackdrop={ false }
          //backdrop={ false }
          //size="md"
        >

          <CModalHeader closeButton>

            <CModalTitle>Login</CModalTitle>

          </CModalHeader>

          <CModalBody>

            <CForm>
              <CFormGroup>

                <CInputGroup>

                  <CInputGroupPrepend>

                    <CInputGroupText>

                      {/*
                      <CIcon name="cil-user" />
                      */}
                      <FontAwesomeIcon icon="user" />

                    </CInputGroupText>

                  </CInputGroupPrepend>

                  <CInput
                    invalid={ this.state.fieldUsernameIsValid === false }
                    id="username"
                    name="username"
                    placeholder="Username"
                    autoComplete="name"
                    onChange={ this.onChange }
                    innerRef={ this.inputUsername }
                  />

                </CInputGroup>

                {

                  this.state.fieldUsernameIsValid === false ? (
                    <CInvalidFeedback style={ {
                      display: "block"
                    } }>
                      The username field is required
                    </CInvalidFeedback>
                  ) : null

                }

              </CFormGroup>

              <CFormGroup className="mb-0">

                <CInputGroup>

                  <CInputGroupPrepend>

                    <CInputGroupText>

                      {/*
                      <CIcon name="cil-asterisk" />
                      */}
                      <FontAwesomeIcon icon="asterik" />

                    </CInputGroupText>

                  </CInputGroupPrepend>

                  <CInput
                    invalid={ this.state.fieldPasswordIsValid === false }
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    onChange={ this.onChange }
                  />

                  <CInputGroupAppend>

                    <CInputGroupText>

                      {/*
                      <CIcon name="cil-user" />
                      */}
                      <FontAwesomeIcon icon="asterik" />

                    </CInputGroupText>

                  </CInputGroupAppend>

                </CInputGroup>

                {

                  this.state.fieldPasswordIsValid === false ? (
                    <CInvalidFeedback style={ {
                      display: "block"
                    } }>
                      The password field is required
                    </CInvalidFeedback>
                  ) : null

                }

              </CFormGroup>
              {
                this.state.message && (
                  <CAlert className="mb-0 mt-2 text-center" color={ this.state.isError ? "danger" : "success" }>
                    {
                      this.state.message
                    }
                  </CAlert>
                )
              }

            </CForm>

          </CModalBody>

          <CModalFooter>

            <CButton
              disabled={ this.state.buttonLoginDisabled }
              className="ml-2"
              color="primary"
              onClick={ this.onClickButtonLogin }
            >
              {/*
              <CIcon
                name="cil-user"
                size="lg"
              />
              */}
              <FontAwesomeIcon icon="user" />
              <span className="ml-2">
                Login
              </span>
            </CButton>

            <CButton
              disabled={ this.state.buttonCancelDisabled }
              color="secondary"
              onClick={ this.onClickButtonCancel }>
              Cancel
            </CButton>

          </CModalFooter>

        </CModal>

      </div>

    );

    return ReactDOM.createPortal( result, document.getElementById( "modal-root" ) );

  }

}

LoginModal.propTypes = propTypes;
LoginModal.defaultProps = defaultProps;

const mapDispatchToProps = {
  login
};

const mapStateToProps = ( state ) => {

  //LoggerManager.markLog( "C30348B82EE1", "LoginModal State => ", state );

  return {
    authentication: state.authentication,
    frontend: state.frontend,
    modal: state.modal
  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( LoginModal );

export default connectedComponent;
