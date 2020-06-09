import { useUser } from 'lib/user';
import RecipeForm from './RecipeForm';
import Layout from 'Components/Layout';
import Grid from '@material-ui/core/Grid';
import Unauthenticated from 'Components/Unauthenticated';
import makeStyles from '@material-ui/core/styles/makeStyles';
import RecipeFormLoading from 'Components/RecipeForm/RecipeForm.loading';

const useStyles = makeStyles(
	({ spacing }) => ({
		loading: {
			overflow: 'hidden',
			paddingTop: spacing(1),
		},
	}),
	{ name: 'RecipeEditPage' }
);

export default () => {
	const classes = useStyles();
	const { user, loading } = useUser();

	if (!loading && !user) return <Unauthenticated />;

	if (!loading && user)
		return (
			<Layout>
				<RecipeForm />
			</Layout>
		);

	return (
		<Layout>
			<Grid container spacing={1} wrap="nowrap" direction="column" className={classes.loading}>
				<RecipeFormLoading />
			</Grid>
		</Layout>
	);
};
