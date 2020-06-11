import {
  _CHANGE_BACKEND_SERVER
} from "../constants";

function chanceBackendServer( payload: any ): any {

  return {
    type: _CHANGE_BACKEND_SERVER,
    payload
  };

}

export default chanceBackendServer;
