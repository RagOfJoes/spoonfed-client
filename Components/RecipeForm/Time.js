import { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { RECIPE_TIME } from 'constants/index';
import TextFormField from 'views/TextFormField';
import Divider from '@material-ui/core/Divider';
import { Field, useFormikContext } from 'formik';
import Typography from '@material-ui/core/Typography';
import { useRecipeFormStyle } from './RecipeForm.style';

export default () => {
	const classes = useRecipeFormStyle();
	const { errors, touched, setFieldTouched } = useFormikContext();

	useEffect(() => {
		try {
			if (errors.time && touched.time && !touched.time.total) {
				setFieldTouched('time.total', true, false);
				setFieldTouched('ingredients.0', true, false);
				setFieldTouched('instructions.0', true, false);
			}
		} catch (e) {}
	}, [errors, touched]);

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
