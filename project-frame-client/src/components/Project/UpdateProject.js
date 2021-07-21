import React, { useEffect, useState, useRef } from "react";
import { useActions } from "../../hooks/use-actions";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
// import UpdateProjectForm from "./UpdateProjectForm";

const UpdateProject = (props) => {
  const project = useSelector((state) => state.projectState.project);
  const errors = useSelector((state) => state.errorState);
  const history = useHistory();
  const { getProjectByIdentifier, createProject } = useActions();
  const [updatedProject, setUpdatedProject] = useState(project);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    const projectId = props.match.params.id;
    await getProjectByIdentifier(projectId, history);
    setIsLoading(false);
  };
  useEffect(async () => {
    if (isLoading === true) {
      await fetchData();
    }
    setUpdatedProject(project);
  }, [isLoading]);

  const onChangeHandler = (e) => {
    setUpdatedProject({ ...updatedProject, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(updatedProject);
    await createProject(updatedProject, history);
  };

  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Edit Project</h5>
            <hr />
            <form onSubmit={onSubmitHandler}>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.projectName,
                  })}
                  placeholder="Project Name"
                  name="projectName"
                  value={updatedProject.projectName}
                  onChange={onChangeHandler}
                />
                {errors.projectName && (
                  <div className="invalid-feedback">{errors.projectName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.projectIdentifier,
                  })}
                  placeholder="Unique Project ID"
                  disabled
                  name="projectIdentifier"
                  value={updatedProject.projectIdentifier}
                />
                {errors.projectIdentifier && (
                  <div className="invalid-feedback">
                    {errors.projectIdentifier}
                  </div>
                )}
              </div>
              <div className="form-group mb-2">
                <textarea
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.description,
                  })}
                  placeholder="Project Description"
                  name="description"
                  value={updatedProject.description}
                  onChange={onChangeHandler}
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <h6>Start Date</h6>
              <div className="form-group mb-2">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="start_date"
                  value={updatedProject.start_date}
                  onChange={onChangeHandler}
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group mb-2">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="end_date"
                  value={updatedProject.end_date}
                  onChange={onChangeHandler}
                />
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;
