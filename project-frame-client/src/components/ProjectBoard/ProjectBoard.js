import React, { useEffect, useState } from "react";
import { useActions } from "../../hooks/use-actions";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
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
      <Link
        to={`/addProjectTask/${id}`}
        className="mb-3"
        style={{ textDecoration: "none" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
        >
          Create Project Task
        </Button>
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
