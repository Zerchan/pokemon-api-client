import { PAGE_SIZE } from "../constants";

function capitalize(text) {
  const firstLetter = text[0].toUpperCase();
  return firstLetter + text.slice(1);
}

function totalPages(results) {
  return Math.ceil(results / PAGE_SIZE);
}

export default {
  capitalize,
  totalPages,
};
