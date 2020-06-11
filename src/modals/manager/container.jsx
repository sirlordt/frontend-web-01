import React, {
  Component
} from "react";

import {
  connect
} from "react-redux";

import PropTypes from "prop-types";

import {
  CButton
} from "@coreui/react";

import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";

import {
  Trans,
  withTranslation
} from "react-i18next";

import {
  closeModal,
  tokenCheck,
  logout
} from "../../redux/actions";

import MessageModal from "../message";

import ChangeLanguageModal from "../changeLanguage";
import ChangeBackendServerModal from "../changeBackendServer";
import ChangeAccountModal from "../changeAccount";

import SystemUtils from "../../utils/systemUtils";

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

class ModalManager extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4()

    };

  }

  tokenCheck = ( modalId, modalTag ) => {

    const intTokenCheck = SystemUtils.tokenCheckIsNeeded( this.props.authentication );

    if ( intTokenCheck === 1 ||
         modalTag === "forceCheckToken" ) { //Check needed

      //Launch token check
      this.props.tokenCheck( {

        transactionId: modalId,
        authorization: this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
        logger: null

      } );

    }
    else {

      //-1 = Invalid status state. Reset the state to defaults
      // 0 = No authentication
      // 2 = Authenticaticated but no check needed

      if ( intTokenCheck === -1 ) { //Invalid status state. Reset the state

        this.props.resetActiveUser( {

          transactionId: modalId,
          username: this.props.authentication.active,
          logger: null

        } );

      }

      this.props.closeModal( {

        transactionId: modalId,
        clearModalCode: "NO_RESPONSE_FROM_SERVER_MODAL",
        logger: null

      } );

    }

  }

  onClickButtonCloseModal = ( event ) => {

    this.props.closeModal( {

      transactionId: event.modalId,
      logger: null

    } );

    if ( event.modalCallback ) {

      event.modalCallback( event );

    }

  }

  //NFRS = (N)o (R)esponse (F)rom (S)erver
  onClickButtonCheckAgainNRFSModal = ( event ) => {

    this.tokenCheck( event.modalId,
                     event.modalTag );

    if ( event.modalCallback ) {

      event.modalCallback( event );

    }

  }

  onClickButtonLogoutModalYes = ( event ) => {

    event && event.preventDefault();

    const strUsername = this.props.authentication.active;
    const strAutorization = this.props.authentication.accounts[ this.props.authentication.active ].Authorization;

    this.props.logout( {

      transactionId: event.modalId, //this.state.id,
      username: strUsername,
      authorization: strAutorization

    } );

    if ( event.modalCallback ) {

      event.modalCallback( event );

    }

  }

  render() {

    const result = [];

    this.props.frontend.modalStack.forEach( ( modalInfo ) => {

      if ( modalInfo.title && modalInfo.message ) {

        if ( modalInfo.code === "NOTIFICATION_MODAL" ) {

          const buttons = (

            <CButton
              className="ml-2 box-shadow-none"
              color="primary"
              onClick={ ( event ) => {

                event.modalId = modalInfo.id;
                event.modalCallback = modalInfo.callback;
                this.onClickButtonCloseModal( event );

              } }
            >

              <FontAwesomeIcon icon="times" />

              <span className="ml-2">

                <Trans i18nKey="Close" />

              </span>

            </CButton>

          );

          result.push(

            <MessageModal
              showMe={ modalInfo.showMe }
              key={ modalInfo.id }
              title={ modalInfo.title }
              message={ modalInfo.message }
              buttons={ buttons }
            />

          );

        }
        else if ( modalInfo.code === "NO_RESPONSE_FROM_SERVER_MODAL" ) {

          const buttons = (

            <React.Fragment>

              <CButton
                className="ml-2 box-shadow-none"
                color="primary"
                onClick={ ( event ) => {

                  event.modalId = modalInfo.id;
                  event.modalTag = modalInfo.tag;
                  event.modalCallback = modalInfo.callback;

                  this.onClickButtonCheckAgainNRFSModal( event );

                } }
              >

                <FontAwesomeIcon icon="sync" />

                <span className="ml-2">

                  <Trans i18nKey="Check again" />

                </span>

              </CButton>

            </React.Fragment>

          );

          result.push(

            <MessageModal
              showMe={ modalInfo.showMe }
              key={ modalInfo.id }
              title={ modalInfo.title }
              message={ modalInfo.message }
              buttons={ buttons }
            />

          );

        }
        else if ( modalInfo.code === "LOGOUT_QUESTION_MODAL" ) {

          const buttons = (

            <React.Fragment>

              <CButton
                className="ml-2 box-shadow-none"
                color="secondary"
                onClick={ ( event ) => {

                  event.modalId = modalInfo.id;
                  event.modalTag = modalInfo.tag;
                  event.modalCallback = modalInfo.callback;

                  this.onClickButtonLogoutModalYes( event );

                } }
              >

                <FontAwesomeIcon icon="check" />

                <span className="ml-2">

                  <Trans i18nKey="Yes" />

                </span>

              </CButton>

              <CButton
                className="ml-2 box-shadow-none"
                color="primary"
                onClick={ ( event ) => {

                  event.modalId = modalInfo.id;
                  event.modalTag = modalInfo.tag;
                  event.modalCallback = modalInfo.callback;

                  this.onClickButtonCloseModal( event );

                } }
              >

                <FontAwesomeIcon icon="times" />

                <span className="ml-2">

                  <Trans i18nKey="No" />

                </span>

              </CButton>

            </React.Fragment>

          );

          result.push(

            <MessageModal
              showMe={ modalInfo.showMe }
              key={ modalInfo.id }
              title={ modalInfo.title }
              message={ modalInfo.message }
              buttons={ buttons }
            />

          );

        }

      }
      else if ( modalInfo.code === "CHANGE_LANGUAGE_MODAL" ) {

        result.push(

          <ChangeLanguageModal
            showMe={ modalInfo.showMe }
            key={ modalInfo.id }
            modalId={ modalInfo.id }
            modalTag={ modalInfo.tag }
            modalCallback={ modalInfo.callback }
          />

        );

      }
      else if ( modalInfo.code === "CHANGE_BACKEND_SERVER_MODAL" ) {

        result.push(

          <ChangeBackendServerModal
            showMe={ modalInfo.showMe }
            key={ modalInfo.id }
            modalId={ modalInfo.id }
            modalTag={ modalInfo.tag }
            modalCallback={ modalInfo.callback }
          />

        );

      }
      else if ( modalInfo.code === "CHANGE_ACCOUNT_MODAL" ) {

        result.push(

          <ChangeAccountModal
            showMe={ modalInfo.showMe }
            key={ modalInfo.id }
            modalId={ modalInfo.id }
            modalTag={ modalInfo.tag }
            modalCallback={ modalInfo.callback }
          />

        );

      }

    } );

    return result.length > 0 ? ( result ) : null;

  }

}

ModalManager.propTypes = propTypes;
ModalManager.defaultProps = defaultProps;

const mapDispatchToProps = {
  closeModal,
  tokenCheck,
  logout
};

const mapStateToProps = ( state ) => {

  return {
    authentication: state.authentication,
    frontend: state.frontend
  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( ModalManager );

export default withTranslation()( connectedComponent );
