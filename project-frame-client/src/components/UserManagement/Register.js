import React, { useState } from "react";
import { useActions } from "../../hooks/use-actions";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import classnames from "classnames";
const Register = () => {
  const { createNewUser } = useActions();
  const errors = useSelector((state) => state.errorState);
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    await createNewUser(user, history);
    console.log(user);
  };
  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Account</p>
            <form onSubmit={onFormSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  name="fullName"
                  required
                  onChange={onChangeHandler}
                  value={user.fullName}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.username,
                  })}
                  placeholder="Email Address"
                  name="username"
                  onChange={onChangeHandler}
                  required
                  value={user.username}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password,
                  })}
                  placeholder="Password"
                  name="password"
                  onChange={onChangeHandler}
                  required
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.confirmPassword,
                  })}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={onChangeHandler}
                  required
                  value={user.confirmPassword}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <input
                type="submit"
                className="btn btn-info btn-block mt-4 btn-dark"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
