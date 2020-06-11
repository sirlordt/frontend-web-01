import {
  _CLOSE_LEFT_SIDERBAR
} from "../constants";

function closeLeftSideBar( payload: any ): any {

  return {
    type: _CLOSE_LEFT_SIDERBAR,
    payload
  };

}

export default closeLeftSideBar;
