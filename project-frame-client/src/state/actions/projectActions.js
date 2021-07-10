import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  GET_PROJECTS,
  GET_PROJECT,
  DELETE_PROJECT,
  GET_ERRORS,
} from "../action-types/index";
const token =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJmdWxsTmFtZSI6IllhemFuIEFsbWF0YXIiLCJpZCI6IjEiLCJleHAiOjE2MjU5NzYxOTcsImlhdCI6MTYyNTk0NjE5NywidXNlcm5hbWUiOiJtZUB5YXphbmFsbWF0YXIuY29tIn0.iZhsBijirdNUNUPQtvfuKgco375FKOPVJl7CqXENEvKUyaG8xpwGdgTjONOR5ypYN1oeNrKz16hMfpVBFhWojQ";
export const createProject = (project, history) => async (dispatch) => {
  console.log(project, "THS IS THE UPDATE");
  try {
    const response = await axios.post(
      "/api/project",
      project,

      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: GET_ERRORS, payload: {} });
    toast.success("Project Was Successfully Created!");
    history.push("/dashboard");
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const getProjects = () => async (dispatch) => {
  const response = await axios.get("/api/project/all", {
    headers: {
      Authorization: token,
    },
  });
  dispatch({ type: GET_PROJECTS, payload: response.data });
};

export const getProjectByIdentifier =
  (projectIdentifier, history) => async (dispatch) => {
    try {
      const response = await axios.get(`/api/project/${projectIdentifier}`, {
        headers: {
          Authorization: token,
        },
      });

      dispatch({ type: GET_PROJECT, payload: response.data });
    } catch (error) {
      console.error(error.message);
      history.push("/dashboard");
      toast.error("Project Not Found!");
    }
  };

export const deleteProject = (projectIdentifier) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure? This will delete the project and all the data related to it"
    )
  ) {
    try {
      const response = await axios.delete(`/api/project/${projectIdentifier}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({ type: DELETE_PROJECT, payload: projectIdentifier });
      toast.success("Project Was Successfully Deleted!");
      return response.status;
    } catch (error) {}
  }
};
