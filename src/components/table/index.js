import React, { Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
  Avatar,
  Divider,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import { SearchContext } from "../../context";
import utils from "../../utils";
import Pagination from "../pagination";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f4f4f4",
    },
  },
  chip: {
    marginRight: theme.spacing(1),
    cursor: "pointer",
  },
}));

function Table() {
  const classes = useStyles();
  const { pokemons, error } = useContext(SearchContext);

  if (error) {
    return (
      <Box
        py={2}
        px={1}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Typography>Pokemon Not Found</Typography>
        <Typography variant="caption">
          Please use the exact Pokemon name
        </Typography>
      </Box>
    );
  }

  return (
    <Box py={2} px={1}>
      <Pagination />
      <List>
        {pokemons && pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <Fragment key={pokemon.id}>
              <RouterLink
                className={classes.link}
                to={`/details/${pokemon.id}`}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={pokemon.name}
                      src={pokemon.sprites.front_default}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={utils.capitalize(pokemon.name)}
                    secondary={
                      <>
                        {pokemon.types.map((item) => (
                          <Chip
                            key={item.slot}
                            className={classes.chip}
                            label={item.type.name}
                          />
                        ))}
                      </>
                    }
                    secondaryTypographyProps={{ component: "div" }}
                  />
                </ListItem>
              </RouterLink>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))
        ) : (
          <Typography>Loading...</Typography>
        )}
      </List>
    </Box>
  );
}

export default Table;
