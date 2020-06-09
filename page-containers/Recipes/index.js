import { memo } from 'react';
import Recipes from './Recipes';
import AllRecipesProvider from 'lib/Providers/AllRecipesProvider';

export default memo(() => {
	return (
		<AllRecipesProvider>
			<Recipes />
		</AllRecipesProvider>
	);
});
