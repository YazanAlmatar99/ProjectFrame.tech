import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useActions } from "../../../hooks/use-actions";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const UpdateProjectTask = (props) => {
  const { addProjectTask, getProjectTask } = useActions();
  const { id, sequence } = props.match.params;
  const history = useHistory();
  const projectTask = useSelector((state) => state.backlogState.project_task);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    await getProjectTask(id, sequence, history);
    setIsLoading(false);
  };
  useEffect(() => {
    if (isLoading === true) {
      fetchData();
    }
    setUpdatedProjectTask(projectTask);
  }, [isLoading]);
  const onChangeHandler = (e) => {
    setUpdatedProjectTask({
      ...updatedProjectTask,
      [e.target.name]: e.target.value,
    });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    addProjectTask(id, updatedProjectTask, history);
  };

  const [updatedProjectTask, setUpdatedProjectTask] = useState(projectTask);
  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/projectBoard/${id}`} className="btn btn-light">
              Back to Project Board
            </Link>
            <h4 className="display-6 text-center">Update Project Task</h4>
            <form onSubmit={onFormSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="summary"
                  placeholder="Project Task summary"
                  value={updatedProjectTask.summary}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  value={updatedProjectTask.acceptanceCriteria}
                  onChange={onChangeHandler}
                ></textarea>
              </div>
              <h6>Due Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  value={updatedProjectTask.dueDate}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="priority"
                  value={updatedProjectTask.priority}
                  onChange={onChangeHandler}
                >
                  <option value={0}>Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="status"
                  value={updatedProjectTask.status}
                  onChange={onChangeHandler}
                >
                  <option value="">Select Status</option>
                  <option value="TO_DO">TO DO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProjectTask;
