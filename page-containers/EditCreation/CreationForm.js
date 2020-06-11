import Head from 'next/head';
import { useUser } from 'lib/user';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import CreationsForm from 'Components/CreationsForm';
import CreationFormError from './CreationForm.error';
import NotAuthorized from 'Components/NotAuthorized';
import Typography from '@material-ui/core/Typography';
import { useCreationDetail, useEditCreation } from './hooks';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { handleAuthError, isAuthError } from 'graphql/handlers';
import CreationsFormLoading from 'Components/CreationsForm/CreationsForm.loading';

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
	const { data, loading, error } = useCreationDetail(enqueueSnackbar);

	const [editCreation] = useEditCreation(enqueueSnackbar);

	if (!error && !loading && data?.getCreationDetail) {
		const { id, title, recipe, createdBy } = data.getCreationDetail;

		// If User didn't create this Recipe
		if (user?.sub !== createdBy?.sub) return <NotAuthorized />;

		const recipeUrl = new URL(`/r/${recipe.slug}`, document.baseURI).href;

		return (
			<>
				<Head>
					<title>Edit {title || 'Creation'}</title>
					<meta key="title" property="og:title" content={`Edit ${title || 'Creation'}`} />
				</Head>
				<Grid container direction="column" className={classes.container}>
					<CreationsForm
						initialValues={{ ...data.getCreationDetail, recipe: recipeUrl }}
						Header={
							<Grid item container alignItems="center">
								<Grid item>
									<Typography variant="h5">Edit Creation</Typography>
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
							const allowedFields = ['title', 'description', 'images'];
							const { creation } = v.variables;

							const inputVar = {};
							allowedFields.map((field) => (inputVar[field] = creation[field]));

							await editCreation({
								variables: {
									id,
									creation: inputVar,
								},
							});
						}}
					/>
				</Grid>
			</>
		);
	}

	if (!error && !loading && !data.getCreationDetail) return <CreationFormError />;

	return (
		<Grid container spacing={1} direction="column" className={classes.container}>
			<CreationsFormLoading />
		</Grid>
	);
};
