import { Theme } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';

/**
 *
 * @param {Theme} theme
 */
const recipeFormStyle = (theme) => ({
	content: {
		height: '100%',
		padding: theme.spacing(3, 4),

		[theme.breakpoints.down('xs')]: {
			padding: theme.spacing(2),
		},
	},
	dropzone: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(1),
	},
	time: {
		marginTop: theme.spacing(2),
	},
	timeText: {
		fontWeight: theme.typography.fontWeightMedium,
	},
	expandables: {
		marginTop: theme.spacing(2),
	},
	multiline: {
		minHeight: 57,
	},
});

const useRecipeFormStyle = makeStyles(recipeFormStyle, { name: 'RecipeForm' });

export { recipeFormStyle, useRecipeFormStyle };
