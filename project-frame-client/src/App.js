import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import AddProject from "./components/Project/AddProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import { ToastContainer } from "react-toastify";
import UpdateProject from "./components/Project/UpdateProject";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import { useSelector } from "react-redux";
import Login from "./components/UserManagement/Login";
import Register from "./components/UserManagement/Register";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { AddProjectTask } from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import PrivateRoute from "./utils/PrivateRoute";
import { useActions } from "./hooks/use-actions";

axios.defaults.baseURL = "https://api.projectframe.io";
const App = () => {
  const security = useSelector((state) => state.securityState);
  const { authUser } = useActions();
  useEffect(async () => {
    if (localStorage.getItem("token")) {
      authUser();
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <ToastContainer autoClose={3000} draggable pauseOnHover />
        <Header />
        {
          //Private Routes
        }

        <PrivateRoute path="/dashboard" component={Dashboard} exact />
        <PrivateRoute path="/addProject" component={AddProject} exact />
        <PrivateRoute
          path="/updateProject/:id"
          component={UpdateProject}
          exact
        />
        <PrivateRoute path="/projectBoard/:id" component={ProjectBoard} exact />
        <PrivateRoute
          path="/addProjectTask/:id"
          component={AddProjectTask}
          exact
        />
        <PrivateRoute
          path="/updateProjectTask/:id/:sequence"
          component={UpdateProjectTask}
          exact
        />
        {
          //Public Routes
        }
        <Route path="/" component={Landing} exact />
        <Route path="/login">
          {security.validToken ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route path="/register">
          {security.validToken ? <Redirect to="/dashboard" /> : <Register />}
        </Route>
        {/* <Route path="/register" component={Register} exact /> */}
      </div>
    </Router>
  );
};

export default App;
