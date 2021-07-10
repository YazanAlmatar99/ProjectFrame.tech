import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import AddProject from "./components/Project/AddProject";
import { ToastContainer, toast } from "react-toastify";
import UpdateProject from "./components/Project/UpdateProject";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer autoClose={2500} draggable pauseOnHover />
        <Header />
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/addProject" component={AddProject} exact />
        <Route path="/updateProject/:id" component={UpdateProject} exact />
      </div>
    </Router>
  );
}

export default App;
