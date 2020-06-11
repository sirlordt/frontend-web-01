import React, {
  Component,
  Suspense
} from "react";

import {
  connect
} from "react-redux";

import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  //CSidebarNavDivider,
  //CSidebarNavTitle,
  //CNavItem,
  //CProgress,
  CSidebarMinimizer,
  CSidebarNavItem,
  CLink
} from "@coreui/react";

import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";

import {
  //Trans,
  withTranslation
} from "react-i18next";

//logo
import logo from "../../assets/img/brand/coreui-react-pro-neg.svg";
import sygnet from "../../assets/img/brand/coreui-signet-white.svg";

import {
  minimizeLeftSidebar,
  closeLeftSidebar
} from "../../redux/actions";

import navigation from "./navigation";

class LeftSidebar extends Component {

  /*
  constructor( props ) {

    super( props );

  }
  */

  render() {

    //const t = this.props.t; //Translate functions injected by withTranslation function

    return (

      <CSidebar
        show={ this.props.frontend.isLeftSidebarOpen } // sidebarShow }
        unfoldable
        minimize={ this.props.frontend.isLeftSidebarMinimized } //this.state.minimize }
        onShowChange={ this.props.closeLeftSidebar } //onChange }
        dropdownMode="closeInactive"
      >

        <CSidebarBrand className=" d-md-down-none" to="/">

          <img className="c-sidebar-brand-full" src={ logo } height="35" alt="Logo full" />

          <img className="c-sidebar-brand-minimized" src={ sygnet } height="35" alt="Logo minimized" />

        </CSidebarBrand>

        <Suspense>

          <CSidebarNav>

            <CCreateElement items={ navigation } />

            <CSidebarNavItem>

              <CLink
                className="c-sidebar-nav-link"
                to="/home/test02"
                exact
                activeClassName="c-active"
              >
                <FontAwesomeIcon className="c-sidebar-nav-icon" icon="times" />
                Test02
              </CLink>

            </CSidebarNavItem>
            {/*
            <CSidebarNavItem>

              {/ *  name={ t( "Test02" ) } to="/home/test02" icon={ <FontAwesomeIcon icon="times" /> } * / }
              <CLink
                className="c-sidebar-nav-link"
                to="/home/test02"
              >
                <FontAwesomeIcon icon="times" />
                Test02
              </CLink>

            </CSidebarNavItem>
            */}

            { /*
            <CSidebarNavDivider />

            <CSidebarNavTitle>

              <Trans i18nKey="System Utilization" />

            </CSidebarNavTitle>

            <CNavItem className="px-3 d-compact-none c-d-minimized-none">

              <div className="text-uppercase mb-1"><small><b>CPU Usage</b></small></div>

              <CProgress size="xs" value={ 25 } color="info" />

              <small className="text-muted">

                <Trans i18nKey="348 Processes. 1/4 Cores." />

              </small>

            </CNavItem>

            <CNavItem className="px-3 d-compact-none c-d-minimized-none">

              <div className="text-uppercase mb-1"><small><b>Memory Usage</b></small></div>

              <CProgress size="xs" value={ 70 } color="warning" />

              <small className="text-muted">11444GB/16384MB</small>

            </CNavItem>

            <CNavItem className="px-3 mb-3 d-compact-none c-d-minimized-none">

              <div className="text-uppercase mb-1"><small><b>SSD 1 Usage</b></small></div>

              <CProgress size="xs" value={ 95 } color="danger" />

              <small className="text-muted">243GB/256GB</small>

            </CNavItem>
            */ }

          </CSidebarNav>

        </Suspense>

        <CSidebarMinimizer className="c-d-md-down-none" />

      </CSidebar>

    );

  }

}


const mapDispatchToProps = {

  minimizeLeftSidebar,
  closeLeftSidebar
};


const mapStateToProps = ( state ) => {

  //console.log( "Left Side State => ", state );

  return {

    authentication: state.authentication,
    frontend: state.frontend

  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( LeftSidebar );

export default withTranslation()( connectedComponent );

//export default LeftSidebar;
