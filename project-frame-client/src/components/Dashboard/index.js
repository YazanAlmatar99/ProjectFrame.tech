import React, { useState, useEffect } from "react";
import Project from "../Project/index";
import ProjectItem from "../Project/ProjectItem";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/use-actions";

import CreateProjectButton from "../Project/CreateProjectButton";

const Dashboard = () => {
  const { getProjects } = useActions();
  const projectState = useSelector((state) => state.projectState);

  useEffect(async () => {
    await getProjects();
    console.log(projectState);
  }, []);

  if (projectState.projects) {
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

              {projectState.projects.map((project) => (
                <ProjectItem project={project} key={project.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default Dashboard;
