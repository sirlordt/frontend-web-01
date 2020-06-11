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

import {
  connect
} from "react-redux";

import {
  CButton,
  CListGroup,
  CListGroupItem
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
  changeBackendServer,
  closeModal
} from "../../redux/actions";

import SystemUtils from "../../utils/systemUtils";

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

const modalRoot = document.getElementById( "modal-root" );

class ChangeBackendServerModal extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4(),
      selectedBackendServer: this.props.backend.active

    };

    // We create an element div for this modal
    this.element = document.createElement( "div" );

    this.selectedItem = null; //React.createRef();
    this.selectedIndex = 0;

  }

  // We append the created div to the div#modal
  componentDidMount() {

    modalRoot.appendChild( this.element );

    setTimeout( () => {

      if ( this.selectedItem ) {

        this.selectedItem.focus();
        this.selectedItem.scrollIntoView( false );

      }

    }, 100 );

  }

  componentDidUpdate( prevProps ) {

    if ( prevProps.showMe !== this.props.showMe ) {

      if ( this.props.showMe ) {

        this.onSelectBackendServer( this.props.backend.active );

      }

      setTimeout( () => {

        if ( this.selectedItem ) {

          this.selectedItem.focus();
          this.selectedItem.scrollIntoView( false );

          //console.log( this.selectedIndex );

        }

      }, 100 );

    }

  }

  /**
    * We remove the created div when this Modal Component is unmounted
    * Used to clean up the memory to avoid memory leak
    */
  componentWillUnmount() {

    modalRoot.removeChild( this.element );

  }

  onSelectBackendServer = ( backendServer ) => {

    this.setState( {

      selectedBackendServer: backendServer

    } );

  }

  onClickButtonChangeBackendServer = ( event ) => {

    event && event.preventDefault();

    //i18n.changeLanguage( this.state.selectedLanguage );

    this.props.changeBackendServer( {

      transactionId: event.modalId,
      backend: this.state.selectedBackendServer

    } );

    this.props.closeModal( {

      transactionId: event.modalId

    } );

    if ( event.modalCallback ) {

      event.modalCallback( event );

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

    const connectionNames = Object.keys( this.props.backend.servers );

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

          <Trans i18nKey="Change Backend Server" />

        </ModalHeader>

        <ModalBody>

          <div className="custom-border-list">

            <ScrollBars
              style={ {
                height: 200
              } }
              trackYProps={ {
                className: "scrollbars-track-vertical-custom"
              } }>

              <CListGroup className="">

                {

                  connectionNames.map( ( connectionName, index ) => {

                    const serverInfo = this.props.backend.servers[ connectionName ];

                    return (

                      <CListGroupItem
                        href="#"
                        className="border-0 custom-border-bottom-item cursor-pointer outline-0"
                        key={ connectionName }
                        action
                        active={ this.state.selectedBackendServer === connectionName }
                        onClick={ () => this.onSelectBackendServer( connectionName ) }
                        innerRef={ ( element ) => {

                          if ( this.state.selectedBackendServer === connectionName ) {

                            this.selectedItem = element;
                            this.selectedIndex = index;

                          }

                        } }
                      >

                        <div className="d-flex align-items-center">

                          <FontAwesomeIcon icon={ serverInfo.icon } size="2x" />

                          <span className="d-inline-block ml-2">

                            { `${serverInfo.name}` }

                          </span>

                        </div>

                      </CListGroupItem>

                    );

                  } )

                  /*
                  languages.map( ( languageInfo, index ) => {

                    return (

                      <CListGroupItem
                        href="#"
                        className="border-0 custom-border-bottom-item cursor-pointer outline-0"
                        key={ languageInfo.code }
                        action
                        active={ this.state.selectedBackendServer === languageInfo.code }
                        onClick={ () => this.onSelectBackendServer( languageInfo.code ) }
                        innerRef={ ( element ) => {

                          if ( this.state.selectedBackendServer === languageInfo.code ) {

                            this.selectedItem = element;
                            this.selectedIndex = index;

                          }

                        } }
                      >

                        <div className="d-flex align-items-center">

                          <img
                            alt={ languageInfo.country }
                            className="d-inline-block"
                            style={ {
                              width: "40px", height: "40px"
                            } }
                            src={ `${process.env.PUBLIC_URL}${languageInfo.flag}` }
                          />

                          <span className="d-inline-block ml-2">

                            { `${languageInfo.name} (${languageInfo.country})` }

                          </span>

                        </div>

                      </CListGroupItem>

                    );

                  } )
                  */

                }

              </CListGroup>

            </ScrollBars>

          </div>

        </ModalBody>

        <ModalFooter>

          <CButton
            className="ml-2 box-shadow-none"
            color="primary"
            onClick={ ( event ) => {

              event.modalId = this.props.modalId;
              event.modalCallback = this.props.modalCallback;
              event.modalTag = this.props.modalTag;

              this.onClickButtonChangeBackendServer( event );

            } }
          >

            <FontAwesomeIcon icon="server" />

            <span className="ml-2">

              <Trans i18nKey="Change server" />

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

ChangeBackendServerModal.propTypes = propTypes;
ChangeBackendServerModal.defaultProps = defaultProps;

const mapDispatchToProps = {
  changeBackendServer,
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

const connectedComponent = connectedWrapper( ChangeBackendServerModal );

export default withRouter( withTranslation()( connectedComponent ) );
