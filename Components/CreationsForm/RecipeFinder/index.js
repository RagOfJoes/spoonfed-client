import RecipeFinder from './RecipeFinder';
import RecipeFinderProvider from './Provider';

export default (props) => {
	return (
		<RecipeFinderProvider>
			<RecipeFinder {...props} />
		</RecipeFinderProvider>
	);
};
