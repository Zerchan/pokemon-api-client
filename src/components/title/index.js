import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { SearchContext } from "../../context";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  titleLink: {
    color: "white",
    textDecoration: "none",
  },
}));

function Title() {
  const classes = useStyles();
  const { resetSearch } = useContext(SearchContext);

  return (
    <Typography variant="h6" className={classes.title}>
      <Link className={classes.titleLink} to="/" onClick={resetSearch}>
        PokeAPI
      </Link>
    </Typography>
  );
}

export default Title;
