import "./styles.scss";
import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useActions } from "../../hooks/use-actions";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {},
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Profile = () => {
  const { updateUserInfo } = useActions();
  const user = useSelector((state) => state.securityState.user);
  const [userDetails, setUserDetails] = useState(user);

  const classes = useStyles();

  const onChangeHandler = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username: userDetails.username,
      fullName: userDetails.fullName,
      id: userDetails.id,
    };

    await updateUserInfo(updatedUser);
  };
  return (
    <Container className={classes.root}>
      <Card>
        <CardHeader
          title={<Typography variant="h5">{userDetails.fullName}</Typography>}
          avatar={
            <Avatar aria-label="priority" className={classes.large}></Avatar>
          }
        />
        <CardContent>
          <form>
            <TextField
              margin="normal"
              required
              value={userDetails.fullName}
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              // error={errors.projectIdentifier != null}
              // helperText={errors.projectIdentifier}
              onChange={onChangeHandler}
            />
            <TextField
              margin="normal"
              required
              value={userDetails.username}
              fullWidth
              id="username"
              label="Email"
              name="username"
              // error={errors.projectIdentifier != null}
              // helperText={errors.projectIdentifier}
              onChange={onChangeHandler}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onFormSubmit}
            >
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
