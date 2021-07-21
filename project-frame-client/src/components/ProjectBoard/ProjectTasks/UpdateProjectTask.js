import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useActions } from "../../../hooks/use-actions";
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
