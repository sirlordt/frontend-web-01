import {
  _TOGGLE_DARK
} from "../constants";

function toggleDark( payload: any ): any {

  return {
    type: _TOGGLE_DARK,
    payload
  };

}

export default toggleDark;
