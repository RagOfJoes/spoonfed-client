import { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import TextFormField from 'views/TextFormField';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import { Field, useFormikContext } from 'formik';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useRecipeFormStyle } from './RecipeForm.style';

const uppercase = (key) => key.charAt(0).toUpperCase() + key.slice(1);

export default memo(({ name, array, fieldProps, InputProps }) => {
	const capiName = uppercase(name);
	const classes = useRecipeFormStyle();
	const { setFieldValue } = useFormikContext();
	return (
		<>
			<Grid item xs={12} className={classes.time}>
				<Typography variant="subtitle1" className={classes.timeText}>
					{capiName}
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<Divider style={{ width: '100%' }} />
			</Grid>
			{array.map((_, index) => {
				return (
					<Grid item xs={12} key={`${name}.${index}`}>
						<Field
							margin="dense"
							variant="filled"
							component={TextFormField}
							name={`${name}.${index}`}
							label={`${capiName} #${index + 1}`}
							InputProps={{
								endAdornment: (
									<>
										<Grid item>
											<IconButton size="small" onClick={() => setFieldValue(name, array.concat(['']))}>
												<AddIcon fontSize="small" color="primary" />
											</IconButton>
										</Grid>

										<Grid item>
											<Divider orientation="vertical" style={{ height: 24 }} />
										</Grid>

										<Grid item>
											<IconButton
												size="small"
												onClick={() => {
													if (array.length <= 1) return;

													const removed = array.filter((v, i) => i !== index);
													return setFieldValue(name, removed);
												}}
											>
												<CloseIcon fontSize="small" color="error" />
											</IconButton>
										</Grid>
									</>
								),
								...InputProps,
							}}
							{...fieldProps}
						/>
					</Grid>
				);
			})}
		</>
	);
});
