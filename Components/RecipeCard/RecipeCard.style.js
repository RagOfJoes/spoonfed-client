import { Theme } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';

/**
 *
 * @param {Theme} theme
 */
const recipeCardStyle = ({ shape, spacing, palette, typography }) => ({
	container: {
		paddingBottom: spacing(2),
		backgroundColor: 'transparent',
		borderRadius: shape.borderRadius * 2,
	},
	imageBtn: {
		borderRadius: 0,
		borderTopLeftRadius: shape.borderRadius * 2,
		borderTopRightRadius: shape.borderRadius * 2,
	},
	image: {
		height: 0,
		borderRadius: 0,
		paddingBottom: '56.25%',
		borderTopLeftRadius: shape.borderRadius * 2,
		borderTopRightRadius: shape.borderRadius * 2,
	},
	content: {
		paddingTop: spacing(2),
		paddingBottom: spacing(1),
	},
	name: {
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
	},
	username: {
		fontWeight: typography.fontWeightMedium,
	},
	actions: {
		padding: spacing(0, 2),
		color: palette.grey[500],
	},
	divider: {
		marginTop: spacing(0.5),
	},
	meta: {
		marginTop: spacing(0.5),
	},
	metaText: {
		textTransform: 'lowercase',
		fontWeight: typography.fontWeightMedium,
	},
});

const useRecipeCardStyle = makeStyles(recipeCardStyle, { name: 'RecipeCard' });

export { recipeCardStyle, useRecipeCardStyle };
