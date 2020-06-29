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
  CProgress,
  CInputCheckbox
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
import SystemUtilities from "../../../utils/systemUtilities";
import CommonUtilities from "../../../utils/commonUtilities";
import CommonConstants from "../../../utils/commonConstants";

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

let intervalHandler = null;

class BulkOrderCreateView extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4(),

      establishments: [],
      fieldEstablishmentIsInvalid: false,
      fieldEstablishmentMessage: "",
      fieldEstablishmentValue: "",

      drivers: [],
      fieldDriverIsInvalid: false,
      fieldDriverMessage: "",
      fieldDriverValue: "",

      fieldDateIsInvalid: false,
      fieldDateMessage: "",
      fieldDateValue: "",

      fieldTimeIsInvalid: false,
      fieldTimeMessage: "",
      fieldTimeValue: "",

      fieldFileToUploadIsInvalid: false,
      fieldFileToUploadLabel: "Choose your local computer file",
      fieldFileToUploadMessage: "",
      fieldFileToUploadValue: "",

      fieldSimulateValue: "1",

      uploadProgressMessage: "",
      uploadProgress: 0,

      processStatusMessage: "",
      processStatusProgress: 0,

      buttonProcessDisabled: false,
      buttonViewOutputDisabled: true,

      jobId: "",
      attemptFailedGetStatusCount: 0

    };

  }

  async componentDidMount() {

    try {

      const t = this.props.t; //Translate functions injected by withTranslation function

      let result = await BusinessBackendClient.callGetEstablishmentList( this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
                                                                         { kind: 2 } ); //Only cantina establishment

      if ( result && !result.error ) {

        this.setState( {

          establishments: result,
          fieldEstablishmentValue: result.length > 0 ? result[ 0 ].id: ""

        } );

      }
      else {

        LoggerManager.markLog( "7780E262226A", result );

      }

      result = await BusinessBackendClient.callGetDriverList( this.props.authentication.accounts[ this.props.authentication.active ].Authorization, {} );

      if ( result && !result.error ) {

        this.setState( {

          drivers: result,
          fieldDriverValue: result.length > 0 ? result[ 0 ].id: ""

        } );

      }
      else {

        LoggerManager.markLog( "CD0D52095E10", result );

      }

      const bulkOrderCreate = CommonUtilities.parseJSON( localStorage.getItem( "_BULK_ORDER_CREATE" ) ) || {};

      let lastCreatedAtDate = null
      let lastCreatedAtTime = null;

      if ( bulkOrderCreate && Object.keys( bulkOrderCreate ).length > 0 ) {

        const strCurrentDate = SystemUtilities.getCurrentDateAndTime().format( CommonConstants._DATE_LONG_FORMAT_01 );

        if ( bulkOrderCreate[ strCurrentDate ] &&
             bulkOrderCreate[ strCurrentDate ].JobId &&
             bulkOrderCreate[ strCurrentDate ].Status ) {

          lastCreatedAtDate = SystemUtilities.getCurrentDateFrom( bulkOrderCreate[ strCurrentDate ].LastCreatedAt );
          lastCreatedAtTime = SystemUtilities.getCurrentTimeFrom( bulkOrderCreate[ strCurrentDate ].LastCreatedAt );

          this.setState( () => {

            return {

              jobId: bulkOrderCreate[ strCurrentDate ].JobId,

              //fieldFileToUploadLabel: bulkOrderCreate[ strCurrentDate ].Upload.FileToUploadLabel,
              uploadProgressMessage: bulkOrderCreate[ strCurrentDate ].Upload.FileToUploadLabel ? t( "File uploaded" ) + " (" + bulkOrderCreate[ strCurrentDate ].Upload.FileToUploadLabel + ")": "...",
              uploadProgress: bulkOrderCreate[ strCurrentDate ].Upload.FileToUploadLabel ? 100: 0,

              processStatusMessage: bulkOrderCreate[ strCurrentDate ].Status.Message,
              processStatusProgress: bulkOrderCreate[ strCurrentDate ].Status.Total > 0 ? Math.round( ( bulkOrderCreate[ strCurrentDate ].Status.Progress * 100 ) / bulkOrderCreate[ strCurrentDate ].Status.Total ) : 0,

              buttonViewOutputDisabled: false,

              fieldDateValue: lastCreatedAtDate,
              fieldTimeValue: lastCreatedAtTime,

            }

          } );

          //if ( bulkOrderCreate[ strCurrentDate ].Status.Phase === "working" ) {

          this.launchIntervalCheckJobStatus( bulkOrderCreate[ strCurrentDate ].JobId, 100, true );

          //}

        }

      }

      if ( lastCreatedAtDate === null ) {

        this.setState( {

          fieldDateValue: SystemUtilities.getCurrentDateAndTime().format( CommonConstants._DATE_LONG_FORMAT_01 )

        } );

      }

      if ( lastCreatedAtTime === null ) {

        this.setState( {

          fieldTimeValue: "07:00:00" //SystemUtilities.getCurrentDateAndTime().format( CommonConstants._TIME_24_LONG_FORMAT_01 )

        } );

      }

    }
    catch ( error ) {

      LoggerManager.markError( "CD73E33A9E73", error );

    }

  }

  /*
  shouldComponentUpdate( nextProps, nextState ) {

    if ( this.state.JobId === "" ) {

    }

  }
  */

  componentWillUnmount() {

    if ( intervalHandler ) {

      clearInterval( intervalHandler );

    }

  }

  launchIntervalCheckJobStatus = ( strJobId, intTimeout, bComponentDidMountEvent ) => {

    const t = this.props.t; //Translate functions injected by withTranslation function

    intervalHandler = setInterval( async () => {

      const bulkOrderCreate = CommonUtilities.parseJSON( localStorage.getItem( "_BULK_ORDER_CREATE" ) ) || {};

      const strCurrentDate = SystemUtilities.getCurrentDateAndTime().format( CommonConstants._DATE_LONG_FORMAT_01 );

      if ( !bulkOrderCreate[ strCurrentDate ] ) {

        bulkOrderCreate[ strCurrentDate ] = {

          JobId: strJobId ? strJobId: this.state.jobId,
          LastCreatedAt: "",

          Upload: {

            FileToUploadLabel: this.state.fieldFileToUploadLabel,
            ProgressMessage: this.state.uploadProgressMessage,
            Progress: this.state.uploadProgress

          },

          Status: {

            Phase: "",
            Progress: 0,
            Total: 0,
            Kind: "",
            Message: "",

          }

        }

      }
      else {

        bulkOrderCreate[ strCurrentDate ].JobId = this.state.jobId;
        bulkOrderCreate[ strCurrentDate ].Upload = {

          FileToUploadLabel: bComponentDidMountEvent === false ? this.state.fieldFileToUploadLabel: bulkOrderCreate[ strCurrentDate ].Upload.FileToUploadLabel,
          ProgressMessage: this.state.uploadProgressMessage,
          Progress: this.state.uploadProgress

        };

      }

      const statusResponse = await BusinessBackendClient.callGetBulkOrderCreateJobStatus( this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
                                                                                          {
                                                                                            Id: strJobId ? strJobId: this.state.jobId,
                                                                                            Kind: "status"
                                                                                          } );

      //LoggerManager.markLog( "A90FD41D96E9", statusResponse );

      if ( statusResponse instanceof Error === false ) {

        if ( statusResponse.Total !== -1 ) {

          let bJobFinished = statusResponse.Phase === "finished" ||
                             statusResponse.Kind === "error_and_stop" ||
                             statusResponse.Progress === statusResponse.Total;

          this.setState( {

            processStatusMessage: statusResponse.Message,
            processStatusProgress: statusResponse.Total > 0 ? Math.round( ( statusResponse.Progress * 100 ) / statusResponse.Total ) : 0,
            buttonProcessDisabled: !bJobFinished,
            buttonViewOutputDisabled: !bJobFinished

          } );

          if ( bJobFinished ) {

            bulkOrderCreate[ strCurrentDate ].Status = {

              ...statusResponse,

            }

            bulkOrderCreate[ strCurrentDate ].LastCreatedAt = statusResponse.CreatedAt || "";

            const lastCreatedAtDate = SystemUtilities.getCurrentDateFrom( statusResponse.CreatedAt );
            const lastCreatedAtTime = SystemUtilities.getCurrentTimeFrom( statusResponse.CreatedAt );

            this.setState( {

              fieldDateValue: lastCreatedAtDate,
              fieldTimeValue: lastCreatedAtTime

            });

            clearInterval( intervalHandler ); //Stop the timer check

            //Check if error or warning present

            if ( statusResponse.Errors > 0 ||
                 statusResponse.Warnings > 0 ) {

              //Show alert message

            }

          }

        }
        else if ( this.state.attemptFailedGetStatusCount === 5 ) {

          const strMessage = `${t( "Job get status error" )}...`;

          this.setState( {

            processStatusMessage: strMessage

          } );

          bulkOrderCreate[ strCurrentDate ].Status = {

            ...bulkOrderCreate[ strCurrentDate ].Status,
            Kind: "error_and_stop",
            Message: strMessage,

          }

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

        const strMessage = `${t( "Frontend process error" )}...`;

        this.setState( {

          processStatusMessage: strMessage

        } );

        bulkOrderCreate[ strCurrentDate ].Status = {

          ...bulkOrderCreate[ strCurrentDate ].Status,
          Kind: "error_and_stop",
          Message: strMessage,

        }

        clearInterval( intervalHandler );

      }

      localStorage.setItem( "_BULK_ORDER_CREATE", JSON.stringify( bulkOrderCreate ) );

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
    else if ( event.target.name === "Date" ||
              event.target.name === "Time" ) {

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

  onChangeCheckBox = ( event ) => {

    if ( event.target.name === "Simulate" ) {

      //LoggerManager.markLog( "C55988B0F010", event.target.name );
      //LoggerManager.markLog( "C55988B0F010", event.target.value === "1" ? "0": "1" );
      //LoggerManager.markLog( "1B16CAEA57A6", this.state.fieldSimulateValue );

      this.setState( {

        [ "field" + event.target.name + "Value" ]: event.target.value === "1" ? "0": "1"

      } );

    }

  }

  onChangefieldFileToUpload = ( event ) => {

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

      this.launchIntervalCheckJobStatus( null, 2000, false );

    }

  }

  buttonProcessHandler = async ( event ) => {

    event && event.preventDefault();

    const t = this.props.t; //Translate functions injected by withTranslation function

    const bfieldEstablishmentIsInvalid = !!( !this.state.fieldEstablishmentValue || this.state.fieldEstablishmentValue.trim() === "" );
    const bfieldDriverIsInvalid = !!( !this.state.fieldDriverValue || this.state.fieldDriverValue.trim() === "" );
    const bfieldDateIsInvalid = !!( !this.state.fieldDateValue || this.state.fieldDateValue.trim() === "" );
    const bfieldFileToUploadIsInvalid = !this.state.fieldFileToUploadValue;

    if ( bfieldEstablishmentIsInvalid ||
         bfieldDriverIsInvalid ||
         bfieldDateIsInvalid ||
         bfieldFileToUploadIsInvalid ) {

      this.setState( {

        fieldEstablishmentIsInvalid: bfieldEstablishmentIsInvalid,
        fieldEstablishmentMessage: bfieldEstablishmentIsInvalid ? t( "The field Establishment is required" ) : "",

        fieldDriverIsInvalid: bfieldEstablishmentIsInvalid,
        fieldDriverMessage: bfieldEstablishmentIsInvalid ? t( "The field Driver is required" ) : "",

        fieldDateIsInvalid: bfieldDateIsInvalid,
        fieldDateMessage: bfieldDateIsInvalid ? t( "The field Date is required" ) : "",

        fieldFileToUploadIsInvalid: bfieldFileToUploadIsInvalid,
        fieldFileToUploadMessage: bfieldFileToUploadIsInvalid ? t( "The field File is required" ) : ""

      } );

    }
    else {

      this.setState( {

        uploadProgressMessage: t( "Uploading file" ) + "...",
        uploadProgress: 0,
        processStatusMessage: "",
        processStatusProgress: 0,
        buttonProcessDisabled: true,
        buttonViewOutputDisabled: true

      } );

      setTimeout( async () => {

        try {

          const uploadResponse = await SystemBackendClient.callUploadFile( this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
                                                                           this.state.fieldFileToUploadValue,
                                                                           this.uploadCallback );

          const data = {

            Id: uploadResponse.Id,
            Simulate: this.state.fieldSimulateValue === "1" ? 1 : 0,

            EstablishmentId: this.state.fieldEstablishmentValue,
            DriverId: this.state.fieldDriverValue,
            CreatedAt: this.state.fieldDateValue + " " + this.state.fieldTimeValue,
            Path: uploadResponse.Path,
            FileName: this.state.fieldFileToUploadLabel, //uploadResponse.FileName,
            CheckAddressAndCustomer: 1,
            Backend: process.env.REACT_APP_REACT_SCRIPT === 'production01' ? process.env.REACT_APP_PROD01_ODINV1_PATH: process.env.REACT_APP_TEST01_ODINV1_PATH

          };

          const strJobId = await BusinessBackendClient.callStartBulkOrderCreateJob( this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
                                                                                    data );

          this.setState( () => ( {

            //uploadProgressMessage: `${t( "Uploading file" )}...`,
            //buttonProcessDisabled: true,
            jobId: strJobId

          } ) );

            //See uploadCallback method when finish to upload the file start the job

        }
        catch ( error ) {

          LoggerManager.markError( "2C3F15F133C5",  error );

        }

      }, 1000 );

    }

  }

  buttonViewOutputHandler = async ( event ) => {

    const t = this.props.t; //Translate functions injected by withTranslation function

    const statusResponse = await BusinessBackendClient.callGetBulkOrderCreateJobStatus( this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
                                                                                        {
                                                                                          Id: this.state.jobId,
                                                                                          Kind: "output"
                                                                                        } );

    if ( statusResponse instanceof Error === false &&
         !statusResponse.error ) {

      this.props.showModal( {

        modalId: this.state.id,
        modalCode: "NOTIFICATION_MODAL_MEMO",
        modalTitle: t( "Bulk order create output" ),
        modalMessage: statusResponse.join( "\r\n" ),
        //modalCallback: this.onClickButtonCloseModalCallback

      } );

    }
    else {

      this.props.showModal( {

        modalId: this.state.id,
        modalCode: "NOTIFICATION_MODAL",
        modalTitle: t( "Error" ),
        modalMessage: t( "Cannot get the output for the job %s", this.state.jobId ),
        //modalCallback: this.onClickButtonCloseModalCallback

      } );

    }

  }

  render() {

    //const innerHeight = window.innerHeight;
    //LoggerManager.markLog( "3E84F5C9DD81",   );

    //const t = this.props.t; //Translate functions injected by withTranslation function
    //<CContainer style={ { "height": innerHeight - 212, "overflowY": "auto" } }>
    //<div style={ { flex: 1, overflow: "auto", background: "pink" } }>

    //LoggerManager.markLog( "949D829E981E", this.state.fieldSimulateValue );

    return (

      <CRow className="justify-content-center my-4">

        <CCol md="5">

          <CCardGroup>

            <CCard className="p-4">

              <CCardBody className="p-0">

                <CForm>

                  <CFormGroup className="mb-0">

                    <h1>

                      <Trans i18nKey="Bulk order create" />
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

                          this.state.establishments && this.state.establishments.map( ( establishmentInfo ) => {

                            return (

                              <option key={ establishmentInfo.id } value={ establishmentInfo.id }>{ establishmentInfo.first_name }</option>

                            );

                          } )

                        }

                      </CSelect>

                      {

                        this.state.fieldDriverMessage ? (

                          <CInvalidFeedback className="custom-invalid-feedback">

                            { this.state.fieldDriverMessage ? this.state.fieldDriverMessage : "" }

                          </CInvalidFeedback>

                        ) : null

                      }

                    </CInputGroup>

                  </CFormGroup>

                  <CFormGroup>

                    <CLabel className="margin-bottom-0-2-rem" htmlFor="Driver">

                      <Trans i18nKey="Driver" />

                    </CLabel>

                    <CInputGroup>

                      <CInputGroupPrepend>

                        <CInputGroupText>

                          <FontAwesomeIcon icon="user" />

                        </CInputGroupText>

                      </CInputGroupPrepend>

                      <CSelect
                        custom
                        invalid={ this.state.fieldDriverIsInvalid }
                        className="box-shadow-none"
                        name="Driver"
                        id="Driver"
                        onChange={ this.onChange }
                        value={ this.state.fieldDriverValue }
                      >

                        {

                          this.state.drivers.map( ( driverInfo ) => {

                            return (

                              <option key={ driverInfo.id } value={ driverInfo.id }>{ driverInfo.first_name + " " + driverInfo.last_name }</option>

                            );

                          } )

                        }

                      </CSelect>

                      {

                        this.state.fieldDriverMessage ? (

                          <CInvalidFeedback className="custom-invalid-feedback">

                            { this.state.fieldDriverMessage ? this.state.fieldDriverMessage : "" }

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
                        placeholder="YYYY-MM-DD"
                        onChange={ this.onChange }
                        value={ this.state.fieldDateValue || "" }
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

                    <CLabel className="margin-bottom-0-2-rem" htmlFor="Time">

                      <Trans i18nKey="Time" />

                    </CLabel>

                    <CInputGroup>

                      <CInputGroupPrepend>

                        <CInputGroupText>

                          <FontAwesomeIcon icon={ [ "far", "calendar" ] } />

                        </CInputGroupText>

                      </CInputGroupPrepend>

                      <CInput
                        invalid={ this.state.fieldTimeIsInvalid }
                        className="box-shadow-none"
                        type="text"
                        id="Time"
                        name="Time"
                        placeholder="HH:mm:ss"
                        onChange={ this.onChange }
                        value={ this.state.fieldTimeValue || "" }
                      />

                    </CInputGroup>

                    {

                      this.state.fieldTimeMessage ? (

                        <CInvalidFeedback className="custom-invalid-feedback">

                          { this.state.fieldTimeMessage }

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

                  <CFormGroup className="mb-4" variant="custom-checkbox">

                    <CInputCheckbox
                      custom
                      id="Simulate"
                      name="Simulate"
                      defaultChecked={ this.state.fieldSimulateValue }
                      value={ this.state.fieldSimulateValue }
                      onChange={ this.onChangeCheckBox }
                    />

                    <CLabel variant="custom-checkbox" htmlFor="Simulate">

                      <Trans i18nKey={ "Simulate?. (Useful to test validity of uploaded file)" } />

                    </CLabel>

                  </CFormGroup>

                  <CFormGroup className="mb-2">

                    <CLabel className="margin-bottom-0-2-rem">

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

                    <CLabel className="margin-bottom-0-2-rem">

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

                  <CFormGroup className="mb-2">

                    <CButton
                      id="buttonViewOutput"
                      disabled={ this.state.buttonViewOutputDisabled }
                      className="w-100 box-shadow-none"
                      color="secondary"
                      onClick={ this.buttonViewOutputHandler }>

                      <FontAwesomeIcon icon="shoe-prints" />

                      <span className="px-2 m-0">

                        <Trans i18nKey="View output" />

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

BulkOrderCreateView.propTypes = propTypes;
BulkOrderCreateView.defaultProps = defaultProps;

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

const connectedComponent = connectedWrapper( BulkOrderCreateView );

export default withWindowSize( withRouter( withTranslation()( connectedComponent ) ) );
