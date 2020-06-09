import React, { useState, useContext, useMemo, createContext } from 'react';

const AppContext = createContext({
	recipes: {
		sort: {},
		toggleSort: () => {},

		filters: [],
		toggleFilters: () => {},
	},

	creations: {
		sort: {},
		togglerSort: () => {},

		filters: [],
		toggleFilters: () => {},
	},
});

const AppProvider = ({ children }) => {
	const [recipesSort, toggleRecipesSort] = useState({ key: 'creation', order: 'DESC' });
	const [recipesFilters, toggleRecipesFilters] = useState([]);

	const [creationsSort, toggleCreationsSort] = useState({ key: 'creation', order: 'DESC' });
	const [creationsFilters, toggleCreationsFilters] = useState([]);

	const value = useMemo(
		() => ({
			recipes: {
				sort: recipesSort,
				toggleSort: toggleRecipesSort,

				filters: recipesFilters,
				toggleFilters: toggleRecipesFilters,
			},

			creations: {
				sort: creationsSort,
				toggleSort: toggleCreationsSort,

				filters: creationsFilters,
				toggleFilters: toggleCreationsFilters,
			},
		}),
		[recipesSort, recipesFilters, creationsSort, creationsFilters]
	);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;

export const useApp = () => useContext(AppContext);
