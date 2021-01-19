import { useUser } from 'lib/user';
import Layout from 'Components/Layout';
import CreationForm from './CreationForm';
import Grid from '@material-ui/core/Grid';
import Unauthenticated from 'Components/Unauthenticated';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CreationsFormLoading from 'Components/CreationsForm/CreationsForm.loading';

const useStyles = makeStyles(
	({ spacing }) => ({
		loading: {
			overflow: 'hidden',
			paddingTop: spacing(1),
		},
	}),
	{ name: 'EditCreationPage' }
);

const EditCreation = () => {
	const classes = useStyles();
	const { user, loading } = useUser();

	if (!loading && !user) return <Unauthenticated />;

	if (!loading && user)
		return (
			<Layout>
				<CreationForm />
			</Layout>
		);

	return (
		<Layout>
			<Grid container spacing={1} wrap="nowrap" direction="column" className={classes.loading}>
				<CreationsFormLoading />
			</Grid>
		</Layout>
	);
};

export default EditCreation;
