import RecipeFinder from './RecipeFinder';
import RecipeFinderProvider from './Provider';

const Index = props => {
	return (
		<RecipeFinderProvider>
			<RecipeFinder {...props} />
		</RecipeFinderProvider>
	);
};

export default Index;
