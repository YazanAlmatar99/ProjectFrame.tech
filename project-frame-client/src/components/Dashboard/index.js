import React from "react";
import Project from "../Project/index";
import ProjectItem from "../Project/ProjectItem";
import CreateProjectButton from "../Project/CreateProjectButton";
const Dashboard = () => {
  return (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Projects</h1>
            <br />
            <CreateProjectButton />
            <br />
            <hr />
            <ProjectItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
