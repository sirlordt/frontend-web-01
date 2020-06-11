import {
  combineReducers
} from "redux";

import backend from "./backend";
import authentication from "./authentication";
import frontend from "./frontend";

const rootReducer = combineReducers(
  {
    backend: backend,
    authentication: authentication,
    frontend: frontend
  }
);

export default rootReducer;
