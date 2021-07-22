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
        <div className="chart-wrapper col-md-6">
          <div className="card bg-light mb-3" style={{ margin: "auto" }}>
            <div className="card-header text-center">Progress Statistics</div>
            <div className="card-body">
              <ProgressChart
                todoItems={todoItems.length}
                inProgressItems={inProgressItems.length}
                doneItems={doneItems.length}
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-4">
          <div className="card bg-light mb-3">
            <div className="card-header text-center">To Do</div>
            <div className="card-body">{todoItems}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light mb-3">
            <div className="card-header text-center">In Progress</div>
            <div className="card-body">{inProgressItems}</div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-light mb-3">
            <div className="card-header text-center">Done</div>
            <div className="card-body">{doneItems}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backlog;
