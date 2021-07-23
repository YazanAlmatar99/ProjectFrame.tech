// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useHistory, Link } from "react-router-dom";
// import { useActions } from "../../../hooks/use-actions";

// const UpdateProjectTask = (props) => {
//   const { addProjectTask, getProjectTask } = useActions();
//   const { id, sequence } = props.match.params;
//   const history = useHistory();
//   const projectTask = useSelector((state) => state.backlogState.project_task);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchData = async () => {
//     await getProjectTask(id, sequence, history);
//     setIsLoading(false);
//   };
//   useEffect(() => {
//     if (isLoading === true) {
//       fetchData();
//     }
//     setUpdatedProjectTask(projectTask);
//   }, [isLoading]);
//   const onChangeHandler = (e) => {
//     setUpdatedProjectTask({
//       ...updatedProjectTask,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const onFormSubmit = (e) => {
//     e.preventDefault();
//     addProjectTask(id, updatedProjectTask, history);
//   };

//   const [updatedProjectTask, setUpdatedProjectTask] = useState(projectTask);
//   return (
//     <div className="add-PBI">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-8 m-auto">
//             <Link to={`/projectBoard/${id}`} className="btn btn-light">
//               Back to Project Board
//             </Link>
//             <h4 className="display-6 text-center">Update Project Task</h4>
//             <form onSubmit={onFormSubmit}>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   className="form-control form-control-lg"
//                   name="summary"
//                   placeholder="Project Task summary"
//                   value={updatedProjectTask.summary}
//                   onChange={onChangeHandler}
//                 />
//               </div>
//               <div className="form-group">
//                 <textarea
//                   className="form-control form-control-lg"
//                   placeholder="Acceptance Criteria"
//                   name="acceptanceCriteria"
//                   value={updatedProjectTask.acceptanceCriteria}
//                   onChange={onChangeHandler}
//                 ></textarea>
//               </div>
//               <h6>Due Date</h6>
//               <div className="form-group">
//                 <input
//                   type="date"
//                   className="form-control form-control-lg"
//                   name="dueDate"
//                   value={updatedProjectTask.dueDate}
//                   onChange={onChangeHandler}
//                 />
//               </div>
//               <div className="form-group">
//                 <select
//                   className="form-control form-control-lg"
//                   name="priority"
//                   value={updatedProjectTask.priority}
//                   onChange={onChangeHandler}
//                 >
//                   <option value={0}>Select Priority</option>
//                   <option value={1}>High</option>
//                   <option value={2}>Medium</option>
//                   <option value={3}>Low</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <select
//                   className="form-control form-control-lg"
//                   name="status"
//                   value={updatedProjectTask.status}
//                   onChange={onChangeHandler}
//                 >
//                   <option value="">Select Status</option>
//                   <option value="TO_DO">TO DO</option>
//                   <option value="IN_PROGRESS">IN PROGRESS</option>
//                   <option value="DONE">DONE</option>
//                 </select>
//               </div>

//               <input type="submit" className="btn btn-primary btn-block mt-4" />
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProjectTask;

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
import EditIcon from "@material-ui/icons/Edit";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
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
  formControl: {
    margin: theme.spacing(3),
    minWidth: 150,
  },
}));
const UpdateProjectTask = (props) => {
  const errors = useSelector((state) => state.errorState);
  const history = useHistory();
  const classes = useStyles();

  const { addProjectTask, getProjectTask } = useActions();
  const { id, sequence } = props.match.params;
  const projectTask = useSelector((state) => state.backlogState.project_task);
  const [isLoading, setIsLoading] = useState(true);
  const { summary, acceptanceCriteria, dueDate, status, priority } =
    projectTask;
  const [updatedProjectTask, setUpdatedProjectTask] = useState({
    summary: "",
    acceptanceCriteria: "",
    dueDate: new Date(),
    status: "",
    priority: "",
  });
  const fetchData = async () => {
    await getProjectTask(id, sequence, history);
    setIsLoading(false);
  };
  useEffect(() => {
    if (isLoading === true) {
      fetchData();
    }
    console.log(projectTask, "PROJECT TASKKKKK");
    setUpdatedProjectTask(projectTask);
  }, [isLoading]);
  const onChangeHandler = (e) => {
    setUpdatedProjectTask({
      ...updatedProjectTask,
      [e.target.name]: e.target.value,
    });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    addProjectTask(id, updatedProjectTask, history);
  };

  const handleDueDate = (date) => {
    setUpdatedProjectTask({ ...updatedProjectTask, dueDate: date });
  };

  return (
    <div>
      <div className="project">
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <EditIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update Project Task
            </Typography>
            <form className={classes.form}>
              <TextField
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                value={updatedProjectTask.summary}
                id="summary"
                name="summary"
                autoFocus
                error={errors.summary != null}
                helperText={errors.summary}
                onChange={onChangeHandler}
              />
              <TextField
                margin="normal"
                required
                value={updatedProjectTask.acceptanceCriteria}
                fullWidth
                id="acceptanceCriteria"
                name="acceptanceCriteria"
                error={errors.acceptanceCriteria != null}
                helperText={errors.acceptanceCriteria}
                onChange={onChangeHandler}
              />
              <TextField
                margin="normal"
                required
                disabled
                value={"ID: " + updatedProjectTask.projectIdentifier}
                fullWidth
                id="projectIdentifier"
                name="projectIdentifier"
                error={errors.projectIdentifier != null}
                helperText={errors.projectIdentifier}
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
                      value={updatedProjectTask.priority}
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
                      value={updatedProjectTask.status}
                      onChange={onChangeHandler}
                      label="Status"
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
                    disableToolbar
                    value={new Date(updatedProjectTask.dueDate)}
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
                Update Project Task
              </Button>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default UpdateProjectTask;
