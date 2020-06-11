import {
  _CHANGE_ACCOUNT
} from "../constants";

function chanceAccount( payload: any ): any {

  return {
    type: _CHANGE_ACCOUNT,
    payload
  };

}

export default chanceAccount;
