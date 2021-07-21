import { SET_CURRENT_USER } from "../index";

const initialState = {
  user: {},
  validToken: false,
};
const booleanActionPayload = (payload) => {
  console.log(Object.keys(payload).length);
  if (Object.keys(payload).length) {
    return true;
  } else {
    return false;
  }
};
export const securityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};
