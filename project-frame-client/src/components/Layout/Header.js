import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/use-actions";
import SvgIcon from "@material-ui/core/SvgIcon";
const Header = () => {
  const { logout } = useActions();
  const security = useSelector((state) => state.securityState);
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          <SvgIcon>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>{" "}
          ProjectFrame.tech
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            {!security.validToken ? (
              <li className="nav-item">
                <Link to="/register" className="nav-link ">
                  Sign Up
                </Link>
              </li>
            ) : null}
            {!security.validToken ? (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            ) : null}
            {security.validToken ? (
              <li className="nav-item" onClick={() => logout()}>
                <Link to="/" className="nav-link">
                  Logout
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
