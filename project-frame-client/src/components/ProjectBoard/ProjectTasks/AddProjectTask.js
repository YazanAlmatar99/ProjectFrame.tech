import "date-fns";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../../hooks/use-actions";
import { useHistory, Link } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
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
  formControl: {
    margin: theme.spacing(3),
    minWidth: 150,
  },
}));
export const AddProjectTask = (props) => {
  const { id } = props.match.params;
  const { addProjectTask } = useActions();
  const classes = useStyles();
  const history = useHistory();
  const errors = useSelector((state) => state.errorState);
  const [projectTask, setProjectTask] = useState({
    projectIdentifier: id,
    summary: "",
    status: "",
    priority: 0,
    dueDate: new Date(),
    acceptanceCriteria: "",
  });
  const onFormSubmit = async (e) => {
    e.preventDefault();
    await addProjectTask(id, projectTask, history);
    console.log(errors);
  };
  const onChangeHandler = (e) => {
    setProjectTask({ ...projectTask, [e.target.name]: e.target.value });
  };
  const handleDueDate = (date) => {
    setProjectTask({ ...projectTask, dueDate: date });
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
              New Project Task
            </Typography>
            <form className={classes.form}>
              <TextField
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                value={projectTask.projectName}
                id="summary"
                label="Project Task Summary"
                name="summary"
                autoFocus
                error={errors.summary != null}
                helperText={errors.summary}
                onChange={onChangeHandler}
              />
              <TextField
                margin="normal"
                required
                value={projectTask.acceptanceCriteria}
                fullWidth
                id="acceptanceCriteria"
                label="Acceptance Criteria"
                name="acceptanceCriteria"
                error={errors.acceptanceCriteria != null}
                helperText={errors.acceptanceCriteria}
                onChange={onChangeHandler}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel>Select Priority</InputLabel>
                    <Select
                      // value={age}
                      onChange={onChangeHandler}
                      label="Priority"
                      name="priority"
                    >
                      <MenuItem value={3}>Low</MenuItem>
                      <MenuItem value={2}>Medium</MenuItem>
                      <MenuItem value={1}>High</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel>Select Status</InputLabel>
                    <Select
                      // value={age}
                      onChange={onChangeHandler}
                      label="Priority"
                      name="status"
                    >
                      <MenuItem value={"TO_DO"}>To Do</MenuItem>
                      <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                      <MenuItem value={"DONE"}>Done</MenuItem>
                    </Select>
                  </FormControl>
                  <KeyboardDatePicker
                    variant="standard"
                    format="MM-dd-yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Due Date"
                    disableToolbar
                    value={new Date(projectTask.dueDate)}
                    onChange={handleDueDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Grid container justifyContent="space-around"></Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onFormSubmit}
              >
                Create Project Task
              </Button>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AddProjectTask;
