import * as yup from 'yup';

export const schema = yup.object().shape({
	avatar: yup.string().ensure().url('Must be a valid url'),
	bio: yup.string().max(120, 'Must not exceed 120 characters'),
	username: yup
		.string()
		.ensure()
		.strict(true)
		.required('* Required')
		.trim('Cannot contain spaces')
		.min(4, 'Must have atleast 4 characters')
		.max(16, 'Must not exceed 16 characters')
		.matches(/^[a-zA-Z0-9-]{4,16}$/, { message: 'Cannot contain special characters' }),
});
