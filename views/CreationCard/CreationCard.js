import Info from './Info';
import Media from './Media';
import { memo } from 'react';
import Card from '@material-ui/core/Card';
import CreationCardLoading from './CreationCard.loading';
import { useBouncyShadow } from 'lib/hooks/useBouncyShadow';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ shape }) => ({
		card: {
			width: '100%',
			minWidth: 280,
			maxWidth: 640,
			overflow: 'visible',
			position: 'relative',
			borderRadius: shape.borderRadius,
		},
	}),
	{ name: 'CreationCard' }
);

export default memo(({ as, href, slug, name, title, image, avatar, skeleton, username, onLike, isLiked }) => {
	const styles = useStyles();
	const shadow = useBouncyShadow();

	if (skeleton) return <CreationCardLoading />;

	return (
		<Card elevation={0} className={`${styles.card} ${shadow.root}`}>
			<Media title={title} image={image} as={as} href={href} slug={slug} />
			<Info name={name} avatar={avatar} username={username} onLike={onLike} isLiked={isLiked} />
		</Card>
	);
});
