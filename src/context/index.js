import React, { useState, useEffect, useCallback } from "react";

import services from "../services";
import utils from "../utils";

export const SearchContext = React.createContext();

function ContextProvider(props) {
  const [pagesInfo, setPagesInfo] = useState({
    next: null,
    prev: null,
    count: null,
    totalPages: null,
    page: 0,
  });
  const [pokemons, setPokemons] = useState(null);

  const loadPokemonData = useCallback(async (pokemon) => {
    const fullPokemonData = await services.getPokemon(pokemon.url);
    return fullPokemonData;
  }, []);

  const loadPokemonList = useCallback(
    async ({ key, url }) => {
      setPokemons(null);
      const data = await services.getPokemonList(url);
      const pokemonsFullData = await Promise.all(
        data.results.map(loadPokemonData)
      );
      setPokemons(pokemonsFullData);
      setPagesInfo((state) => ({
        next: data.next,
        prev: data.previous,
        count: data.count,
        totalPages: utils.totalPages(data.count),
        page: key === "next" ? state.page + 1 : state.page - 1,
      }));
    },
    [setPokemons, loadPokemonData]
  );

  useEffect(() => {
    loadPokemonList({ key: "next", url: null });
  }, [loadPokemonList]);

  const nextPage = () => {
    loadPokemonList({ key: "next", url: pagesInfo.next });
  };

  const prevPage = () => {
    loadPokemonList({ key: "prev", url: pagesInfo.prev });
  };

  const context = {
    pokemons,
    pagesInfo,
    nextPage,
    prevPage,
  };

  return (
    <SearchContext.Provider value={context}>
      {props.children}
    </SearchContext.Provider>
  );
}

export default ContextProvider;
