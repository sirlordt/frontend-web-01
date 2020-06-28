import React, {
  Component
} from "react";

import {
  withRouter
} from "react-router-dom";

import {
  connect
} from "react-redux";

//import classNames from "classnames";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  //CContainer,
  CLabel,
  CForm,
  CFormGroup,
  CInput,
  CSelect,
  CInputGroup,
  CInvalidFeedback,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  //CTextarea,
  CProgress
  //CInputGroupAppend
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
  login,
  showModal
} from "../../../redux/actions";

import SystemUtils from "../../../utils/systemUtils";
import SystemBackendClient from "../../../services/systemBackendClient";
import BusinessBackendClient from "../../../services/businessBackendClient";
import { withWindowSize } from "../../../hoc/withWindowSize";
import LoggerManager from "../../../utils/loggerManager";

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

let intervalHandler = null;

class OrderTipUberUpdateView extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4(),
      establishments: [],

      fieldEstablishmentIsInvalid: false,
      fieldEstablishmentMessage: "",
      fieldEstablishmentValue: "",

      fieldDateIsInvalid: false,
      fieldDateMessage: "",
      fieldDateValue: "",

      fieldFileToUploadIsInvalid: false,
      fieldFileToUploadLabel: "Choose your local computer file",
      fieldFileToUploadMessage: "",
      fieldFileToUploadValue: "",

      uploadProgressMessage: "",
      uploadProgress: 0,

      processStatusMessage: "",
      processStatusProgress: 0,

      buttonProcessDisabled: false,

      jobId: "",
      attemptFailedGetStatusCount: 0

    };

  }

  async componentDidMount() {

    try {

      const result = await BusinessBackendClient.callGetEstablishmentList( this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
                                                                           {} );

      if ( result && !result.error ) {

        this.setState( {

          establishments: result,
          fieldEstablishmentValue: result[ 0 ].id

        } );

      }
      else {

        LoggerManager.markLog( "7780E262226A", result );

      }

    }
    catch ( error ) {

      LoggerManager.markError( "CD73E33A9E73", error );

    }

  }

  componentWillUnmount() {

    if ( intervalHandler ) {

      clearInterval( intervalHandler );

    }

  }

  launchIntervalCheckJobStatus = ( strJobId, intTimeout ) => {

    const t = this.props.t; //Translate functions injected by withTranslation function

    intervalHandler = setInterval( async () => {

      const statusResponse = await BusinessBackendClient.callGetOrderTipUberUpdateJobStatus( this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
                                                                                             {
                                                                                               Id: strJobId ? strJobId: this.state.jobId,
                                                                                               Kind: "status"
                                                                                             } );

      //LoggerManager.markLog( "A90FD41D96E9", statusResponse );

      if ( statusResponse instanceof Error === false ) {

        if ( statusResponse.Total !== -1 ) {

          this.setState( {

            processStatusMessage: statusResponse.Message,
            processStatusProgress: statusResponse.Total > 0 ? Math.round( ( statusResponse.Progress * 100 ) / statusResponse.Total ) : 0,
            buttonProcessDisabled: !( statusResponse.Kind === "error_and_stop" || statusResponse.Total === statusResponse.Progress )

          } );

          if ( statusResponse.Kind === "error_and_stop" ||
               statusResponse.Progress === statusResponse.Total ) {

            clearInterval( intervalHandler ); //Stop the timer check

          }

        }
        else if ( this.state.attemptFailedGetStatusCount === 5 ) {

          this.setState( {

            processStatusMessage:  t( "Job get status error" ) +  "..."

          } );

          clearInterval( intervalHandler );

        }
        else {

          this.setState( ( prevState ) => {

            return {

              attemptFailedGetStatusCount: prevState.attemptFailedGetStatusCount + 1

            };

          } );

        }

      }
      else {

        this.setState( {

          processStatusMessage: t( "Frontend process error" ) +  "..."

        } );

        clearInterval( intervalHandler );

      }

    }, intTimeout || 2000 );

  }

  onChange = ( event ) => {

    this.setState( {

      [ "field" + event.target.name + "Value" ]: event.target.value

    } );

    if ( event.target.name === "Establishment" ) {

      this.setState( () => ( {

        fieldEstablishmentIsInvalid: false,
        fieldEstablishmentMessage: "",

        uploadProgressMessage: "",
        uploadProgress: 0,

        processStatusMessage: "",
        processStatusProgress: 0

      } ) );

    }
    else if ( event.target.name === "Date" ) {

      this.setState( () => ( {

        fieldDateIsInvalid: false,
        fieldDateMessage: "",

        uploadProgressMessage: "",
        uploadProgress: 0,

        processStatusMessage: "",
        processStatusProgress: 0

      } ) );

    }

  };

  onChangefieldFileToUpload = ( event ) => {

    //LoggerManager.markLog( "A849127B33DE", event.target.files[ 0 ] );

    this.setState( {

      fieldFileToUploadIsInvalid: false,
      fieldFileToUploadMessage: "",

      [ "field" + event.target.name + "Value" ]: event.target.files[ 0 ],
      fieldFileToUploadLabel: event.target.files[ 0 ].name,

      uploadProgressMessage: "",
      uploadProgress: 0,

      processStatusMessage: "",
      processStatusProgress: 0

    } );

  };

  uploadCallback = ( progressEvent ) => {

    const t = this.props.t; //Translate functions injected by withTranslation function

    const uploadProgressPercent = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total );

    this.setState( ( prevState ) => {

      return {

        uploadProgress: uploadProgressPercent,
        uploadProgressMessage: uploadProgressPercent === 100 ? t( "File uploaded" ) + " (" + this.state.fieldFileToUploadLabel + ")": prevState.uploadProgressMessage,
        processStatusMessage: uploadProgressPercent === 100 ? ( t( "Job started" ) + "..." ): ""

      }

    } );

    if ( uploadProgressPercent === 100 ) {

      this.launchIntervalCheckJobStatus( null, 2000 );

    }

  }

  buttonProcessHandler = async ( event ) => {

    event && event.preventDefault();

    const t = this.props.t; //Translate functions injected by withTranslation function

    const bfieldEstablishmentIsInvalid = !!( !this.state.fieldEstablishmentValue || this.state.fieldEstablishmentValue.trim() === "" );
    const bfieldDateIsInvalid = !!( !this.state.fieldDateValue || this.state.fieldDateValue.trim() === "" );
    const bfieldFileToUploadIsInvalid = !this.state.fieldFileToUploadValue;

    if ( bfieldEstablishmentIsInvalid ||
         bfieldDateIsInvalid ||
         bfieldFileToUploadIsInvalid ) {

      this.setState( {

        fieldEstablishmentIsInvalid: bfieldEstablishmentIsInvalid,
        fieldEstablishmentMessage: bfieldEstablishmentIsInvalid ? t( "The field Establishment is required" ) : "",

        fieldDateIsInvalid: bfieldDateIsInvalid,
        fieldDateMessage: bfieldDateIsInvalid ? t( "The field Date is required" ) : "",

        fieldFileToUploadIsInvalid: bfieldFileToUploadIsInvalid,
        fieldFileToUploadMessage: bfieldFileToUploadIsInvalid ? t( "The field File is required" ) : ""

      } );

    }
    else {

      const t = this.props.t; //Translate functions injected by withTranslation function

      this.setState( {

        uploadProgressMessage: `${t( "Uploading file" )}...`,
        uploadProgress: 0,

        processStatusMessage: "",
        processStatusProgress: 0,
        buttonProcessDisabled: true

      } );

      setTimeout( async () => {

        try {


            const uploadResponse = await SystemBackendClient.callUploadFile( this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
                                                                            this.state.fieldFileToUploadValue,
                                                                            this.uploadCallback );

            const jobId = await BusinessBackendClient.callStartOrderTipUberUpdateJob( this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
                                                                                      {
                                                                                        Id: uploadResponse.Id,
                                                                                        Date: this.state.fieldDateValue,
                                                                                        EstablishmentId: this.state.fieldEstablishmentValue,
                                                                                        Path: uploadResponse.Path,
                                                                                        FileName: uploadResponse.FileName,
                                                                                      } );

            this.setState( () => ( {

              //uploadProgressMessage: `${t( "Uploading file" )}...`,
              buttonProcessDisabled: true,
              jobId: jobId,

            } ) );

            //See uploadCallback method when finish to upload the file start the job

        }
        catch ( error ) {

          LoggerManager.markError( "2C3F15F133C5",  error );

        }

      }, 1000 );

    }

  }

  render() {

    //const innerHeight = window.innerHeight;
    //LoggerManager.markLog( "3E84F5C9DD81",   );

    //const t = this.props.t; //Translate functions injected by withTranslation function
    //<CContainer style={ { "height": innerHeight - 212, "overflowY": "auto" } }>
    //<div style={ { flex: 1, overflow: "auto", background: "pink" } }>

    return (

      <CRow className="justify-content-center my-4">

        <CCol md="5">

          <CCardGroup>

            <CCard className="p-4">

              <CCardBody className="p-0">

                <CForm>

                  <CFormGroup className="mb-0">

                    <h1>

                      <Trans i18nKey="Update Tips Uber" />
                      { /*this.props.windowSize*/ }

                    </h1>

                  </CFormGroup>

                  <CFormGroup className="mb-2">

                    <CLabel className="margin-bottom-0-2-rem" htmlFor="Establishment">

                      <Trans i18nKey="Establishment" />

                    </CLabel>

                    <CInputGroup>

                      <CInputGroupPrepend>

                        <CInputGroupText>

                          <FontAwesomeIcon icon="building" />

                        </CInputGroupText>

                      </CInputGroupPrepend>

                      <CSelect
                        custom
                        invalid={ this.state.fieldEstablishmentIsInvalid }
                        className="box-shadow-none"
                        name="Establishment"
                        id="Establishment"
                        onChange={ this.onChange }
                        value={ this.state.fieldEstablishmentValue }
                      >

                        {

                          this.state.establishments.map( ( establishmentInfo ) => {

                            return (

                              <option key={ establishmentInfo.id } value={ establishmentInfo.id }>{ establishmentInfo.first_name }</option>

                            );

                          } )

                        }

                      </CSelect>

                      {

                        this.state.fieldEstablishmentMessage ? (

                          <CInvalidFeedback className="custom-invalid-feedback">

                            { this.state.fieldEstablishmentMessage ? this.state.fieldEstablishmentMessage : "" }

                          </CInvalidFeedback>

                        ) : null

                      }

                    </CInputGroup>

                  </CFormGroup>

                  <CFormGroup className="mb-2">

                    <CLabel className="margin-bottom-0-2-rem" htmlFor="Date">

                      <Trans i18nKey="Date" />

                    </CLabel>

                    <CInputGroup>

                      <CInputGroupPrepend>

                        <CInputGroupText>

                          <FontAwesomeIcon icon={ [ "far", "calendar" ] } />

                        </CInputGroupText>

                      </CInputGroupPrepend>

                      <CInput
                        invalid={ this.state.fieldDateIsInvalid }
                        className="box-shadow-none"
                        type="date"
                        id="Date"
                        name="Date"
                        placeholder="date"
                        onChange={ this.onChange }
                      />

                    </CInputGroup>

                    {

                      this.state.fieldDateMessage ? (

                        <CInvalidFeedback className="custom-invalid-feedback">

                          { this.state.fieldDateMessage }

                        </CInvalidFeedback>

                      ) : null

                    }

                  </CFormGroup>

                  <CFormGroup className="mb-2">

                    <CLabel className="margin-bottom-0-2-rem" htmlFor="FileToUpload">

                      <Trans i18nKey="File" />

                    </CLabel>

                    <CInputGroup>

                      <CInputGroupPrepend>

                        <CInputGroupText className="width-38_25px">

                          <FontAwesomeIcon icon="file-excel" />

                        </CInputGroupText>

                      </CInputGroupPrepend>

                      <div className="custom-file">

                        <CInput
                          invalid={ this.state.fieldFileToUploadIsInvalid }
                          type="file"
                          className="custom-file-input box-shadow-none"
                          id="FileToUpload"
                          name="FileToUpload"
                          onChange={ this.onChangefieldFileToUpload } />

                        <CLabel className="custom-file-label">

                          <Trans i18nKey={ this.state.fieldFileToUploadLabel } />

                        </CLabel>

                      </div>

                    </CInputGroup>

                    {

                      this.state.fieldFileToUploadMessage ? (

                        <CInvalidFeedback className="custom-invalid-feedback">

                          { this.state.fieldFileToUploadMessage }

                        </CInvalidFeedback>

                      ) : null

                    }

                  </CFormGroup>

                  <CFormGroup className="mb-2">

                    <CLabel className="margin-bottom-0-2-rem" >

                      { this.state.uploadProgressMessage || "..." }

                    </CLabel>

                    <CProgress
                      animated
                      color="success"
                      value={ this.state.uploadProgress }
                      max={ 100 }
                      showPercentage
                      className=""
                      style={ {
                        height: "13px"
                      } } />

                  </CFormGroup>

                  <CFormGroup className="mb-4">

                    <CLabel className="margin-bottom-0-2-rem" >

                      { this.state.processStatusMessage || "..." }

                    </CLabel>

                    <CProgress
                      animated
                      color="success"
                      value={ this.state.processStatusProgress }
                      max={ 100 }
                      showPercentage
                      className=""
                      style={ {
                        height: "13px"
                      } } />

                  </CFormGroup>

                  <CFormGroup className="mb-2">

                    <CButton
                      id="buttonProcess"
                      disabled={ this.state.buttonProcessDisabled }
                      className="w-100 box-shadow-none"
                      color="primary"
                      onClick={ this.buttonProcessHandler }>

                      <FontAwesomeIcon icon="cogs" />

                      <span className="px-2 m-0">

                        <Trans i18nKey="Process" />

                      </span>

                    </CButton>

                  </CFormGroup>

                </CForm>

              </CCardBody>

            </CCard>

          </CCardGroup>

        </CCol>

      </CRow>

    );

  }

}

OrderTipUberUpdateView.propTypes = propTypes;
OrderTipUberUpdateView.defaultProps = defaultProps;

const mapDispatchToProps = {
  login,
  showModal
};

const mapStateToProps = ( state ) => {

  return {

    authentication: state.authentication,
    frontend: state.frontend

  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( OrderTipUberUpdateView );

export default withWindowSize( withRouter( withTranslation()( connectedComponent ) ) );
