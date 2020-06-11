import {
  _TOGGLE_RIGHT_SIDERBAR
} from "../constants";

function toggleRightSidebar( payload: any ) {

  return {
    type: _TOGGLE_RIGHT_SIDERBAR,
    payload
  };

}

export default toggleRightSidebar;
