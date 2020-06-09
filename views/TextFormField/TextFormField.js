import React, { memo } from 'react';
import { getIn } from 'formik';
import TextField from '@material-ui/core/TextField';

const Index = memo(({ field, form, ...props }) => {
	const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);

	return <TextField fullWidth margin="normal" helperText={errorText} error={!!errorText} {...field} {...props} />;
});

export default Index;
