import { useUser } from 'lib/user';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import RecipeForm from 'Components/RecipeForm';
import RecipeFormError from './RecipeForm.error';
import NotAuthorized from 'Components/NotAuthorized';
import Typography from '@material-ui/core/Typography';
import { useRecipeDetail, useEditRecipe } from './hooks';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { handleAuthError, isAuthError } from 'graphql/handlers';
import RecipeFormLoading from 'Components/RecipeForm/RecipeForm.loading';

const useStyles = makeStyles(
	({}) => ({
		container: {
			overflow: 'hidden',
		},
		image: {
			width: '100%',
			maxWidth: 500,
		},
	}),
	{ name: 'RecipeEditForm' }
);

export default () => {
	const { user } = useUser();
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const { data, loading, error } = useRecipeDetail(enqueueSnackbar);

	const [editRecipe] = useEditRecipe(enqueueSnackbar);

	if (!error && !loading && data?.getRecipeDetail) {
		const { id, createdBy } = data.getRecipeDetail;

		// If User didn't create this Recipe
		if (user?.sub !== createdBy?.sub) return <NotAuthorized />;

		return (
			<Grid container direction="column" className={classes.container}>
				<RecipeForm
					initialValues={data.getRecipeDetail}
					Header={
						<Grid item container alignItems="center">
							<Grid item>
								<Typography variant="h5">Edit recipe</Typography>
							</Grid>
						</Grid>
					}
					onError={async (e) => {
						if (isAuthError(e)) {
							await handleAuthError(e, null, enqueueSnackbar);
							return;
						}

						enqueueSnackbar('Something went wrong while editing Recipe. Try again later.', {
							variant: 'error',
						});
					}}
					mutation={async (v) => {
						const allowedFields = ['name', 'servings', 'time', 'ingredients', 'instructions', 'images'];
						const { recipe } = v.variables;

						const inputVar = {};
						allowedFields.map((field) => (inputVar[field] = recipe[field]));
						if (inputVar.time) delete inputVar.time;

						await editRecipe({
							variables: {
								id,
								recipe: inputVar,
							},
						});
					}}
				/>
			</Grid>
		);
	}

	if (!error && !loading && !data.getRecipeDetail) return <RecipeFormError />;

	return (
		<Grid container spacing={1} direction="column" className={classes.container}>
			<RecipeFormLoading />
		</Grid>
	);
};
