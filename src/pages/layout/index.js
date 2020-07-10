import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Layout(props) {
  const {
    location: { pathname },
    history,
  } = props;
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {pathname !== "/" && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={history.goBack}
            >
              <ArrowBackIcon fontSize="small" />
              <Typography variant="body2">Back</Typography>
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            Pokemon Search
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Layout);
