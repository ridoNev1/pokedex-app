import { getListPokemon } from "actions/pokemon";
import { setListPokemon } from "context/pokedex-context";
import { countingOffestPage } from "lib";

export const handleGetPokemonList = async (dispatch, page, limit, filter) => {
  setListPokemon(dispatch, {
    isLoading: true,
    data: []
  });
  await getListPokemon(countingOffestPage(page, limit), limit, filter).then(
    (res) => {
      setListPokemon(dispatch, {
        isLoading: false,
        data: res?.results || [],
        count: res?.count || 0
      });
    }
  );
};
