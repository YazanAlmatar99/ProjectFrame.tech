import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/use-actions";
import SvgIcon from "@material-ui/core/SvgIcon";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import AppsIcon from "@material-ui/icons/Apps";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    marginRight: "5px",
    cursor: "pointer",
    "&:hover": {
      color: "white",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(7),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { logout } = useActions();
  const security = useSelector((state) => state.securityState);
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    logout();
    handleDrawerClose();
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/dashboard" className={clsx(classes.link)}>
              ProjectFrame.io
            </Link>
          </Typography>
          {!security.validToken ? (
            <Button color="inherit">
              <Link to="/login" className={clsx(classes.link)}>
                LogIn
              </Link>
            </Button>
          ) : null}
          {!security.validToken ? (
            <Button color="inherit">
              <Link to="/register" className={clsx(classes.link)}>
                SignUp
              </Link>
            </Button>
          ) : null}
          {security.validToken ? (
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {security.validToken ? (
          <List>
            <Link
              to="/dashboard"
              className={clsx(classes.link)}
              style={{ color: "rgba(0, 0, 0, 0.54)" }}
            >
              <ListItem button onClick={handleDrawerClose}>
                <ListItemIcon>
                  <AppsIcon />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItem>
            </Link>
            <Link
              to="/profile"
              className={clsx(classes.link)}
              style={{ color: "rgba(0, 0, 0, 0.54)" }}
            >
              <ListItem button onClick={handleDrawerClose}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={"Profile"} />
              </ListItem>
            </Link>
          </List>
        ) : null}
        <Divider />
        <List>
          {!security.validToken ? (
            <Fragment>
              <Link
                to="/register"
                className={clsx(classes.link)}
                style={{ color: "rgba(0, 0, 0, 0.54)" }}
              >
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <OpenInBrowserIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign Up" />
                </ListItem>
              </Link>
              <Link
                to="/login"
                className={clsx(classes.link)}
                style={{ color: "rgba(0, 0, 0, 0.54)" }}
              >
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <LockOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log In" />
                </ListItem>
              </Link>
            </Fragment>
          ) : (
            <Link
              to="/login"
              className={clsx(classes.link)}
              style={{ color: "rgba(0, 0, 0, 0.54)" }}
            >
              <ListItem button onClick={handleLogout}>
                <ListItemIcon onClick={() => logout()}>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </Link>
          )}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      ></main>
    </div>
  );
}
