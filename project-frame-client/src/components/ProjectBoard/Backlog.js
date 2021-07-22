import "./styles.scss";
import React, { useEffect, useState } from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";
import ProgressChart from "./ProgressChart/ProgressChart";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
const Backlog = ({ projectTasks }) => {
  const [showChart, setShowChart] = useState(true);
  const handleChange = () => {
    setShowChart(!showChart);
  };
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
      <FormControlLabel
        label="Show Stats Chart"
        control={
          <Switch
            checked={showChart}
            onChange={handleChange}
            color="secondary"
            name="showChart"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        }
      ></FormControlLabel>
      {showChart ? (
        <div className="chart-wrapper">
          <ProgressChart
            todoItems={todoItems.length}
            inProgressItems={inProgressItems.length}
            doneItems={doneItems.length}
          />
        </div>
      ) : null}

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
