import {
  _SHOW_MODAL
} from "../constants";

function showModal( payload: any ): any {

  return {
    type: _SHOW_MODAL,
    payload
  };

}

export default showModal;
