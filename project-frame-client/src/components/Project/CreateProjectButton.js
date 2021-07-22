import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const CreateProjectButton = () => {
  return (
    <Fragment>
      <Link to="/addProject" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
        >
          Create New Project
        </Button>
      </Link>
    </Fragment>
  );
};

export default CreateProjectButton;
