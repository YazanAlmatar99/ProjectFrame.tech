import "date-fns";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/use-actions";
import { useHistory, Link } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
const AddProject = () => {
  const { createProject } = useActions();
  const classes = useStyles();
  const history = useHistory();
  const errors = useSelector((state) => state.errorState);
  const [input, setInput] = useState({
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: new Date(),
    end_date: new Date(),
    errors: {},
  });

  const handleStartDate = (date) => {
    setInput({ ...input, start_date: date });
  };
  const handleEndDate = (date) => {
    setInput({ ...input, end_date: date });
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      return;
    }
    setInput({ ...input, errors });
  }, [errors]);
  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const {
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    } = input;

    const newProject = {
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    };
    await createProject(newProject, history);
  };

  return (
    <div>
      <div className="project">
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AddCircleOutlineIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              New Project
            </Typography>
            <form className={classes.form}>
              <TextField
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                value={input.projectName}
                id="projectName"
                label="Project Name"
                name="projectName"
                autoFocus
                error={errors.projectName != null}
                helperText={errors.projectName}
                onChange={onChangeHandler}
              />
              <TextField
                margin="normal"
                required
                value={input.projectIdentifier}
                fullWidth
                id="projectIdentifier"
                label="Unique Project ID"
                name="projectIdentifier"
                error={errors.projectIdentifier != null}
                helperText={errors.projectIdentifier}
                onChange={onChangeHandler}
              />
              <TextField
                value={input.description}
                margin="normal"
                multiline
                error={errors.description != null}
                helperText={errors.description}
                required
                fullWidth
                name="description"
                label="Description"
                type="text"
                onChange={onChangeHandler}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
                  <KeyboardDatePicker
                    variant="standard"
                    format="MM-dd-yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Start Date"
                    disableToolbar
                    value={new Date(input.start_date)}
                    onChange={handleStartDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <KeyboardDatePicker
                    margin="normal"
                    variant="standard"
                    id="date-picker-inline"
                    disableToolbar
                    label="End Date"
                    format="MM-dd-yyyy"
                    value={new Date(input.end_date)}
                    onChange={handleEndDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onFormSubmit}
              >
                Create Project
              </Button>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AddProject;
