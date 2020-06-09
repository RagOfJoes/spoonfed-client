import { memo } from 'react';
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
			padding: spacing(3),
		},
	}),
	{ name: 'RecipeCreatePage' }
);

export default memo(() => {
	const classes = useStyles();
	const { user, loading } = useUser();

	if (!loading && !user) return <Unauthenticated />;

	if (!loading && user) return <RecipeForm />;

	return (
		<Layout>
			<Grid container spacing={1} wrap="nowrap" direction="column" className={classes.loading}>
				<RecipeFormLoading />;
			</Grid>
		</Layout>
	);
});
