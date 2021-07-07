import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import AddProject from "./components/Project/AddProject";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/addProject" component={AddProject} exact />
      </div>
    </Router>
  );
}

export default App;
