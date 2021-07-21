import React, { useEffect, useState } from "react";
import { useActions } from "../../hooks/use-actions";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Backlog from "./Backlog";
const ProjectBoard = (props) => {
  const { getBacklog } = useActions();
  const history = useHistory();
  const { id } = props.match.params;
  const projectTasks = useSelector((state) => state.backlogState.project_tasks);
  const errors = useSelector((state) => state.errorState);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await getBacklog(id, history);
    console.log(projectTasks);
  };

  return (
    <div className="container">
      <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
        <i className="fas fa-plus-circle"> Create Project Task</i>
      </Link>
      <br />
      <hr />
      {projectTasks.length ? (
        <Backlog projectTasks={projectTasks} />
      ) : (
        <div class="alert alert-primary" role="alert">
          No Project Tasks Found! Click on <strong>Create Project Task </strong>
          to create your first project task
        </div>
      )}
    </div>
  );
};

export default ProjectBoard;
