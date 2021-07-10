import { combineReducers } from "redux";
import { projectReducer } from "./projectReducer";
import { errorReducer } from "./errorReducer";
export default combineReducers({
  projectState: projectReducer,
  errorState: errorReducer,
});
