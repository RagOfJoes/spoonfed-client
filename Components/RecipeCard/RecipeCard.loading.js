import { memo } from "react";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";
import RestaurantRoundedIcon from "@material-ui/icons/RestaurantRounded";
import AccessTimeRoundedIcon from "@material-ui/icons/AccessTimeRounded";
import { useRecipeCardStyle } from "./RecipeCard.style";

const RecipeCardLoading = memo(() => {
  const classes = useRecipeCardStyle();

  return (
    <Card elevation={0} className={`${classes.container}`}>
      <div className={classes.imageBtn}>
        <Skeleton
          width="100%"
          variant="rect"
          style={{ height: 0, paddingBottom: "75%" }}
        />
      </div>

      <div className={classes.content}>
        <div className={classes.createdBy}>
          <Skeleton variant="circle" style={{ width: 25, height: 25 }}>
            <Avatar
              alt="Avatar"
              alt="recipecard-skeleton"
              title="recipecard-skeleton"
            >
              _
            </Avatar>
          </Skeleton>
          <Skeleton className={classes.username}>
            <span>______</span>
          </Skeleton>
        </div>

        <div className={classes.metaContainer}>
          <div className={classes.meta}>
            <RestaurantRoundedIcon className={classes.metaIcon} />
            <Skeleton className={classes.metaValue}>
              <span variant="caption">__</span>
            </Skeleton>
          </div>
          <div className={classes.meta}>
            <AccessTimeRoundedIcon className={classes.metaIcon} />
            <Skeleton className={classes.metaValue}>
              <span>__</span>
            </Skeleton>
          </div>
        </div>
      </div>
    </Card>
  );
});

export default RecipeCardLoading;
