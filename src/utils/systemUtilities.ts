
import Validator from 'validatorjs';

import CommonUtilities from './commonUtilities';

import LoggerManager from "./loggerManager";

class SystemUtilities {

  public static createCustomValidatorSync( data: any,
                                           rules: any,
                                           registerCallback: Function ): any {

    let result = null;

    try {

      Validator.register(
                          'emailList',
                          function( value: any, requirement, attribute ) {

                            let bResult: boolean;

                            const valueList = value ? value.split( "," ): [];

                            for ( let strCurrentValue of valueList ) {

                              const matchResult = strCurrentValue.trim().match( /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g );

                              bResult = matchResult && matchResult.length === 1;

                              if ( bResult === false ) {

                                break;

                              }

                            }

                            return bResult;

                          },
                          'The :attribute is not in the format of list user1@domain.com, user2@domain.com or user1@domain.com.'
                        );

      Validator.register(
                          'phoneUS',
                          function( value: any, requirement, attribute ) {

                            return value.match( /(\d{1,3}-)?(\d{3}-){2}\d{4}/g ); //  /^\d{1-3}-\d{3}-\d{3}-\d{4}$/ );

                          },
                          'The :attribute phone number is not in the format X-XXX-XXX-XXXX.'
                        );

      Validator.register(
                          'phoneUSList',
                          function( value: any, requirement, attribute ) {

                            let bResult: boolean;

                            const valueList = value ? value.split( "," ): [];

                            for ( let strCurrentValue of valueList ) {

                              const matchResult = strCurrentValue.trim().match( /(\d{1,3}-)?(\d{3}-){2}\d{4}/g ); ///^\d{3}-\d{3}-\d{4}$/g );

                              bResult = matchResult && matchResult.length === 1;

                              if ( bResult === false ) {

                                break;

                              }

                            }

                            return bResult;

                          },
                          'The :attribute phone number is not in the format of list X-XXX-XXX-XXXX, XX-XXX-XXX-XXXX or XXX-XXX-XXX-XXXX.'
                        );

      Validator.register(
                          'dateInFormat01',
                          function( value: any, requirement, attribute ) {

                            return CommonUtilities.isValidDateInFormat01( value );

                          },
                          'The :attribute is not in the format YYYY-MM-DD and valid date value.'
                        );

      if ( registerCallback ) {

        registerCallback( Validator );

      }

      result = new Validator( data, rules );

    }
    catch ( error ) {

      LoggerManager.markError( "CB2C0D02B1D0", error );

    }

    return result;

  }

}

export default SystemUtilities;
