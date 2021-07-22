import React, { useState, useEffect } from "react";
import { useActions } from "../../hooks/use-actions";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import classnames from "classnames";
const Login = () => {
  const security = useSelector((state) => state.securityState);

  const { loginUser } = useActions();
  const errors = useSelector((state) => state.errorState);
  const history = useHistory();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    await loginUser(user, history);
  };
  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <form onSubmit={onFormSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.username,
                  })}
                  placeholder="Email Address"
                  name="username"
                  value={user.username}
                  onChange={onChangeHandler}
                  required
                />
                {errors && (
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
                  value={user.password}
                  onChange={onChangeHandler}
                  required
                />
                {errors && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
