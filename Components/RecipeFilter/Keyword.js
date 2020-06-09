import { Field } from 'formik';
import Grid from '@material-ui/core/Grid';
import TextFormField from 'views/TextFormField';
import Typography from '@material-ui/core/Typography';

export default ({ index, filterKey }) => {
	return (
		<>
			<Grid item xs={6}>
				<Typography align="center" variant="subtitle2">
					should contain
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<Field
					label="Name"
					margin="dense"
					variant="filled"
					component={TextFormField}
					placeholder="ex. Peanut Butter Cookies"
					name={`filters.${index}.${filterKey}.contains`}
				/>
			</Grid>
		</>
	);
};
