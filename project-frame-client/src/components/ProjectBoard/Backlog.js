import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/use-actions";
import ProjectTask from "./ProjectTasks/ProjectTask";

const Backlog = ({ projectTasks }) => {
  useEffect(() => {
    console.log(projectTasks);
  });

  const tasks = projectTasks.map((projectTask) => (
    <ProjectTask key={projectTask.id} projectTask={projectTask} />
  ));

  let todoItems = [];
  let inProgressItems = [];
  let doneItems = [];

  for (let i = 0; i < tasks.length; i++) {
    switch (tasks[i].props.projectTask.status) {
      case "TO_DO":
        todoItems.push(tasks[i]);
        break;
      case "IN_PROGRESS":
        inProgressItems.push(tasks[i]);
        break;
      case "DONE":
        doneItems.push(tasks[i]);
        break;
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center mb-2">
            <div className="card-header bg-secondary text-white">
              <h3 className="fas fa-tasks"> To Do</h3>
            </div>
          </div>

          {todoItems}
        </div>
        <div className="col-md-4">
          <div className="card text-center mb-2">
            <div className="card-header bg-primary text-white">
              <h3 className="fas fa-spinner"> In Progress</h3>
            </div>
          </div>
          {inProgressItems}
        </div>

        <div className="col-md-4">
          <div className="card text-center mb-2">
            <div className="card-header bg-success text-white">
              <h3 className="fas fa-check-circle"> Done</h3>
            </div>
          </div>
          {doneItems}
        </div>
      </div>
    </div>
  );
};

export default Backlog;
