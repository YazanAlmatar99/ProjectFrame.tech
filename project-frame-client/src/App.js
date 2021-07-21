import "./App.css";
import React, { useEffect, useState } from "react";
import axios from 'axios'
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
import Login from "./components/UserManagment/Login";
import Register from "./components/UserManagment/Register";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { AddProjectTask } from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./state/action-types";
import setJWTToken from "./utils/setJWTToken";
import { logout } from "./state/actions/securityActions";
import PrivateRoute from "./utils/PrivateRoute";
import { useActions } from "./hooks/use-actions";
import { store } from "./state";

axios.defaults.baseURL = "http://Projectframetech-env.eba-xmnj3knj.us-east-2.elasticbeanstalk.com"
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
