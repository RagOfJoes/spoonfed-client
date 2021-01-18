import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useQuery } from "@apollo/client";
import { handleAuthError } from "graphql/handlers";
import React, { useState, useContext, useMemo, createContext } from "react";
import {
  GetUserRecipesQuery,
  GetUserProfileQuery,
  GetUserCreationsQuery,
} from "graphql/Queries";

const ProfileContext = createContext({
  defaultRecipesVariable: {},
  defaultCreationsVariable: {},

  profile: {
    data: {},
    error: null,
    loading: false,
  },

  recipes: {
    data: {},
    error: null,
    loading: false,
    fetchMore: () => {},
  },

  creations: {
    data: {},
    error: null,
    loading: false,
    fetchMore: () => {},
  },

  sort: {},
  toggleSort: () => {},

  activeFilters: [],
  toggleFilters: () => {},

  isFetching: false,
  toggleFetching: () => {},

  isSorting: false,
  toggleSorting: () => {},
});

const ProfileProvider = ({ children }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isSorting, toggleSorting] = useState(false);
  const [activeFilters, toggleFilters] = useState([]);
  const [isFetching, toggleFetching] = useState(true);
  const [sort, toggleSort] = useState({ key: "creation", order: "DESC" });

  const defaultRecipesVariable = {
    user: router?.query?.username,
    limit: 6,
    filters: [],
    sort: {
      creation: "DESC",
    },
  };

  const defaultCreationsVariable = {
    user: router?.query?.username,
    limit: 6,
    sort: {
      creation: "DESC",
    },
  };

  const profile = useQuery(GetUserProfileQuery, {
    skip: !router?.query?.username,
    onCompleted: () => toggleFetching(false),
    variables: { username: router?.query?.username },
    onError: async (e) =>
      await handleAuthError(e, null, enqueueSnackbar, {
        message: "User not found!",
      }),
  });
  const recipes = useQuery(GetUserRecipesQuery, {
    variables: defaultRecipesVariable,
    skip: router.query?.tab !== "recipes",
    onCompleted: () => toggleFetching(false),
    onError: async (e) =>
      await handleAuthError(e, null, enqueueSnackbar, {
        message: "User not found!",
      }),
  });
  const creations = useQuery(GetUserCreationsQuery, {
    variables: defaultCreationsVariable,
    skip: router.query?.tab !== "creations",
    onCompleted: () => toggleFetching(false),
    onError: async (e) =>
      await handleAuthError(e, null, enqueueSnackbar, {
        message: "User not found!",
      }),
  });

  const value = useMemo(
    () => ({
      defaultRecipesVariable,
      defaultCreationsVariable,

      profile: {
        error: profile.error,
        loading: profile.loading,
        data: profile.data && profile.data.getProfile,
      },

      recipes: {
        error: recipes.error,
        loading: recipes.loading,
        fetchMore: recipes.fetchMore,
        data: recipes.data && recipes.data.getUserRecipes,
      },

      creations: {
        error: creations.error,
        loading: creations.loading,
        fetchMore: creations.fetchMore,
        data: creations.data && creations.data.getUserCreations,
      },

      sort,
      toggleSort,

      activeFilters,
      toggleFilters,

      isFetching,
      toggleFetching,

      isSorting,
      toggleSorting,
    }),
    [profile, recipes, creations, sort, isSorting, isFetching]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;

export const useProfile = () => useContext(ProfileContext);
