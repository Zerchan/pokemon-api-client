import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";

import services from "../../services";

async function loadPokemonData({ setPokemon, pokemonId }) {
  const fullPokemonData = await services.getPokemonById(pokemonId);
  setPokemon(fullPokemonData);
}

function Details(props) {
  const {
    match: { params },
  } = props;
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    loadPokemonData({ setPokemon, pokemonId: params.id });
  }, [params]);

  return <Box>{pokemon.name}</Box>;
}

export default Details;
