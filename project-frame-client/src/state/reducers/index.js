import { combineReducers } from "redux";
import { projectReducer } from "./projectReducer";
import { errorReducer } from "./errorReducer";
import { backlogReducer } from "./backlogReducer";
import { securityReducer } from "./securityReducer";
export default combineReducers({
  projectState: projectReducer,
  backlogState: backlogReducer,
  errorState: errorReducer,
  securityState: securityReducer,
});
