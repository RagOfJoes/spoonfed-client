import Link from "next/link";
import LazyLoad from "react-lazyload";
import { memo, useState } from "react";
import { motion } from "framer-motion";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";
import CardMedia from "@material-ui/core/CardMedia";
import LikedIcon from "@material-ui/icons/Favorite";
import CardActionArea from "@material-ui/core/CardActionArea";
import RestaurantRoundedIcon from "@material-ui/icons/RestaurantRounded";
import AccessTimeRoundedIcon from "@material-ui/icons/AccessTimeRounded";
import RecipeCardLoading from "./RecipeCard.loading";
import { useRecipeCardStyle } from "./RecipeCard.style";

const RecipeCard = memo(
  ({
    as,
    name,
    href,
    slug,
    images,
    onLike,
    skeleton,
    isLiked,
    servings,
    totalTime,
    createdBy: { avatar, username } = {
      avatar: "",
      username: "",
    },
  }) => {
    const classes = useRecipeCardStyle();
    const [hovering, setHovering] = useState(false);

    if (skeleton) return <RecipeCardLoading />;

    const overlayAnimations = {
      initial: {
        opacity: 0,
      },
      hovering: {
        opacity: 1,
      },
    };
    return (
      <Card elevation={0} className={`${classes.container}`}>
        <Link
          shallow
          scroll={false}
          as={as || `/r/${slug}`}
          href={href || `/?recipeSlug=${slug}`}
        >
          <CardActionArea className={classes.imageBtn}>
            <LazyLoad
              debounce
              placeholder={
                <Skeleton
                  width="100%"
                  variant="rect"
                  style={{ height: 0, paddingBottom: "75%" }}
                />
              }
            >
              <CardMedia
                alt={name}
                title={name}
                image={images[0].url}
                className={classes.image}
              />
            </LazyLoad>
            <motion.div
              className={classes.overlay}
              variants={overlayAnimations}
              onHoverEnd={() => setHovering(false)}
              onHoverStart={() => setHovering(true)}
              animate={hovering ? "hovering" : "initial"}
            >
              <div className={classes.overlayWrapper}>
                <span className={classes.name}>{name}</span>

                <motion.div
                  className={classes.actionButton}
                  transition={{
                    duration: 0.02,
                  }}
                  variants={{
                    initial: { scale: 0 },
                    hovering: { scale: 1 },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <LikedIcon className={classes.actionIcon} />
                </motion.div>
              </div>
            </motion.div>
          </CardActionArea>
        </Link>

        <div className={classes.content}>
          <div className={classes.createdBy}>
            <Link
              shallow
              as={`/u/${username}/t/recipes`}
              href={{
                pathname: "/u/[username]/t/[tab]",
                query: { username, tab: "recipes" },
              }}
            >
              <Avatar
                alt="Avatar"
                src={avatar}
                alt={username}
                title={username}
                className={classes.avatar}
              >
                {username[0]}
              </Avatar>
            </Link>

            <Link
              shallow
              as={`/u/${username}/t/recipes`}
              href={{
                pathname: "/u/[username]/t/[tab]",
                query: { username, tab: "recipes" },
              }}
            >
              <span className={classes.username}>{username}</span>
            </Link>
          </div>

          <div className={classes.metaContainer}>
            <div className={classes.meta}>
              <RestaurantRoundedIcon className={classes.metaIcon} />
              <span variant="caption" className={classes.metaValue}>
                {servings}
              </span>
            </div>
            <div className={classes.meta}>
              <AccessTimeRoundedIcon className={classes.metaIcon} />
              <span className={classes.metaValue}>{totalTime}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

export default RecipeCard;
