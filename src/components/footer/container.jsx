import React, {
  Component
} from "react";

import PropTypes from "prop-types";

import {
  connect
} from "react-redux";

import {
  withRouter
} from "react-router-dom";

import {
  Trans,
  withTranslation
} from "react-i18next";

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

class Footer extends Component {

  render() {

    return (

      <React.Fragment>

        <div>

          <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">

            <Trans i18nKey="CoreUI" />

          </a>

          <span className="ml-1">

            <Trans i18nKey="&copy; 2020 company." />

          </span>

        </div>

        <div className="ml-md-auto">

          <span className="mr-1">Powered by</span>

          <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">

            <Trans i18nKey="CoreUI for React" />

          </a>

        </div>

      </React.Fragment>

    );

  }

}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

const mapDispatchToProps = {};

const mapStateToProps = ( state ) => {

  return {

    //authentication: state.authentication,
    frontend: state.frontend

  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( Footer );

export default withRouter( withTranslation()( connectedComponent ) );
