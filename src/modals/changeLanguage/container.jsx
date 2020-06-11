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

import i18n, {
  languages
} from "../../config/i18n.config";

import {
  changeLanguage,
  closeModal
} from "../../redux/actions";

import SystemUtils from "../../utils/systemUtils";

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

const modalRoot = document.getElementById( "modal-root" );

class ChangeLanguageModal extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4(),
      selectedLanguage: this.props.frontend.language

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

        this.onSelectLanguage( this.props.frontend.language );

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

  onSelectLanguage = ( language ) => {

    this.setState( {

      selectedLanguage: language

    } );

  }

  onClickButtonChangeLanguage = ( event ) => {

    event && event.preventDefault();

    i18n.changeLanguage( this.state.selectedLanguage );

    this.props.changeLanguage( {

      language: this.state.selectedLanguage

    } );

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

    /*
    */

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

          <Trans i18nKey="Change Language" />

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

                  languages.map( ( languageInfo, index ) => {

                    return (

                      <CListGroupItem
                        href="#"
                        className="border-0 custom-border-bottom-item cursor-pointer outline-0"
                        key={ languageInfo.code }
                        action
                        active={ this.state.selectedLanguage === languageInfo.code }
                        onClick={ () => this.onSelectLanguage( languageInfo.code ) }
                        innerRef={ ( element ) => {

                          if ( this.state.selectedLanguage === languageInfo.code ) {

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

              this.onClickButtonChangeLanguage( event );

            } }
          >

            <FontAwesomeIcon icon="language" />

            <span className="ml-2">

              <Trans i18nKey="Change language" />

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

              <Trans i18nKey="Close" />

            </span>

          </CButton>

        </ModalFooter>

      </Modal>

    ), this.element );

  }

}

ChangeLanguageModal.propTypes = propTypes;
ChangeLanguageModal.defaultProps = defaultProps;

const mapDispatchToProps = {
  changeLanguage,
  closeModal
};

const mapStateToProps = ( state ) => {

  return {

    //authentication: state.authentication,
    frontend: state.frontend

  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( ChangeLanguageModal );

export default withRouter( withTranslation()( connectedComponent ) );
