import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_BACKLOG,
  GET_PROJECT_TASK,
  GET_ERRORS,
  DELETE_PROJECT_TASK,
} from "../action-types";

export const addProjectTask =
  (backlog_id, project_task, history) => async (dispatch) => {
    try {
      const response = await axios.post(
        `/api/backlog/${backlog_id}`,
        project_task
      );
      history.push(`/projectBoard/${backlog_id}`);
      if (!project_task.id) {
        toast.success("Project Task was successfully created!");
      } else {
        toast.success("Project Task was successfully updated!");
      }
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
      toast.error(
        "Failed Adding a Project Task! Status Code: " + error.response.status
      );
    }
  };

export const getBacklog = (backlog_id, history) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/backlog/${backlog_id}`);

    dispatch({ type: GET_BACKLOG, payload: response.data });
  } catch (error) {
    console.error(error);
    toast.error(
      "Failed loading Project Backlog! Status code: " +
        error.response.data.projectIdentifier
    );
    history.push("/dashboard");
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const getProjectTask =
  (projectIdentifier, projectSequence, history) => async (dispatch) => {
    try {
      const response = await axios.get(
        `/api/backlog/${projectIdentifier}/${projectSequence}`
      );
      dispatch({ type: GET_PROJECT_TASK, payload: response.data });
    } catch (error) {
      toast.error(
        "Failed loading project task! Status code: " +
          error.response.status +
          " " +
          error.response.data.projectNotFound
      );
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
      history.push("/dashboard");
    }
  };

export const deleteProjectTask =
  (projectIdentifier, projectSequence, history) => async (dispatch) => {
    try {
      const response = await axios.delete(
        `/api/backlog/${projectIdentifier}/${projectSequence}`
      );

      dispatch({ type: DELETE_PROJECT_TASK, payload: projectSequence });
      toast.success("Project Task was successfully deleted!");
    } catch (error) {
      toast.error(
        "Project Task could not be deleted! Status code: " +
          error.response.status +
          " " +
          error.response.data
      );
      dispatch({ type: GET_ERRORS, payload: error.response.data });
      history.push("/dashboard");
    }
  };
