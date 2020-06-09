import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ breakpoints }) => {
		return {
			container: {
				height: '100vh',
				paddingTop: 129,

				[breakpoints.down('sm')]: {
					paddingTop: 113,
				},
			},
		};
	},
	{ name: 'PageLayout' }
);

export default ({ children }) => {
	const classes = useStyles();
	return (
		<Container maxWidth="lg" className={classes.container}>
			{children}
		</Container>
	);
};
