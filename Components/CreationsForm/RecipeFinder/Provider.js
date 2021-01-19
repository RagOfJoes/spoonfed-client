import { useQuery } from "@apollo/client";
import { DEFAULT_RECIPES_VARIABLE } from "constants/index";
import { GetRecipesForCreationsQuery } from "graphql/Queries";
import { useMemo, useState, useContext, createContext } from "react";

const RecipeFinderContext = createContext({
  data: {},
  error: false,
  loading: false,
  fetchMore: () => {},

  fetching: false,
  toggleFetching: () => {},

  manipulating: false,
  toggleManipulating: () => {},
});

const Provider = ({ children }) => {
  const [fetching, toggleFetching] = useState(false);
  const [manipulating, toggleManipulating] = useState(false);

  const { data, error, loading, fetchMore } = useQuery(
    GetRecipesForCreationsQuery,
    {
      variables: DEFAULT_RECIPES_VARIABLE,
    }
  );

  const value = useMemo(
    () => ({
      error,
      loading,
      fetchMore,
      data: data && data?.getAllRecipes,

      fetching,
      toggleFetching,

      manipulating,
      toggleManipulating,
    }),
    [data, loading, fetching, manipulating]
  );

  return (
    <RecipeFinderContext.Provider value={value}>
      {children}
    </RecipeFinderContext.Provider>
  );
};

export default Provider;

export const useRecipeFinder = () => useContext(RecipeFinderContext);
