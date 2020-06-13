import * as yup from 'yup';

export const schema = yup.object().shape({
	title: yup.string().required('Required!').max(40, 'Cannot exceed 40 letters!').min(4, 'Must be longer than 4 letters!'),
	images: yup.array(),
	recipe: yup.string().url('Must be a valid url!').required('Required!'),
	description: yup.string().max(150, 'Cannot exceed 150 letters!'),
});
