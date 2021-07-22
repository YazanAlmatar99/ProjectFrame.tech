import React, { useState, useEffect } from "react";
import ProjectItem from "../Project/ProjectItem";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/use-actions";
import Typography from "@material-ui/core/Typography";

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
              <Typography variant="h2" component="h2" className="text-center">
                Projects
              </Typography>
              <br />
              <CreateProjectButton />
              <br />
              <hr />
              <div className="card bg-light mb-3">
                <div className="card-header text-center">Projects</div>
                <div className="card-body">
                  {projectState.projects.map((project) => (
                    <ProjectItem project={project} key={project.id} />
                  ))}
                </div>
              </div>
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
