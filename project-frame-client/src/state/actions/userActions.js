import axios from "axios";
import { toast } from "react-toastify";
import { SET_CURRENT_USER } from "../action-types";

export const updateUserInfo = (updatedUser, history) => async (dispatch) => {
  try {
    const response = await axios.patch("/api/users", updatedUser);
    dispatch({ type: SET_CURRENT_USER, payload: response.data });
    history.push("/dashboard");
    toast.success("You successfully updated your profile!");
  } catch (error) {
    toast.error("Failed updating user details!");
  }
};
