import { memo } from 'react';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { useRecipeFinder } from './Provider';

const useStyles = makeStyles((theme) => ({
	inline: {
		display: 'inline',
	},
}));

export default memo(({ onRecipeSelect }) => {
	const { data, loading, fetching, manipulating } = useRecipeFinder();

	if (!loading && !manipulating && data && data?.edges?.length > 0) {
		return (
			<List>
				{data.edges.map((recipe) => {
					const { slug } = recipe;
					return <Item key={slug} recipe={recipe} onRecipeSelect={onRecipeSelect} />;
				})}
				{fetching && (
					<>
						<ItemLoading />
						<ItemLoading />
						<ItemLoading />
						<ItemLoading />
						<ItemLoading />
						<ItemLoading />
					</>
				)}
			</List>
		);
	}

	if (loading || manipulating) {
		return (
			<List>
				<ItemLoading />
				<ItemLoading />
				<ItemLoading />
				<ItemLoading />
				<ItemLoading />
				<ItemLoading />
				<ItemLoading />
			</List>
		);
	}

	return (
		<List>
			<ListItem alignItems="flex-start">
				<ListItemText primary="No Recipe Found!" />
			</ListItem>
		</List>
	);
});

export const ItemLoading = () => {
	const classes = useStyles();
	return (
		<>
			<ListItem button alignItems="flex-start">
				<ListItemAvatar>
					<Avatar alt="Loading">
						<Skeleton variant="circle" />
					</Avatar>
				</ListItemAvatar>

				<ListItemText
					primary={<Skeleton />}
					secondary={
						<Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
							<Skeleton />
						</Typography>
					}
				/>
			</ListItem>
			<Divider variant="inset" component="li" />
		</>
	);
};

const Item = ({ recipe, onRecipeSelect }) => {
	const classes = useStyles();
	const {
		name,
		images,
		createdBy: {
			username,
			name: { full },
		},
	} = recipe;
	return (
		<>
			<ListItem button alignItems="flex-start" onClick={() => onRecipeSelect(recipe)}>
				<ListItemAvatar>
					<Avatar alt={name} src={images[0].url} />
				</ListItemAvatar>
				<ListItemText
					primary={name}
					secondary={
						<React.Fragment>
							<Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
								{full} ({username})
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
			<Divider variant="inset" component="li" />
		</>
	);
};
