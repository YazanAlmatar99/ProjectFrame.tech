import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
const Landing = () => {
  return (
    <div className="landing">
      <div className="light-overlay landing-inner text-dark">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Project Frame</h1>

              <img
                src="landing-picture.svg"
                style={{ width: "300px", margin: "auto", margin: "10px" }}
              />
              <p className="lead">
                Create your account to start using Project Frame, or Login if
                you already have an account!
              </p>
              <hr />
              <Link
                to="/register"
                className="m-2"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ width: "150px", height: "40px" }}
                >
                  Sign Up
                </Button>
              </Link>
              <Link
                to="/login"
                className="m-2"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  style={{ width: "150px", height: "40px" }}
                  color="primary"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
