/*
    applyMiddleware(thunk) will enable async actions to be executed
*/
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers";
export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
