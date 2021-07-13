import axios from "axios";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, GET_ERRORS } from "../action-types";
import setJWTToken from "../../utils/setJWTToken";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    const response = await axios.post("/api/users/register", newUser);
    history.push("/login");
    dispatch({ type: GET_ERRORS, payload: {} });
    toast.success("You successfully registered your new account!");
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
    toast.error("There was an error with creating your account! ");
  }
};

export const loginUser = (user, history) => async (dispatch) => {
  try {
    const response = await axios.post("/api/users/login", user);
    const { token } = response.data;
    localStorage.setItem("token", token);
    setJWTToken(token);
    const decodedToken = jwt_decode(token);
    dispatch({ type: SET_CURRENT_USER, payload: decodedToken });
    dispatch({ type: GET_ERRORS, payload: {} });
    history.push("/dashboard");
  } catch (error) {
    toast.error("Invalid Username or Password!");
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  setJWTToken(false);
  dispatch({ type: SET_CURRENT_USER, payload: {} });
};
