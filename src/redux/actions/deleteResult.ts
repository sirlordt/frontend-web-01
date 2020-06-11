import {
  _DELETE_RESULT
} from "../constants";

function deleteResult( payload: any ): any {

  return {
    type: _DELETE_RESULT,
    payload
  };

}

export default deleteResult;
