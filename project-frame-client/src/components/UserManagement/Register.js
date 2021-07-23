import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useActions } from "../../hooks/use-actions";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.yazanalmatar.com/">
        YazanAlmatar.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, []);
  const security = useSelector((state) => state.securityState);

  const { createNewUser, clearErrors } = useActions();
  const errors = useSelector((state) => state.errorState);
  const history = useHistory();
  const classes = useStyles();
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
    <Container component="main" maxWidth="xs">
      <div
        className="logo-wrapper"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img src="project-frame-logo.png" style={{ width: "140px" }} />
      </div>
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoFocus
            error={errors.fullName != null}
            helperText={errors.fullName}
            onChange={onChangeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
            error={errors.username != null}
            helperText={errors.username}
            onChange={onChangeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            error={errors.password != null}
            helperText={errors.password}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChangeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            error={errors.password != null}
            helperText={errors.confirmPassword}
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            onChange={onChangeHandler}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onFormSubmit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <RouterLink to="/login">
                <Link variant="body2">
                  {"You already have an account? Log In"}
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
