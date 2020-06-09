import redirect from 'lib/redirect';
import Layout from 'Components/Layout';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import { useMutation } from '@apollo/react-hooks';
import CreationsForm from 'Components/CreationsForm';
import Typography from '@material-ui/core/Typography';
import { NewCreationMutation } from 'graphql/Mutations';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { handleAuthError, isAuthError } from 'graphql/handlers';

const useStyles = makeStyles(
	({ shape, spacing }) => ({
		container: {
			overflow: 'hidden',
			paddingTop: spacing(3),
			borderRadius: shape.borderRadius,
		},
	}),
	{ name: 'RecipeCreateForm' }
);

export default () => {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();

	const [newRecipeMutation] = useMutation(NewCreationMutation, {
		onCompleted: async ({ newCreation }) => {
			try {
				if (!newCreation?.slug) return;

				redirect({}, `/c/${newCreation.slug}`);
			} catch {}
		},
	});

	return (
		<Layout>
			<Grid container direction="column" className={classes.container}>
				<CreationsForm
					mutation={newRecipeMutation}
					Header={
						<Grid item container alignItems="center">
							<Grid item>
								<Typography variant="h5">New Creation</Typography>
							</Grid>
						</Grid>
					}
					onError={async (e) => {
						if (isAuthError(e)) {
							await handleAuthError(e, null, enqueueSnackbar);
						} else {
							enqueueSnackbar('Something went wrong while making a new Creation. Try again later.', {
								variant: 'error',
							});
						}
					}}
					onSubmitted={() => {
						// TODO: Create action to view recipe by passing
						// slug to this callback
						enqueueSnackbar('Successfully created Recipe!', {
							variant: 'success',
							autoHideDuration: 3000,
						});
					}}
				/>
			</Grid>
		</Layout>
	);
};
