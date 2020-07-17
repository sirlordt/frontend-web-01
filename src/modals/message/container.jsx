import React, {
  Component
} from "react";
import {
  createPortal
} from "react-dom";
import {
  withRouter
} from "react-router-dom";
import {
  connect
} from "react-redux";

/*
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
  //CButton
} from "@coreui/react";
*/

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import PropTypes from "prop-types";

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

const modalRoot = document.getElementById( "modal-root" );

class MessageModal extends Component {

  constructor( props ) {

    super( props );

    // We create an element div for this modal
    this.element = document.createElement( "div" );

  }

  // We append the created div to the div#modal
  componentDidMount() {

    modalRoot.appendChild( this.element );

  }

  /**
    * We remove the created div when this Modal Component is unmounted
    * Used to clean up the memory to avoid memory leak
    */
  componentWillUnmount() {

    modalRoot.removeChild( this.element );

  }

  onClickButtonClose = ( event ) => {

    if ( this.props.onClickButtonClose ) {

      this.props.onClickButtonClose( event );

    }

  }

  render() {

    return createPortal( (

      <Modal
        isOpen={ this.props.showMe }
        className={ this.props.frontend.themeDark ? "no-c-app rounded c-app c-dark-theme" : "no-c-app rounded c-app" }
        toggle={ this.onClickButtonClose }

        //show={ this.props.showMe }
        //onClose={ this.onClickButtonClose }
        //closeOnBackdrop={ false }
        //backdrop={ false }
        //size="md"
      >

        <ModalHeader toggle={ this.onClickButtonClose }> { /* // */ }

          {/* <CModalTitle></CModalTitle> */}
          { this.props.title }

        </ModalHeader>

        <ModalBody>

          { this.props.message }

        </ModalBody>

        <ModalFooter>

          { this.props.buttons }

        </ModalFooter>

      </Modal>

    ), this.element );

  }

}

MessageModal.propTypes = propTypes;
MessageModal.defaultProps = defaultProps;

const mapDispatchToProps = {};

const mapStateToProps = ( state ) => {

  return {

    authentication: state.authentication,
    frontend: state.frontend

  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( MessageModal );

export default withRouter( connectedComponent );
