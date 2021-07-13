import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useActions } from "../../../hooks/use-actions";
const ProjectTask = ({ projectTask }) => {
  const { deleteProjectTask } = useActions();
  const history = useHistory();
  const onDeleteClick = async () => {
    await deleteProjectTask(
      projectTask.projectIdentifier,
      projectTask.projectSequence,
      history
    );
  };
  let priorityString;
  let priorityClass;

  switch (projectTask.priority) {
    case 1:
      priorityClass = "bg-danger text-light";
      priorityString = "HIGH";
      break;
    case 2:
      priorityClass = "bg-warning text-light";
      priorityString = "MEDIUM";
      break;
    case 3:
      priorityClass = "bg-info text-light";
      priorityString = "LOW";
      break;
  }
  return (
    <div className="card mb-1 bg-light">
      <div className={`card-header text-primary ${priorityClass}`}>
        ID: {projectTask.projectSequence} -- Priority: {priorityString}
      </div>
      <div className="card-body bg-light">
        <h5 className="card-title">{projectTask.summary}</h5>
        <p className="card-text text-truncate ">
          {projectTask.acceptanceCriteria}
        </p>
        <Link
          to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`}
          className="btn btn-primary m-2 far fa-edit"
        >
          {" "}
          View / Update
        </Link>

        <button
          className="btn btn-danger far fa-trash-alt ml-4"
          onClick={onDeleteClick}
        >
          {" "}
        </button>
      </div>
    </div>
  );
};

export default ProjectTask;
