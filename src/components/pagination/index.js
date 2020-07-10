import React, { useContext } from "react";
import { Box, Button, Typography } from "@material-ui/core";

import { SearchContext } from "../../context";

function Pagination() {
  const { pokemons, pagesInfo, nextPage, prevPage } = useContext(SearchContext);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Button
        disabled={!pagesInfo.prev || !pokemons}
        variant="outlined"
        onClick={prevPage}
      >
        Prev
      </Button>
      <Typography variant="caption">
        Page {pagesInfo.page} / {pagesInfo.totalPages}
      </Typography>
      <Button
        disabled={!pagesInfo.next || !pokemons}
        variant="outlined"
        onClick={nextPage}
      >
        Next
      </Button>
    </Box>
  );
}

export default Pagination;
