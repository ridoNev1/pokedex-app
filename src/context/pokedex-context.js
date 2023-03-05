import React, { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";
const PokedexContext = createContext();

function pokedexReducer(state, action) {
  switch (action.type) {
    case "SET_LIST_POKEMON": {
      return { ...state, listPokemon: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const initialState = {
  listPokemon: {
    isLoading: true,
    data: [],
    count: 0
  }
};

function PokedexProvider({ children }) {
  const [controller, dispatch] = React.useReducer(pokedexReducer, initialState);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return (
    <PokedexContext.Provider value={value}>{children}</PokedexContext.Provider>
  );
}

function usePokedexController() {
  const context = useContext(PokedexContext);

  if (!context) {
    throw new Error(
      "usePokedexController should be used inside the PokedexProvider."
    );
  }

  return context;
}

PokedexProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const setListPokemon = (dispatch, value) =>
  dispatch({ type: "SET_LIST_POKEMON", value });

export { PokedexProvider, setListPokemon, usePokedexController };
