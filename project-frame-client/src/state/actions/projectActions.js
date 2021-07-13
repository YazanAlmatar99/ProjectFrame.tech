import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  GET_PROJECTS,
  GET_PROJECT,
  DELETE_PROJECT,
  GET_ERRORS,
} from "../action-types/index";
const token =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJmdWxsTmFtZSI6IllhemFuIEFsbWF0YXIiLCJpZCI6IjEiLCJleHAiOjE2MjYxNDY1MTYsImlhdCI6MTYyNjExNjUxNiwidXNlcm5hbWUiOiJtZUB5YXphbmFsbWF0YXIuY29tIn0.9eYb0oUPCqeMu9LHVClqG0kXyrMC1BSHI2DFMnVUmH05g8_JDXtsYMXh4nfUUXMVpshIRfJVwOfKd-z3V55VQg";
export const createProject = (project, history) => async (dispatch) => {
  console.log(project, "THS IS THE UPDATE");
  try {
    const response = await axios.post("/api/project", project);
    dispatch({ type: GET_ERRORS, payload: {} });
    if (!project.id) {
      toast.success("Project Was Successfully Created!");
    } else {
      toast.success("Project Was Successfully Updated!");
    }

    history.push("/dashboard");
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
    toast.error("Failed Creating a Project!");
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/project/all");
    dispatch({ type: GET_PROJECTS, payload: response.data });
  } catch (error) {
    toast.error(
      "Failed loading Projects! Status code: " + error.response.status
    );
  }
};

export const getProjectByIdentifier =
  (projectIdentifier, history) => async (dispatch) => {
    try {
      const response = await axios.get(`/api/project/${projectIdentifier}`);

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
      const response = await axios.delete(`/api/project/${projectIdentifier}`);
      dispatch({ type: DELETE_PROJECT, payload: projectIdentifier });
      toast.success("Project Was Successfully Deleted!");
      return response.status;
    } catch (error) {}
  }
};
