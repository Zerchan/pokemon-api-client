import { PAGE_SIZE } from "../constants";

async function getPokemonList(url) {
  const urlToFetch = url
    ? url
    : `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=0`;
  const response = await fetch(urlToFetch);
  const data = await response.json();

  return data;
}

async function getPokemon(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

async function getPokemonById(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  return data;
}

export default {
  getPokemonList,
  getPokemon,
  getPokemonById,
};
