import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useActions } from "../../../hooks/use-actions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import clsx from "clsx";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import Menu from "@material-ui/core/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { deepOrange, deepPurple, deepGreen } from "@material-ui/core/colors";

import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const ProjectTask = ({ projectTask }) => {
  const { deleteProjectTask, updateProjectTaskStatus, addProjectTask } =
    useActions(); //addProjectTask(id, updatedProjectTask, history);
  const history = useHistory();
  const onDeleteClick = async () => {
    await deleteProjectTask(
      projectTask.projectIdentifier,
      projectTask.projectSequence,
      history
    );
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const onSelectHandler = async (e) => {
    await addProjectTask(
      projectTask.projectIdentifier,
      { ...projectTask, status: e.target.value },
      history
    );
    updateProjectTaskStatus(projectTask.projectSequence, e.target.value);
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }));
  const classes = useStyles();
  let priorityAvatarText;
  let priorityClass;
  switch (projectTask.priority) {
    case 1:
      priorityAvatarText = "!!!";
      priorityClass = classes.orange;
      break;
    case 2:
      priorityAvatarText = "!!";
      priorityClass = classes.purple;
      break;
    case 3:
      priorityAvatarText = "!";
      break;
  }
  return (
    <div className=" mb-3 bg-light">
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="priority" className={priorityClass}>
              {priorityAvatarText}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={projectTask.summary}
          subheader={`Due Date: ${
            projectTask.dueDate ? projectTask.dueDate : "Not Set"
          } | ID: ${projectTask.projectSequence}`}
        />

        <div className="card-body bg-light">
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <Link
              to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`}
            >
              <MenuItem onClick={handleMenuClose}>
                {" "}
                <IconButton aria-label="edit" color="Primary">
                  <EditIcon />
                </IconButton>
              </MenuItem>
            </Link>

            <MenuItem onClick={handleMenuClose} onClick={onDeleteClick}>
              <IconButton aria-label="delete" color="secondary">
                <DeleteForeverIcon />
              </IconButton>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={projectTask.status}
              onChange={onSelectHandler}
              label="Status"
            >
              <MenuItem value={"TO_DO"}>To Do</MenuItem>
              <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
              <MenuItem value={"DONE"}>Done</MenuItem>
            </Select>
          </FormControl>
          {/* <h5 className="card-title">{projectTask.summary}</h5> */}
          {/* <p className="card-text text-truncate ">
            {projectTask.acceptanceCriteria}
          </p> */}
        </div>

        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {projectTask.acceptanceCriteria
                ? projectTask.acceptanceCriteria
                : "No description was found, Edit the task and write your own!"}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default ProjectTask;
