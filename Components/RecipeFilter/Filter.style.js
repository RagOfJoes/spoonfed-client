import makeStyles from '@material-ui/core/styles/makeStyles';

const filterStyle = (theme) => ({
	container: {},
	formControl: {
		width: '100%',
	},
	label: {
		color: theme.palette.text.secondary,
	},
	removeButton: {
		marginTop: theme.spacing(1),
		color: theme.palette.error.dark,
		display: ({ shouldDisplayRemove }) => (shouldDisplayRemove ? 'flex' : 'none'),
	},
	dividerContainer: {
		marginTop: theme.spacing(3),
	},
});

const useFilterStyle = makeStyles(filterStyle, { name: 'RecipeFilter' });

export { filterStyle, useFilterStyle };

export default { filterStyle, useFilterStyle };
