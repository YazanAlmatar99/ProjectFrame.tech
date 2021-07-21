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
  setJWTToken({});
  dispatch({ type: SET_CURRENT_USER, payload: {} });
};

export const authUser = () => async (dispatch) => {
  const bearerToken = localStorage.getItem("token");
  const token = bearerToken.split(" ")[1];
  try {
    const response = await axios.get("/api/users/auth", {
      headers: { Authorization: token },
    });
    console.log(response.status);
    if (response.status === 202) {
      console.log("Authorized");
      setJWTToken(bearerToken);
      const decoded_jwtToken = jwt_decode(bearerToken);
      dispatch({ type: SET_CURRENT_USER, payload: decoded_jwtToken });
      const currentTime = Date.now() / 1000;
      console.log(Date.now() / 1000);
      console.log(decoded_jwtToken.exp < currentTime);
      if (decoded_jwtToken.exp < currentTime) {
        dispatch({ type: SET_CURRENT_USER, payload: {} });
        window.location.href = "/";
        console.log("Expired");
      }
    } else {
    }
    return response.status;
  } catch (error) {
    localStorage.removeItem("token");
    dispatch({ type: SET_CURRENT_USER, payload: {} });
    console.log("UnAuthorized");
  }
};
