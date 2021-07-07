import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/use-actions";
import { useHistory } from "react-router-dom";
import classnames from "classnames";

const AddProject = () => {
  const { createProject } = useActions();
  const history = useHistory();
  const errors = useSelector((state) => state.errorState);
  const [input, setInput] = useState({
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: "",
    errors: {},
  });

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      return;
    }
    setInput({ ...input, errors });
  }, [errors]);
  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const {
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    } = input;
    const newProject = {
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    };
    await createProject(newProject, history);
  };

  return (
    <div>
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Project</h5>
              <hr />
              <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.projectName,
                    })}
                    placeholder="Project Name"
                    name="projectName"
                    value={input.projectName}
                    onChange={onChangeHandler}
                  />
                  {errors.projectName && (
                    <div className="invalid-feedback">{errors.projectName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.projectIdentifier,
                    })}
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={input.projectIdentifier}
                    onChange={onChangeHandler}
                  />
                  {errors.projectIdentifier && (
                    <div className="invalid-feedback">
                      {errors.projectIdentifier}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.description,
                    })}
                    placeholder="Project Description"
                    name="description"
                    value={input.description}
                    onChange={onChangeHandler}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="start_date"
                    value={input.start_date}
                    onChange={onChangeHandler}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    value={input.end_date}
                    onChange={onChangeHandler}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
