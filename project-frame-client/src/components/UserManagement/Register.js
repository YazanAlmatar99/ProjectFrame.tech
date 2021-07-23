// import React, { useState } from "react";
// import { useActions } from "../../hooks/use-actions";
// import { Link, useHistory } from "react-router-dom";
// import { useSelector } from "react-redux";
// import classnames from "classnames";
// const Register = () => {
//   const { createNewUser } = useActions();
//   const errors = useSelector((state) => state.errorState);
//   const history = useHistory();
//   const [user, setUser] = useState({
//     username: "",
//     fullName: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const onChangeHandler = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const onFormSubmit = async (e) => {
//     e.preventDefault();
//     await createNewUser(user, history);
//     console.log(user);
//   };
//   return (
//     <div className="register">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-8 m-auto">
//             <h1 className="display-4 text-center">Sign Up</h1>
//             <p className="lead text-center">Create your Account</p>
//             <form onSubmit={onFormSubmit}>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   className="form-control form-control-lg"
//                   placeholder="Name"
//                   name="fullName"
//                   required
//                   onChange={onChangeHandler}
//                   value={user.fullName}
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   type="email"
//                   className={classnames("form-control form-control-lg", {
//                     "is-invalid": errors.username,
//                   })}
//                   placeholder="Email Address"
//                   name="username"
//                   onChange={onChangeHandler}
//                   required
//                   value={user.username}
//                 />
//                 {errors.username && (
//                   <div className="invalid-feedback">{errors.username}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <input
//                   type="password"
//                   className={classnames("form-control form-control-lg", {
//                     "is-invalid": errors.password,
//                   })}
//                   placeholder="Password"
//                   name="password"
//                   onChange={onChangeHandler}
//                   required
//                 />
//                 {errors.password && (
//                   <div className="invalid-feedback">{errors.password}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <input
//                   type="password"
//                   className={classnames("form-control form-control-lg", {
//                     "is-invalid": errors.confirmPassword,
//                   })}
//                   placeholder="Confirm Password"
//                   name="confirmPassword"
//                   onChange={onChangeHandler}
//                   required
//                   value={user.confirmPassword}
//                 />
//                 {errors.confirmPassword && (
//                   <div className="invalid-feedback">
//                     {errors.confirmPassword}
//                   </div>
//                 )}
//               </div>
//               <input
//                 type="submit"
//                 className="btn btn-info btn-block mt-4 btn-dark"
//               />
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useActions } from "../../hooks/use-actions";
import { useHistory,Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.yazanalmatar.com/">
        YazanAlmatar.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
    const security = useSelector((state) => state.securityState);

  const { createNewUser } = useActions();
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
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} >
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoFocus
            error={errors.fullName !=null}
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
            error={errors.username !=null}
            helperText={errors.username}
            onChange={onChangeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            error={errors.password !=null}
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
            error={errors.password !=null}
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
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
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
            <Grid item xs>
              {/* <RouterLink to="/register">
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
              </RouterLink> */}
            </Grid>
            <Grid item>
            <RouterLink to="/login">
              <Link  variant="body2">
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
