import React, {
  Component,
  Suspense
} from "react";

import {
  connect
} from "react-redux";

import classNames from "classnames";

import PropTypes from "prop-types";

//import ScrollBars from "react-scrollbars-custom";

import {
  CFooter,
  CHeader
  //CButton
} from "@coreui/react";
/*
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
*/

import Loading from "../../components/loading";

import {
  toggleDark,
  tokenCheck,
  resetActiveUser,
  deleteResult,
  showModal,
  closeModal,
  getUserActions
} from "../../redux/actions";

import SystemUtils from "../../utils/systemUtils";

import Content from "../content";

const Header = React.lazy( () => import( "../../components/header" ) );
const Footer = React.lazy( () => import( "../../components/footer" ) );

const LeftSidebar = React.lazy( () => import( "../../components/leftSidebar" ) );
//const PublicRightSidebar = React.lazy( () => import( "../../components/rightSidebar" ) );

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

let intervalHandler = null;

class HomePage extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4(),
      isLoading: false

    };

  }

  shouldComponentUpdate( nextProps ) {

    if ( this.props.authentication.results[ this.state.id ]?.mark !== nextProps.authentication.results[ this.state.id ]?.mark ) {

      const strCode = nextProps.authentication.results[ this.state.id ].data.Code;
      const strMessage = nextProps.authentication.results[ this.state.id ].data.Message;

      if ( strCode === "NO_RESPONSE_FROM_SERVER" ) {

        this.props.showModal( {

          modalId: this.state.id,
          modalCode: "NO_RESPONSE_FROM_SERVER_MODAL",
          modalTitle: "No response from server",
          modalMessage: strMessage,
          modalTag: "forceCheckToken"

        } );

      }
      else if ( strCode === "SUCCESS_TOKEN_IS_VALID" ) {

        this.props.closeModal( {

          transactionId: this.state.id,
          clearModalCode: "NO_RESPONSE_FROM_SERVER_MODAL"

        } );

      }
      else {

        //ERROR_EXPIRED_AUTHORIZATION_TOKEN
        //ERROR_INVALID_AUTHORIZATION_TOKEN
        if ( this.props.authentication.active ) {

          this.props.resetActiveUser( {

            username: this.props.authentication.active

          } );

        }

        this.props.showModal( {

          modalId: this.state.id,
          modalCode: "NOTIFICATION_MODAL",
          modalTitle: "Error",
          modalMessage: strMessage

        } );

      }

    }

    return true;

  }

  tokenCheck = () => {

    const intTokenCheck = SystemUtils.tokenCheckIsNeeded( this.props.authentication );

    if ( intTokenCheck === 1 ) { //Check needed

      //Launch token check
      this.props.tokenCheck( {

        transactionId: this.state.id,
        authorization: this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
        logger: null

      } );

    }
    else {

      //0 = No authentication
      //2 = Authenticaticated but no check needed

      if ( intTokenCheck === -1 ) { //Invalid status state. Reset the state

        this.props.resetActiveUser( {

          transactionId: this.state.id,
          username: this.props.authentication.active,
          logge: null

        } );

      }

      if ( intTokenCheck !== 0 ) {

        this.props.closeModal( {

          transactionId: this.state.id,
          logger: null

        } );

      }

    }

  }

  async componentDidMount() {

    intervalHandler = setInterval( () => {

      this.tokenCheck();

    }, 3000 );

    try {

      const strAuthorization = this.props.authentication.active && this.props.authentication.accounts ? this.props.authentication.accounts[ this.props.authentication.active ].Authorization : null;

      this.props.getUserActions( {

        transactionId: this.state.id,
        authorization: strAuthorization

      } );

    }
    catch ( error ) {

      //

    }

    this.tokenCheck();

  }

  componentWillUnmount() {

    clearInterval( intervalHandler );

  }

  render() {

    let result = null;

    if ( this.state.isLoading ) {

      result = ( <Loading /> );

    }
    else {

      const isAuthenticated = !!( this.props.authentication.active );

      // dark theme
      const classes = classNames(
        "c-app c-default-layout",
        this.props.frontend.themeDark ? "c-dark-theme" : false
      );

      result = (

        <div className={ classes }>

          {
            isAuthenticated ? <LeftSidebar /> : null
          }

          <div className="c-wrapper">

            <CHeader withSubheader>

              <Suspense fallback={ <Loading /> }>

                <Header />

              </Suspense>

            </CHeader>

            <div className="c-body">

              <Suspense fallback={ <Loading /> }>
                {
                  isAuthenticated ? <Content /> : <Loading />
                }
              </Suspense>

            </div>

            <CFooter className="d-sm-flex justify-content-center">

              <Suspense fallback={ <Loading /> }>

                <Footer />

              </Suspense>

            </CFooter>

          </div>

        </div>

      );

    }

    return result;

  }

}

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;

const mapDispatchToProps = {
  tokenCheck,
  deleteResult,
  resetActiveUser,
  toggleDark,
  showModal,
  closeModal,
  getUserActions
};

const mapStateToProps = ( state ) => {

  //console.log( "Home State => ", state );

  return {
    authentication: state.authentication,
    frontend: state.frontend
  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( HomePage );

export default connectedComponent;

//export default Home;
