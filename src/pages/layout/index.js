import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { withRouter } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import SearchBar from "../../components/search-bar";
import Title from "../../components/title";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
          <Title />
          {pathname === "/" && <SearchBar />}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Layout);
