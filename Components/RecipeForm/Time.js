import { Field } from 'formik';
import Grid from '@material-ui/core/Grid';
import { RECIPE_TIME } from 'constants/index';
import TextFormField from 'views/TextFormField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { useRecipeFormStyle } from './RecipeForm.style';

export default ({ time }) => {
	const classes = useRecipeFormStyle();

	return (
		<>
			<Grid item xs={12} className={classes.time}>
				<Typography variant="subtitle1" className={classes.timeText}>
					Time
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<Divider style={{ width: '100%' }} />
			</Grid>
			{RECIPE_TIME.map((key, index) => {
				if (key === '__typename') return null;

				const uppercase = key.charAt(0).toUpperCase() + key.slice(1);
				return (
					<Grid item xs={12} key={`time.${key}`}>
						<Field
							margin="dense"
							variant="filled"
							name={`time.${key}`}
							component={TextFormField}
							label={`${uppercase} Time`}
						/>
					</Grid>
				);
			})}
		</>
	);
};
