import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useActions } from "../../../hooks/use-actions";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { useSelector } from "react-redux";
export const AddProjectTask = (props) => {
  const { addProjectTask } = useActions();
  const history = useHistory();
  const errors = useSelector((state) => state.errorState);
  const { id } = props.match.params;

  const [projectTask, setProjectTask] = useState({
    projectIdentifier: id,
    summary: "",
    status: "",
    priority: 0,
    dueDate: "",
    acceptanceCriteria: "",
  });
  const onFormSubmit = async (e) => {
    e.preventDefault();
    await addProjectTask(id, projectTask, history);
    console.log(errors);
  };
  const onChangeHandler = (e) => {
    setProjectTask({ ...projectTask, [e.target.name]: e.target.value });
  };
  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/projectBoard/${id}`} className="btn btn-light">
              Back to Project Board
            </Link>
            <h4 className="display-4 text-center">Add Project Task</h4>
            <form onSubmit={onFormSubmit}>
              <div
                className={classnames("form-group mb-2", {
                  "is-invalid": errors.summary,
                })}
              >
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="summary"
                  placeholder="Project Task summary"
                  value={projectTask.summary}
                  onChange={onChangeHandler}
                  required
                />
                {errors.summary && (
                  <div className="invalid-feedback">{errors.summary}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <textarea
                  className="form-control form-control-lg "
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  value={projectTask.acceptanceCriteria}
                  onChange={onChangeHandler}
                ></textarea>
              </div>
              <h6>Due Date</h6>
              <div className="form-group mb-2">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  value={projectTask.dueDate}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="form-group mb-2">
                <select
                  className="form-control form-control-lg"
                  name="priority"
                  value={projectTask.priority}
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
                  value={projectTask.status}
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
