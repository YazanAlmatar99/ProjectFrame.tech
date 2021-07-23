import React, { useState } from "react";
import CreateProjectButton from "./CreateProjectButton";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { purple } from "@material-ui/core/colors";
import { useActions } from "../../hooks/use-actions";
import MenuItem from "@material-ui/core/MenuItem";
import FlagIcon from "@material-ui/icons/Flag";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";

import Menu from "@material-ui/core/Menu";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: purple[400],
  },
}));

const ProjectItem = ({ project }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const { deleteProject } = useActions();
  const classes = useStyles();
  const onDeleteClick = (projectIdentifier) => {
    deleteProject(projectIdentifier);
  };

  return (
    <div className="container">
      <Card className="mb-5 ">
        <div className="card-body bg-light ">
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {project.projectIdentifier[0]}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
            }
            title={`Project ID: ${project.projectIdentifier}`}
            subheader={`Estimated End Date: ${
              project.end_date ? project.end_date : "Not Set"
            }`}
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <Link to={`/updateProject/${project.projectIdentifier}`}>
              <MenuItem onClick={handleMenuClose}>
                {" "}
                <IconButton aria-label="edit" color="primary">
                  <EditIcon />
                </IconButton>
              </MenuItem>
            </Link>

            <MenuItem
              onClick={handleMenuClose}
              onClick={() => onDeleteClick(project.projectIdentifier)}
            >
              <IconButton aria-label="delete" color="secondary">
                <DeleteForeverIcon />
              </IconButton>
            </MenuItem>
            {/* <MenuItem onClick={handleMenuClose}>Logout</MenuItem> */}
          </Menu>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-lg-6 col-md-4 col-8">
              <Card className={`${classes.root} mb-5`}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    variant="h5"
                  >
                    {project.projectName}
                  </Typography>

                  <Typography variant="body2" component="p">
                    {project.description}
                    <br />
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div className="col-md-4  d-lg-block">
              <ul className="list-group">
                <Link
                  to={`/projectBoard/${project.projectIdentifier}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    startIcon={<FlagIcon />}
                  >
                    Project Board
                  </Button>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectItem;
