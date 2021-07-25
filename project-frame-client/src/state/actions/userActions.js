import axios from "axios";
import { toast } from "react-toastify";
import { UPDATE_USER_INFO } from "../action-types";

export const updateUserInfo = (updatedUser) => async (dispatch) => {
  try {
    const response = await axios.patch("/api/users", updatedUser);
    toast.success("You successfully updated your profile!");
  } catch (error) {
    toast.error("Failed updating user details!");
  }
};
