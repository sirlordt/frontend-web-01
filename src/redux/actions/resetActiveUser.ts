import {
  _RESET_ACTIVE_USER
} from "../constants";

function resetActiveUser( payload: any ): any {

  return {
    type: _RESET_ACTIVE_USER,
    payload
  };

}

export default resetActiveUser;
