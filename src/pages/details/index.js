import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Chip,
  Paper,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";

import services from "../../services";
import utils from "../../utils";

const useStyles = makeStyles((theme) => ({
  stat: {
    fontWeight: "600",
    marginRight: theme.spacing(3),
  },
  statsItem: {
    justifyContent: "space-between",
  },
  abilityItem: {
    flexDirection: "column",
  },
  abilityName: {
    fontWeight: "600",
  },
  chip: {
    marginRight: theme.spacing(1),
  },
}));

async function loadPokemonData({ setPokemon, pokemonId }) {
  const fullPokemonData = await services.getPokemonById(pokemonId);
  setPokemon(fullPokemonData);
}

function Details(props) {
  const classes = useStyles();
  const {
    match: { params },
  } = props;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    loadPokemonData({ setPokemon, pokemonId: params.id });
  }, [params]);

  return (
    <Box padding={2}>
      <Paper>
        {pokemon ? (
          <Box
            padding={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="h4">
              {utils.capitalize(pokemon.name)}
            </Typography>
            <Box>
              <img alt="pokemon front" src={pokemon.sprites.front_default} />
              <img alt="pokemon back" src={pokemon.sprites.back_default} />
            </Box>
            <Box>
              {pokemon.types.map((item) => (
                <Chip
                  key={item.slot}
                  className={classes.chip}
                  label={item.type.name}
                />
              ))}
            </Box>
            <Typography variant="h5">Base Stats</Typography>
            <List>
              <ListItem className={classes.statsItem}>
                <Typography className={classes.stat} variant="body1">
                  Weight:
                </Typography>
                <Typography variant="body2">{pokemon.weight}</Typography>
              </ListItem>
              {pokemon.stats.map((item) => (
                <ListItem
                  key={item.base_stat + item.stat.name}
                  className={classes.statsItem}
                >
                  <Typography className={classes.stat} variant="body1">
                    {utils.capitalize(item.stat.name) + ":"}
                  </Typography>
                  <Typography variant="body2">{item.base_stat}</Typography>
                </ListItem>
              ))}
            </List>
            <Typography variant="h5">Abilities</Typography>
            <List>
              {pokemon.abilities.map((item) => (
                <ListItem
                  key={item.ability.name}
                  className={classes.abilityItem}
                >
                  {item.is_hidden && (
                    <Typography variant="caption">Hidden ability</Typography>
                  )}
                  <Typography className={classes.abilityName} variant="body1">
                    {utils.capitalize(item.ability.name)}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Paper>
    </Box>
  );
}

export default Details;
