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
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadPokemonData = useCallback(async (pokemon) => {
    const fullPokemonData = await services.getPokemon(pokemon.url);
    return fullPokemonData;
  }, []);

  const loadPokemonList = useCallback(
    async ({ key, url, reset }) => {
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
        page: reset ? 1 : key === "next" ? state.page + 1 : state.page - 1,
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

  const updateSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const loadPokemon = (e) => {
    e.preventDefault();
    async function loadData() {
      try {
        if (searchTerm && searchTerm.length > 0) {
          setPokemons(null);
          const pokemonData = await services.getPokemonById(
            searchTerm.toLowerCase()
          );
          console.log("pokemonData");
          console.log(pokemonData);
          setError(false);
          setPokemons([pokemonData]);
        } else {
          loadPokemonList({ key: "next", url: null, reset: true });
        }
      } catch (err) {
        setError(true);
        setPokemons(null);
      }
    }
    loadData();
  };

  const context = {
    pokemons,
    pagesInfo,
    searchTerm,
    error,
    loadPokemon,
    updateSearch,
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
