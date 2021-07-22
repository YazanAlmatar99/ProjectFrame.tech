import {
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
  UPDATE_PROJECT_TASK_STATUS,
  SORT_BACKLOG_BY_STATUS,
} from "../action-types";
import { produce } from "immer";
const initialState = {
  project_tasks: [],
  project_task: {},
  sortedTasksByStatus: { todoItems: [], inProgressItems: [], doneItems: [] },
};
export const backlogReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case GET_BACKLOG:
      return { ...state, project_tasks: action.payload };
    case GET_PROJECT_TASK:
      return { ...state, project_task: action.payload };
    case DELETE_PROJECT_TASK:
      return {
        ...state,
        project_tasks: state.project_tasks.filter(
          (project_task) => project_task.projectSequence !== action.payload
        ),
      };
    case UPDATE_PROJECT_TASK_STATUS:
      const projectTaskIndex = state.project_tasks.findIndex(
        (projectTask) => projectTask.projectSequence === action.payload.sequence
      );
      state.project_tasks[projectTaskIndex] = {
        ...state.project_tasks[projectTaskIndex],
        status: action.payload.status,
      };
      console.log(projectTaskIndex);
      break;
    case SORT_BACKLOG_BY_STATUS:
      let todo = [];
      let inProgress = [];
      let done = [];
      const tasks = action.payload;
      for (let i = 0; i < tasks.length; i++) {
        switch (tasks[i].status) {
          case "TO_DO":
            todo.push(tasks[i]);
            break;
          case "IN_PROGRESS":
            inProgress.push(tasks[i]);
            break;
          case "DONE":
            done.push(tasks[i]);
            break;
        }
      }
      state.sortedTasksByStatus = {
        todoItems: todo,
        inProgressItems: inProgress,
        doneItems: done,
      };
    default:
      return state;
  }
});
